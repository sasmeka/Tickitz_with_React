import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import home1 from '../../assets/img/home1.png'
import home2 from '../../assets/img/home2.png'
import home3 from '../../assets/img/home3.png'
import { Link, useNavigate } from 'react-router-dom'
import useApi from '../../helper/useApi'
import authChecked from '../../helper/authCheck'

function Home() {
    const api = useApi()
    const navigates = useNavigate()

    const [ismovieHovering, setIsmovieHovering] = useState('');
    const [hovimg, sethovimg] = useState('');
    const [nowshow, setnowshow] = useState([]);
    const [movies, setmovies] = useState([]);
    const [month, setmonth] = useState([
        { 'id': 1, 'name': 'January' },
        { 'id': 2, 'name': 'February' },
        { 'id': 3, 'name': 'March' },
        { 'id': 4, 'name': 'April' },
        { 'id': 5, 'name': 'May' },
        { 'id': 6, 'name': 'June' },
        { 'id': 7, 'name': 'July' },
        { 'id': 8, 'name': 'Augustus' },
        { 'id': 9, 'name': 'September' },
        { 'id': 10, 'name': 'October' },
        { 'id': 11, 'name': 'November' },
        { 'id': 12, 'name': 'December' },
    ]);
    const [pickmonth, setpickmonth] = useState('')

    const getMovies = async () => {
        try {
            const { data } = await api({ method: 'get', url: `movie?limit=6&order_by=release_date&month_release=${pickmonth}` })
            setmovies(data.data)
        } catch (error) {
            setmovies(false)
            console.log(error.response.data)
        }
    }

    const getNowshowing = async () => {
        try {
            const { data } = await api({ method: 'get', url: `movie?limit=8&order_by=release_date` })
            setnowshow(data.data)
        } catch (error) {
            setnowshow(false)
            console.log(error.response.data)
        }
    }

    function capitalTitle(text) {
        return (text.replace(/\w\S*/g, function (word) {
            const newWord = word.slice(0, 1).toUpperCase() + word.substr(1);
            return newWord
        }))
    }

    useEffect(() => {
        document.title = 'Home';
        getMovies()
        getNowshowing()
    }, []);
    useEffect(() => {
        getMovies()
    }, [pickmonth]);
    return (
        <>
            <Header />
            <main className="grid grid-rows-[500px_400px_500px_1fr] md:grid-rows-[400px_400px_500px_1fr] bg-[#FCFCFC]">
                <section className="px-5 md:px-20 grid grid-rows-4 grid-cols-1 md:grid-rows-1 md:grid-cols-5 items-center justify-items-stretch bg-white">
                    <div className="md:col-span-2">
                        <p className="text-[#A0A3BD] text-sm lg:text-lg tracking-wider">Nearest Cinema, Newest Movie,</p>
                        <h1 className="text-[#5F2EEA] text-2xl lg:text-5xl font-bold tracking-wider">Find out now!</h1>
                    </div>
                    <div className="row-span-3 md:col-span-3 h-5/6 flex justify-around justify-self-center">
                        <div className="grid grid-cols-3 gap-3">
                            <img className="self-end w-4/5 md:w-10/12 drop-shadow-[5px_5px_5px_#222]" src={home1} alt="" />
                            <img className="self-center w-4/5 md:w-10/12 drop-shadow-[5px_5px_5px_#222]" src={home2} alt="" />
                            <img className="self-start w-4/5 md:w-10/12 drop-shadow-[5px_5px_5px_#222]" src={home3} alt="" />
                        </div></div>
                </section>
                <section className="px-5 py-5 md:px-20 grid grid-cols-1 grid-rows-[50px_350px] relative">
                    <div className="flex justify-between items-center">
                        <h2 className="p-1 border-b-2 text-[#5F2EEA] border-[#5F2EEA] tracking-wider font-semibold">Now Showing</h2>
                        <Link className="text-[#5F2EEA] text-sm tracking-wider font-semibold" to="/list_movie">view all</Link>
                    </div>
                    <div className="h-full py-5 grid grid-rows-1 grid-flow-col overflow-x-hidden hover:overflow-x-scroll relative text-center">
                        {
                            nowshow ? (
                                nowshow.map((v) => {
                                    return (
                                        <div key={v.id_movie} className={"w-36 " + (hovimg === v ? 'h-full bg-white shadow-lg' : 'h-4/6') + " mx-5 px-5 pt-5 pb-5 border border-white border-2 rounded-lg"} >
                                            <img onClick={() => [ismovieHovering === v ? setIsmovieHovering(0) : setIsmovieHovering(v), hovimg === v ? sethovimg(0) : sethovimg(v)]} onMouseOver={() => [setIsmovieHovering(v), sethovimg(v)]} className={"rounded-lg " + (hovimg === v ? 'h-4/6' : 'h-full') + " w-full object-cover"} src={process.env.REACT_APP_API_URL + v.image} alt="" />
                                            {
                                                ismovieHovering === v && hovimg === v ? (
                                                    <div className="bg-white mt-3 text-center">
                                                        <h5 className="h-5 mb-2 grid items-center text-sm font-semibold tracking-wider">{capitalTitle(v.title.slice(0, 9) + (v.title.split('').length > 9 ? ' ...' : ''))}</h5>
                                                        <p className="text-[9px]">{v.movie_id_genre ? (v.movie_id_genre.map(u => u.name_genre).join(', ')).slice(0, 20) + ' ...' : ""}</p>
                                                        <button onMouseOut={() => [setIsmovieHovering(''), sethovimg('')]} onClick={() => navigates(`/detail_movie/${v.id_movie}`)} className="h-5 rounded text-[#5F2EEA] text-[8px] border border-[#5F2EEA] font-semibold w-4/5 hover:bg-[#5F2EEA] hover:text-white mt-3">Details</button>
                                                    </div>
                                                ) : ''
                                            }
                                        </div>
                                    )
                                })
                            ) : (
                                <h1>Data not found</h1>
                            )
                        }
                    </div>
                </section>
                <section className="px-5 py-5 md:px-20 grid grid-cols-1 grid-rows-[50px_80px_350px] bg-white">
                    <div className="flex justify-between items-center">
                        <h2 className="p-1 text-lg tracking-wider font-semibold">Upcoming Movie</h2>
                        <Link className="text-[#5F2EEA] text-sm tracking-wider font-semibold" to="/list_movie">view all</Link>
                    </div>
                    <div className="py-5 flex justify-between overflow-x-hidden hover:overflow-x-scroll">
                        {
                            month ? (
                                month.map((v) => {
                                    return (
                                        <div key={v.id} className="mr-8">
                                            <button onClick={() => (pickmonth == v.id ? setpickmonth('') : setpickmonth(v.id))} className={(pickmonth == v.id ? 'bg-[#5F2EEA] text-white' : 'text-[#5F2EEA]') + " h-8 w-32 rounded border border-[#5F2EEA] p-2 text-sm font-semibold leading-none hover:bg-[#5F2EEA] active:bg-[#3604c3] hover:text-white"}>{v.name}</button>
                                        </div>
                                    )
                                })
                            ) : (
                                <h1>Data not found</h1>
                            )
                        }
                    </div>
                    <div className="h-full py-5 grid grid-rows-1 grid-flow-col overflow-x-hidden hover:overflow-x-scroll text-center">
                        {
                            movies ? (
                                movies.map((v) => {
                                    return (
                                        <div key={v.id_movie} className="w-36 h-full mx-5 px-5 pt-5 pb-32 border border-[#DEDEDE] rounded-lg" >
                                            <img className="rounded-lg h-full w-full object-cover" src={process.env.REACT_APP_API_URL + v.image} alt="" />
                                            <div className="bg-white mt-3 text-center">
                                                <h5 className="tracking-wide text-sm font-semibold">{capitalTitle(v.title.slice(0, 9) + (v.title.split('').length > 9 ? ' ...' : ''))}</h5>
                                                <p className="my-1 text-[10px] text-[#A0A3BD]">{
                                                    v.movie_id_genre ? (v.movie_id_genre.map(u => u.name_genre).join(', ')).slice(0, 20) + ' ...' : ""
                                                }</p>
                                                <button onClick={() => navigates(`/detail_movie/${v.id_movie}`)} className="mt-3 h-7 w-9/12 rounded border border-[#5F2EEA] text-[#5F2EEA] text-sm font-semibold leading-none hover:bg-[#5F2EEA] active:bg-[#3604c3] hover:text-white">Details</button>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="h-full pt-5 pb-32">
                                    <h1>Data not found</h1>
                                </div>
                            )
                        }
                    </div>
                </section>
                <section className="p-5 md:p-20 grid grid-cols-1">
                    <div className="bg-white rounded-xl h-[300px] text-center p-10 grid items-center drop-shadow-lg">
                        <div className="flex flex-col">
                            <p className="text-[#4E4B66] text-lg tracking-wider">Be the vanguard of the</p>
                            <h1 className="text-[#5F2EEA] text-4xl tracking-wider font-bold">Moviegoers</h1>
                        </div>
                        <div className="my-5">
                            <input className="h-10 w-full md:w-72 border rounded pl-3" type="text" placeholder="Type your email" />
                            <button className="h-10 w-full mt-3 md:mt-0 md:w-24 bg-[#5F2EEA] text-white border md:ml-3 rounded">Join now</button>
                        </div>
                        <div className="bottom">
                            <p className="text-[#4E4B66] text-[12px] tracking-wider">By joining you as a Tickitz member,<br />we will always send you the lastes update via email.
                            </p>
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    )
}

export default authChecked(false, Home, ['admin', 'user'])