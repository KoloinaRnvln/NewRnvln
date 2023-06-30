import { Flex, Text } from "@chakra-ui/react";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ErrorRender, Loader, Scroll } from "../../Component/Miscellanous";
import {
  useFetchConversationsQuery,
  useUpdateNewMessageMutation,
} from "../../Controler/Redux/Features/chatSlice";
import { setNewSecondMessage } from "../../Controler/Redux/Features/credentialSlice";
import ConversationCard from "./ConversationCard";

const SecondaryConversation = () => {
  const { data, isLoading, isSuccess, isError, error } =
    useFetchConversationsQuery("second");
  const [updateNewMessage] = useUpdateNewMessageMutation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    setSearchParams({ category: "second" });
    updateNewMessage("second");
  }, []);

  useEffect(() => {
    dispatch(setNewSecondMessage(0));
  });

  if (isLoading || category !== "second") return <Loader />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess && category === "second") {
    if (data.ids.length === 0)
      return (
        <Flex height={"100%"} justify="center" align={"center"}>
          <Text
            opacity={0.7}
            fontStyle="italic"
            width="75%"
            textAlign={"center"}
          >
            Appuyez sur l'icône <IonIcon icon={addCircleOutline} /> pour créer
            de nouvelle conversation
          </Text>
        </Flex>
      );
    return (
      <Scroll height="100%">
        {data.ids.map((conversationId) => (
          <ConversationCard
            conversationId={conversationId}
            key={conversationId}
          />
        ))}
      </Scroll>
    );
  }
};

export default SecondaryConversation;
