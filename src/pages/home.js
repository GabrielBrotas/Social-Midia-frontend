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
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'
import ScreamSkeleton from '../utils/ScreamSkeleton'

function Home(props) {
    const screamsList = useSelector( state => state.data)
    const {screams, loading} = screamsList

    const userInfo = useSelector( state => state.user)
    const {likes, authenticated, credentials: {handle}} = userInfo


    const [recentScreamsMarkup, setRecentScreamsMarkup] = useState(null)
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getScreams())
    }, [dispatch])

    useEffect( () => {
        !loading ?
        setRecentScreamsMarkup(
            screams.map( (scream) => (
                <Scream key={scream.screamId} scream={scream} likes={likes} authenticated={authenticated} handle={handle}/>
            )))
            : setRecentScreamsMarkup(<ScreamSkeleton />)
            
    }, [screamsList, likes, screams, authenticated, handle, loading])
    // colocar todas as screams, quando forem carregadas, no formato padrao do component 'Scream'
 
    
    return (
        // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
        <Grid container spacing={4}>
            
            {/* coluna das screams */}
            <Grid item sm={8} xs={12}>
               { recentScreamsMarkup }
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

