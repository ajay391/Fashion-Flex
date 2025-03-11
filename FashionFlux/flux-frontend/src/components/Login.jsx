import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from '../redux/features/auth/authSlice';
// import { useSearchParams } from 'react-router-dom'

const Login = () => {

    const [message , setMessage] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation(); 
    const navigate = useNavigate()

    // console.log(loginUser)


    // handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        const data ={
            email,
            password
        }

        // console.log(data)

        try{
            const response = await loginUser(data).unwrap();
            // console.log(response)
            const {token, user} = response;
            dispatch(setUser({user}))
            alert("Login Successful");
            // navigate("/")

            if (user.role === "admin") {
              navigate("/admin/dashboard");
            } else {
                navigate("/");
            }
        }catch(error){
          setMessage("Please Provide a valide email or password")
        }
    }   
  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-primary-dark transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
        {
            message && <p className='text-red-500'>{message}</p>
        }
        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login