// * libraries
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode' 

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

const token = localStorage.FBIdToken;
let authenticated;
if(token){
  // extrair as informações do token e transformar em um objeto
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
         <Router>
            <Navbar />
            <div className="container">

            <Switch>
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <Route exact path="/" component={home}  />
            </Switch>

           </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default App;
