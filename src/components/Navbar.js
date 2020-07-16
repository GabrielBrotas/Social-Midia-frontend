import React, { Component } from 'react'
import {Link} from 'react-router-dom'

// npm install --save @material-ui/core
// Material UI stuffs, vamos importar os componentes um por vez para nao pesar a aplicação tendo que pegar tudo.
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

class Navbar extends Component {
    render() {
        return (
            <AppBar >
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
