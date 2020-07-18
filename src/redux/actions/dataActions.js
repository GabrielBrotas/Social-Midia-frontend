import axios from 'axios'
import {GET_SCREAMS_SUCCESS, GET_SCREAMS_ERROR, GET_SCREAMS_LOADING} from '../types'


export const getScreams = () => (dispatch) => {
    dispatch({type: GET_SCREAMS_LOADING})
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

