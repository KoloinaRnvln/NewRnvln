import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../../Controler/App";
import { ClickableFlex } from "../../../Styles/Theme";

const RelationList = ({ category, userId,length }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const list = useRef([1, 2, 3]);

  const fetchList = async () => {
    await apiCall
      .get(
        
          "user/" +
          (category === "Abonnés"
            ? "subscribers"
            : category === "Partenaires"
            ? "friends"
            : category === "Demandes"
            ? "requests"
            : "subscriptions") + "/" + userId
      )
      .then(
        (res) => {
          list.current = res.data;
          setLoading(false);
        },
        (err) => {
          console.log(err)
          onClose();
        }
      );
  };

  useEffect(() => {
    if (isOpen) fetchList();
  }, [isOpen]);

  return (
    <>
      <Button
        flexDir="column"
        onClick={() =>
          length > 0 ? onOpen() : null
        }
      >
        <Heading size="md">{length}</Heading>
        <Text fontSize="xs">{category}</Text>
      </Button>

      <Drawer
        onOpen={onOpen}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent maxH="75vh">
          <DrawerCloseButton />
          <DrawerHeader textAlign="center" fontSize="md" fontWeight="bold">
            {category}
          </DrawerHeader>
          <DrawerBody paddingX={0}>
            <Stack>
              {list.current.map((elt, key) => (
                <Box key={key}>
                  {loading ? (
                    <HStack key={key}>
                      <SkeletonCircle boxSize={10} />
                      <Skeleton height={5} width={200} />
                    </HStack>
                  ) : (
                    <ClickableFlex key={key} justify="space-between">
                      <Flex>
                        {elt.picture ? (
                          <Image
                            src={elt.picture}
                            alt="profilepic"
                            boxSize={12}
                            rounded="full"
                            objectFit="cover"
                          />
                        ) : (
                          <Avatar size="md" />
                        )}
                        <Stack spacing={0} marginLeft={2} justify="center">
                          <Heading size="sm">{elt.name}</Heading>
                          {elt.job && <Text fontStyle="italic">{elt.job}</Text>}
                        </Stack>
                      </Flex>
                      {category==='Demandes' && <Button variant='primary'>Confirmer</Button>}
                {category==='Partenaires' && <Button variant='outline'>Retirer</Button>}
                {/* {category==='Abonnés' && <Button variant='cta' onClick={onOpenSubscription}>S'abonner</Button>}
                {category==='Abonnements' && <Button variant='outline'>Abonné</Button>} */}
      {/* <SubscribeDrawer isOpen={isOpenSubscription} onClose={onCloseSubscription} onOpen={onOpenSubscription}/> */}
                    </ClickableFlex>
                  )}
                </Box>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default RelationList;
