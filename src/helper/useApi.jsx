import axios from 'axios'
import { useState } from "react";

function useApi() {
    const token = localStorage.getItem("Token") ? localStorage.getItem("Token") : ''
    const [request, setrequest] = useState({
        baseURL: process.env.REACT_APP_API_URL || '',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return axios.create(request)

}

export default useApi