
import { redirect, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function StarvaRedirect() {
    const navigate = useNavigate()
    //const { code: code } = useParams()
    //const { id: productId } = useParams()
    const queryParameters = new URLSearchParams(window.location.search)

    axios.get(`https://api.bsrsport.org/strava/redirect`, {
        withCredentials: true,
        params: { code: queryParameters.get("code") }
    })
        .then(async function (response) {

            //const user = await User.findOne({ email })
            console.log(response);
            toast.success("Connected with Strava")

            navigate("/")
        })
        .catch(function (error) {
            console.log(error);
        });
    return (
        <></>
    )
}
