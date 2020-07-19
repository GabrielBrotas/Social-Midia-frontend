import {SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER} from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => (dispatch) => {
    
    // mandar actions para dizer que está carregando a pagina
    dispatch({type: LOADING_UI});
    dispatch(logoutUser())
    console.log('dispatchin login user')
    // fazer requisição para logar o user
    axios.post('/login', userData)
    .then( res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS})
        history.push('/')
    })
    .catch( err => {
        console.log('erro = ')
        console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
}

export const signupUser = (newUserData, history) => (dispatch) => {

    // mandar actions para dizer que está carregando a pagina
    dispatch({type: LOADING_UI});
    dispatch(logoutUser())
    // fazer requisição para logar o user
    axios.post('/signup', newUserData)
    .then( async res => {
        console.log(res.data)
        await setAuthorizationHeader(res.data.userToken.i)
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

export const logoutUser = () => (dispatch) => {
    // remover o local Storage com os dados do user
    localStorage.removeItem('FBIdToken');
    
    // remover do header do axios a autorização que um usuario logado tinha para as rotas
    delete axios.defaults.headers.common['Authorization'];

    // limpar os dados do user (credenciais, likes, notifications, authenticated) no store do axios e colocar no initialState.
    dispatch({type: SET_UNAUTHENTICATED});
    
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post('/user/image', formData)
        .then( () => {
            dispatch(getUserData())
        })
        .catch(err => console.log(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.post('/user', userDetails)
        .then( () => {
            dispatch(getUserData())
        })
        .catch( err=> console.log(err))
}

export const getUserData = () => (dispatch) => {

    dispatch({type: LOADING_USER})
   
    axios.get('/user')
        .then( res => {
            dispatch({type: SET_USER, payload: res.data})
        })
        .catch( err => {
            console.log('nao')
            console.log(err)
        })
}

const setAuthorizationHeader = (token) => {

    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)

    // sempre que fizer uma requisição via axios vai ter essa header com o token do usuario
    axios.defaults.headers.common['Authorization'] = FBIdToken 
}

