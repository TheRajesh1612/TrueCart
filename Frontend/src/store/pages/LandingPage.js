import React from 'react'
import NavBar from '../components/NavBar/NavBar'
// import NewCollections from '../components/NewCollections/NewCollections'
// import Products from '../components/Products/Products'
// import FooterSection from '../components/Footer/FooterSection'
import Home from './HomePage/HomePage'


const LandingPage = () => {
  return (
    <>
    <div className='LandingPage'>
        <NavBar/>    
        {/* <NewCollections/>
        <Products/>
        <FooterSection/> */}
        <Home/>
    </div>
    </>
  )
}

export default LandingPage