import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from "react-toastify"
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/userSlice'
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import axios from "axios"
import { BACKEND_URL } from '../constants'
import {
    Flex, Spacer, HStack, Button, Text, Menu, MenuButton, MenuList, MenuItem, Box, Heading, ButtonGroup, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Input, Icon, Divider, VStack, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
} from '@chakra-ui/react'
import bsrlogo from "../assets/bsrlogonew.png";
import strava from '../assets/btn_strava_connectwith_orange.png'
const redirectUrl = "https://www.bsrsport.org/strava/redirect";
const scope = "read,activity:read,activity:write"

const handleLogin = () => { window.location = `http://www.strava.com/oauth/authorize?client_id=120373&response_type=code&redirect_uri=${redirectUrl}&approval_prompt=force&scope=${scope}`; };
ChevronDownIcon

const Navbar = () => {
    const gohome = () => { navigate("/") }
    const gotoAdmin = () => { navigate("/admin") }
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()
    const { isOpen: isSyncOpen, onOpen: onSyncOpen, onClose: onSyncClose } = useDisclosure()
    const cancelRef = React.useRef()
    const btnRef = React.useRef()
    const syncbtnRef = React.useRef()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logoutApi] = useLogoutMutation()
    const { userInfo } = useSelector(state => state.user)
    const handleLogout = async () => {
        try {
            await logoutApi().unwrap()
            dispatch(logout())
            toast.info("logged Out Successfully")
            navigate("/login")
        } catch (err) {
            toast.error(err?.data?.message || error?.error)
        }
    }

    const syncStrava = () => {
        console.log("Starting sync")
        try {
            const res = axios.get(`${BACKEND_URL}/api/activities/getPastActivities`, {
                withCredentials: true
            })
            toast.info("Initiated Sync")
            onSyncClose()
        } catch (err) {
            console.log("Error" + err)

            toast.error(err?.data?.message || err?.error)
        }
    }

    return (
        <>
            <Flex w="100%"
                as="nav"
                alignItems="center"
            >
                <Spacer spacing="in-between" />
            </Flex>
            <Flex minWidth='max-content' alignItems='center' gap='2' justify={"center"} bg={"#03314d"} h={"60px"}>
                <Box pl='10px'>
                    BSR Sport
                </Box>
                <Spacer />
                <Box display={{ base: "none", md: "flex" }} >
                    <HStack spacing='10px' mr={"10px"}>

                        {userInfo?.name}

                        <Button bg="transparent" width={"fit-content"} _hover={{ bg: "transparent" }}>
                            <img src={strava} alt="strava_connect" height="15" width="180" onClick={handleLogin} />
                        </Button>
                        <Link to="/activities"><Button w="100px" mt={"0px"} bg={"transparent)"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"35px"}> Activities</Button></Link>
                        <Link to="/maps"><Button w="100px" mt={"0px"} bg={"transparent"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"35px"}> Map View</Button></Link>
                        {(userInfo?.isAdmin == true) ? <Link to="/admin"><Button w="100px" mt={"0px"} bg={"rgb(120, 85, 247)"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"35px"}> Admin</Button></Link> : ''}
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="fit-content" mt={"0px"} bg={"transparent"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"35px"}>
                                {userInfo?.name}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onSyncOpen}> Sync Strava</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                        <Spacer />
                    </HStack>
                </Box>
                <Icon boxSize={8} color="white" as={HamburgerIcon} ref={btnRef} onClick={onOpen} display={{ base: "flex", md: "none" }} mx={"20px"} />

            </Flex>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Divider mt={"80px"}></Divider>
                        <VStack spacing='10px' mr={"10px"} mt="20px">
                            <Button bg="transparent" width={"fit-content"} _hover={{ bg: "transparent" }}>
                                {userInfo?.name}
                            </Button>
                            <Button bg="transparent" width={"fit-content"} _hover={{ bg: "transparent" }}>
                                <img src={strava} alt="strava_connect" height="15" width="180" onClick={handleLogin} />
                            </Button>
                            <Link to="/activities"><Button w="175px" mt={"20px"} bg={"rgb(120, 85, 247)"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"37px"}> Activities</Button></Link>
                            <Link to="/maps"><Button w="175px" mt={"20px"} bg={"rgb(120, 85, 247)"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"37px"}> Map</Button></Link>
                            {(userInfo?.isAdmin == true) ? <Link to="/admin"><Button w="175px" mt={"20px"} bg={"rgb(120, 85, 247)"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"35px"}> Admin</Button></Link> : ''}
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="fit-content" mt={"20px"} bg={"rgb(120, 85, 247)"} color={"white"} _hover={{ bg: "tomato" }} px={4} borderRadius={"0px"} py={0} h={"35px"}>
                                    {userInfo?.name}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem ref={syncbtnRef} onClick={onSyncOpen}> Sync Strava</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                            <Spacer />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <AlertDialog
                m="40px"
                isOpen={isSyncOpen}
                leastDestructiveRef={cancelRef}
                onClose={onSyncClose}
            >
                <AlertDialogOverlay m="40px">

                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Sync Past Strava Activities
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? This is generally done once.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onSyncClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={syncStrava} ml={3}>
                                Sync
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <ToastContainer />
        </>
    )
}

export default Navbar
