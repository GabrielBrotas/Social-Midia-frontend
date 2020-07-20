import React, { useState, useEffect} from 'react'
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

function CommentForm(props) {

    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    const {classes, authenticated} = props

    useEffect( () => {
        if(props.UI.errors){
            setErrors(
                props.UI.errors
            )
        }
        if(!props.UI.errors && !props.UI.loading){
            setBody('')
        }
    }, [props])

    const handleSubmit = (event) => {
        event.preventDefault()
        props.submitComment(props.screamId, {body})
    }

    const commentFormMarkup = authenticated
    ? (
        <Grid item sm={12}>

            <div className={classes.commentForm}>

                <form onSubmit={handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment something"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={body}
                        onChange={e => setBody(e.target.value)}
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
