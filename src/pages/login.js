// * libraries
import React, {useState, useEffect} from 'react'
// fazer validação dos tipos dos estados da classe
import PropTypes from 'prop-types'
// rota
import {Link} from 'react-router-dom'

// * Redux
import {connect } from 'react-redux'
import {loginUser} from '../redux/actions/userActions' 


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

// pegar o theme global
const styles = (theme) => ({
    ...theme.allRest
})


function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    // pegar os styles criado na const, tem essa opção por causa do 'withStyles'
    const {classes, UI: { loading } } = props   
 
    // quando o usuario logar verificar se teve errors
    useEffect( () => {
        if(props.UI.errors){
            setErrors(props.UI.errors)
        }
    }, [props.UI])

    // verificar se o user já está logado
    useEffect( () => {
        if(localStorage.FBIdToken){
            // props.location.href('/')
            props.history.goBack()
        }
    }, [props.history])

    // logar
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email,
            password,
        }
        props.loginUser(userData, props.history)
    }

    


    return (
        // coluna geral e criar uma classe atraves do 'classes' para dar estilo na const
        <Grid container className={classes.form}>
            <Grid item sm/>

            <Grid item sm>
                {/* logo */}
                <img src={AppIcon} alt="logo" className={classes.image}/>

                {/*  */}
                <Typography variant="h3" className={classes.pageTitle}>Login</Typography>

                <form noValidate onSubmit={handleSubmit}>

                    {/* campo de texto para o email, o helperText é um texto formatado para caso de erro no login ele mostrar no campo com um estilo diferente */}
                    <TextField id="email" name="email" type="email" label="Email" className={classes.textField} value={email} onChange={(e) => setEmail(e.target.value)} fullWidth helperText={errors.email} error={errors.email ? true : false}/> 

                    <TextField id="password" name="password" type="password" label="Password" className={classes.textField} value={password} onChange={ (e) => setPassword(e.target.value)} fullWidth helperText={errors.password} error={errors.password ? true : false} />   

                    {/* errors.general vem da API, caso dê erro nas credenciais */}
                    {errors.general && 
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
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

// verificar os campos e validar o tipo e outros dados
Login.protoTypes = {
    // a props classes deve ser um objeto e é obrigatório
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

// quais dados vai querer da store
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

// quais actions vai usar 
const mapActionsToProps = {
    loginUser
}

// passar os styles criado na const para a classe login, vai ter acesso atraves da props.classes
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))