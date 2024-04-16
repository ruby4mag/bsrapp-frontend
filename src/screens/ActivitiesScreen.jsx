import { useGetUserActivityQuery } from '../slices/activityApiSlice'
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { useDisclosure } from '@chakra-ui/react'
import {
    Heading,
    Link,
    Box,
    Button,
    Modal,
    ModalBody,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalFooter
} from '@chakra-ui/react'
import { useRef } from 'react';

const columns = [
    {
        name: 'Date',
        selector: row => row.start_date,
        cell: (row, i, c, id) => {
            const custom_date = moment(row.start_date).format("YYYY-MM-DD  HH:mm a");
            return <span>{custom_date}</span>
        },
        width: "180px"
    },
    {
        name: 'Title',
        selector: row => row.name,
        width: "300px"
    },

    {
        name: 'Type',
        selector: row => row.type,
        width: "80px"
    },
    {
        name: 'Distance(Km)',
        selector: row => row.distance,
        cell: (row, i, c, id) => {
            return <span>{parseFloat((row.distance / 1000).toString()).toFixed(2)}</span>
        },
        width: "100 px"
    },
    {
        name: 'View In Strava',
        selector: row => row.act_id,
        cell: (row, i, c, id) => {
            return <span><Link p="5px" borderRadius={"2px"} color="white" bg={'#f6411e'} href={"https://www.strava.com/activities/" + row.act_id} isExternal>
                <span >View In Strava</span>
            </Link></span>
        },
        width: "140px"
    },
];

export default function ActivitiesScreen() {


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


    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)
    const { data: userActivities, isLoading, error } = useGetUserActivityQuery({}, {
        pollingInterval: 15000,
        skip: false,
        refetchOnMountOrArgChange: true
    })
    console.log(userActivities)

    const Content = async () => {

        try {
            const res = await axios.get(`${BACKEND_URL}/api/activities/getActivitycalories`, {
                withCredentials: true
            })
            return (
                <Box>
                    {console.log("modal-lazy-render")}
                    <Box>{res.data.values}</Box>
                </Box>
            );

        } catch (err) {
            toast.error(err?.data?.message || err?.error)
            return (
                <Box>
                    {console.log("modal-lazy-render")}
                    <Box>Error</Box>
                </Box>
            );
        }
        console.log("modal-lazy-inner");

    };

    return (
        <>
            <Box m="30px">

                <Heading my={"20px"}>Activities</Heading>

                <DataTable
                    columns={columns}
                    data={userActivities}
                    pagination
                    highlightOnHover
                />
            </Box>

            <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
                Some other content that'll receive focus on close.
            </Box>

            <Button mt={4} onClick={onOpen}>
                Open Modal
            </Button>
            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Content />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
