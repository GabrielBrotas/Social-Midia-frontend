import React, {Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import MyButton from '../utils/MyButton'

// redux
import {connect} from 'react-redux'
import {postScream} from '../redux/actions/dataActions'

// Material UI Stuffs
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

// icons
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = () => ({
    submitButton: {
        position: 'relative',
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: "90%",
        top: "10%"
    }
})

function PostScream(props) {

    const [open, setOpen] = useState(false)
    const [body, setBody] = useState('')
    const [errors, setErrors] = useState({})

    const {classes, UI: {loading}} = props

    useEffect( () => {
        if(props.UI.errors){
            setErrors(
                props.UI.errors
            )
        }
        if(!props.UI.errors && !props.UI.loading){
            setBody('')
            handleClose()
        }

    }, [props])

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.postScream({body})
    }
        
    return (
        <Fragment>
            <MyButton onClick={() => setOpen(true)} tip="Post new scream!">
                <AddIcon color="primary" />
            </MyButton>
            
            <Dialog
            open={open}
            onClose={() => handleClose()}
            fullWidth
            maxWidth="sm"
            >
                <MyButton tip="Close" onClick={() => handleClose()} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>
                <DialogTitle>
                    Post new Scream
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <TextField 
                        name="body"
                        type="text"
                        label="Scream !!"
                        rows="3"
                        placeholder="type something"
                        error={errors.body ? true : false}
                        helperText={errors.body}
                        className={classes.textField}
                        onChange={(e) => setBody(e.target.value)}
                        fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                            Submit
                            {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            
        </Fragment>
    )
    
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
})

const mapActionsToProps = {
    postScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream))