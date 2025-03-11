import React, { useState } from 'react'
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom'

const Register = () => {

    const [message , setMessage] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [registerUser , {isLoading}]  = useRegisterUserMutation();
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        const data ={
            username,
            email,
            password
        }

        try{
          await registerUser(data).unwrap();
          alert("reg succ")
          navigate("/login")

        }catch{
          setMessage("Registration Failed")
        }

        // console.log(data)
    }
  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              placeholder="Enter your username"
              autoComplete="username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
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
              Register
            </button>
          </div>
        </form>
        {
            message && <p className='text-red-500'>{message}</p>
        }
        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register