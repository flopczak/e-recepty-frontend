import {CLEAR_ERRORS} from "./types";

export const clear = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
}