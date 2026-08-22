import React, { useEffect } from 'react'
import { usePageMeta } from '../hooks/usePageMeta.jsx'
import Navbar from '../components/Navbar'
import Landingg from '../components/Landing'
import Herobox from '../components/Herobox'
import AboutUs from '../components/AboutUs'
import EducationDirections from '../components/EducationDirections'
import FounderMessage from '../components/FounderMessage'
import BlogSection from '../components/BlogSection'
import EventSection from '../components/EventSection'
import Testimonials from '../components/testimonials/index'
import Footer from '../components/Footer'
import PlacementGuaranteeBlock from '../components/PlacementGuaranteeBlock'
import AVGCGrowthSpotlight from '../components/home/AVGCGrowthSpotlight'

const Home = () => {
    const pageMetaTags = usePageMeta('home');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            {pageMetaTags}
            <Landing />
            <Herobox />
            <AVGCGrowthSpotlight />
            <AboutUs />
            <PlacementGuaranteeBlock />
            <EducationDirections />
            <FounderMessage />
            <BlogSection />
            <EventSection />
            <Testimonials />
        </>
    )
}

export default Home
