import React, { useEffect, useState } from "react";
import logo2 from '../../assets/img/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import Leftback from '../../component/left-background'
import axios from 'axios'

function Sign_in() {
    const navigate = useNavigate();
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState([])

    const Login = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(window.env.API_URL + 'login', {
                "email": email,
                "pass": password
            })
            localStorage.setItem('Users', JSON.stringify(data.data))
            localStorage.setItem('Token', data.Token)
            localStorage.setItem('Refresh_Token', data.Refresh_Token)
            navigate('/');
        } catch (error) {
            seterrors(error.response.data)
        }
    }
    useEffect(() => {
        document.title = 'Sign In';
    }, []);

    return (
        <>
            <div className="grid md:grid-cols-5 grid-rows-1">
                <Leftback />
                <div className="md:col-span-2 flex flex-col mt-20 mx-10">
                    <img className="md:hidden w-2/5" src={logo2} alt="" />
                    <form onSubmit={Login}>
                        <h1 className="text-2xl md:text-4xl font-bold my-2">Sign In</h1>
                        <p className="text-[#AAAAAA] text-md md:text-lg tracking-wide mb-8">Sign in with your data that you entered during your registration</p>
                        <p className="text-red-600 tracking-wide mb-3 text-sm">{errors ? errors.message : ""}</p>
                        <p className="text-green-600 tracking-wide mb-3 text-sm">{sessionStorage.getItem('success') ? sessionStorage.getItem('success') : ""}</p>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">Email</label>
                            <input type="text" onChange={(e) => setemail(e.target.value)} className="h-12 md:h-14 w-full border border-[#DEDEDE] rounded-2xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your email" />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">Password</label>
                            <div className="relative w-full items-center">
                                <input type="password" onChange={(e) => setpassword(e.target.value)} className="h-12 md:h-14 w-full border border-[#DEDEDE] rounded-2xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your password" />
                                <i className="fa fa-eye absolute top-4 md:top-[1.1rem] right-3 text-[#A0A3BD]" aria-hidden="true"></i>
                            </div>
                        </div>
                        <button type="submit" className="mt-5 h-12 md:h-14 w-full bg-[#5F2EEA] rounded-2xl text-white font-semibold tracking-wider text-white font-semibold tracking-wider" >Sign In</button>
                        <p className="text-center text-[#8692A6] tracking-wide text-sm md:text-md my-4">
                            Forgot your password? <Link to="/#" className="text-[#5F2EEA] underline underline-offset-4 font-semibold">Reset now</Link>
                        </p>
                        <p className="text-center text-[#8692A6] tracking-wide text-sm md:text-md">
                            Don't have an account? <Link to="/sign-up" className="text-[#5F2EEA] underline underline-offset-4 font-semibold">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Sign_in