/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from '@/redux/baseApi'

export const customerApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        // get cars by using get method
        getCustomers: builder.query({
            query: () => `customers`
        }),
            getCustomerByPhonenumber: builder.query<any, {phoneNumber: string}>({
            query: ({phoneNumber}) => `customers/${phoneNumber}`
        })
    })
})

export const {
    useGetCustomersQuery,
    useGetCustomerByPhonenumberQuery
} = customerApi;