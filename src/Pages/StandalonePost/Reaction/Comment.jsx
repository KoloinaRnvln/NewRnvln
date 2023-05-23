import { Avatar, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useLongPress } from "use-long-press";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { updateComment } from "../../../Controler/Redux/thread.reducer";
import { ClickableFlex } from "../../../Styles/Theme";
import { postContext } from "../PostContainer";

const Comment = ({ comment, postId }) => {
  const [deleteFooter, setDeleteFooter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { currentUser } = useContext(currentUserContext);
  const dispatch = useDispatch();
  const {post}=useContext(postContext);

  const bind = useLongPress(() => setDeleteFooter(true), {
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: true,
  });

  const deleteComment = async () => {
    setSubmitting(true);
    await apiCall
      .delete(
          `${post.type}/` +
          postId +
          "/" +
          comment._id
      )
      .then(
        (res) => {
          dispatch(updateComment({ postId, data: res.data }));
          setSubmitting(false);
        },
        (err) => {
          console.log(err);
          setSubmitting(false);
        }
      );
  };
  return (
    <ClickableFlex
      align="flex-start"
      {...(comment.commenterId._id === currentUser._id ? bind() : null)}
    >
      <Avatar size="md" />
      <Stack spacing={1} marginLeft={2}>
        <Heading size="sm">{comment.commenterId.name}</Heading>
        <Text width="calc(100vw - 84px)">{comment.text}</Text>
        {deleteFooter && (
          <Flex justify="flex-end">
            <Button onClick={() => setDeleteFooter(false)}>Annuler</Button>
            <Button
              isLoading={submitting}
              loadingText="Suppression"
              variant="outline"
              onClick={deleteComment}
              rightIcon={<Flex className="bi-trash"></Flex>}
            >
              Supprimer
            </Button>
          </Flex>
        )}
      </Stack>
    </ClickableFlex>
  );
};

export default Comment;