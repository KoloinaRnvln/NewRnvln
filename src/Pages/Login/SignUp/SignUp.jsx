import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import logo from "../../../Assets/RANAVALONA.png";
import { useNavigate } from "react-router-dom";
import SignUpSliders from "./SignUpSliders";
import PaginationSignUpSlide from "./PaginationSignUpSlide";
import { IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";

const SignUp = ({ setSignin }) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      className="signup"
      h="100%"
      width="100%"
      paddingX={3}
      paddingBottom={2}
    >
      <Grid templateRows="repeat(3, 3fr)" height="100%">
        <GridItem minH='140px'>
          <Button
            variant="float"
            onClick={() => navigate(-1)}
          ><IonIcon icon={arrowBack}/></Button>
          <Image src={logo} alt="logo" width="80px" margin="auto" />
          <Heading size="md" textAlign="center" height={10}>
            Rejoindre
          </Heading>
        </GridItem>
        <SignUpSliders setActiveIndex={setActiveIndex} />
        <Flex flexDir="column" justify="flex-end" minWidth="100%" minH='140px'>
          <PaginationSignUpSlide activeIndex={activeIndex} />
          <Text textAlign="center" marginX="auto">
            Vous avez déjà un compte ?{" "}
            <Button variant="link" onClick={() => setSignin(true)}>
              Se connecter
            </Button>
          </Text>
        </Flex>
      </Grid>
    </Box>
  );
};

export default SignUp;
