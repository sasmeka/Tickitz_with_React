import React, { useEffect, useState, useRef } from "react";
import moment from "moment/moment";
import Header from "../../component/header";
import Pagination from "../../component/pagination";
import Footer from "../../component/footer";
import useApi from '../../helper/useApi'
import profile from "../../assets/img/profile.png";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { adddata, logout } from '../../store/reducer/user'
import { useDispatch } from "react-redux";

function Manage_Movie() {
  const api = useApi()
  const navigates = useNavigate();
  const dateRef = useRef(null);
  const imgRef = useRef(null);

  const dispatch = useDispatch()
  const { isAuth } = useSelector((s) => s.user)
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

  const [movies, setmovies] = useState([]);
  const [metamovies, setmetamovies] = useState([]);

  const [director, setdirector] = useState([]);
  const [metadirector, setmetadirector] = useState([]);

  const [genre, setgenre] = useState([]);
  const [metagenre, setmetagenre] = useState([]);

  const [cast, setcast] = useState([]);
  const [metacast, setmetacast] = useState([]);

  const [pageactive, setpageactive] = useState(1);
  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");

  const getMovies = async () => {
    try {
      const { data } = await api({
        method: 'get', url: `movie?search_title=${search}&order_by=${sort}&page=${pageactive}&limit=4`
      });
      setmovies(data.data);
      setmetamovies(data.meta);
    } catch (error) {
      setmovies(false);
      setmetamovies(false);
      console.log(error.response.data);
    }
  };

  const getDirector = async () => {
    try {
      const { data } = await api({
        method: 'get', url: `director`
      });
      setdirector(data.data);
      setmetadirector(data.meta);
    } catch (error) {
      setdirector(false);
      setmetadirector(false);
      console.log(error.response.data);
    }
  };
  const getCategory = async () => {
    try {
      const { data } = await api({
        method: 'get', url: `genre`
      });
      setgenre(data.data);
      setmetagenre(data.meta);
    } catch (error) {
      setgenre(false);
      setmetagenre(false);
      console.log(error.response.data);
    }
  };
  const getCast = async () => {
    try {
      const { data } = await api({
        method: 'get', url: `cast`
      });
      setcast(data.data);
      setmetacast(data.meta);
    } catch (error) {
      setcast(false);
      setmetacast(false);
      console.log(error.response.data);
    }
  };

  const changeSort = (v) => {
    if (v.target.value !== "sort") {
      setsort(v.target.value);
    } else {
      setsort("");
    }
  };

  function capitalTitle(text) {
    return text.replace(/\w\S*/g, function (word) {
      const newWord = word.slice(0, 1).toUpperCase() + word.substr(1);
      return newWord;
    });
  }

  const [id_movie, setid_movie] = useState("");
  const [title, settitle] = useState("");
  const [id_director, setid_director] = useState("");
  const [release_date, setrelease_date] = useState("");
  const [image, setimage] = useState("");
  const [imagereader, setimagereader] = useState("");
  const [synopsis, setsynopsis] = useState("");
  const [movie_id_cast, setmovie_id_cast] = useState([]);
  const [movie_id_genre, setmovie_id_genre] = useState([]);
  const [duration_hour, setduration_hour] = useState("");
  const [duration_minute, setduration_minute] = useState("");

  const optionsgenre = [{ label: "Select Director", value: 1, disabled: true }];
  if (genre) {
    genre.map((v) =>
      optionsgenre.push({ value: v.id_genre, label: v.name_genre })
    );
  }

  const optionscast = [{ label: "Select Cast", value: 1, disabled: true }];
  if (cast) {
    cast.map((v) => optionscast.push({ value: v.id_cast, label: v.name_cast }));
  }

  //PICK DATA FOR UPDATE
  const movie_id_cast_u = [];
  const movie_id_genre_u = [];
  const [movie, setmovie] = useState([]);
  const getMovie = async (v) => {
    try {
      const { data } = await api({ method: 'get', url: `movie/${v}` });
      settitle(data.data[0].title);
      setid_director(data.data[0].movie_director[0].id_director);
      setduration_hour(data.data[0].duration_hour);
      setduration_minute(data.data[0].duration_minute);
      setsynopsis(data.data[0].synopsis);
      setrelease_date(data.data[0].release_date);
      setimage(data.data[0].image);
      if (data.data[0].movie_id_cast) {
        data.data[0].movie_id_cast.map((v) =>
          movie_id_cast_u.push({ value: v.id_cast, label: v.name_cast })
        );
      }
      if (data.data[0].movie_id_genre) {
        data.data[0].movie_id_genre.map((v) =>
          movie_id_genre_u.push({ value: v.id_genre, label: v.name_genre })
        );
      }
      setmovie_id_cast(movie_id_cast_u);
      setmovie_id_genre(movie_id_genre_u);
    } catch (error) {
      setmovie(false);
      console.log(error.response.data);
    }
  };

  // INSERT & UPDATE DATA
  const pick_movie_id_genre = [];
  const pick_movie_id_cast = [];
  movie_id_cast.map((e) => pick_movie_id_cast.push(e.value));
  movie_id_genre.map((e) => pick_movie_id_genre.push(e.value));

  const formData = new FormData();
  formData.append("title", title);
  formData.append("id_director", id_director);
  formData.append("synopsis", synopsis);
  formData.append("duration_hour", duration_hour);
  formData.append("duration_minute", duration_minute);
  formData.append("release_date", release_date);
  pick_movie_id_cast.forEach((pick_movie_id_cast) =>
    formData.append("movie_id_cast[]", pick_movie_id_cast)
  );
  pick_movie_id_genre.forEach((pick_movie_id_genre) =>
    formData.append("movie_id_genre[]", pick_movie_id_genre)
  );
  formData.append("image", image);

  const insert_data = async (e) => {
    e.preventDefault();
    try {
      let data = [];
      if (id_movie == "") {
        data = await api({
          method: 'post', url: "movie",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
      } else {
        data = await api({
          method: 'put', url: `movie/${id_movie}`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
      }
      console.log(data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // DELETE DATA
  const [delid_movie, setdelid_movie] = useState("");
  const hidden_modal_delete = () => {
    setdelid_movie("");
  };

  const delete_data = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api({ method: 'delete', url: `movie/${delid_movie}` });
      console.log(data);
      hidden_modal_delete();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // RESET FORM
  const reset_form = (e) => {
    e.preventDefault();
    setid_movie('')
    settitle('')
    setid_director('')
    setrelease_date('')
    setmovie_id_cast([])
    setmovie_id_genre([])
    setduration_hour('')
    setduration_minute('')
    setsynopsis('')
    setimagereader('')
    setimage('')
  }

  // ----------------------------------------------
  useEffect(() => {
    document.title = "Manage Movie";
    if (isAuth) {
      getDataUser()
    } else {
      dispatch(logout())
      sessionStorage.clear()
      navigates(`/sign-in`)
    }
    getMovies();
    getDirector();
    getCategory();
    getCast();
  }, []);
  useEffect(() => {
    getMovies();
  }, [pageactive, sort, search, insert_data, delete_data]);

  return (
    <>
      <Header />
      <main className="px-5 md:px-20 flex flex-col bg-[#FCFCFC] relative">
        <section className="flex flex-col py-7">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 className="font-bold text-base lg:text-xl tracking-wide">
              Form Movie
            </h2>
          </div>
        </section>
        <section className="px-5 md:px-20 bg-white pt-10 pb-20">
          <form className="grid grid-cols-1 grid-rows-[350px_1fr] md:gap-5 md:grid-cols-5 lg:grid-cols-4 md:grid-rows-1">
            <div className="md:col-span-2 lg:col-span-1 flex justify-around">
              <div className="w-48 md:h-80 md:w-56 lg:h-[300px] lg:w-48 m-5 md:m-0 p-5 md:p-5 border rounded-xl">
                <Link id="file" onClick={() => { imgRef.current.showPicker(); }} >
                  <img
                    className="h-full object-cover rounded-xl"
                    src={
                      imagereader == ""
                        ? image == ""
                          ? profile
                          : process.env.REACT_APP_API_URL + image
                        : imagereader
                    }
                    alt="click to upload poster"
                  />
                </Link>
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
            </div>
            <div className="md:col-span-3 lg:col-span-3 flex flex-col">
              <div className="grid md:grid-cols-2 md:gap-10">
                <div className="grid">
                  <div className="mb-5">
                    <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                      Movie Name
                    </h6>
                    <p className="text-sm tracking-wider mb-3">
                      <input
                        type="text"
                        onChange={(e) => settitle(e.target.value)}
                        value={title}
                        className="h-10 w-full border rounded pl-3 placholder:text-[#121212]"
                        placeholder="Title movie ..."
                      />
                    </p>
                  </div>
                  <div className="mb-5">
                    <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                      Director
                    </h6>
                    <select
                      onChange={(e) =>
                        e.target.value == ""
                          ? setid_director("")
                          : setid_director(e.target.value)
                      }
                      className={
                        (id_director == "" ? "text-[#8692A6]" : "text-black") +
                        " text-sm tracking-wider mb-3 h-10 w-full border rounded pl-3 appearance-none"
                      }
                    >
                      <option
                        className="text-sm text-[#8692A6]"
                        value=""
                        disabled
                        selected
                      >
                        Select Director ...
                      </option>
                      {director
                        ? director.map((v) =>
                          id_director == v.id_director ? (
                            <option
                              className="text-black"
                              key={v.id_director}
                              selected
                              value={v.id_director}
                            >
                              {v.name_director}
                            </option>
                          ) : (
                            <option
                              className="text-black"
                              key={v.id_director}
                              value={v.id_director}
                            >
                              {v.name_director}
                            </option>
                          )
                        )
                        : ""}
                    </select>
                  </div>
                  <div className="mb-5">
                    <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                      Release Date
                    </h6>
                    <div className="relative text-[#8692A6] text-sm tracking-wider mb-3">
                      <input
                        type="date"
                        ref={dateRef}
                        onChange={(e) => setrelease_date(e.target.value)}
                        value={
                          release_date == ""
                            ? ""
                            : moment
                              .utc(release_date)
                              .utc()
                              .format("yyyy-MM-DD")
                        }
                        className={
                          (release_date == ""
                            ? "text-[#8692A6]"
                            : "text-black") +
                          " h-10 w-full pl-3 border rounded appearance-none"
                        }
                      />
                      <i
                        onClick={() => {
                          dateRef.current.showPicker();
                        }}
                        id="date"
                        className="fa fa-calendar absolute right-1 top-[10px] bg-white w-6 h-5 text-[#8692A6]"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid">
                  <div className="mb-5">
                    <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                      Category
                    </h6>
                    <Select
                      isMulti
                      name="category"
                      options={optionsgenre}
                      onChange={setmovie_id_genre}
                      value={movie_id_genre}
                      className="basic-multi-select h-12"
                      classNamePrefix="select"
                      isOptionDisabled={(optionsgenre) => optionsgenre.disabled}
                    />
                  </div>
                  <div className="mb-5">
                    <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                      Casts
                    </h6>
                    <Select
                      isMulti
                      name="category"
                      options={optionscast}
                      onChange={setmovie_id_cast}
                      value={movie_id_cast}
                      className="basic-multi-select h-12"
                      classNamePrefix="select"
                      isOptionDisabled={(optionscast) => optionscast.disabled}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="mb-5">
                      <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                        Duration Hour
                      </h6>
                      <p className="text-[#121212] text-sm tracking-wider mb-3">
                        <input
                          type="text"
                          value={duration_hour}
                          onChange={(e) => setduration_hour(e.target.value)}
                          className="h-10 w-full border rounded pl-3"
                          placeholder="2"
                        />
                      </p>
                    </div>
                    <div className="mb-5">
                      <h6 className="text-[#8692A6] text-md tracking-wider mb-3">
                        Duration Minute
                      </h6>
                      <p className="text-[#121212] text-sm tracking-wider mb-3">
                        <input
                          type="text"
                          value={duration_minute}
                          onChange={(e) => setduration_minute(e.target.value)}
                          className="h-10 w-full border rounded pl-3"
                          placeholder="30"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 lg:col-span-4">
              <h5 className="text-[#8692A6] text-md tracking-wider mb-3">
                Synopsis
              </h5>
              <p className="py-2 text-sm tracking-wider text-[#4E4B66]">
                <textarea
                  type="textarea"
                  onChange={(e) => setsynopsis(e.target.value)}
                  value={synopsis}
                  className="h-40 w-full border rounded p-2"
                  placeholder="Your message"
                ></textarea>
              </p>
            </div>
            <div className="md:col-span-5 lg:col-span-4 flex justify-end">
              <button onClick={reset_form} className="mt-3 h-10 w-40 rounded border border-[#5F2EEA] text-[#5F2EEA] text-sm font-semibold leading-none hover:bg-[#5F2EEA] active:bg-[#2A00A2] hover:text-white mr-5">
                Reset
              </button>
              <button
                onClick={insert_data}
                className="mt-3 h-10 w-40 rounded text-white bg-[#5F2EEA] text-sm font-semibold leading-none hover:bg-[#2A00A2] active:bg-[#2A00A2]"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
        <section className="flex flex-col pt-7">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 className="font-bold text-base lg:text-xl tracking-wide">
              Data Movie
            </h2>
            <div className="flex">
              <div className="w-auto pe-5 py-3 md:py-4">
                <select
                  onChange={changeSort}
                  className="z-0 rounded-lg h-7 md:h-10 w-full pl-2 text-[#4E4B66] text-sm"
                >
                  <option className="text-sm" value="sort" disabled selected>
                    Sort
                  </option>
                  <option value="title">Movie Name</option>
                  <option value="release_date">Release Date</option>
                  <option value="duration_hour, duration_minute">
                    Duration
                  </option>
                </select>
              </div>
              <div className="py-3 md:py-4">
                <input
                  onChange={(v) => setsearch(v.target.value)}
                  className="rounded-lg h-7 md:h-10 pl-5 placeholder:text-[#4E4B66] placeholder:text-sm"
                  type="text"
                  placeholder="Search Movie Name . . ."
                />
              </div>
            </div>
          </div>
        </section>
        <section
          className={
            "flex flex-wrap " +
            (movies ? "xl:grid" : "") +
            " xl:grid-cols-6 2xl:grid-cols-8 md:pt-5 md:pt-10 px-2 md:px-5 items-center text-center justify-around " +
            (movies ? "lg:justify-between" : "") +
            " md:bg-white rounded-lg shadow-sm text-center"
          }
        >
          {movies ? (
            movies.map((v) => {
              return (
                <div
                  key={v.id_movie}
                  className="flex flex-col items-center p-2 md:p-5 border border-[#DEDEDE] mb-10 rounded-lg md:mx-5 bg-white"
                >
                  <div className="h-[200px] w-[100px]">
                    <img
                      className="h-full object-cover rounded-lg"
                      src={process.env.REACT_APP_API_URL + v.image}
                      alt=""
                    />
                  </div>
                  <div className="md:mt-3">
                    <h5 className="tracking-wide text-base font-semibold">
                      {capitalTitle(
                        v.title.slice(0, 9) +
                        (v.title.split("").length > 9 ? " ..." : "")
                      )}
                    </h5>
                    <p className="my-1 text-[10px] text-[#A0A3BD]">
                      {v.movie_id_genre
                        ? v.movie_id_genre
                          .map((u) => u.name_genre)
                          .join(", ")
                          .slice(0, 20) + " ..."
                        : ""}
                    </p>
                    <button
                      onClick={() => [
                        getMovie(v.id_movie),
                        setid_movie(v.id_movie),
                        setimagereader(""),
                      ]}
                      className="mt-3 h-7 w-full rounded border border-[#5F2EEA] text-[#5F2EEA] text-sm font-semibold leading-none hover:bg-[#5F2EEA] active:bg-[#3604c3] hover:text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setdelid_movie(v.id_movie)}
                      className="mt-3 h-7 w-full rounded border border-[#ED2E7E] text-[#ED2E7E] text-sm font-semibold leading-none hover:bg-[#ED2E7E] active:bg-[#3604c3] hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mb-5">
              <h1 className="text-[#4E4B66]">Data not found</h1>
            </div>
          )}
          <div
            className={
              delid_movie == ""
                ? "hidden"
                : "block absolute h-full w-full top-0 left-0 right-0 button-0 bg-black bg-opacity-50 text-center grid items-center justify-around"
            }
          >
            <div className="bg-white p-5 rounded-lg">
              <div className="flex pb-2 border-b justify-between items-center">
                <h1 className="tracking-wider font-bold">Delete Movie</h1>
                <Link onClick={hidden_modal_delete}>
                  <i className="fa fa-times" aria-hidden="true" />
                </Link>
              </div>
              <div className="py-5">
                <p>Are you sure you want to delete movie {delid_movie} ?</p>
              </div>
              <div className="flex pt-2 border-t justify-between items-center">
                <button
                  onClick={delete_data}
                  className="bg-[#dc2626] h-8 w-20 rounded-lg text-white font-bold text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="flex pb-10 md:py-10 justify-around">
          <Pagination
            meta={metamovies}
            page_active={pageactive}
            set_page_active={setpageactive}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Manage_Movie;
