// * libraries
import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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

// esses styles sereão global
const theme = createTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  userStyles: {
    form: {
      textAlign: 'center'
    },
    image:{
        margin: "20px auto 20px auto"
    },
    pageTitle: {
        margin: "10px auto 10px auto"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    button: {
        marginTop: 20,
        position: 'relative',
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
  }
  
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
         <Router>
            <Navbar />
            <div className="container">

            <Switch>
              <Route exact path="/signup" component={signup} />
              <Route exact path="/login" component={login} />
              <Route exact path="/" component={home} />
            </Switch>

           </div>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default App;
