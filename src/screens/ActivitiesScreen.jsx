import { useGetUserActivityQuery } from '../slices/activityApiSlice'
import DataTable from 'react-data-table-component';
import moment from 'moment';
import {
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
            </Box>
        </>
    )
}
