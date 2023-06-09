import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { chatbubbleOutline, send } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";
import UserLoader from "../../../Component/Loaders/UserLoader";
import { currentUserContext } from "../../../Controler/App";
import {
  useCommentPostMutation,
  useLazyFetchCommentsQuery,
} from "../../../Controler/Redux/Features/postSlice";
import { iconMd } from "../../../Styles/Theme";
import { postContext } from "../PostContainer";
import Comment from "./Comment";

const CommentPost = () => {
  const { post } = useContext(postContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const inputRef = useRef();
  const { currentUser } = useContext(currentUserContext);
  const [fetchComments, { isLoading, isError }] = useLazyFetchCommentsQuery();
  const [commentPost] = useCommentPostMutation();

  const openComments = () => {
    if (post.comments.length > 0)
      fetchComments(
        { postId: post._id, type: post.type, question: post.question?._id },
        { preferCacheValue: true }
      );
    onOpen();
  };

  useEffect(() => {
    if (isError) onClose();
    // eslint-disable-next-line
  }, [isLoading, isError]);

  return (
    <>
      <Button flexDir="column" onClick={openComments} fontSize="xl" size={"lg"}>
        <IonIcon icon={chatbubbleOutline} style={{ fontSize: iconMd }} />
        <Text fontSize="xs">{post.comments.length}</Text>
      </Button>
      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH="75%">
          <DrawerCloseButton top={1} />
          <DrawerHeader
            paddingY={2}
            textAlign="center"
            fontWeight="bold"
            fontSize="sm"
          >
            Commentaires
          </DrawerHeader>
          <ScrollableFeed forceScroll={true} className="scrollablefeed">
            {post.comments.map((comment) => (
              <Box key={comment._id}>
                {isLoading ? (
                  <UserLoader length={post.comments.length} />
                ) : (
                  <Comment comment={comment} postId={post._id} />
                )}
              </Box>
            ))}
          </ScrollableFeed>
          <HStack paddingX={3} paddingTop={0} paddingBottom={2}>
            <Input ref={inputRef} placeholder="Ajouter un commentaire" />
            <Button
              variant="float"
              onClick={() => {
                if (inputRef.current.value.length > 0)
                  commentPost({
                    postId: post._id,
                    type: post.type,
                    question: post.question?._id,
                    text: inputRef.current.value,
                    commenterId: {
                      _id: currentUser._id,
                      name: currentUser.name,
                      picture: currentUser.picture,
                    },
                    postCreator: post.id_user._id,
                  });
                inputRef.current.value = "";
              }}
            >
              <IonIcon icon={send} />
            </Button>
          </HStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CommentPost;
