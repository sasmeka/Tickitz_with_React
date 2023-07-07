import React, { useEffect, useState, useRef } from "react";
import moment from "moment/moment";
import Header from "../../component/header";
import Footer from "../../component/footer";
import useApi from '../../helper/useApi'
import { Link, useParams } from 'react-router-dom'

function Detail_Movie() {
    const api = useApi()
    const params = useParams()

    const [movie, setmovie] = useState([]);
    const [metamovie, setmetamovie] = useState([]);

    const [schedule, setschedule] = useState([]);
    const [metaschedule, setmetaschedule] = useState([]);

    const [regency, setregency] = useState([]);
    const [metaregency, setmetaregency] = useState([]);

    const [picktime, setpicktime] = useState('')
    const [pickdate, setpickdate] = useState('')
    const [pickloc, setpickloc] = useState('')
    const [incrementlimit, setincrementlimit] = useState(6)

    const getMovie = async () => {
        try {
            const { data } = await api({ method: 'get', url: `movie/${params.id}` })
            setmovie(data.data)
            setmetamovie(data.meta)
        } catch (error) {
            setmovie(false)
            console.log(error)
        }
    }
    const getSchedule = async () => {
        try {
            const { data } = await api({ method: 'get', url: `schedule?id_regency=${pickloc}&limit=${incrementlimit}&page=1&id_movie=${params.id}` })
            setschedule(data.data)
            setmetaschedule(data.meta)
        } catch (error) {
            setschedule(false)
            console.log(error.response.data)
        }
    }
    const getRegency = async () => {
        try {
            const { data } = await api({ method: 'get', url: `regency` })
            setregency(data.data)
            setmetaregency(data.meta)
        } catch (error) {
            setregency(false)
            console.log(error.response.data)
        }
    }

    function capitalTitle(text) {
        return (text.replace(/\w\S*/g, function (word) {
            const newWord = word.slice(0, 1).toUpperCase() + word.substr(1);
            return newWord
        }))
    }
    const dateRef = useRef(null);

    const changeLoc = (v) => {
        if (v.target.value !== 'all') {
            setpickloc(v.target.value)
        } else {
            setpickloc('')
        }
    }

    useEffect(() => {
        document.title = 'Detail Movie';
        getMovie()
        getSchedule()
        getRegency()
    }, []);
    useEffect(() => {
        getSchedule()
    }, [pickloc, incrementlimit]);

    return (
        <>
            <Header />
            <main className="grid grid-cols-1 bg-[#FCFCFC]">
                <section className="grid grid-cols-1 grid-rows-[350px_1fr] md:grid-cols-5 lg:grid-cols-4 md:grid-rows-1 px-5 md:px-20 bg-white pt-10 pb-20">
                    {
                        movie.map((v) => (
                            <>
                                <div key={v.id_movie} className="md:col-span-2 lg:col-span-1 flex justify-around">
                                    <div className="w-48 md:h-80 md:w-56 lg:h-[300px] lg:w-48 m-5 md:m-0 p-5 md:p-5 border rounded-xl">
                                        <img className="h-full object-cover rounded-xl" src={process.env.REACT_APP_API_URL + v.image} alt="" />
                                    </div>
                                </div>
                                <div className="md:col-span-3 lg:col-span-3 flex flex-col">
                                    <div className="flex flex-col text-center md:text-left">
                                        <h1 className="text-[#14142B] text-3xl font-semibold tracking-wider mb-1">{capitalTitle(v.title)}</h1>
                                        <p className="text-[#4E4B66] text-sm tracking-wider mb-5">Adventure, Action, Sci-Fi</p>
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <div className="">
                                            <div className="mb-4">
                                                <h6 className="text-[#8692A6] text-[12px] tracking-wider">Release date</h6>
                                                <p className="text-[#121212] text-sm tracking-wider">{moment.utc(v.release_date).utc().format('MMMM D, YYYY')}</p>
                                            </div>
                                            <div className="mb-4">
                                                <h6 className="text-[#8692A6] text-[12px] tracking-wider">Duration</h6>
                                                <p className="text-[#121212] text-sm tracking-wider">{v.duration_hour} Hours {v.duration_minute} minutes</p>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="mb-4">
                                                <h6 className="text-[#8692A6] text-[12px] tracking-wider">Directed by</h6>
                                                <p className="text-[#121212] text-sm tracking-wider">{v.movie_director.map((v) => v.name_director)}</p>
                                            </div>
                                            <div className="mb-4">
                                                <h6 className="text-[#8692A6] text-[12px] tracking-wider">Casts</h6>
                                                <p className="text-[#121212] text-sm tracking-wider">{v.movie_id_cast.map(u => u.name_cast).join(', ')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t">
                                        <h5 className="font-semibold tracking-wider">Synopsis</h5>
                                        <p className="py-2 text-sm tracking-wider text-[#4E4B66]">{v.synopsis}</p>
                                    </div>
                                </div >
                            </>
                        ))
                    }
                </section>
                <section className="px-5 md:px-20 grid py-10">
                    <h1 className="text-center text-[#14142B] text-xl tracking-wider font-semibold mb-7">Showtimes and Tickes</h1>
                    <div className="flex justify-around">
                        <div className="flex flex-col md:flex-row">
                            <div className="relative mb-3 md:mr-3">
                                <i className="fa fa-calendar absolute left-2 top-[12px]" aria-hidden="true" />
                                <input type="date" ref={dateRef} className="bg-[#EFF0F6] h-10 w-40 pl-8 rounded-md appearance-none" />
                                <i onClick={() => { dateRef.current.showPicker(); }} className="fa fa-sort-desc absolute right-0 top-[10px] bg-[#EFF0F6] w-5 h-5" aria-hidden="true" />
                            </div>
                            <div className="relative">
                                <i className="fa fa-map-marker absolute left-2 top-[12px]" aria-hidden="true" />
                                <select onChange={changeLoc} className="bg-[#EFF0F6] h-10 w-40 pl-8 rounded-md appearance-none">
                                    <option className="text-sm" value='all' selected>All</option>
                                    {
                                        regency ? regency.map((v) => (
                                            <option key={v.id_regecy} value={v.id_regency}>{v.name_regency}</option>
                                        )) : ("")
                                    }
                                </select>
                                <i className="fa fa-sort-desc absolute right-3 top-[10px]" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                    <div className={"my-10 grid " + (schedule ? 'md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1') + " gap-10 mx-5 mb:mx-0"}>
                        {
                            schedule ? (
                                schedule.map((v) => (
                                    <div key={v.id_schedule} className="bg-white rounded-xl p-3 shadow-md">
                                        <div className="grid grid-cols-3 items-center pb-5 gap-5">
                                            <div className="flex justify-around">
                                                <div className="w-4/5">
                                                    <img className="" src={process.env.REACT_APP_API_URL + v.premier.map(p => p.image)} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <h1 className="text-xl tracking-wider font-semibold">{v.premier.map(p => p.name_premier)}</h1>
                                                <p className="text-[11px] tracking-wider text-[#6E7191]">{v.full_location.map(p => p.address)}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center text-center gap-2">
                                            {
                                                v.times.map(p => (
                                                    <Link key={v.id_time_schedule} onClick={() => setpicktime(p.id_time_schedule)} className={"text-[10px] text-[#4E4B66] tracking-wider " + (picktime == p.id_time_schedule ? 'font-bold' : '')}>{p.time_schedule.substring(0, 5)} WIB</Link>
                                                ))
                                            }
                                        </div>
                                        <div className="flex justify-between px-2 py-5">
                                            <h1 className="text-[#6B6B6B] text-md tracking-wider">Price</h1>
                                            <p className="text-md tracking-wider font-semibold">Rp. {v.price} / seat</p>
                                        </div>
                                        <div className="px-2 pb-2">
                                            <button className="w-full h-10 bg-[#5F2EEA] rounded-xl hover:bg-[#2A00A2] text-white text-sm">Book now</button>
                                        </div>
                                    </div>)
                                )
                            ) : (
                                <div className="my-5">
                                    <h1 className="text-[#4E4B66] text-center">Data not found</h1>
                                </div>
                            )
                        }
                    </div>
                </section>
                <section className="mb-10 px-5 md:px-20">
                    <h1 className="border-b leading-[0.1rem] border-[#DEDEDE] text-center">
                        <span className="bg-[#FCFCFC] text-center"><Link onClick={() => setincrementlimit(incrementlimit + 3)} className="p-5 text-[#5F2EEA] font-semibold text-md">view more</Link></span>
                    </h1>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Detail_Movie