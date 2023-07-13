import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { adddata, logout } from '../store/reducer/user'
import useApi from '../helper/useApi'
import { useNavigate } from 'react-router-dom'

const withAuth = (isAuth_page, Component, roles) => {
    return (props) => {
        const api = useApi()
        const dispatch = useDispatch()
        const navigates = useNavigate()

        const { isAuth } = useSelector((s) => s.user)

        const logout_user = () => {
            dispatch(logout())
            sessionStorage.clear()
            navigates(`/sign-in`)
        }

        const getDataUser = async () => {
            try {
                const { data } = await api({ method: 'get', url: `user/byid` })
                if (roles.includes(data.data[0].role) === false) {
                    logout_user()
                }
                dispatch(adddata(data.data))
            } catch (error) {
                if (error.response.data.status == 401) {
                    logout_user()
                }
                console.log(error.response.data)
            }
        }

        useEffect(() => {
            if (isAuth_page) {
                if (isAuth) {
                    getDataUser()
                } else {
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