// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { login } from '../services/opretions/userApi'
// import { useDispatch } from 'react-redux';

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [formdata, setFormData] = useState({
//     Email : "", Password: ""
//   })
//   const changeHandler = (e) => {
//     const {name, value} = e.target
//     setFormData({
//       ...formdata, [name] : value
//     })
//   }
//   const submitHandler = async(e) => {
//     e.preventDefault();
//     await login(formdata, navigate, dispatch)
//     setFormData({
//       Email : "", Password: ""
//     })
//   }

//   return (
//     <div className='sm:mt-[-82px]'>
//       <div className='w-full max-w-md mx-auto mb-14 p-5 '>
//       <h2 className='text-2xl font-bold text-center'>Enter your UserID and Password</h2>
//       <form action="" onSubmit={submitHandler}>
//         <div className=' mt-4'>
//             <label className=' text-lg font-semibold' htmlFor="UserID">UserID <span className=' text-lg text-red-500 '>*</span> </label><br />
//             <input name="Email" onChange={changeHandler} value={formdata.Email} className=' border-2 w-full px-4 py-2 mt-2 outline-blue-600' type="text" placeholder='Enter Your UserID'/>
//         </div>
//         <div className=' mt-4'>
//             <label className=' text-lg font-semibold' htmlFor="Password">Password <span className=' text-lg text-red-500'>*</span> </label><br />
//             <input name="Password" onChange={changeHandler} value={formdata.Password} className=' outline-blue-600 border-2 w-full px-4 py-2 mt-2' type="password"  placeholder='Enter Your Password'/>
//         </div>
//         <button className=' bg-blue-600 hover:bg-blue-700 hover:text-white duration-150 px-3 py-2 rounded-md w-full mt-7 text-gray-200' type='submit' >Submit</button>
//       </form>
//     </div>
//     </div>
//   )
// }

// export default LoginForm


// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/opretions/userApi'
import { useDispatch } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setFormData] = useState({
    Email: "", 
    Password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata, 
      [name]: value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await login(formdata, navigate, dispatch);
    setFormData({
      Email: "", 
      Password: ""
    });
  };

  return (
    <div className='sm:mt-[-82px]'>
      <div className='w-full max-w-md mx-auto mb-14 p-5'>
        <h2 className='text-2xl font-bold text-center'>Enter your UserID and Password</h2>
        <form onSubmit={submitHandler}>
          <div className='mt-4'>
            <label className='text-lg font-semibold' htmlFor="UserID">
              UserID <span className='text-lg text-red-500'>*</span>
            </label><br />
            <input 
              name="Email" 
              onChange={changeHandler} 
              value={formdata.Email} 
              className='border-2 w-full px-4 py-2 mt-2 outline-blue-600' 
              type="text" 
              placeholder='Enter Your UserID'
            />
          </div>
          <div className='mt-4 relative'>
            <label className='text-lg font-semibold' htmlFor="Password">
              Password <span className='text-lg text-red-500'>*</span>
            </label><br />
            <input 
              name="Password" 
              onChange={changeHandler} 
              value={formdata.Password} 
              className='outline-blue-600 border-2 w-full px-4 py-2 mt-2 pr-10' 
              type={showPassword ? "text" : "password"}  
              placeholder='Enter Your Password'
            />
            <button 
              type="button" 
              className='absolute right-3 top-11 text-gray-600'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </button>
          </div>
          <button 
            className='bg-blue-600 hover:bg-blue-700 hover:text-white duration-150 px-3 py-2 rounded-md w-full mt-7 text-gray-200' 
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
