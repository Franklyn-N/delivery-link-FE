/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'redux';

interface Action {
  type: string;
  payload?: any;
}

export const dispatchAction = (dispatch: Dispatch<Action>, type: string, payload?: any): void => {
  dispatch({ type, payload });
};