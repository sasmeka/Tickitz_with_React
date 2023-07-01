import React, { useState } from "react";
import logo_2 from '../assets/img/logo2.png'
import profile from '../assets/img/profile.png'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigates = useNavigate();
    const [icon_search, seticon_search] = useState(true)
    const [header_search, setheader_search] = useState(true)
    const [menu_desktop, setmenu_desktop] = useState(true)
    const [menu_mobile, setmenu_mobile] = useState(true)
    const [modal_logout, setmodal_logout] = useState(true)

    const logout = () => {
        sessionStorage.clear()
        localStorage.removeItem('Token')
        localStorage.removeItem('Users')
        navigates(`/sign-in`)
    }

    const show_header_search = () => {
        seticon_search(false)
        setheader_search(false)
    }

    const click_menu_desktop = () => {
        seticon_search(true)
        setheader_search(true)
        setmenu_desktop(menu_desktop == true ? false : true)
    }
    const click_menu_mobile = () => {
        seticon_search(true)
        setheader_search(true)
        setmenu_mobile(menu_mobile == true ? false : true)
    }
    const show_modal_logout = () => {
        seticon_search(true)
        setheader_search(true)
        setmenu_mobile(menu_mobile == true ? false : true)
        setmenu_desktop(menu_desktop == true ? false : true)
        setmodal_logout(false)
    }
    const hidden_modal_logout = () => {
        seticon_search(true)
        setheader_search(true)
        setmodal_logout(true)
    }
    return (
        <header className="sticky top-0 px-5 md:px-20 relative flex justify-between py-4 bg-white z-10 md:shadow-sm">
            <nav className="flex items-center">
                <img className="h-8 md:h-10 lg:h-14 pe-10" src={logo_2} alt="" />
                <Link className="hidden lg:block text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/home.html">Home</Link>
                <Link className="hidden lg:block px-7 text-[#414141] text-base font-normal hover:font-bold tracking-wide" to="/list_movie.html">List
                    Movie</Link>
            </nav>
            <div className={localStorage.getItem('Users') ? "hidden" : "block"}>
                <button onClick={() => { navigates(`/sign-in`) }} className="mt-2 h-6 w-16 md:h-8 md:w-20 bg-[#5F2EEA] rounded-md text-[10px] md:text-[12px] tracking-wide text-white">Sign Up</button>
            </div>
            <div className={localStorage.getItem('Users') ? "flex items-center" : "hidden"}>
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
                <p className="px-3 tracking-wide font-normal border-b">{localStorage.getItem('Users') ? JSON.parse(localStorage.getItem('Users')).first_name + ' ' + JSON.parse(localStorage.getItem('Users')).last_name : 'Guest'}</p>
                <Link className="px-3 tracking-wide font-normal hover:font-bold" to="/#">Profile</Link>
                <p><Link className="px-3 tracking-wide font-normal hover:font-bold" to="/#" onClick={show_modal_logout}>Logout</Link>
                </p>
            </div>
            <div className={modal_logout ? "hidden" : "block absolute h-screen w-full top-0 left-0 bg-black bg-opacity-50 text-center grid items-center justify-around"}>
                <div className="bg-white p-5 rounded-lg">
                    <div className="flex pb-2 border-b justify-between items-center">
                        <h1 className="tracking-wider font-bold">Logout</h1>
                        <Link to="/#" onClick={hidden_modal_logout}><i className="fa fa-times" aria-hidden="true" /></Link>
                    </div>
                    <div className="py-5">
                        <p>Are you sure you want to logout?</p>
                    </div>
                    <div className="flex pt-2 border-t justify-between items-center">
                        <button onClick={logout} className="bg-[#dc2626] h-8 w-20 rounded-lg text-white font-bold text-sm">Log
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
                <p className="bg-white border-t border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/">Home</Link></p>
                <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/#">List
                    Movie</Link></p>
                <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/#" >Profile</Link></p>
                <p className="bg-white border-b py-3 tracking-wide text-sm md:text-base hover:font-bold"><Link to="/#" onClick={show_modal_logout}>Logout</Link></p>
                <p onClick={click_menu_mobile} className="bg-white border-b py-3 tracking-wide text-xs md:text-sm">©
                    2020 Tickitz.
                    All Rights
                    Reerved.</p>
            </div>
        </header >
    )
}

export default Header