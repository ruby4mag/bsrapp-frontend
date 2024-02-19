import React, { useEffect, useState } from 'react'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { useLoginMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/userSlice'

import { useForgotPasswordMutation } from "../slices/userApiSlice"
import { BACKEND_URL } from '../constants'
import logo from "../assets/bsr.jpg";
import loginimage from "../assets/login.jpg";
import { ToastContainer, toast } from 'react-toastify';


import {
    Flex,
    Input,
    Button,
    useColorModeValue,
    Box,
    Center,
    Divider,
    Link as ChakraLink
} from "@chakra-ui/react";

export default function LoginScreen() {
    useEffect(() => {
        document.getElementById("initialloading").style.display = "none"
    }, [])



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { userInfo } = useSelector(state => state.user)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const [login, { isLoading }] = useLoginMutation()
    const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation()
    const handleLogin = async e => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            console.log("From login screen " + JSON.stringify({ ...res }))
            dispatch(setCredentials({ ...res }))
            toast.success("Login Successful", { position: "top-center" })
            navigate("/")
        } catch (err) {
            toast.error('Login Failed')
        }
    }

    const handleForgotPassword = async () => {
        if (!email) alert("Please enter your email")
        else {
            try {
                const res = await forgotPassword({ email }).unwrap()
                toast.success(res.message)
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    const handleGoogleAuth = () => {
        try {
            window.location.href = `${BACKEND_URL}/auth/google/callback`
        } catch (err) {
            toast.error(err?.data?.message || err.error)

        }
    }

    return (
        <>
            <Box display="grid" minHeight="100vh">
                <Box id="main" bgImage={loginimage} bgSize="cover" bgPosition="center">
                    <Flex h="100vh" alignItems="center" justifyContent="center" >
                        <form >
                            <Flex
                                flexDirection="column"
                                bg={"rgba(1, 42, 204, 0.31)"}
                                p={12}
                                borderRadius={8}
                                boxShadow="lg"
                            >
                                <Box mb={6}>
                                    <Center>
                                        <img src={logo} alt="Logo" />
                                    </Center>
                                </Box>
                                <Input

                                    placeholder="email"
                                    type="email"
                                    variant="filled"
                                    required={true}
                                    mb={3}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Input

                                    placeholder="**********"
                                    type="password"
                                    variant="filled"
                                    required={true}
                                    mb={6}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    mb={8}
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                >
                                    Log In
                                </Button>

                                <Button
                                    type="button"
                                    colorScheme="blue"
                                    mb={8}
                                    disabled={isLoading}

                                >
                                    <ChakraLink as={ReactRouterLink} to='/register'>
                                        Register
                                    </ChakraLink>
                                </Button>
                                <Divider />
                                <Button mt={"10px"} onClick={handleGoogleAuth}>Sign In with Google</Button>
                            </Flex>
                        </form>
                    </Flex>

                </Box>
            </Box>
            <ToastContainer />


        </>
    )
}
