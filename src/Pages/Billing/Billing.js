import React, { useEffect, useState } from 'react';
import BillingRow from './BillingRow';

const Billing = () => {
    const [searchData, setSearchData] = useState([]);

    const [phoneError, setPhoneError] = useState('');
    const [paidError, setPaidError] = useState('');

    const getData = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:5000/api/billing-list`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${userData?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        setPhoneError('');
        setPaidError('');

        const form = e.target;
        const fullName = form.fullName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const paidAmount = form.paidAmount.value;

        if (phone.length < 11) {
            setPhoneError('minimum 11 digit');
        }
        if (parseFloat(paidAmount) < 0) {
            setPaidError('positive amount');
        }
        if (phone.length >= 11 && parseFloat(paidAmount) >= 0) {
            const formData = { fullName, email, phone, paidAmount };
            setPhoneError('');
            setPaidError('');
            console.log(formData);
        }
    }

    return (
        <div>
            <div className='w-11/12 mx-auto'>
                <div className='flex justify-between items-center'>
                    <img src="" alt="" />
                    <p>Total Paid: </p>
                </div>

                <div className='w-11/12 lg:w-9/12 mx-auto my-10'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-4 items-center'>
                            <p>Billing</p>
                            <input type="text" placeholder="Type here" className="input w-full max-w-md border-gray-400" />
                        </div>
                        <label htmlFor="addNewBillingModal" className="btn btn-primary">Add new bill</label>
                    </div>

                    {/* add new billing modal */}
                    <input type="checkbox" id="addNewBillingModal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="addNewBillingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold">Add New Billing</h3>
                            <form onSubmit={onSubmit} className='flex flex-col gap-4 my-10'>
                                <input
                                    type="text"
                                    name='fullName'
                                    placeholder="Full Name" className="input w-full border-gray-700"
                                    required
                                />

                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Email" className="input w-full border-gray-700"
                                    required
                                />

                                <input
                                    type="number"
                                    name='phone'
                                    placeholder="Phone number" className="input w-full border-gray-700"
                                    required
                                />
                                {phoneError && <p className='text-red-500'>{phoneError}</p>}

                                <input
                                    type="number"
                                    name='paidAmount'
                                    placeholder="Paid Amount $" className="input w-full border-gray-700"
                                    required
                                />
                                {paidError && <p className='text-red-500'>{paidError}</p>}

                                <button className='btn btn-primary w-1/3 mx-auto'>Submit</button>


                            </form>
                        </div>
                    </div>

                    <div>
                        <div className="overflow-x-auto my-10">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Billing ID</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Paid Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <BillingRow />
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Billing;