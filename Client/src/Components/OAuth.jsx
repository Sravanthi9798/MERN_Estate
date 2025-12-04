import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from '@firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/user.slice';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const OAuth = () => {
const dispatch=useDispatch();
const navigate=useNavigate();

const handleGoogleClick = async () => {
  try { 
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const response = await axios.post('/api/auth/google', {
      name: result.user.displayName,
      email: result.user.email,
      photo: result.user.photoURL
    });

    dispatch(signInSuccess(response.data));
    navigate('/');
  } catch (error) {
    console.log('Could not connect with Google', error);
  }
};

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white p-3 rounded-lg uppercase
    hover:opacity-85 cursor-pointer'>
        Continue with google
    </button>
  )
}

export default OAuth;
