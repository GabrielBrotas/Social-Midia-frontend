import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'

import AppIcon from '../images/twitter.png'

// Mui
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
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



class login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })
   
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/login', userData)
            .then( res => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch( err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
                

            })
    }

    handleChange = (event) =>{
        this.setState({
            // [] <- se for email o nome do campo entao vai mudar o valor do email, se for nome vai mudar o campo do nome, ...
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes} = this.props
        const {errors, loading} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>

                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.image}/>

                    <Typography variant="h3" className={classes.pageTitle}>Login</Typography>

                    <form noValidate onSubmit={this.handleSubmit}>

                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false}/> 

                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false} />   

                        {errors.general && 
                            <Typography variant="body2" className={classes.customError}>
                            </Typography>

                        }
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>

                        <br/>

                        <small>dont have an account ? sign up <Link to="/signup">here</Link> </small>

                    </form>

                </Grid>

                <Grid item sm/>

            </Grid>
        )
    }
}

// verificar os campos e validar o tipo e outros dados
login.protoTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)