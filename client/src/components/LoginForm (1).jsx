import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className='mt-10'>
    <div className='w-full max-w-md mx-auto mb-14 p-5 border-2 border-gray-300 rounded-md'>
      <h2 className='text-2xl font-bold text-center'>Enter your UserID and Password</h2>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label className='text-lg font-semibold' htmlFor="UserID">UserID <span className='text-lg text-red-500'>*</span></label><br />
          <input className='border-2 w-full px-4 py-2 mt-2' type="text" name='UserID' placeholder='Enter Your UserID' />
        </div>
        <div className='mt-4'>
          <label className='text-lg font-semibold' htmlFor="Password">Password <span className='text-lg text-red-500'>*</span></label><br />
          <input className='border-2 w-full px-4 py-2 mt-2' type="password" name='Password' placeholder='Enter Your Password' />
        </div>
        <button className='bg-blue-600 hover:bg-blue-700 hover:text-white duration-150 px-3 py-2 rounded-md w-full mt-7 text-gray-200' type='submit'>Submit</button>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
