import React, { useEffect } from "react";
import useApi from '../helper/useApi'
import { useLocation, useNavigate } from 'react-router-dom'

function Verification() {
    const api = useApi()
    const { search } = useLocation();
    const navigates = useNavigate();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    const process_verification = async () => {
        try {
            const { data } = await api({ method: 'get', url: 'verification?token=' + query.get('token') })
            sessionStorage.setItem('success', data.message)
        } catch (error) {
            sessionStorage.setItem('errors', 'Link verification expire.')
        }
    }
    useEffect(() => {
        document.title = 'Verification'
        if (process_verification())
            navigates(`/sign-in`)
    }, []);
}

export default Verification