import React from 'react';
import { servicesData } from '../../dummyData';

const OurServices = () => {

    return (
        <div className='my-10 w-11/12 lg:w-10/12 mx-auto text-center'>
            <h1 className='text-4xl py-10 font-semibold'>Our Services</h1>
            <p className='text-gray-400 w-10/12 lg:w-8/12 mx-auto '>Firstly, we’re an environmentally friendly renewable energy company offering a broad portfolio of technologies, products, & solutions to our clients globally</p>

            <div className='grid grid-cols-1 lg:grid-cols-3 w-11/12 lg:w-10/12 mx-auto mt-10'>
                {
                    servicesData.map(item => <div key={item.id}
                        className="p-5 hover:text-primary border-b-4 border-white hover:border-indigo-600 hover:bg-indigo-100"
                    >
                        <img className='w-16 h-16 mx-auto mt-5' src={item.img} alt="" />
                        <h1 className='text-2xl font-semibold my-10'>{item.name}</h1>
                        <p className='text-gray-500'>{item.text}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default OurServices;