import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MyButton from '../../utils/MyButton'
import PostScream from '../scream/PostScream'
import Notifications from './Notifications'
// npm install --save @material-ui/core
// Material UI stuffs, vamos importar os componentes um por vez para nao pesar a aplicação tendo que pegar tudo.
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

// Icons
import HomeIcon from '@material-ui/icons/Home'


class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar >
                <Toolbar className="nav-container">
                    {
                    authenticated ? (
                        <Fragment>

                            <PostScream />
                            
                            <Link to="/">
                                <MyButton tip="Home">                                
                                    <HomeIcon />                                
                                </MyButton>
                            </Link>

                            
                            <Notifications />
                      
                        </Fragment>
                    ) : (
                    <Fragment> 
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Fragment>
                    )
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.protoTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
