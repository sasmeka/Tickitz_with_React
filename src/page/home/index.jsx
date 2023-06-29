import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";

function Home() {
    return (
        <>
            <Header />
            {
                window.env.BASE_URL
            }
            <Footer />
        </>
    )
}

export default Home