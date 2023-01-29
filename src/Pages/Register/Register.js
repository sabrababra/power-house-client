import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../Assets/login.png';
import { toast } from 'react-toastify';


const Register = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if (password.length < 6) {
            setError('Password must have 6 letter')
        }
        else if (password === confirm) {
            const formData = { name, email, password };
            console.log(formData);

            fetch(`https://power-hacks-server.vercel.app/api/registration/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    form.reset();
                    toast.success('Register Successfully, now please login');
                    navigate('/login');
                })

        } else {
            setError("confirm password doesn't match")
        }
    }


    return (
        <div className=" flex min-h-screen bg-base-200 justify-center items-center">
            <div className="w-10/12 mx-auto p-5 rounded-xl shadow-lg bg-white grid grid-cols-12 justify-center items-center">
                <div className="col-span-12 lg:col-span-6">

                    <img src={login} alt="" />
                </div>

                <div className="col-span-12 lg:col-span-6">
                    <div className='text-center mb-3'>
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <div className=" bg-base-100 rounded-lg">
                        <form onSubmit={onSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text"
                                    placeholder="your name" className="input input-bordered" name='name'
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder=" your email"
                                    className="input input-bordered"
                                    name='email'
                                    required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder=" your password"
                                    className="input input-bordered"
                                    name='password'
                                    required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"> Confirm Password</span>
                                </label>
                                <input type="password" placeholder="confirm password" className="input input-bordered"
                                    name='confirm'
                                    required />

                                <label className="label justify-start gap-1">Already have an account
                                    <Link to='/login' className="label-text-alt link link-hover">Login now</Link>
                                </label>

                            </div>
                            {
                                error && <p className='text-red-500 my-2'>{error}</p>
                            }
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;