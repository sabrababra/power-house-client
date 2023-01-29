import React from 'react';

const Address = () => {
    return (
        <div>
            <div className='lg:w-10/12 mx-auto mt-0 lg:mt-[-100px]'>
                <div className='flex flex-col lg:flex-row justify-center'>

                    <div className="card lg:w-96 bg-indigo-600 text-primary-content rounded-none shadow-lg">
                        <div className="card-body">
                            <h1 className='text-3xl my-5'>Working Hours</h1>
                            <p><span className='font-semibold'>Monday - Wednesday:</span> 8:00 AM to 5:00 PM</p>
                            <p><span className='font-semibold'>Thursday, Friday:</span> 9:00 AM to 6:00 PM</p>
                            <p><span className='font-semibold'>Saturday, Sunday:</span> Closed</p>
                        </div>
                    </div>

                    <div className="card lg:w-96 lg:scale-110 z-10 bg-indigo-700 text-primary-content rounded-none shadow-lg">
                        <div className="card-body">
                            <h1 className='text-3xl my-5'>Our Address</h1>
                            <p className='font-semibold'>HQ Office:</p>
                            <p>8949 Kenamar Drive, Suite 101</p>
                            <p>Boston, MA 92121</p>
                        </div>
                    </div>

                    <div className="card lg:w-96 bg-indigo-600 text-primary-content rounded-none shadow-lg">
                        <div className="card-body">
                            <h1 className='text-3xl my-5'>Contact Us</h1>
                            <p><span className='font-semibold'>Phone:</span> 123456789</p>
                            <p><span className='font-semibold'>Fax:</span>000 123 456</p>
                            <p><span className='font-semibold'>Email:</span> xyz@mail.com</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Address;