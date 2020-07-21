import React, { Fragment, Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import MyButton from '../../utils/MyButton'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
// MUI Stuffs
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

// Icons
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import ChatIcon from '@material-ui/icons/Chat'

// redux
import {connect} from 'react-redux'
import {getScream, clearErrors} from '../../redux/actions/dataActions'

const styles = {
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: "90%"
    },
    expandButton: {
        position: 'absolute',
        left: "90%"
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
}

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }
    
    // check open dialog
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }

    handleOpen = () => {

        // curl atual
        let oldPath = window.location.pathname
        // dados do user e da scream
        const {userHandle, screamId} = this.props
        // new path, onde vai redirecionar o user para a pagina do autor da scream
        const newPath = `/users/${userHandle}/scream/${screamId}`

        if(oldPath === newPath) oldPath = `/users/${userHandle}`

        // quando abrir o dialog mudar a url
        window.history.pushState(null, null, newPath)

        this.setState({open: true, oldPath, newPath})
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        // retornar para a pagina que estava quando fechar o dialog
        window.history.pushState(null, null, this.state.oldPath)
        this.setState({open: false})
        this.props.clearErrors()
    }
    render() {
        const {classes, scream: {screamId, body, createdAt, likeCount, commentCount, userHandle, userImage, comments}, UI: {loading}} = this.props

        const dialogMarkup = loading
        ? ( 
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
        <Grid container >
            <Grid item sm={5}>
                <img src={userImage} alt="profile" className={classes.profileImage} />
            </Grid>

            <Grid item sm={7}>
                <Typography
                component={Link}
                color="primary"
                variant="h5"
                to={`/users/${userHandle}`}>
                    @{userHandle}
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                </Typography>

                
                <Typography variant="body1">
                    {body}
                </Typography>
                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>

                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>

            </Grid>

            <CommentForm screamId={screamId} />

            <Comments comments={comments} />
        </Grid>
        )
        
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm"
                >
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon />
                </MyButton>

                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.protoTypes = {
    getScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
})

const mapActionsToProps = {getScream, clearErrors}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))