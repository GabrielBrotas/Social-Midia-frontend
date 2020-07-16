// * libraries
import React, { Component } from 'react'
// fazer requisição externa
import axios from 'axios'
// criar colunas
import Grid from '@material-ui/core/Grid'

// * components
// componente da scream
import Scream from '../components/Scream'

class home extends Component {

    state = {
        screams: null
    }

    componentDidMount(){
        // pegar todas as screams na api, foi definida a url da api no package.json em 'proxy'
        axios.get('/screams')
            .then( res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch( err => console.log(err))
    }

    render() {
        // colocar todas as screams, quando forem carregadas, no formato padrao do component 'Scream'
        let recentScreamsMarkup = this.state.screams 
        ? this.state.screams.map( (scream) => <Scream key={scream.screamId} scream={scream} />) 
        :  <p>Loading..</p> 
        
        return (
            // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
            <Grid container spacing={4}>
                
                {/* coluna das screams */}
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>

                {/* coluna do perfil do usuario */}
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
                
            </Grid>
        )
    }
}
export default home

