import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'


// components
import Scream from '../components/Scream'

class home extends Component {


    state = {
        screams: null
    }

    componentDidMount(){
        axios.get('/screams')
            .then( res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch( err => console.log(err))
    }

    render() {
        let recentScreamsMarkup = this.state.screams 
        ? this.state.screams.map( (scream) => <Scream key={scream.screamId} scream={scream} />) 
        :  <p>Loading..</p> 
        
        return (
            // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
            <Grid container spacing={4}>
                
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}
export default home

