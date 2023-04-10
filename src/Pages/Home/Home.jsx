import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import HomeFeed from "./HomeFeed";
import Menu from "./Menu";

const Home = () => {
  const [thread, setThread] = useState(<HomeFeed />);
  const navigate = useNavigate();
  const navRef=useRef();

  // useEffect(() => {
  //   navRef.current?.scrollIntoView({ behavior: "instant" });
  // }, []);
  
  return (
    <Box height="100%" className="home">
      <Menu setThread={setThread} />
      {thread}
      <Button position="absolute" className="bi-search" fontSize='xl'
        onClick={() => navigate("/search")}
        right={0} top={0} zIndex={2}   ></Button>
      <Flex ref={navRef} width="100%" position="absolute" zIndex={2} bottom={0}>
        <Navigation />
      </Flex>
    </Box>
  );
};

export default Home;
