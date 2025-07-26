/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setAccessToken } from "./features/auth/authSlice";

//proxy handler
const proxyBaseQuery = fetchBaseQuery({
    baseUrl: '/api/proxy',
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    }
});

//re-authorization
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await proxyBaseQuery(args, api, extraOptions);
    
    if (result.error?.status === 401 || result.error?.status === 403) {
        console.log("Auth failed, trying to refresh token...");
        
        // at here if it meets status 401 it will route to app/api/refresh/route.ts
        const refreshRes = await fetch("/api/refresh", {
            method: "GET",
            credentials: "include",
        });
        
        if (refreshRes.ok) {
            const data = await refreshRes.json();
            console.log("Token refreshed successfully");
            // get accessToken then dispatch 
            api.dispatch(setAccessToken(data.accessToken));
      
            result = await proxyBaseQuery(args, api, extraOptions);
        } else {
            console.log("Refresh failed, redirecting to login...");
            // route to login page
            window.location.href = '/api/login';
        }
    } 
    
    return result;
};

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Cars'],
    endpoints: () => ({})
});