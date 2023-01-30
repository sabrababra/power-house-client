import React, { useEffect, useState } from 'react';
import BillingRow from './BillingRow';
import { toast } from 'react-toastify';
import './Billing.css';

const Billing = () => {
    const [openModal, setOpenModal] = useState(false);
    const [BillingData, setBillingData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');

    const [phoneError, setPhoneError] = useState('');
    const [paidError, setPaidError] = useState('');
    const [total, setTotal] = useState(0);

    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const pages = Math.ceil(count / size);

    const getData = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        fetch(`https://power-hacks-server.vercel.app/api/billing-list?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${userData?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setCount(data?.count)
                setBillingData(data?.info);
                setSearchData(data?.info);
                const totalPaid = data?.info.reduce((a, b) => a + b.paidAmount, 0)
                setTotal(totalPaid)

            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [page, size])

    useEffect(() => {
        console.log(search);

        if (search) {
            const newData = BillingData.filter(x => x.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || x.email.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || x.phone.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            console.log(newData)
            setSearchData(newData);
        } else {
            setSearchData(BillingData);
        }

    }, [search])

    const waitForAddBilling = (data) => {
        let newArray=[...searchData];
        newArray.unshift({ ...data, _id: 'Generating Id...' });
        setSearchData(newArray);
    };

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
            const formData = {
                fullName: fullName,
                email: email,
                phone: phone,
                paidAmount: parseFloat(paidAmount)
            };
            setPhoneError('');
            setPaidError('');
            console.log(formData);

            const userData = JSON.parse(localStorage.getItem('user'));

            setOpenModal(false);
            waitForAddBilling(formData);

            fetch(`https://power-hacks-server.vercel.app/api/add-billing`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${userData?.accessToken}`
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setTimeout(() => {
                        getData();
                        toast.success('Added Successfully');
                    }, 1000);
                })
                .catch(error => {
                    console.log(error);
                    setTimeout(() => {
                        toast.error(`Added Failed (${error})`);
                        getData();
                    }, 1000);
                })
        }
    }


    return (
        <div className='bg-indigo-50'>
            <div className='w-11/12 mx-auto py-10'>
                <div className='flex justify-between items-center bg-indigo-400 p-4 rounded-lg text-xl'>
                    <p>Billing list</p>
                    <p>Total Paid: $ {total}</p>
                </div>

                <div className='w-11/12 lg:w-10/12 mx-auto mt-10 bg-indigo-200 p-4 rounded-lg'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-4 items-center w-full'>
                            <p>Search Billing :</p>
                            <input
                                type="text"
                                placeholder="Search by full name, email, phone"
                                className="input w-full lg:max-w-lg border-gray-400"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <label onClick={() => setOpenModal(true)} htmlFor="addNewBillingModal" className="btn btn-primary">Add new bill</label>
                    </div>

                    {/* add new billing modal */}
                    {
                        openModal && <>
                            <input type="checkbox" id="addNewBillingModal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box relative">
                                    <label htmlFor="addNewBillingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                    <h3 className="text-lg font-bold">Add New Billing</h3>

                                    <form onSubmit={onSubmit} className='flex flex-col gap-1 my-5'>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Full name</span>
                                            </label>
                                            <input
                                                type="text"
                                                name='fullName'
                                                placeholder="Full Name" className="input w-full border-gray-700"
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Email</span>
                                            </label>
                                            <input
                                                type="email"
                                                name='email'
                                                placeholder="Email" className="input w-full border-gray-700"
                                                required
                                            />
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Phone</span>
                                            </label>
                                            <input
                                                type="number"
                                                name='phone'
                                                placeholder="Phone number" className="input w-full border-gray-700"
                                                required
                                            />
                                            {phoneError && <p className='text-red-500'>{phoneError}</p>}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Paid Amount</span>
                                            </label>
                                            <input
                                                type="number"
                                                name='paidAmount'
                                                placeholder="Paid Amount $" className="input w-full border-gray-700"
                                                required
                                            />
                                            {paidError && <p className='text-red-500'>{paidError}</p>}
                                        </div>

                                        <button className='btn btn-primary w-1/3 mx-auto mt-4'>Submit</button>

                                    </form>

                                </div>
                            </div>
                        </>
                    }



                    <div>
                        <div className="overflow-x-auto my-10">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Billing ID</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Paid Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchData.map(item => <BillingRow
                                            key={item._id}
                                            item={item}
                                            getData={getData}
                                        />)
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">

                            <div className='pagination-border'>
                                {
                                    [...Array(pages).keys()].map(number => <button
                                        key={number}
                                        className={page === number ? 'selected' : 'unselect'}
                                        onClick={() => setPage(number)}
                                    >
                                        {number + 1}
                                    </button>)
                                }
                            </div>
                            {/* <select onChange={event => setSize(event.target.value)}>
                                <option value="3">3</option>
                                <option value="6" selected>6</option>
                                <option value="18">18</option>
                                <option value="24">24</option>
                            </select> */}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Billing;