import React, { useEffect, useState, useRef } from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import useApi from '../../helper/useApi'
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { adddata, logout } from '../../store/reducer/user'
import { useDispatch } from "react-redux";

function Profile() {
    const api = useApi()
    const navigates = useNavigate();
    const imgRef = useRef(null);

    const dispatch = useDispatch()
    const { isAuth, data } = useSelector((s) => s.user)
    const getDataUser = async () => {
        try {
            const { data } = await api({ method: 'get', url: `user/byid` })
            dispatch(adddata(data.data))
        } catch (error) {
            if (error.response.data.status == 401) {
                dispatch(logout())
                sessionStorage.clear()
                navigates(`/sign-in`)
            }
            console.log(error.response.data)
        }
    }

    function capitalTitle(text) {
        return text.replace(/\w\S*/g, function (word) {
            const newWord = word.slice(0, 1).toUpperCase() + word.substr(1);
            return newWord;
        });
    }

    const [tab_as, settab_as] = useState(true)
    const [tab_oh, settab_oh] = useState(false)
    const [account_set, setaccount_set] = useState(true)
    const [order_history, setorder_history] = useState(false)
    const [modal_logout, setmodal_logout] = useState(false)

    const btnaccount_setting = () => {
        settab_as(true)
        setaccount_set(true)
        settab_oh(false)
        setorder_history(false)
    }

    const btnorder_history = () => {
        settab_as(false)
        setaccount_set(false)
        settab_oh(true)
        setorder_history(true)
    }


    const [first_name, setfirst_name] = useState(data[0].first_name)
    const [last_name, setlast_name] = useState(data[0].last_name)
    const [full_name, setfull_name] = useState('')
    const [email, setemail] = useState(data[0].email)
    const [phone, setphone] = useState(data[0].phone)
    const [image, setimage] = useState(data[0].image);
    const [imagereader, setimagereader] = useState("");


    // ----------------------------------------------
    useEffect(() => {
        document.title = "Profile";
        if (isAuth) {
            getDataUser()
        } else {
            dispatch(logout())
            sessionStorage.clear()
            navigates(`/sign-in`)
        }
    }, []);
    useEffect(() => {
        setfull_name(first_name + ' ' + last_name)
    }, [first_name, last_name, modal_logout])

    return (
        <>
            <Header btnlogout_trigger={modal_logout} modal_logout_profile={setmodal_logout} />
            <main className="grid md:px-20 md:gap-5 md:grid-cols-4 md:grid-rows-[40px_1fr] md:mt-3">
                <section className="col-span-2 m-5 md:col-auto md:row-span-2 md:m-0">
                    <div className="flex flex-col bg-white w-full h-30 rounded-2xl md:rounded-xl p-10 md:p-5 xl:p-8 shadow-sm">
                        <p className="text-sm tracking-wider text-[#4E4B66]">INFO</p>
                        <div className="flex justify-around pt-5 pb-4">
                            <div className="h-20 lg:h-20">
                                <Link id="file" onClick={() => { imgRef.current.showPicker(); }} >
                                    <img className="h-full object-cover rounded-full" src={imagereader == "" ? process.env.REACT_APP_API_URL + image : imagereader} alt="" />
                                </Link>
                            </div>
                            <input
                                type="file"
                                ref={imgRef}
                                multiple
                                accept="image/*"
                                onChange={(e) => [
                                    setimage(e.target.files[0]),
                                    setimagereader(URL.createObjectURL(e.target.files[0])),
                                ]}
                                className="hidden h-10 w-full border rounded pl-3"
                            />
                        </div>
                        <div className="pb-8 border-b">
                            <h5 className="text-base text-[#14142B] font-bold tracking-wider text-center">{full_name}</h5>
                            <p className="text-xs tracking-wider text-center">{data[0].role}</p>
                        </div>
                        <Link className="flex justify-around mt-4" onClick={() => setmodal_logout(true)}>
                            <button className="h-8 w-4/5 rounded-lg bg-[#5F2EEA] active:bg-[#3604c3] text-white tracking-wider text-xs">Logout</button>
                        </Link>
                    </div>
                </section>
                <section className="order-first md:order-none col-span-2 md:col-span-3 bg-white w-full h-16 md:rounded-xl shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 h-full text-center items-center">
                        <Link onClick={btnaccount_setting} className={tab_as ? "h-full ml-10 grid items-center border-[#5F2EEA] border-b-2 font-bold text-sm" : 'h-full ml-10 grid items-center text-[#AAA] text-sm'}>
                            <button className="hidden md:block">Account Settings</button>
                            <button className="block md:hidden">Detail Account</button>
                        </Link>
                        <Link onClick={btnorder_history} id="tab-oh" className={tab_oh ? 'h-full ml-10 grid items-center border-[#5F2EEA] border-b-2 font-bold text-sm' : 'h-full ml-10 grid items-center text-[#AAA] text-sm'}>
                            <button>Order History</button>
                        </Link>
                    </div>
                </section>
                <section className={account_set ? 'block col-span-2 md:col-span-3 flex flex-col md:my-5' : 'hidden'}>
                    <div className="bg-white rounded-2xl md:rounded-xl grid gap-y-2 md:gap-x-5 md:grid-cols-2 md:grid-rows-[40px_1fr_1fr] px-5 py-8 mb-5 mx-5 md:mx-0 md:my-5 shadow-sm">
                        <div className="md:col-span-2 border-b text-sm font-bold tracking-wide pb-2 md:pb-0">Details Information
                        </div>
                        <div className="flex md:hidden flex-col mt-3">
                            <label className="text-sm py-2">Full Name</label>
                            <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-3 text-[#4E4B66]" value={full_name} onChange={(e) => setfull_name(e.target.value)} placeholder="Verdi Sasmeka" />
                        </div>
                        <div className="hidden md:flex flex-col mt-3">
                            <label className="text-sm py-2">First Name</label>
                            <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-3 text-[#4E4B66]" value={first_name} onChange={(e) => setfirst_name(e.target.value)} placeholder="Verdi" />
                        </div>
                        <div className="hidden md:flex flex-col mt-3">
                            <label className="text-sm py-2">last Name</label>
                            <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-3 text-[#4E4B66]" value={last_name} onChange={(e) => setlast_name(e.target.value)} placeholder="Sasmeka" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm py-2">E-mail</label>
                            <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-3 text-[#4E4B66]" value={email} onChange={(e) => setemail(e.target.value)} placeholder="verdysas@gmail.com" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm py-2">Phone Number</label>
                            <div className="relative">
                                <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-14 text-[#4E4B66]" value={phone} onChange={(e) => setphone(e.target.value)} placeholder={87734768584} />
                                <span className="absolute left-3 top-[0.9rem] text-sm text-[#4E4B66] pr-3 border-r">+62</span>
                            </div>
                        </div>
                    </div>
                    <div className="mx-5 md:mx-0">
                        <button className="h-10 md:h-12 w-full md:w-2/5 rounded-xl bg-[#5F2EEA] active:bg-[#3604c3] text-white tracking-wider">Update
                            Changes</button>
                    </div>
                    <div className="bg-white rounded-2xl md:rounded-xl grid gap-y-2 md:gap-x-5 md:grid-cols-2 md:grid-rows-[40px_1fr] px-5 py-8 m-5 md:m-0 md:my-5 shadow-sm">
                        <div className="md:col-span-2 border-b text-sm font-bold tracking-wide pb-2 md:pb-0">Account and Privacy
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-sm py-2">New Password</label>
                            <div className="w-full relative">
                                <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-3 text-[#4E4B66]" type="text" placeholder="Write your password" />
                                <i className="fa fa-eye absolute right-4 top-4 text-[#A0A3BD]" aria-hidden="true" />
                            </div>
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="text-sm py-2">Confirm Password</label>
                            <div className="relative">
                                <input className="h-12 w-full rounded-xl border border-[#DEDEDE] placeholder:text-sm pl-3 text-[#4E4B66]" type="text" placeholder="Confirm your password" />
                                <i className="fa fa-eye absolute right-4 top-4 text-[#A0A3BD]" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <div className="mx-5 md:mx-0 mb-5 md:mb-0">
                        <button className="h-10 md:h-12 w-full md:w-2/5 rounded-xl bg-[#5F2EEA] active:bg-[#3604c3] text-white tracking-wider">Update
                            Changes</button>
                    </div>
                </section>
                <section className={order_history ? 'block col-span-2 md:col-span-3 flex flex-col md:my-5' : 'hidden'}>
                    <div className="bg-white md:my-4 rounded-2xl md:rounded-xl shadow-sm mx-5 md:mx-0">
                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center py-5 md:py-8 border-b px-5 md:px-10">
                            <div className="flex flex-col">
                                <p className="text-[#AAA] text-xs tracking-wider">Tuesday, 07 July 2020 - 04:30pm</p>
                                <h1 className="text-lg md:text-xl font-bold tracking-wider">Spider-Man: Homecoming</h1>
                            </div>
                            <img className="order-first md:order-none h-5 md:h-6 mb-4" src="assets/img/cineone21-logo.png" alt="" />
                        </div>
                        <div className="px-10 flex justify-between items-center h-20">
                            <button className="bg-[#00BA88] active:bg-[#007052] h-8 md:h-10 w-full md:w-3/12 rounded-lg md:rounded text-white tracking-wider font-semibold text-sm">Ticket
                                in active</button>
                            <Link className="hidden md:block text-[#AAA] text-sm tracking-wide">See Details</Link>
                        </div>
                    </div>
                    <div className="bg-white my-4 rounded-2xl md:rounded-xl shadow-sm mx-5 md:mx-0">
                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center py-5 md:py-8 border-b px-5 md:px-10">
                            <div className="flex flex-col">
                                <p className="text-[#AAA] text-xs tracking-wider">Monday, 14 June 2020 -02:00pm</p>
                                <h1 className="text-lg md:text-xl font-bold tracking-wider">Avengers: End Game</h1>
                            </div>
                            <img className="order-first md:order-none h-5 md:h-6 mb-4" src="assets/img/ebu.id-logo.png" alt="" />
                        </div>
                        <div className="px-10 flex justify-between items-center h-20">
                            <button className="bg-[#6E7191] active:bg-[#3c3f5f] h-8 md:h-10 w-full md:w-3/12 rounded-lg md:rounded text-white tracking-wider font-semibold text-sm">Ticket
                                used</button>
                            <Link className="hidden md:block text-[#AAA] text-sm tracking-wide">See Details</Link>
                        </div>
                    </div>
                    <div className="bg-white my-4 rounded-2xl md:rounded-xl shadow-sm mx-5 md:mx-0">
                        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center py-5 md:py-8 border-b px-5 md:px-10">
                            <div className="flex flex-col">
                                <p className="text-[#AAA] text-xs tracking-wider">Monday, 10 March 2020 - 04:00pm</p>
                                <h1 className="text-lg md:text-xl font-bold tracking-wider">Thor: Ragnarok</h1>
                            </div>
                            <img className="order-first md:order-none h-5 md:h-6 mb-4" src="assets/img/hiflix-logo.png" alt="" />
                        </div>
                        <div className="px-10 flex justify-between items-center h-20">
                            <button className="bg-[#6E7191] active:bg-[#3c3f5f] h-8 md:h-10 w-full md:w-3/12 rounded-lg md:rounded text-white tracking-wider font-semibold text-sm">Ticket
                                used</button>
                            <Link className="hidden md:block text-[#AAA] text-sm tracking-wide">See Details</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Profile;
