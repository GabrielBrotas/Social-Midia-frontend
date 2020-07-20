import axios from 'axios'
import {GET_SCREAMS_SUCCESS, GET_SCREAMS_ERROR, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, SET_ERRORS, POST_SCREAM, CLEAR_ERRORS, LOADING_UI, GET_SCREAM_SUCCESS, STOP_LOADING_UI} from '../types'


export const getScreams = () => (dispatch) => {
    dispatch({type: LOADING_DATA})
    // pegar todas as screams na api, foi definida a url da api no package.json em 'proxy'
    axios.get('/screams')
    .then( res => {
        dispatch({type: GET_SCREAMS_SUCCESS, payload: res.data})
    })
    .catch( err => {
        console.log(err)
        dispatch({type: GET_SCREAMS_ERROR})
    })

}

// like a scream
export const likeScream = (screamId) => dispatch => {   

    axios.get(`/scream/${screamId}/like`)
        .then( res => {

            dispatch({type: LIKE_SCREAM, payload: res.data})
        })
        .catch( err => {
            console.log(err)
        })
}
// unlike scream
export const unlikeScream = (screamId) => dispatch => {  

    axios.get(`/scream/${screamId}/unlike`)
        .then( res => {
            dispatch({type: UNLIKE_SCREAM, payload: res.data})
        })
        .catch( err => {
            console.log(err)
        })
}

// post scream
export const postScream = (newScream) => dispatch => {
    dispatch({type: LOADING_UI})

    axios.post('/scream', newScream)
        .then( res => {
            dispatch({ type: POST_SCREAM, payload: res.data})
            dispatch({type: CLEAR_ERRORS})
        })
        .catch( err => {
            dispatch({type: SET_ERRORS, payload: err.response.data})
        })
}

export const getScream = (screamId) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.get(`/scream/${screamId}`)
        .then( res => {
            dispatch({type: GET_SCREAM_SUCCESS, payload: res.data})
            dispatch({type: STOP_LOADING_UI})
        })
        .catch( err => console.log(err))
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
        .then( () => {
            dispatch({type: DELETE_SCREAM, payload: screamId})
        })
        .catch(err=> console.log(err))
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}