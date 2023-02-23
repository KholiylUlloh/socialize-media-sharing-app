import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import wallpaper from "../assets/back.png"
import {FaSlideshare} from 'react-icons/fa'
import jwt_decode from 'jwt-decode'
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate()
  const resGoogle = (res) => {
      const decoded = jwt_decode(res.credential)
      const {name, picture, sub} = decoded
      localStorage.setItem('user', JSON.stringify(decoded))

      const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
      }

      client.createIfNotExists(user)
      .then(() => {
        navigate('/', {replace: true})
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <img
          src={wallpaper}
          alt='wallpaper'
          className='w-full h-full object-cover object-top'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
            <div className='p-5 flex flex-col items-center text-white gap-1 text-xl'>
                <FaSlideshare color='white' size={50} />
                <h1 style={{fontFamily:"'Shantell Sans', cursive"}}>Socialize</h1>
            </div>
            <div className='shadow-2x1'>
                  <GoogleLogin
                    onSuccess={resGoogle}
                    onError={resGoogle}
                    className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  />
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login