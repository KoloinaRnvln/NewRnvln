import { Flex, Stack } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserLoader from "../../Component/Loaders/UserLoader";
import { EmptyState, ErrorRender } from "../../Component/Miscellanous";
import UserItem from "../../Component/UserItem";
import { currentUserContext } from "../../Controler/App";
import { useSearchQuery } from "../../Controler/Redux/Features/searchSlice";

const UserSearchResult = () => {
  const { currentUser } = useContext(currentUserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { data, isLoading, isSuccess, isError, error } = useSearchQuery({
    type: "user",
    query: keyword,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set("default_index", "0");
      return searchParams;
    });
  }, []);

  if (isLoading) return <UserLoader length={3} />;
  if (isError) return <ErrorRender isError={isError} error={error} />;
  if (isSuccess) {
    if (data.length > 0)
      return (
        <Stack spacing={0}>
          {data.map((user) => (
            <Flex
              width="100%"
              key={user._id}
              onClick={() =>
                user._id === currentUser._id
                  ? navigate("/profile")
                  : navigate("/profile/" + user._id)
              }
            >
              <UserItem user={user} />
            </Flex>
          ))}
        </Stack>
      );
    else return <EmptyState />;
  }
};

export default UserSearchResult;
