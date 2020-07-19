import {GET_SCREAMS_ERROR, LOADING_DATA, GET_SCREAMS_SUCCESS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM} from '../types'

const initialState = {
    loading: false,
    screams: [],
    scream: {},
    error: null
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {...state, loading: true};
        
        case GET_SCREAMS_SUCCESS:
            return {...state, screams: action.payload, loading: false};
        
        case GET_SCREAMS_ERROR:
            return {...state, error: true, loading: false}
        
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {...state}
            
        case DELETE_SCREAM:
            let indexToDelete = state.screams.findIndex( scream => scream.screamId === action.payload);
            state.screams.splice(indexToDelete, 1)
            return {...state}
            
        default:
            return state

    }
}