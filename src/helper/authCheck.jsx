import React, { useEffect, useContext } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { adddata, logout } from '../store/reducer/user'
import useApi from '../helper/useApi'
import { useNavigate } from 'react-router-dom'

import SuccessContext from './context_success'
import ErrorContext from './context_error'

const withAuth = (isAuth_page, Component, roles) => {
    return (props) => {
        const api = useApi()
        const dispatch = useDispatch()
        const navigates = useNavigate()

        const { isAuth } = useSelector((s) => s.user)

        const { error_message, seterror_message } = useContext(ErrorContext);
        const { success_message, setsuccess_message } = useContext(SuccessContext);

        const logout_user = () => {
            dispatch(logout())
            navigates(`/sign-in`)
        }

        const getDataUser = async () => {
            try {
                const { data } = await api({ method: 'get', url: `user/byid` })
                if (roles.includes(data.data[0].role) === false) {
                    seterror_message('you do not have access to the page in question.')
                    logout_user()
                }
                dispatch(adddata(data.data))
            } catch (error) {
                if (error.response.data.status == 401) {
                    seterror_message(error.response.data.message)
                    logout_user()
                }
                seterror_message(error.response.data.message)
                console.log(error.response.data)
            }
        }

        useEffect(() => {
            if (isAuth_page) {
                if (isAuth) {
                    getDataUser()
                } else {
                    seterror_message('please re-login.')
                    logout_user()
                }
            } else {
                if (isAuth) {
                    getDataUser()
                }
            }
        }, [])

        return <Component {...props} />
    }
}

export default withAuth