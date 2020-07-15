import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

class home extends Component {

    componentDidMount(){
        
    }

    render() {
        return (
            // display grid que vai ser o container (pai) e dentro vai ter a quantidade de grids(colunas) que quere com a largura que cada um vai ocupar
            <Grid container spacing={16}>
                
                <Grid item sm={8} xs={12}>
                    <p>Content...</p>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}
export default home

