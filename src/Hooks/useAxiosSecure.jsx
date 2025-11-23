import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000"
})
const useAxiosSecure = () => {
    const { user, logOut } = useAuth()
    const Navigate = useNavigate()

    useEffect(() => {
        // request interceptors 
        const requestInterceptor = axiosSecure.interceptors.request.use((config) => {
            // console.log(config)
            const token = user.accessToken
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        // intercept res
        const resIntercepted = axiosSecure.interceptors.response.use((response) => {
            return response;
        },
            (error) => {
                const statusError = error.status
                if (statusError === 401 || statusError === 401) {
                    logOut()
                        .then(() => {
                            Navigate('/login')
                        })
                }
                return Promise.reject(error)
            })
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor)
            axiosSecure.interceptors.response.eject(resIntercepted)
        }
    }, [user, Navigate, logOut])

    return axiosSecure
};

export default useAxiosSecure;