import {GET_SCREAMS_ERROR, GET_SCREAMS_LOADING, GET_SCREAMS_SUCCESS} from '../types'

const initialState = {
    loading: false,
    screams: null,
    error: null
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_SCREAMS_LOADING:
            return {...state, loading: true};
        
        case GET_SCREAMS_SUCCESS:
            return {...state, screams: action.payload, loading: false};
        
        case GET_SCREAMS_ERROR:
            return {...state, error: true, loading: false}
        default:
            return state

    }
}