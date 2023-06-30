import React, { useEffect } from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import axios from 'axios'

function Home() {
    useEffect(() => {
        document.title = 'Home';
    }, []);
    return (
        <>
            <Header />
            <Footer />
        </>
    )
}

export default Home