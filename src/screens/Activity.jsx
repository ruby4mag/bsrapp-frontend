import { Link, useParams } from 'react-router-dom'
import { useGetActivityDetailsQuery } from '../slices/productsApiSlice'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function ActivityScreen() {
    const { id: activityId } = useParams()


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data: activity, isLoading, error } = useGetActivityDetailsQuery(activityId)

    return (
        <div className="container mx-auto mt-8 p-4">
            <Link to={'/'}>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md mb-4">Go Back</button>
            </Link>
            {isLoading ? (<Spinner />) : error ? toast.error(error?.data?.message || error?.error) : (
                [activity.name]
            )}

        </div>
    )
}
