import React from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs' // vamos usar ela para formatar o tempo do post
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...
import PropTypes from 'prop-types'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton from './LikeButton'
import MyButton from '../../utils/MyButton'
// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// icons
import ChatIcon from '@material-ui/icons/Chat'


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

function Scream(props) {

    
    const {classes, scream: {body, createdAt, userImage, userHandle, likeCount, commentCount, screamId}} = props

    dayjs.extend(relativeTime)
    
    const deleteButton = props.authenticated && userHandle === props.handle ? (
        <DeleteScream screamId={props.scream.screamId}/>
    ) : null
        
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.image}
                image={userImage}
                title="Profile image" 
            />
            <CardContent className={classes.content}>

                {/* nome do usuario */}
                <Typography 
                variant="h5" 
                component={Link} 
                to={`/users/${userHandle}`} 
                color="primary"
                >
                    {userHandle}
                </Typography>

                {deleteButton}

                {/* data que criou o post */}
                <Typography 
                variant="body2" 
                color="textSecondary"
                >
                    {dayjs(createdAt).fromNow()}
                </Typography>
                
                {/* texto do post */}
                <Typography 
                variant="body1"
                >
                    {body}
                </Typography>

                <LikeButton screamId={screamId} />
                <span>{likeCount} Likes</span>
                
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>

                <ScreamDialog screamId={screamId} userHandle={userHandle} likes={props.likes} openDialog={props.openDialog}/>
            </CardContent>

        </Card>
    )
    
}

Scream.protoTypes = {
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    likes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}



export default withStyles(styles)(Scream)