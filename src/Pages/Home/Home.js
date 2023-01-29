import React from 'react';
import About from './About';
import Address from './Address';
import Banner from './Banner';
import OurServices from './OurServices';

const Home = () => {
    return (
        <div>
            <Banner
                title='Wind or Solar'
                text='Wanna go green, but not sure which option to choose? Either of our 232 consultants will help you out!'
                buttonName='Find out more'
                height='min-h-screen'
            />
            <Address />
            <About />
            <Banner
                title='Get Free Consultancy About Your Project
                '
                text='Firstly, we’re an environmentally friendly renewable energy company offering a broad portfolio of technologies, products, & solutions to our clients globally'
                buttonName='Ask a Question'
                height='h-[400px]'
            />

            <OurServices />
        </div>
    );
};

export default Home;