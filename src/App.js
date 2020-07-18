// * libraries
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios' 

// * Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/types'
import {logoutUser, getUserData} from './redux/actions/userActions'

// * styles
import './App.css';
// MUI
// Vai criar um tema personalizado para a aplicação
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createTheme from '@material-ui/core/styles/createMuiTheme'

// * pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

// * components
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute'

import themeFile from './utils/theme'

// esses styles serão global
const theme = createTheme(themeFile)


function App() {

  const [token, setToken] = useState('')


  useEffect( () => {
    setToken(localStorage.FBIdToken)
    if(token){
      // extrair as informações do token e transformar em um objeto
      const decodedToken = jwtDecode(token);
    
      if(decodedToken.exp * 1000 < Date.now()){
        store.dispatch(logoutUser)

      } else {
        // mudar o authenticated para true no reducer 
        store.dispatch({type: SET_AUTHENTICATED})
        // passar o token do usuario para a header
        axios.defaults.headers.common['Authorization'] = token
        // com o user authenticated, pegar os dados
        store.dispatch(getUserData())
      }
    }
  }, [token])

  return (
    // passar o theme e o redux para toda app
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>

      <Router>
        <Navbar />
        <div className="container">

        <Switch>
          <AuthRoute exact path="/signup" component={signup} />
          <AuthRoute exact path="/login" component={login} />
          <Route exact path="/" component={home}  />
        </Switch>

        </div>
      </Router>

    </Provider>

    </MuiThemeProvider>
  )

}


export default App;
