import { apiSlice } from "./apiSlice"
import { ACTIVITIES_URL } from "../constants"

export const activitiesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserActivity: builder.query({
            query: () => ({
                url: ACTIVITIES_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getActivityDetails: builder.query({
            query: activityId => ({
                url: `${ACTIVITIES_URL}/${activityId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
})

export const {
    useGetUserActivityQuery,
    useGetActivityDetailsQuery
} = activitiesApiSlice
