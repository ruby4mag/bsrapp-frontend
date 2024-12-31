
import { ToastContainer, toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import axios from "axios"
import { BACKEND_URL } from '../constants'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/userSlice'

import { useNavigate } from 'react-router-dom'
import "../styles/table.css";

import styled from "styled-components";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { CdsModal, CdsModalActions, CdsModalContent, CdsModalHeader } from '@cds/react/modal';
import { CdsButton } from '@cds/react/button'


// ******************************************************
import 'react-querybuilder/dist/query-builder.css';
import { QueryBuilder } from 'react-querybuilder';

const fields = [
    { name: 'name', label: 'Name', type: 'string' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'city', label: 'City', type: 'string' },
];

const initialQuery = {
    "condition": "AND",
    "rules": [
        {
            "id": "d2c7570d-097b-436d-aa2e-926ccbfb0a25",
            "field": "name",
            "operator": "=",
            "valueSource": "value",
            "value": "John Kurain",
            "type": "string"
        }
    ],
    "id": "d89895c0-5153-4192-9907-3dfce7d3b79a"
};
// ******************************************************

import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

var initial = true

const layout = [
    { i: "blue-eyes-dragon", x: 0, y: 0, w: 1, h: 1 },
    { i: "dark-magician", x: 1, y: 0, w: 1, h: 1 },
    { i: "kuriboh", x: 2, y: 0, w: 4, h: 1 },
    { i: "spell-caster", x: 3, y: 0, w: 1, h: 1 },
    { i: "summoned-skull", x: 4, y: 0, w: 1, h: 1 }
];

const layout1 = [
    { i: "blue-eyes-dragon1", x: 0, y: 0, w: 1, h: 1 },
    { i: "dark-magician1", x: 1, y: 0, w: 1, h: 1 },
    { i: "kuriboh1", x: 2, y: 0, w: 4, h: 1 },
    { i: "spell-caster", x: 3, y: 0, w: 1, h: 1 },
    { i: "summoned-skull", x: 4, y: 0, w: 1, h: 1 }
];

const getLayouts = () => {
    const savedLayouts = localStorage.getItem("grid-layout");
    console.log(JSON.parse(savedLayouts))
    initial = false;
    return savedLayouts ? JSON.parse(savedLayouts) : { lg: layout };
};

const getLayouts1 = () => {
    const savedLayouts1 = localStorage.getItem("grid-layout1");
    console.log(JSON.parse(savedLayouts1))

    return savedLayouts1 ? JSON.parse(savedLayouts1) : { lg: layout1 };
};






const GridItemWrapper = styled.div`
  background: #275d778a;
`;

const GridItemContent = styled.div`
  padding: 8px;
`;

const Root = styled.div`
  padding: 16px;
`;

import {

    Box,
    Card,
    CardHeader,
    Heading,
    Divider,
    SimpleGrid,

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
    elements,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { log } from 'jsonlogic/lib/cblib'

// Google map
//dads


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
            position: 'top',
            display: true,
            title: {
                display: true,
                text: 'Yearly stats',
            },
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
            position: 'left',
            display: true
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

    const [query, setQuery] = useState(initialQuery);

    const onQueryChange = (newQuery) => {
        const updatedQuery = {
            ...newQuery,
            rules: newQuery.rules.map(rule => ({ ...rule, type: fields.find(field => field.name === rule.field)?.type }))

        };
        setQuery(updatedQuery);
    };



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
                    'rgb(255, 99, 132)',
                    'rgb(53, 162, 235)',
                    'rgb(53, 162, 005)',
                    'rgb(153, 162, 005)',
                    'rgb(199, 242, 167)',
                    'rgb(0, 180, 216)',
                    'rgb(76, 224, 179)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(53, 162, 235)',
                    'rgb(53, 162, 005)',
                    'rgb(153, 162, 005)',
                    'rgb(199, 242, 167)',
                    'rgb(0, 180, 216)',
                    'rgb(76, 224, 179)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const getUser = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
                withCredentials: true,
                withXSRFToken: true
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

    const [s, setS] = useState(getLayouts())
    const [s1, setS1] = useState(getLayouts1())
    useEffect(() => {
        getUser()
        getActivityRideDistance()
        getActivityRunDistance()
        getActivityCalories()
        getActivityDistanceYear()
        getActivityTotals()
        getActivitymax()
        //setS(getLayouts())
    }, [])





    const handleLayoutChange = (layout, layouts) => {
        localStorage.setItem("grid-layout", JSON.stringify(layouts));
    };

    const handleLayoutChange1 = (layout, layouts1) => {
        localStorage.setItem("grid-layout1", JSON.stringify(layouts1));
    };




    return (
        <>
            <div>

                <ToastContainer />

                <Card m="20px" min-width={"fit-content"} p="20px" bg={"#032d46"} >
                    <CardHeader>
                        <Heading color={"#4a9acb"} size='md'>Overall Statistics</Heading>
                    </CardHeader>
                    <ResponsiveGridLayout
                        layouts={s}
                        className="layout"
                        breakpoints={{ lg: 1200, md: 100 }}
                        cols={{ lg: 6, md: 1 }}
                        rowHeight={300}
                        isResizable={true}
                        draggable={false}
                        resizeHandles={["se"]}
                        onLayoutChange={handleLayoutChange}
                        draggableHandle=".drag-handle"
                    //width={1000}
                    >



                        <GridItemWrapper key="blue-eyes-dragon">
                            <GridItemContent>
                                <div className="drag-handle">Drag</div>
                                <Box borderRadius={"10px"} p="20px" bg='rgb(6, 55, 84)' height='275px'><Bar options={activityYearHistoryOptions} data={data} /></Box>
                            </GridItemContent>
                        </GridItemWrapper>
                        <GridItemWrapper key="dark-magician">
                            <GridItemContent>

                                <Box borderRadius={"10px"} p="20px" bg='rgb(6, 55, 84)' height='275px'><div className="drag-handle">Drag</div><Doughnut data={doughnutdata} options={doughnutoptions} /></Box>
                            </GridItemContent>
                        </GridItemWrapper>

                        <GridItemWrapper key="kuriboh">
                            <GridItemContent>
                                <div className="drag-handle">Drag</div>
                                <Box borderRadius={"10px"} p="20px" bg='rgb(6, 55, 84)' height='275px' color={"white"}>
                                    Longest distances
                                    <Divider mt="20px" />
                                    <table >
                                        <tbody>
                                            {Object.keys(activityMax).map((key) => {
                                                return (
                                                    <tr key={key}>
                                                        <th style={{ color: 'white' }}>{key}</th>
                                                        <td style={{ color: 'white' }}>{activityMax[key]} kms</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </Box>
                            </GridItemContent>
                        </GridItemWrapper>

                    </ResponsiveGridLayout>
                </Card>

                <Card m="20px" min-width={"fit-content"} p="20px" bg={"#032d46"} >
                    <CardHeader>
                        <Heading color={"#4a9acb"} size='md'>Monthly Statistics</Heading>
                    </CardHeader>
                    <ResponsiveGridLayout
                        layouts={s1}
                        className="layout"
                        breakpoints={{ lg: 1200, md: 100 }}
                        cols={{ lg: 6, md: 1 }}
                        rowHeight={300}
                        isResizable={true}
                        resizeHandles={["se"]}
                        onLayoutChange={handleLayoutChange1}
                        width={1000}>



                        <GridItemWrapper key="blue-eyes-dragon1" >
                            <GridItemContent> <Box borderRadius={"10px"} p="20px" bg='rgb(6, 55, 84)' height='275px'><Line options={ridedistanceoptions} data={ridedistancedata} /></Box></GridItemContent>
                        </GridItemWrapper>
                        <GridItemWrapper key="dark-magician1">
                            <GridItemContent> <Box borderRadius={"10px"} p="20px" bg='rgb(6, 55, 84)' height='275px'><Line options={rundistanceoptions} data={rundistancedata} /></Box></GridItemContent>
                        </GridItemWrapper>

                        <GridItemWrapper key="kuriboh1">
                            <GridItemContent><Box borderRadius={"10px"} p="20px" bg='rgb(6, 55, 84)' height='275px'><Line options={caloriesoptions} data={caloriesdata} /></Box></GridItemContent>
                        </GridItemWrapper>

                    </ResponsiveGridLayout>
                </Card>
            </div>

            {/* <QueryBuilder
                fields={fields}
                query={query}
                onQueryChange={onQueryChange}
            />
            <div>
                <h3>Query JSON:</h3>
                <pre>{JSON.stringify(query, null, 2)}</pre>
            </div> */}


            {/* <CdsModal >
                <CdsModalHeader>
                    <h3 cds-text="title">My Modal</h3>
                </CdsModalHeader>
                <CdsModalContent>
                    <div cds-layout="vertical gap:md p-y:xs">
                        <p cds-text="body">Lorem Ipsum</p>
                    </div>
                </CdsModalContent>
                <CdsModalActions>
                    <div cds-layout="horizontal gap:sm align:right">
                        <CdsButton >
                            Cancel
                        </CdsButton>
                        <CdsButton >Ok</CdsButton>
                    </div>
                </CdsModalActions>
            </CdsModal>; */}
        </>
    )
}
