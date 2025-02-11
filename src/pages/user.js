import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Scream from '../components/scream/Scream'
import Grid from '@material-ui/core/Grid'
import StaticProfile from '../components/profile/StaticProfile'

import ProfileSkeleton from '../utils/ProfileSkeleton'
// redux
import {connect} from 'react-redux'
import {getUserData} from '../redux/actions/dataActions'

export class user extends Component {

    state = {
        profile: null,
        screamIdParam: null
    }

    componentDidMount(){
        const handle = this.props.match.params.handle
        const screamId = this.props.match.params.screamId
    
        if(screamId) this.setState({screamIdParam: screamId})

        this.props.getUserData(handle)
    
        axios.get(`/user/${handle}`)
            .then( res => {
                this.setState({profile: res.data.user})
            })
            .catch(err => console.log(err))
    }

    render() {
        const {screams, loading} = this.props.data
        const {screamIdParam} = this.state

        const screamsMarkup = loading ? (
            <p>loading..</p>
        ) : screams === null ? (
            <p>No screams from this user</p>
        ) : !screamIdParam ? (
            screams.map( scream => <Scream key={scream.screamId} scream={scream} />)
        ) : (
            screams.map( scream => {
                if(scream.screamId !== screamIdParam)
                return screams.map( scream => <Scream key={scream.screamId} scream={scream} />)
                else return <Scream key={scream.screamId} scream={scream} openDialog />
            })
        )

        return (
           
            <Grid container spacing={4}>
            
                {/* coluna das screams */}
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>

                {/* coluna do perfil do usuario */}
                <Grid item sm={4} xs={12}>
                    {
                    this.state.profile === null 
                        ?   <ProfileSkeleton />
                        :   <StaticProfile profile={this.state.profile} />
                    }
                </Grid>
        
            </Grid>
           
        )
    }
}

user.protoTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
})

const mapActionsToProps = {
    getUserData
}
export default connect(mapStateToProps, mapActionsToProps)(user)
