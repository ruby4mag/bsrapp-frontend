
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from "axios"
import { BACKEND_URL } from '../constants'
import { useDispatch } from 'react-redux'
import { logout, setCredentials } from '../slices/userSlice'
import { useLogoutMutation } from '../slices/userApiSlice'
import { useNavigate } from 'react-router-dom'
import "../styles/table.css";

import {
    Flex,
    Input,
    Button,
    useColorModeValue,
    Box,
    Card,
    CardHeader,
    Heading,
    Image,
    Link,
    Text,
    Center,
    useToast,
    Divider,
    SimpleGrid,
    Grid, GridItem,
    Link as ChakraLink
} from "@chakra-ui/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

// Google map



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export const activityYearHistoryOptions = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            display: false
        },
        title: {
            display: true,
            text: 'Yearly stats',
        },
    },
};

export const doughnutoptions = {
    elements: {
        point: {
            radius: 2,
            hoverRadius: 2,
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: true,
            text: 'Total Distances By Acitivity Type',
        },
    },
};

export const ridedistanceoptions = {
    elements: {
        point: {
            radius: 2,
            hoverRadius: 2,
        }
    },
    scales: {
        y: {
            beginAtZero: true,
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: true,
            text: 'Ride Distance (Kms)',
        },
    },
};

export const rundistanceoptions = {
    elements: {
        point: {
            radius: 2,
            hoverRadius: 2,
        }
    },
    scales: {
        y: {
            beginAtZero: true,
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: true,
            text: 'Run Distance (Kms)',
        },
    },
};

export const caloriesoptions = {
    elements: {
        point: {
            radius: 2,
            hoverRadius: 2,
        }
    },
    scales: {
        y: {
            beginAtZero: true,
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            display: false
        },
        title: {
            display: true,
            text: 'Calories',
        },
    },
};

