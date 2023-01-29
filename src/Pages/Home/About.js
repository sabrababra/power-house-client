import React from 'react';
import img01 from '../../Assets/img01.jpg';

const About = () => {
    return (
        <div className='w-11/12 lg:w-9/12 mx-auto m-16'>
            <div className='flex flex-col lg:flex-row justify-center items-center'>
                <div className='lg:w-1/2'>
                    <img src={img01} alt="" />
                </div>
                <div className='lg:w-1/2 text-left px-10'>
                    <h1 className='text-3xl py-5'>Who We Are</h1>
                    <p className='my-5'>Our company is an end-to-end, customer oriented alternative energy company that is centered on the marketing, trading, transportation, and distribution of batteries, grid systems, wind turbines and solar panels in the US and around the world… Firstly, we’re an environmentally friendly renewable energy company offering a broad portfolio of technologies, products, & solutions to our clients globally!</p>
                    <p className='font-semibold mb-5'>We’re the #1 solar energy & wind turbines provider in the States!</p>
                    <p className='mb-5'>We’re providing sales and servicing in all of the US states and territories. Our products are the most efficient and reasonably priced in the industry. The warranties and a production guarantee are provided at no additional cost.</p>

                    <button className='btn btn-primary'>View More</button>
                </div>
            </div>
        </div>
    );
};

export default About;