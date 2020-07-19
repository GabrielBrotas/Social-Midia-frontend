// * libraries
import React, { useState, useEffect } from 'react'
// criar colunas
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

// redux
import {connect, useDispatch, useSelector} from 'react-redux'
import {getScreams} from '../redux/actions/dataActions'

// * components
// componente da scream
import Scream from '../components/Scream'
import Profile from '../components/Profile'


function Home(props) {
    const screamsList = useSelector( state => state.data)
    const {loading, screams, error} = screamsList

    const userInfo = useSelector( state => state.user)
    const {likes, authenticated} = userInfo
    

    const [recentScreamsMarkup, setRecentScreamsMarkup] = useState(null)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getScreams())
    }, [dispatch])

    useEffect( () => {
        console.log(likes)
        screams && 
        setRecentScreamsMarkup(
            screams.map( (scream) => (
                <Scream key={scream.screamId} scream={scream} likes={likes} authenticated={authenticated} />
            )))
    }, [screamsList, likes])
    // colocar todas as screams, quando forem carregadas, no formato padrao do component 'Scream'
 
    
    return (
        // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
        <Grid container spacing={4}>
            
            {/* coluna das screams */}
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup 
                ? recentScreamsMarkup 
                : <p>Loading...</p>}
            </Grid>

            {/* coluna do perfil do usuario */}
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
            
        </Grid>
    )
    
}

// verificar os campos e validar o tipo e outros dados
Home.protoTypes = {
    // a props classes deve ser um objeto e é obrigatório
    classes: PropTypes.object.isRequired,
    getScreams: PropTypes.func.isRequired,
    screams: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    screams: state.data,
    user: state.user
})

const mapActionsToProps = {
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(Home)