export default function HomeScreen() {




    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ridedistancelabels, setRidedistancelabels] = useState([])
    const [ridedistancechartvalues, setRidedistancechartvalues] = useState([])

    const [rundistancelabels, setRundistancelabels] = useState([])
    const [rundistancechartvalues, setRundistancechartvalues] = useState([])

    const [calorieslabels, setCalorieslabels] = useState([])
    const [calorieschartvalues, setCalorieschartvalues] = useState([])

    const [activitytotalslabels, setActivitytotalslabels] = useState([])
    const [activitytotalschartvalues, setActivitytotalschartvalues] = useState([])

    const [activityDistanceYearlabels, setActivityDistanceYearlabels] = useState([])
    const [activityDistanceYearRidechartvalues, setActivityDistanceYearRidechartvalues] = useState([])
    const [activityDistanceYearRunchartvalues, setActivityDistanceYearRunchartvalues] = useState([])

    const [activityMax, setActivitymax] = useState([])

    const data = {
        labels: activityDistanceYearlabels,
        datasets: [
            {
                label: 'Run',
                data: activityDistanceYearRunchartvalues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Ride',
                data: activityDistanceYearRidechartvalues,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const rundistancedata = {
        labels: rundistancelabels,
        datasets: [
            {
                borderWidth: 1,
                label: 'Run Distance',
                data: rundistancechartvalues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const ridedistancedata = {
        labels: ridedistancelabels,

        datasets: [
            {
                borderWidth: 1,
                label: 'Ride Distance',
                data: ridedistancechartvalues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const caloriesdata = {
        labels: calorieslabels,
        datasets: [
            {
                borderWidth: 1,
                label: 'Calories',
                data: calorieschartvalues,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const doughnutdata = {
        labels: activitytotalslabels,
        datasets: [
            {
                label: "Total Distances Per Activity",
                data: activitytotalschartvalues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(53, 162, 235, 0.5)',
                    'rgba(53, 162, 005, 0.5)',
                    'rgba(153, 162, 005, 0.5)',
                    'rgba(153, 62, 005, 0.5)',
                    'rgba(110, 62, 005, 0.5)',
                    'rgba(110, 12, 105, 0.5)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(53, 162, 235)',
                    'rgb(53, 162, 005)',
                    'rgb(153, 162, 005)',
                    'rgb(153, 62, 005)',
                    'rgb(110, 62, 005)',
                    'rgb(110, 12, 105)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const getUser = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
                withCredentials: true
            })
            dispatch(setCredentials({ name: res.data.name, email: res.data.email, _id: res.data._id, isAdmin: res.data.isAdmin }))
        } catch (err) {
            console.log("Error setting user " + err)
            toast.error(err?.data?.message || err?.error)
            navigate("/login")
        }
    }

    const getActivityRideDistance = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivityRideDistance`, {
                withCredentials: true
            })
            setRidedistancelabels(res.data.labels)
            setRidedistancechartvalues(res.data.values)
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    const getActivityRunDistance = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivityRunDistance`, {
                withCredentials: true
            })
            setRundistancelabels(res.data.labels)
            setRundistancechartvalues(res.data.values)
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    const getActivityCalories = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivitycalories`, {
                withCredentials: true
            })
            setCalorieslabels(res.data.labels)
            setCalorieschartvalues(res.data.values)
        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    const getActivityDistanceYear = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivityDistanceYear`, {
                withCredentials: true
            })
            setActivityDistanceYearlabels(res.data.labels)
            setActivityDistanceYearRidechartvalues(res.data.ridevalues)
            setActivityDistanceYearRunchartvalues(res.data.runvalues)

        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    const getActivityTotals = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivityTotals`, {
                withCredentials: true
            })
            console.log(`Status is ${res.status}`)

            setActivitytotalslabels(res.data.labels)
            setActivitytotalschartvalues(res.data.values)

        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    const getActivitymax = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivitymax`, {
                withCredentials: true
            })
            setActivitymax(res.data)

        } catch (err) {
            toast.error(err?.data?.message || err?.error)
        }
    }

    useEffect(() => {
        getUser()
        getActivityRideDistance()
        getActivityRunDistance()
        getActivityCalories()
        getActivityDistanceYear()
        getActivityTotals()
        getActivitymax()
    }, [])

    return (
        <>
            <Card m="20px" min-width={"fit-content"} p="20px">
                <CardHeader>
                    <Heading size='md'>Overall Statistics</Heading>
                </CardHeader>
                <SimpleGrid columns={[1, 1, 3]} spacing='40px' >
                    <Box borderRadius={"10px"} p="20px" bg='rgb(243, 243, 255)' height='250px'><Bar options={activityYearHistoryOptions} data={data} />
                    </Box>
                    <Box borderRadius={"10px"} p="20px" bg='rgb(243, 243, 255)' height='250px'><Doughnut data={doughnutdata} options={doughnutoptions} />
                    </Box>
                    <Box borderRadius={"10px"} p="20px" bg='rgb(243, 243, 255)' height='250px'>
                        Longest distances
                        <Divider mt="20px" />
                        <table >
                            <tbody>
                                {Object.keys(activityMax).map((key) => {
                                    return (
                                        <tr key={key}>
                                            <th>Longest {key}</th>
                                            <td>{activityMax[key]} kms</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </Box>
                </SimpleGrid>
            </Card>

            <Card m="20px" min-width={"fit-content"} p="20px">
                <CardHeader>
                    <Heading size='md'>Monthly Statistics</Heading>
                </CardHeader>
                <SimpleGrid columns={[1, 1, 3]} spacing='40px' >
                    <Box borderRadius={"10px"} p="20px" bg='rgb(243, 243, 255)' height='250px'><Line options={ridedistanceoptions} data={ridedistancedata} /></Box>
                    <Box borderRadius={"10px"} p="20px" bg='rgb(243, 243, 255)' height='250px'><Line options={rundistanceoptions} data={rundistancedata} /></Box>
                    <Box borderRadius={"10px"} p="20px" bg='rgb(243, 243, 255)' height='250px'><Line options={caloriesoptions} data={caloriesdata} /></Box>
                </SimpleGrid>
            </Card>
            <ToastContainer />
        </>
    )
}
