// * libraries
import React, { Component } from 'react'
// fazer validação dos tipos dos estados da classe
import PropTypes from 'prop-types'
// requisição
import axios from 'axios'
// rota
import {Link} from 'react-router-dom'


// * styles

import AppIcon from '../images/twitter.png'

// * Mui
// criar styles personalizados
import withStyles from '@material-ui/core/styles/withStyles'
// colunas
import Grid from '@material-ui/core/Grid'
// textos
import Typography from '@material-ui/core/Typography'
// campo de texto para o form
import TextField from '@material-ui/core/TextField'
// butao 
import Button from '@material-ui/core/Button'
// barra circular de progresso
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

    // logar
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })
   
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        // fazer requisição para logar
        axios.post('/login', userData)
            .then( res => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch( err => {
                this.setState({
                    // colocar os erros no objeto
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    // quando o valor de um campo mudar...
    handleChange = (event) =>{
        this.setState({
            // [event.target.name] <- se o nome do campo for 'email' o entao vai mudar o valor do email no estado, se for 'nome' vai mudar o campo do nome, ...
            [event.target.name]: event.target.value
        });
    }

    render() {
        // pegar os styles criado na const, tem essa opção por causa do 'withStyles'
        const {classes} = this.props
        // pegar os erros e se está carregando
        const {errors, loading} = this.state

        return (
            // coluna geral e criar uma classe atraves do 'classes' para dar estilo na const
            <Grid container className={classes.form}>
                <Grid item sm/>

                <Grid item sm>
                    {/* logo */}
                    <img src={AppIcon} alt="logo" className={classes.image}/>

                    {/*  */}
                    <Typography variant="h3" className={classes.pageTitle}>Login</Typography>

                    <form noValidate onSubmit={this.handleSubmit}>

                        {/* campo de texto para o email, o helperText é um texto formatado para caso de erro no login ele mostrar no campo com um estilo diferente */}
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={this.state.email} onChange={this.handleChange} fullWidth helperText={errors.email} error={errors.email ? true : false}/> 

                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={this.state.password} onChange={this.handleChange} fullWidth helperText={errors.password} error={errors.password ? true : false} />   

                        {/* errors.general vem da API, caso dê erro nas credenciais */}
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
    // a props classes deve ser um objeto e é obrigatório
    classes: PropTypes.object.isRequired
}

// passar os styles criado na const para a classe login, vai ter acesso atraves da props.classes
export default withStyles(styles)(login)