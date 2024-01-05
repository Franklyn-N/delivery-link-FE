import { userActionTypes } from '../constants/userActionTypes'
import axiosInstance from '../../services/api';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/index'; 

interface CustomError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface LoadUserSuccessAction {
   type: typeof userActionTypes.LOADUSER_SUCCESS;
   payload: object; // Adjust the type of payload based on your data structure
 }
 
 interface LoadUserFailAction {
   type: typeof userActionTypes.LOADUSER_FAIL;
   payload: null;
 }
 
 type UserAction = LoadUserSuccessAction | LoadUserFailAction;

 export const loadUser = (): ThunkAction<void, RootState, unknown, UserAction> => async (
  dispatch: Dispatch<UserAction>
): Promise<void> => {
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