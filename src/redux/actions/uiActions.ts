import { uiActionTypes } from "../constants/uiActionTypes";

export const changeSwitchIndex = (buttonIndex) => (dispatch) => {
  console.log("indexxx", buttonIndex);
  dispatch({ type: uiActionTypes.BUTTON_INDEX, payload: buttonIndex });
};
