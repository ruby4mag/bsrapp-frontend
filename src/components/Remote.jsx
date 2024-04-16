import React, { useState, useEffect } from 'react'

import  axios  from 'axios';

export default function Remote(activity) {

    const [content, setContent] = useState("Initial")

    useEffect(() => {
        axios.get(`https://doapi.bsrsport.org/api/rules`, {
            withCredentials: true
        })
            .then(async function (response) {
                console.log(response.data)
                setContent(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])


    return (
        <>
            {content}
        </>
    )
}