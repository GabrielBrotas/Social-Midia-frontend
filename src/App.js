// * libraries
import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import formatToken from './utils/helper' 

// * Redux
import {Provider} from 'react-redux'
import store from './redux/store'


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
  const [authenticated, setAuthenticated] = useState(false)

  useEffect( () => {
    setToken(formatToken(localStorage.FBIdToken));
    if(token){
      // extrair as informações do token e transformar em um objeto
      const decodedToken = jwtDecode(token);
    
      if(decodedToken.exp * 1000 < Date.now()){
        window.location.href = '/login'
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    }
  }, [token, localStorage.FBIdToken])

  return (
    // passar o theme e o redux para toda app
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>

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

    </Provider>

    </MuiThemeProvider>
  )

}


export default App;
