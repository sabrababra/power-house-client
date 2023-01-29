import React, { useState } from 'react';
import { toast } from 'react-toastify';


const BillingRow = ({ item, getData }) => {
    const { _id, fullName, email, phone, paidAmount } = item;
    const [openModal, setOpenModal] = useState(false);

    const [phoneError, setPhoneError] = useState('');
    const [paidError, setPaidError] = useState('');

    const userData = JSON.parse(localStorage.getItem('user'));

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



            fetch(`https://power-hacks-server.vercel.app/api/update-billing/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${userData?.accessToken}`
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setOpenModal(false);
                    getData();
                    toast.success('Updated Successfully');
                })
                .catch(error => {
                    console.log(error);
                    toast.error(`Update Failed (${error})`);
                    getData();
                })
        }
    }


    const handleDelete = (id) => {
        fetch(`https://power-hacks-server.vercel.app/api/delete-billing/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${userData?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getData();
                toast.success('Deleted Successfully');
            })
            .catch(error => {
                console.log(error);
                toast.error(`Delete Failed (${error})`);
                getData();
            })

    }

    return (
        <>
            <tr>
                <td>{_id}</td>
                <td>{fullName}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>$ {paidAmount}</td>
                <td className='flex justify-center items-center gap-2'>
                    <label onClick={() => setOpenModal(true)} htmlFor={`updateModal_${_id}`} className='btn btn-xs btn-info'>Edit</label>
                    <label htmlFor={`deleteModal_${_id}`} className='btn btn-xs bg-error'>delete</label>
                </td>
            </tr>

            {
                openModal && <>
                    <input type="checkbox" id={`updateModal_${_id}`} className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor={`updateModal_${_id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold">Update Billing</h3>

                            <form onSubmit={onSubmit} className='flex flex-col gap-1 my-5'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name='fullName'
                                        placeholder="Full Name" className="input w-full border-gray-700"
                                        defaultValue={fullName}
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
                                        defaultValue={email}
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
                                        defaultValue={phone}
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
                                        defaultValue={paidAmount}
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

            <input type="checkbox" id={`deleteModal_${_id}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative text-center">
                    <label htmlFor={`deleteModal_${_id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure to delete {fullName} ?</h3>
                    <div className='my-5 flex justify-around items-center'>
                        <label htmlFor={`deleteModal_${_id}`} className="btn btn-accent">No</label>
                        <label htmlFor={`deleteModal_${_id}`} className="btn btn-error" onClick={() => handleDelete(_id)}>Yes</label>
                    </div>
                </div>
            </div>


        </>
    );
};

export default BillingRow;