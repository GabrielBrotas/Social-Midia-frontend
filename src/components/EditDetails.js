import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// redux
import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'

// Material UI Stuffs
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// icons
import EditIcon from '@material-ui/icons/Edit'

const styles = (theme) => ({
    button: {
        float: "right"
    }
})

class EditDetails extends Component {

    // estados ondee ficarao os dados do usuario
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    // quando carregar o conteudo...
    componentDidMount(){
        // pegar as credentials do user
        const {credentials} = this.props
        // colocar os dados no state 
        this.mapUserDetailsToState(credentials)
    }

    // colocar os dados do usuario logado no state
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }

    // abrir o pop up
    handleOpen = () => {
        this.setState({open: true})
        this.mapUserDetailsToState(this.props.credentials);
    }

    // fechar pop up
    handleClose = () => {
        this.setState({open: false})
    }

    // alterar o valor das info do usuario
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // salvar dados
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        }
        // mandar para a action do user os novos dados para salvar
        this.props.editUserDetails(userDetails);
        // fechar pop up
        this.handleClose();
    }

    render() {
        const {classes} = this.props

        return (
            <Fragment>
                {/* butao para abrir o pop up */}
                <Tooltip title="Edit Details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>

                {/* caixa do pop up */}
                <Dialog 
                // estado
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                // os tipos de width do dialog está na documentação do material ui
                maxWidth="sm">
                    <DialogTitle>Edit your Details</DialogTitle>

                    <DialogContent>
                        <form>

                            {/* bio text */}
                            <TextField 
                            name="bio" 
                            type="text" 
                            label="Bio" 
                            multiline 
                            rows="3" 
                            placeholder="A short bio about yourself" 
                            className={classes.textField} 
                            value={this.state.bio} 
                            onChange={this.handleChange} 
                            fullWidth 
                            />

                            {/* website text */}
                            <TextField 
                            name="website" 
                            type="text" 
                            label="website"  
                            placeholder="your personal and professional website" 
                            className={classes.textField} 
                            value={this.state.website} 
                            onChange={this.handleChange} 
                            fullWidth 
                            />

                            {/* localização text */}
                            <TextField 
                            name="location" 
                            type="text" 
                            label="Location" 
                            placeholder="Where you live" 
                            className={classes.textField} 
                            value={this.state.location} 
                            onChange={this.handleChange} 
                            fullWidth 
                            />

                        </form>
                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>

                        <Button onClick={this.handleSubmit} color="primary">
                            Save
                        </Button>

                    </DialogActions>

                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.protoTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionsToProps = {editUserDetails}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))
