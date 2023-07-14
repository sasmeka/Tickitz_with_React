import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './page/home/index'
import Sign_in from "./page/sign_in";
import Sign_up from "./page/sign_up";
import Verification from "./page/verification";
import List_movie from './page/list_movie';
import Detail_movie from './page/detail_movie'
import Manage_movie from './page/manage_movie'
import Profile from './page/profile';
import ErrorContext from "./helper/context_error";
import SuccessContext from './helper/context_success';

function router() {
    const [success_message, setsuccess_message] = useState("");
    const value_success = { success_message, setsuccess_message };
    const [error_message, seterror_message] = useState("");
    const value_error = { error_message, seterror_message };
    return (
        <ErrorContext.Provider value={value_error}>
            <SuccessContext.Provider value={value_success}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/sign-in" element={<Sign_in />} />
                        <Route path="/sign-up" element={<Sign_up />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/verification" element={<Verification />} />
                        <Route path="/list_movie" element={<List_movie />} />
                        <Route path="/detail_movie/:id" element={<Detail_movie />} />
                        <Route path="/manage_movie" element={<Manage_movie />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </BrowserRouter>
            </SuccessContext.Provider>
        </ErrorContext.Provider>
    )
}

export default router