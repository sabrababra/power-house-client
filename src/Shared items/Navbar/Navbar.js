import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../hook/useUser';

const Navbar = () => {
    const { user, setUserData } = useUser();

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user')))
    }, [localStorage.getItem('user')])


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/service'>Service</Link></li>
                        <li><Link to='/billing'>Billing</Link></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Power - Hack </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/service'>Service</Link></li>
                    <li><Link to='/billing'>Billing</Link></li>
                </ul>
            </div>
            <div className="navbar-end">
                {user?.email ?
                    <div className='flex gap-2 items-center'>
                        <p>{user.email}</p>
                        <button className='btn btn-ghost' onClick={() => {
                            setUserData(localStorage.clear());
                        }}>Logout</button>
                    </div>
                    : <Link to='/login' className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;