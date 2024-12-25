import axios from 'axios'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from './useAuth'

const axiosSecure = axios.create({
  baseURL: "https://assignment-test-11-server.vercel.app",
  withCredentials: true,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOutUser } = useAuth()
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res, // Pass success responses as is
      async (error) => {
        console.log(
          'Error caught by axios interceptor -->',
          error.response
        );
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Log out the user and navigate to login
          await logOutUser();
          navigate('/login');
        }
        return Promise.reject(error); // Ensure the error propagates
      }
    );
  }, [logOutUser, navigate])
  return axiosSecure
}

export default useAxiosSecure
