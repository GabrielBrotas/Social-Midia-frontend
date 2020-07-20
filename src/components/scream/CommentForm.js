import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

// MUI Stuffs
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

// redux
import {connect} from 'react-redux'
import {submitComment} from '../../redux/actions/dataActions' 

const styles = theme => ({
    ...theme.allRest,
    commentForm: {
        textAlign: 'center'
    }
})

class CommentForm extends Component {
    
    state = {
        body: '',
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body: ''})
        }
    }
    
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.screamId, {body: this.state.body})
    }

    render() {
        const {classes, authenticated} = this.props
        const errors = this.state.errors

        const commentFormMarkup = authenticated
        ? (
            
            <Grid item sm={12}>

                <div className={classes.commentForm}>

                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="body"
                            type="text"
                            label="Comment something"
                            error={errors.comment ? true : false}
                            helperText={errors.comment}
                            value={this.state.body}
                            onChange={this.handleChange}
                            fullWidth
                            className={classes.textField}
                        />
                        
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Submit
                        </Button>
                    </form>
                </div>
                
            </Grid>
        )
        : null


        return commentFormMarkup
    }
}

CommentForm.protoTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

const mapActionsToProps = {
    submitComment
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm))
