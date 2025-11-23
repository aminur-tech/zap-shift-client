import React from 'react';
import Banner from './Banner';
import Brand from './Brand';
import Review from './Review';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import Footer from '../../Component/Footer';

const Home = () => {
    return (
        <div className='space-y-15 mb-10'>
            <title>Home</title>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Brand></Brand>
            <Review></Review>
        </div>
    );
};

export default Home;