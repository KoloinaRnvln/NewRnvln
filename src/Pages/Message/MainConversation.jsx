import React, { useContext, useEffect } from "react";
import {
  EmptyState,
  ErrorRender,
  Loader,
  Scroll,
} from "../../Component/Miscellanous";
import { useFetchConversationsQuery } from "../../Controler/Redux/Features/chatSlice";
import { socketContext } from "../../Controler/Socketio/RealtimeSocketContext";
import ConversationCard from "./ConversationCard";

const MainConversation = () => {
  const { setNewMainMessage } = useContext(socketContext);
  const { data, isLoading, isSuccess, isError } =
    useFetchConversationsQuery("main");

  useEffect(() => {
    setNewMainMessage(0);
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorRender />;
  if (isSuccess) {
    if (data.length === 0) return <EmptyState />;
    return (
      <Scroll height="100%">
        {data.map((convers, key) => (
          <ConversationCard conversation={convers} key={key} />
        ))}
      </Scroll>
    );
  }
};

export default MainConversation;
