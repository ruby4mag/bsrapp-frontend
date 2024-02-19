import React, { useEffect, useState } from 'react'
import { Link as ReactRouterLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../slices/userSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../slices/userApiSlice'


import Spinner from '../components/Spinner'
import { useForgotPasswordMutation } from "../slices/userApiSlice"
import { BACKEND_URL } from '../constants'
import logo from "../assets/bsr.jpg";
import loginimage from "../assets/login.jpg";


import {
    Flex,
    Input,
    Button,
    useColorModeValue,
    Box,
    Center,
    useToast,
    Divider,
    Link as ChakraLink
} from "@chakra-ui/react";

export default function LoginScreen() {
    useEffect(() => {
        document.getElementById("initialloading").style.display = "none"
    }, [])



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const { userInfo } = useSelector(state => state.user)
    const [register, { isLoading }] = useRegisterMutation()

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    const handleRegister = async e => {
        e.preventDefault()
        if (password !== confirmpassword) {
            alert("Passwords do not match")
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate("/")
                toast.success("Register Successful")
            } catch (error) {
                console.log("error")
                toast.error(error?.data?.message || error?.error)
            }
        }
    }

    const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation()
    const handleLogin = async e => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate("/")
            toast.success("Login Successful", { position: "top-center" })
        } catch (error) {
            toast.error(error?.data?.message || error?.error)
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
                                    placeholder="Name"
                                    type="text"
                                    variant="filled"
                                    required={true}
                                    mb={3}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
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
                                <Input

                                    placeholder="**********"
                                    type="password"
                                    variant="filled"
                                    required={true}
                                    mb={6}
                                    onChange={e => setConfirmpassword(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    mb={8}
                                    onClick={handleRegister}
                                    disabled={isLoading}
                                >
                                    Register
                                </Button>


                                <Divider />
                                <Button mt={"10px"} onClick={handleGoogleAuth}>Sign Up with Google</Button>
                            </Flex>
                        </form>
                    </Flex>

                </Box>
            </Box>


        </>
    )
}
