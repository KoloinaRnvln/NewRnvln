import { Textarea } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const ResizableTextarea = ({value, setValue,textareaBg,placeholder}) => {
  const responseRef = useRef();

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.style.height = "40px";
      const scrollHeight = responseRef.current.scrollHeight;
      if (scrollHeight < 300)
        responseRef.current.style.height = scrollHeight + "px";
      else responseRef.current.style.height = 300 + "px";
    }
  }, [responseRef, value]);
    return (
        <Textarea ref={responseRef} bg={textareaBg} onChange={(e)=>setValue(e.target.value)}
          placeholder={placeholder ?? "Ecrire quelque chose..."}
          sx={{
            "::-webkit-scrollbar": { display: "none" },
            "::-webkit-resizer": { display: "none" },
          }} 
          // maxH='50vh'
        ></Textarea>
    );
};

export default ResizableTextarea;