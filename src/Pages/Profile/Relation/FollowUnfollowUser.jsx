import { Button } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { apiCall, currentUserContext } from "../../../Controler/App";
import { userContext } from "../UserProfile";

const FollowUnfollowUser = () => {
  const { currentUser,setCurrentUser } = useContext(currentUserContext);
  const {user,setUser}=useContext(userContext);
  const [followed, setFollowed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFollow = async () => {
    setSubmitting(true);
    await apiCall
      .patch(
         "user/friend_invitation/",
        { to:user._id, from: currentUser._id }
        //  "user/follow/" + currentUser._id,
        // { id_user:user._id, follow: !followed }
      )
      .then(
        (res) => {
          console.log(res.data)
            // if (followed){ 
            //     setCurrentUser({...currentUser,followings:currentUser.followings.filter(elt=>elt!==user._id)});
            //     setUser({...user,followers:user.followers.filter(elt=>elt!==currentUser._id)})
            // }
            // else {
            //     setCurrentUser({...currentUser,followings:[...currentUser.followings,user._id]})
            //     setUser({...user,followers:[...user.followers,currentUser._id]})
            // }
            setSubmitting(false)
        },
        (err) => {console.log(err);setSubmitting(false)}
      );
  };

  useEffect(() => {
    if (currentUser.followings.includes(user._id)) setFollowed(true);
    else setFollowed(false);
  }, [currentUser,user]);
  
  return (
    <Button isLoading={submitting}
      width="100%"
      variant="outline"
      rounded="full"
      onClick={()=>currentUser._id===user._id ? null : handleFollow()}
    >
      {followed ? "Suivi" : "Suivre"}
    </Button>
  );
};

export default FollowUnfollowUser;
