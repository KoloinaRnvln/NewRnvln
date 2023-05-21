import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Component/Navigation";
import { apiCall, currentUserContext } from "../../Controler/App";
import { iconMd, Scroll } from "../../Styles/Theme";
import UserInterviews from "./Contents/UserInterviews";
import UserArticles from "./Contents/UserArticles";
import AddressModal from "./UpdateProfile/AddressModal";
import JobModal from "./UpdateProfile/JobModal";
import PhilosophyModal from "./UpdateProfile/PhilosophyModal";
import ProfilePicture from "./UpdateProfile/ProfilePicture";
import ProjectModal from "./UpdateProfile/ProjectModal";
import RelationBoard from "./Relation/RelationBoard";
import { IonIcon } from "@ionic/react";
import {
  addCircleOutline,
  apps,
  arrowBack,
  bookmarkOutline,
  briefcase,
  flag,
  location,
  pencil,
  settingsOutline,
  walletOutline,
} from "ionicons/icons";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const navigate = useNavigate();
  const {
    onOpen: openAddressModal,
    isOpen: addressModal,
    onClose: closeAddressModal,
  } = useDisclosure();
  const {
    onOpen: openJobModal,
    isOpen: jobModal,
    onClose: closeJobModal,
  } = useDisclosure();
  const {
    onOpen: openProjectModal,
    isOpen: projectModal,
    onClose: closeProjectModal,
  } = useDisclosure();
  const {
    onOpen: openPhilosophyModal,
    isOpen: philosophyModal,
    onClose: closePhilosophyModal,
  } = useDisclosure();

  useEffect(() => {
    const fetchUser = async () => {
      await apiCall.get("user/" + currentUser._id).then(
        (res) => setCurrentUser(res.data),
        () => {
          navigate(-1);
        }
      );
    };
    fetchUser();
  }, []);

  return (
    <>
      {currentUser ? (
        <Stack
          position="relative"
          height="100%"
          spacing={0}
          maxWidth="100%"
          minH={450}
        >
          <Flex
            justify="space-between"
            borderBottom="1px solid"
            borderBottomColor="whiteAlpha.500"
          >
            <Button size={"lg"} fontSize="2xl" onClick={() => navigate(-1)}>
              <IonIcon icon={arrowBack} />
            </Button>
            <Button size="lg">Profil</Button>
            <Button
              size={"lg"}
              fontSize="2xl"
              onClick={() => navigate("/parameters")}
            >
              <IonIcon icon={settingsOutline} />
            </Button>
          </Flex>
          <Scroll paddingX={2} spacing={5} height="100%">
            {/* A B O U T  */}
            <HStack align="center" spacing={2}>
              <ProfilePicture />
              <Box>
                <Text
                  maxWidth="calc(100vw - 100px)"
                  fontWeight="bold"
                  fontSize="2xl"
                  noOfLines={1}
                >
                  {currentUser.name}
                </Text>
                <Stack spacing={2} marginLeft={3} fontSize="sm">
                  {/* JOB  */}
                  <HStack align="flex-start">
                    <Flex boxSize={5} minW={5} fontSize={'xl'}><IonIcon icon={briefcase}/></Flex>
                    {currentUser.job === "" ? (
                      <Button
                        size="sm"
                        variant="link"
                        onClick={openJobModal}
                        justifyContent="flex-start"
                      >
                        Ajouter votre profession
                      </Button>
                    ) : (
                      <Text onClick={openJobModal}>
                        {currentUser.job} 
                        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, dicta. */}
                        <IonIcon icon={pencil} />
                      </Text>
                    )}
                    <JobModal
                      isOpen={jobModal}
                      onOpen={openJobModal}
                      onClose={closeJobModal}
                    />
                  </HStack>

                  {/* ADDRESS  */}
                  <HStack align="flex-start">
                  <Flex boxSize={5} minW={5} fontSize={'xl'}><IonIcon icon={location}/></Flex>
                    {currentUser.address === "" ? (
                      <Button
                        size="sm"
                        variant="link"
                        onClick={openAddressModal}
                        justifyContent="flex-start"
                      >
                        Ajouter votre lieu de travail
                      </Button>
                    ) : (
                      <Text onClick={openAddressModal}>
                        {currentUser.address} <IonIcon icon={pencil} />
                      </Text>
                    )}
                    <AddressModal
                      isOpen={addressModal}
                      onOpen={openAddressModal}
                      onClose={closeAddressModal}
                    />
                  </HStack>

                  {/* PROJECT  */}
                  <HStack align="flex-start">
                  <Flex boxSize={5} minW={5} fontSize={'xl'}><IonIcon icon={flag}/></Flex>
                    {currentUser.project === "" ? (
                      <Button
                        size="sm"
                        variant="link"
                        onClick={openProjectModal}
                        justifyContent="flex-start"
                      >
                        Ajouter votre projet
                      </Button>
                    ) : (
                      <Text onClick={openProjectModal}>
                        {currentUser.project} <IonIcon icon={pencil} />
                      </Text>
                    )}
                    <ProjectModal
                      isOpen={projectModal}
                      onOpen={openProjectModal}
                      onClose={closeProjectModal}
                    />
                  </HStack>
                </Stack>
              </Box>
            </HStack>

            {/* P H I L O  */}
            {currentUser.philosophy ? (
              <Text
                fontSize="sm"
                textAlign="center"
                fontStyle="italic"
                onClick={openPhilosophyModal}
              >
                <span className="bi-quote"></span>
                {currentUser.philosophy}
                <span className="bi-quote"></span>
              </Text>
            ) : (
              <Button
                onClick={openPhilosophyModal}
                leftIcon={<IonIcon icon={addCircleOutline} style={{fontSize:iconMd}}/>}
                minHeight={10}
              >
                Ajouter votre philosophie de l'argent
              </Button>
            )}
            <PhilosophyModal
              isOpen={philosophyModal}
              onOpen={openPhilosophyModal}
              onClose={closePhilosophyModal}
            />

            {/* R E L A T I O N  */}
            <RelationBoard user={currentUser} />

            {/* P O S T S  T A B  */}
            <Tabs size="sm" isFitted height="100%" isLazy={true}>
              <TabList>
                <Tab width="25%">
                  <Stack spacing={0}>
                    <FontAwesomeIcon size="xl" icon={faComments} />
                    <Text fontSize="xs">Interviews</Text>
                  </Stack>
                </Tab>
                <Tab width="25%">
                  <Stack spacing={0}>
                    <Text fontSize="xl">
                      <IonIcon icon={apps} />
                    </Text>
                    <Text fontSize="xs">Publications</Text>
                  </Stack>
                </Tab>
                <Tab width="25%" overflowX="hidden">
                  <Stack spacing={0}>
                    <Text fontSize="xl">
                      <IonIcon icon={bookmarkOutline} />
                    </Text>
                    <Text fontSize="xs">Enregistrements</Text>
                  </Stack>
                </Tab>
                <Tab width="25%">
                  <Stack spacing={0}>
                    <Text fontSize="xl">
                      <IonIcon icon={walletOutline} />
                    </Text>
                    <Text fontSize="xs">Portefeuille</Text>
                  </Stack>
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel paddingY={1} paddingX={0}>
                  <UserInterviews user={currentUser._id} />
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <UserArticles user={currentUser._id} />
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <Flex wrap="wrap" justify="center">
                    EMPTY STATE
                  </Flex>
                </TabPanel>
                <TabPanel paddingY={1} paddingX={0}>
                  <Flex justify="flex-end">
                    <Button variant="outline">Transfert</Button>
                  </Flex>
                  <Flex align="center" justify="center" height="100px">
                    <Text fontWeight="bold" fontSize="3xl" textAlign="center">
                      {currentUser.wallet} kAr
                    </Text>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Scroll>

          <Navigation />
        </Stack>
      ) : (
        <Stack height="100%" maxWidth="100%" justify="center" paddingX={3}>
          <Image
            paddingX={3}
            paddingY={2}
            src="https://firebasestorage.googleapis.com/v0/b/rnvln-611b7.appspot.com/o/tantsaha.jpg?alt=media&token=75326712-8b3e-4d4e-af41-5ca288ee5591"
            alt="illustration"
          />
          <Button variant="cta">Se connecter</Button>
          <Button onClick={() => navigate(-1)}>Retour</Button>
        </Stack>
      )}
    </>
  );
};

export default Profile;
