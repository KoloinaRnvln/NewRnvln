import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FreeMode, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { dataContext, postContext } from "./PostContainer";

const TextItem = () => {
  const { containerRef } = useContext(postContext);
  const { data } = useContext(dataContext);
  const textContainer = useRef();
  const [height, setHeight] = useState("100%");
  const publicationSwiperRef = useRef();
  const [expand, setExpand] = useState(false);
  const [textOverflow, setTextOverflow] = useState(false);

  useEffect(() => {
    let nbLine = Math.trunc((containerRef.current.clientHeight - 100) / 24);
    setHeight(24 * nbLine);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      textContainer.current.clientHeight < textContainer.current.scrollHeight
    ) {
      setTextOverflow(true);
    } else setTextOverflow(false);
    publicationSwiperRef.current.swiper.update();

  }, [expand, height]);

  return (
    <Box height={height}>
      <Swiper
        ref={publicationSwiperRef}
        direction={"vertical"}
        touchReleaseOnEdges={true}
        slidesPerView={"auto"}
        freeMode={{ enabled: true, momentum: false }}
        mousewheel={true}
        grabCursor={true}
        modules={[FreeMode, Mousewheel]}
        className="publication-swiper"
      >
        <SwiperSlide className="text-slide">
          <Stack height={expand ? "100%" : height} marginX={3} spacing={0}>
            <Text
              textAlign="left"
              onClick={() => setExpand(false)}
              ref={textContainer}
              overflowY="clip"
              height={"100%"}
            >
              {data.content}
            </Text>
            {textOverflow && (
              <Button
                variant="link"
                width="fit-content"
                onClick={() => setExpand(true)}
              >
                Suite
              </Button>
            )}
          </Stack>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default TextItem;
