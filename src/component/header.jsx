import React, { useState, useEffect } from "react";
import logo_2 from '../assets/img/logo2.png'
import profile from '../assets/img/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/reducer/user'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Header({ btnlogout_trigger, modal_logout_profile }) {
    const navigates = useNavigate();
    const dispatch = useDispatch()
    const { isAuth, data } = useSelector((s) => s.user)

    const [icon_search, seticon_search] = useState(true)
    const [header_search, setheader_search] = useState(true)
    const [menu_desktop, setmenu_desktop] = useState(true)
    const [menu_mobile, setmenu_mobile] = useState(true)
    const [modal_logout, setmodal_logout] = useState(true)

    const btnlogout = () => {
        dispatch(logout())
        sessionStorage.clear()
        localStorage.removeItem('Users')
        navigates(`/sign-in`)
    }

    function capital(str) {
        return (str.replace(/\w\S*/g, function (kata) {
            const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
            return kataBaru
        }))
    }

    const show_header_search = () => {
        seticon_search(false)
        setheader_search(false)
    }

    const click_menu_desktop = () => {
        seticon_search(true)
        setheader_search(true)
        setmenu_desktop(menu_desktop ? false : true)
    }
    const click_menu_mobile = () => {
        seticon_search(true)
        setheader_search(true)
        setmenu_mobile(menu_mobile ? false : true)
    }
    const show_modal_logout = () => {
        seticon_search(true)
        setheader_search(true)
        setmenu_mobile(menu_mobile ? false : true)
        setmenu_desktop(menu_desktop ? false : true)
        setmodal_logout(false)
    }
    const hidden_modal_logout = () => {
        seticon_search(true)
        setheader_search(true)
        setmodal_logout(true)
        modal_logout_profile(false)
    }

    useEffect(() => {
        if (btnlogout_trigger) {
            seticon_search(true)
            setheader_search(true)
            setmenu_mobile(true)
            setmenu_desktop(true)
            setmodal_logout(false)
            console.log(modal_logout)
        }
    }, [btnlogout_trigger])

    return (
        <header className="sticky top-0 px-5 md:px-20 relative flex justify-between py-4 bg-white z-10 md:shadow-sm">
            <nav className="flex items-center">
                <img className="h-8 md:h-10 lg:h-14 pe-10" src={logo_2} alt="" />
                {
                    isAuth ? (
                        data[0] && data[0].role == 'admin' ? (
                            <>
                                <Link className="hidden lg:block text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/">Dashboard</Link>
                                <Link className="hidden lg:block pl-7 text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/manage_movie">Manage Movie</Link>
                                <Link className="hidden lg:block pl-7 text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/manage_schedule">Manage Schedule</Link>
                            </>
                        ) : (
                            <>
                                <Link className="hidden lg:block text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/">Home</Link>
                                <Link className="hidden lg:block pl-7 text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/list_movie">List
                                    Movie</Link>
                            </>
                        )

                    ) : (
                        <>
                            <Link className="hidden lg:block text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/">Home</Link>
                            <Link className="hidden lg:block pl-7 text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/list_movie">List
                                Movie</Link>
                        </>
                    )

                }
            </nav>
            <div className={data[0] ? "hidden" : "block"}>
                <button onClick={() => { navigates(`/sign-in`) }} className="mt-2 h-6 w-16 md:h-8 md:w-20 bg-[#5F2EEA] rounded-md text-[10px] md:text-[12px] tracking-wide text-white">Sign Up</button>
            </div>
            <div className={data[0] ? "flex items-center" : "hidden"}>
                <Link to="/#" onClick={show_header_search} className={icon_search ? 'hidden lg:block pe-8' : 'hidden'}>
                    <i className="fa fa-search text-[#414141]" aria-hidden="true" />
                </Link>
                <div className={header_search ? 'hidden' : 'hidden lg:relative pe-8 lg:flex lg:items-center'}>
                    <i className="fa fa-search text-[#6E7192] absolute left-2" aria-hidden="true" />
                    <input type="text" className="h-7 w-50 rounded-xl border pl-7" placeholder="Search . . ." />
                </div>
                <Link className='hidden lg:block' onClick={click_menu_desktop}>
                    <img className="h-10 rounded-full" src={profile} alt="" />
                </Link>
                <Link className="block lg:hidden" onClick={click_menu_mobile}><i className="fa fa-bars" style={{ maxWidth: '200px' }} aria-hidden="true" /></Link>
            </div>
            <div className={menu_desktop ? "hidden" : "hidden lg:grid absolute bg-white rounded shadow-md right-24 top-[4.5rem]"}>
                <p className="px-3 py-2 tracking-wide font-normal border-b">{data[0] ? capital(data[0].first_name + ' ' + data[0].last_name) : 'Guest'}</p>
                <Link className="px-3 tracking-wide font-normal hover:font-bold" to="/profile">Profile</Link>
                <p><Link className="px-3 tracking-wide font-normal hover:font-bold" onClick={show_modal_logout}>Logout</Link>
                </p>
            </div>
            <div className={modal_logout ? "hidden" : "block absolute h-screen w-full top-0 left-0 bg-black bg-opacity-50 text-center grid items-center justify-around"}>
                <div className="bg-white p-5 rounded-lg">
                    <div className="flex pb-2 border-b justify-between items-center">
                        <h1 className="tracking-wider font-bold">Logout</h1>
                        <Link onClick={hidden_modal_logout}><i className="fa fa-times" aria-hidden="true" /></Link>
                    </div>
                    <div className="py-5">
                        <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="flex pt-2 border-t justify-between items-center">
                        <button onClick={btnlogout} className="bg-[#dc2626] h-8 w-20 rounded-lg text-white font-bold text-sm">Log
                            Out</button>
                    </div>
                </div>
            </div>
            <div className={menu_mobile ? "hidden" : "block lg:hidden absolute h-screen w-full left-0 bg-black bg-opacity-50 mt-[2.8rem] md:mt-[3.5rem] text-center"} >
                <div className="flex bg-white justify-around pb-4">
                    <div className="relative w-4/5">
                        <i className="fa fa-search absolute top-3 left-4 text-[#6E7191]" aria-hidden="true" />
                        <input type="text" className="h-10 w-full border rounded placeholder: pl-10" placeholder="Search..." />
                    </div>
                </div>
                {
                    data[0] && data[0].role == 'admin' ? (
                        <>
                            <p className="bg-white border-t border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/dashboard">Dashboard</Link></p>
                            <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/manage_movie">Manage Movie</Link></p>
                            <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/manage_schedule">Manage Schedule</Link></p>
                        </>
                    ) : (
                        <>
                            <p className="bg-white border-t border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/">Home</Link></p>
                            <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/#">List
                                Movie</Link></p>
                        </>
                    )
                }
                <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/profile" >Profile</Link></p>
                <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link onClick={show_modal_logout}>Logout</Link></p>
                <p onClick={click_menu_mobile} className="bg-white border-b py-3 tracking-wide text-xs md:text-sm">©
                    2020 Tickitz.
                    All Rights
                    Reerved.</p>
            </div>
        </header >
    )
}

export default Header