import React, { useEffect, useState } from "react";
import Header from "../../component/header";
import Pagination from "../../component/pagination"
import Footer from "../../component/footer";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function List_Movie() {
    const navigate = useNavigate()
    const [movies, setmovies] = useState([]);
    const [metamovies, setmetamovies] = useState([]);
    const [pageactive, setpageactive] = useState(1)
    const [sort, setsort] = useState('')
    const [search, setsearch] = useState('')
    const getMovies = async () => {
        try {
            const { data } = await axios.get(window.env.API_URL + `movie?search_title=${search}&order_by=${sort}&page=${pageactive}&limit=4&month_release=${pickmonth}`)
            setmovies(data.data)
            setmetamovies(data.meta)
        } catch (error) {
            setmovies(false)
            setmetamovies(false)
            console.log(error.response.data)
        }
    }

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

    const changeSort = (v) => {
        if (v.target.value !== 'sort') {
            setsort(v.target.value)
        } else {
            setsort('')
        }
    }

    function capitalTitle(text) {
        return (text.replace(/\w\S*/g, function (word) {
            const newWord = word.slice(0, 1).toUpperCase() + word.substr(1);
            return newWord
        }))
    }

    useEffect(() => {
        document.title = 'List Movie';
        getMovies()
    }, []);
    useEffect(() => {
        getMovies()
    }, [pickmonth, pageactive, sort, search]);

    return (
        <>
            <Header />
            <main className="px-5 md:px-20 flex flex-col bg-[#FCFCFC]">
                <section className="flex flex-col py-7">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                        <h2 className="font-bold text-base lg:text-xl tracking-wide">List Movie</h2>
                        <div className="flex">
                            <div className="w-auto pe-5 py-3 md:py-4">
                                <select onChange={changeSort} className="z-0 rounded-lg h-7 md:h-10 w-full pl-2 text-[#4E4B66] text-sm" >
                                    <option className="text-sm" value='sort' disabled selected>Sort</option>
                                    <option value='title'>Movie Name</option>
                                    <option value='release_date'>Release Date</option>
                                    <option value='duration_hour, duration_minute'>Duration</option>
                                </select>
                            </div>
                            <div className="py-3 md:py-4">
                                <input onChange={(v) => setsearch(v.target.value)} className="z-0 rounded-lg h-7 md:h-10 pl-5 placeholder:text-[#4E4B66] placeholder:text-sm" type="text" placeholder="Search Movie Name . . ." />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between overflow-x-hidden hover:overflow-x-scroll">
                        {
                            month ? (
                                month.map((v) => {
                                    return (
                                        <div key={v.id} className="mr-8">
                                            <button onClick={() => (pickmonth == v.id ? setpickmonth('') : setpickmonth(v.id))} className={(pickmonth == v.id ? 'bg-[#5F2EEA] text-white' : 'text-[#5F2EEA]') + " hover:bg-[#5F2EEA] h-8 w-32 rounded border border-[#5F2EEA] p-2 text-sm font-semibold leading-none active:bg-[#3604c3] hover:text-white"}>{v.name}</button>
                                        </div>
                                    )
                                })
                            ) : (
                                <h1>Data not found</h1>
                            )
                        }
                    </div>
                </section>
                <section className={"flex flex-wrap " + (movies ? 'xl:grid' : '') + " xl:grid-cols-6 2xl:grid-cols-8 md:pt-5 md:pt-10 px-2 md:px-5 items-center text-center justify-around " + (movies ? 'lg:justify-between' : '') + " md:bg-white rounded-lg shadow-sm text-center"}>
                    {
                        movies ? (
                            movies.map((v) => {
                                return (
                                    <div key={v.id_movie} className="flex flex-col items-center p-2 md:p-5 border border-[#DEDEDE] mb-10 rounded-lg md:mx-5 bg-white">
                                        <div className="h-[200px] w-[100px]">
                                            <img className="h-full object-cover rounded-lg" src={window.env.API_URL + v.image} alt="" />
                                        </div>
                                        <div className="w-[100px] md:mt-3">
                                            <h5 className="tracking-wide text-base font-semibold">{capitalTitle(v.title.slice(0, 9) + (v.title.split('').length > 9 ? ' ...' : ''))}</h5>
                                            <p className="my-1 text-[10px] text-[#A0A3BD]">{v.movie_id_genre ? (v.movie_id_genre.map(u => u.name_genre).join(', ')).slice(0, 20) + ' ...' : ""}</p>
                                            <button onClick={() => navigate(`/detail_movie/${v.id_movie}`)} className="mt-3 h-7 w-full rounded border border-[#5F2EEA] text-[#5F2EEA] text-sm font-semibold leading-none hover:bg-[#5F2EEA] active:bg-[#3604c3] hover:text-white">Details</button>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="mb-5">
                                <h1 className="text-[#4E4B66]">Data not found</h1>
                            </div>
                        )
                    }
                </section>
                <section className="flex pb-10 md:py-10 justify-around">
                    <Pagination meta={metamovies} page_active={pageactive} set_page_active={setpageactive} />
                </section>
            </main >
            <Footer />
        </>
    )
}

export default List_Movie