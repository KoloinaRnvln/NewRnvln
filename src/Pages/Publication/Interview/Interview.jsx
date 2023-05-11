import { Button, Flex, Stack, useToast } from "@chakra-ui/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Question from "../../Question/Question";
import { Scroll } from "../../../Styles/Theme";
import Options from "./Options";
import axios from "axios";
import { Loader } from "../../../Controler/Routes";

export const optionContext = createContext();

const Interview = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [display, setDisplay] = useState(<Options />);
  const [loading, setLoading] = useState(true);
  const question = useRef();
  const toast = useToast();

  const fetchQuestion = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + "/api/question/" + questionId)
      .then(
        (res) => {
          question.current = res.data;
          setLoading(false);
        },
        (err) => {
          toast({
            status: "error",
            duration: 5000,
            description: err.message + "Veuillez réessayer s'il vous plait",
            title: "Operation failed",
          });
          navigate(-1)
        }
      );
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <optionContext.Provider
      value={{ display, setDisplay, question: question.current }}
    >
      <Stack height="100%" spacing={0}>
        <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.500">
          <Button
            variant="float"
            className="bi-arrow-left"
            onClick={() => navigate(-1)}
          ></Button>
          <Button>Interview</Button>
        </Flex>
        {loading ? (
          <Loader />
        ) : (
          <Scroll height="100%" spacing={2} paddingX={3} paddingY={2}>
            <Question question={question.current} />
            {display}
          </Scroll>
        )}
      </Stack>
    </optionContext.Provider>
  );
};

export default Interview;