import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserActivityQuery } from '../slices/activityApiSlice'
import DataTable from 'react-data-table-component';
import moment from 'moment';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Container,
    Flex,
    Heading,
    Link,
    Box
} from '@chakra-ui/react'



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
    const dispatch = useDispatch()

    const { data: userActivities, isLoading, error } = useGetUserActivityQuery({}, {
        pollingInterval: 15000,
        skip: false,
        refetchOnMountOrArgChange: true
    })
    console.log(userActivities)






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


                {/* <Box maxWidth={"100%"} overflowY={"scroll"}>
                    <TableContainer >
                        <Table variant='striped' size='sm'>

                            <Thead>
                                <Tr>
                                    <Th>Date</Th>
                                    <Th>Name</Th>
                                    <Th>Type</Th>
                                    <Th isNumeric>Distance</Th>
                                    <Th>Moving Time</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {userActivities?.map(activity => (
                                    <Tr key={activity._id}>
                                        <Td w="fit-content" className='border p-2'> {moment(activity.start_date).format("YYYY-MM-DD  HH:mm a")} </Td>
                                        <Td className='border p-2'> {activity.name.substring(0, 30)}{activity.name.length >= 20 && '...'} </Td>
                                        <Td className='border p-2'> {activity.type} </Td>
                                        <Td className='border p-2'> {(activity.distance / 1000).toString()} </Td>
                                        <Td className='border p-2'> {moment.duration(activity.moving_time, 'seconds').humanize()} </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box> */}
            </Box>
        </>
    )
}
