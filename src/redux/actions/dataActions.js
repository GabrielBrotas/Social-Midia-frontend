import axios from 'axios'
import {GET_SCREAMS_SUCCESS, GET_SCREAMS_ERROR, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM} from '../types'


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
