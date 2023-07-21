import React, { useEffect, useContext } from "react";
import useApi from '../helper/useApi'
import { useLocation, useNavigate } from 'react-router-dom'

import SuccessContext from "../helper/context_success";
import ErrorContext from "../helper/context_error";

function Verification() {
    const api = useApi()
    const { search } = useLocation();
    const navigates = useNavigate();
    const query = React.useMemo(() => new URLSearchParams(search), [search]);

    const { error_message, seterror_message } = useContext(ErrorContext);
    const { success_message, setsuccess_message } = useContext(SuccessContext);

    const process_verification = async () => {
        try {
            const { data } = await api({ method: 'get', url: 'verification?token=' + query.get('token') })
            setsuccess_message(data.message)
        } catch (error) {
            seterror_message('Link verification expire.')
        }
    }
    useEffect(() => {
        document.title = 'Verification'
        if (process_verification())
            navigates(`/sign-in`)
    }, []);
}

export default Verification