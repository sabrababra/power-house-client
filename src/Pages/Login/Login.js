import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../Assets/login.png';
import useUser from '../../hook/useUser';

const Login = () => {
  const { user, setUserData } = useUser();

  const [error, setError] = useState('')
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginData = { email, password };
    console.log(loginData);

    if (email && password) {
      fetch(`https://power-hacks-server.vercel.app/api/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data?.message) {
            setError(data?.message)
          } else if (data?.accessToken) {
            localStorage.setItem('user', JSON.stringify(data));
            form.reset();
            setUserData(data);
            navigate(from, { replace: true });
          }
        })
    } else {
      setError('Invalided email and password')
    }
  };



  return (
    <div className=" flex min-h-screen bg-base-200 justify-center items-center">
      <div className="w-10/12 mx-auto p-5 rounded-xl shadow-lg bg-white grid grid-cols-12 justify-center items-center">
        <div className="col-span-12 lg:col-span-6">

          <img src={login} alt="" />
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className='text-center mb-3'>
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className=" bg-base-100 rounded-lg">
            <form onSubmit={onSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name='email'
                  placeholder="email"
                  className="input input-bordered"
                  required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name='password'
                  placeholder="password"
                  className="input input-bordered"
                  required />
                <label className="label justify-start gap-1">Create an account
                  <Link to='/register' className="label-text-alt link link-hover">Register now</Link>
                </label>
              </div>
              {error && <p className='text-red-500'>{error}</p>}
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

export default Login;