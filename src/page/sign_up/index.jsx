import React, { useEffect, useState } from "react";
import logo2 from '../../assets/img/logo2.png'
import { Link, useNavigate } from 'react-router-dom'
import Leftback from '../../component/left-background'
import axios from "axios"


function Sign_up() {
    const navigate = useNavigate();
    const [first, setfirst] = useState('')
    const [last, setlast] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState([])

    const Register = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(window.env.API_URL + 'register', {
                "first_name": first,
                "last_name": last,
                "phone": phone,
                "email": email,
                "pass": password
            })
            sessionStorage.setItem('success', data.message)
            navigate('/sign-in');
        } catch (error) {
            seterrors(error.response.data)
        }
    }

    useEffect(() => {
        document.title = 'Sign Up';
    }, []);
    return (
        <>
            <div className="grid md:grid-cols-5 grid-rows-1">
                <Leftback />
                <div className="md:col-span-2 flex flex-col mt-14 mx-10">
                    <img className="md:hidden w-2/5" src={logo2} alt="" />
                    <form onSubmit={Register}>
                        <h1 className="text-2xl md:text-4xl font-bold my-2">Sign Up</h1>
                        <p className="text-[#AAAAAA] text-md md:text-lg tracking-wide mb-8">Fill your additional details</p>
                        <p className="text-red-600 tracking-wide mb-3 text-sm">{errors ? errors.message : ""}</p>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">First Name</label>
                            <input type="text" onChange={(e) => setfirst(e.target.value)} className="h-10 md:h-12 w-full border border-[#DEDEDE] rounded-xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your first name" />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">Last Name</label>
                            <input type="text" onChange={(e) => setlast(e.target.value)} className="h-10 md:h-12 w-full border border-[#DEDEDE] rounded-xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your last name" />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">Phone Number</label>
                            <input type="text" onChange={(e) => setphone(e.target.value)} className="h-10 md:h-12 w-full border border-[#DEDEDE] rounded-xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your phone number" />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">Email</label>
                            <input type="text" onChange={(e) => setemail(e.target.value)} className="h-10 md:h-12 w-full border border-[#DEDEDE] rounded-xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your email" />
                        </div>
                        <div className="flex flex-col mb-5">
                            <label className="mb-3 text-sm md:text-md text-[#4E4B66]">Password</label>
                            <div className="relative w-full items-center">
                                <input type="password" onChange={(e) => setpassword(e.target.value)} className="h-10 md:h-12 w-full border border-[#DEDEDE] rounded-xl pl-5 placeholder:text-[#A0A3BD] placeholder:tracking-wider" placeholder="Write your password" />
                                <i className="fa fa-eye absolute top-3 md:top-[1rem] right-3 text-[#A0A3BD]" aria-hidden="true"></i>
                            </div>
                        </div>
                        <button type="submit" className="mt-5 h-10 md:h-12 w-full bg-[#5F2EEA] rounded-xl text-white font-semibold tracking-wider">Sign Up</button>
                        <p className="text-center text-[#8692A6] tracking-wide text-sm md:text-md my-4">
                            Already have account? <Link to="/sign-in" className="text-[#5F2EEA] underline underline-offset-4 font-semibold">Sign-In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Sign_up