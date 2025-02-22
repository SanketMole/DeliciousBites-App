import React from 'react'
import { Header } from '../Components/Header'

function About({cart, setcart, userData}) {
    return (
        <>
        <Header cart={cart} setcart={setcart} userData={userData} />
        </>
    )
}

export default About
