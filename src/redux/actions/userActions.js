import {SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {

    // mandar actions para dizer que está carregando a pagina
    dispatch({type: LOADING_UI});

    // fazer requisição para logar o user
    axios.post('/login', userData)
    .then( res => {

        const FBIdToken = `Bearer ${res.data.token}`

        localStorage.setItem('FBIdToken', `Bearer ${FBIdToken}`)
        
        // sempre que fizer uma requisição via axios vai ter essa header com o token do usuario
        axios.defaults.headers.common['Authorization'] = FBIdToken 
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS})
        history.push('/')
    })
    .catch( err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}


export const getUserData = () => (dispatch) => {
    axios.get('/user')
        .then( res => {
            dispatch({type: SET_USER, payload: res.data})
        })
        .catch( err => console.log(err))
}