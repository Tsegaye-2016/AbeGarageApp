import React from 'react'
import Banner from '../components/BottomBanner/BottomBanner';
import Features from '../components/Features/Features';
import AboutUs from '../components/AboutUs/AboutUs';
import Service1 from '../components/Service/Service1';
import Service2 from '../components/Service/Service2';
import AboutUs2 from '../components/AboutUs/AboutUs2';
import AboutUs3 from '../components/AboutUs/AboutUs3';
function Home() {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Service1 />
      <Features />
      <Service2 />
      <AboutUs2 />
      <AboutUs3 />
    </div>
  )
}

export default Home
