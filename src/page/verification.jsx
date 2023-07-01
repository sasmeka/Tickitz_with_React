import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

function Verification() {
    const { search } = useLocation();
    const navigates = useNavigate();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    const process_verification = async () => {
        try {
            const { data } = await axios.get(window.env.API_URL + 'verification?token=' + query.get('token'))
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