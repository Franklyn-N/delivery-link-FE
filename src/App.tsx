/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { useEffect } from 'react';
import { userActionTypes } from './redux/constants/userActionTypes';
import { Flex, Spinner } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup/signup';
import Cards from './pages/cards/cards';
import Login from './pages/auth/login/login';
import axiosInstance from './services/api';

interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

function App() {
  const dispatch = useDispatch();
  
   const loadUser = async () => {
    const uid = localStorage?.uid
     try {
       if (localStorage.DLTK) {
         const { data } = await axiosInstance.get(`/user/${uid}`);
         dispatch({ type: userActionTypes.LOADUSER_SUCCESS, payload: data });
       } else {
         localStorage.removeItem('DLTK');
         window.location.href = '/';
       }
     } catch(error: unknown) {
      dispatch({ type: userActionTypes.LOADUSER_FAIL, payload: null });
      localStorage.removeItem('DLTK');
      window.location.href = '/';
      console.log('heloooooo');
      const customError = error as CustomError;
      const errorMessage = customError.response?.data?.message || 'An error occurred';
      if(error instanceof Error) {
        console.log(errorMessage);
        localStorage.removeItem('DLTK');
        window.location.href = '/';
      }
      
  }
   };

  const loading = useSelector(({userData})=>  userData?.isLoading);
  const currentUser = useSelector(({userData})=>  userData?.currentUser);

  useEffect(() => {
    if(localStorage.DLTK) {
      loadUser()
    } else {
      dispatch({type: userActionTypes.LOADUSER_FAIL, payload: null})
    }
  }, [])


  return (
    <>
       {loading ? 
    <Flex marginTop={"20rem"} justifyContent={"center"}>
      <Spinner size={"lg"} color="#7F56D9" />
    </Flex>
    :
    <div className="App">
        <Routes>
          <Route path='/'  element={currentUser ? <Cards />  : <Login />} />
          <Route path='/login'  element={<Login />} />
          <Route path='/signup'  element={<Signup />} />
        </Routes>
    </div>}
    </>
  )
}

export default App
