import React from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs' // vamos usar ela para formatar o tempo do post
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...
import PropTypes from 'prop-types'
import MyButton from '../utils/MyButton'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

// icons
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux 
import {useDispatch} from 'react-redux'
import {likeScream, unlikeScream} from '../redux/actions/dataActions'

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

    const dispatch = useDispatch()

    const likeTheScream = (screamId) => {
        dispatch(likeScream(screamId))
    }

    const unlikeTheScream = (screamId) => {
        dispatch(unlikeScream(screamId))
    }

    dayjs.extend(relativeTime)
    
    // verificar se a scream tem like
    const likedScream = () => {
        // se tiver um array de likes e achar um like para o id dessa scream retornar true
        if(props.likes && props.likes.find(like => like.screamId === props.scream.screamId)){
            return true
        } else {
            return false
        }  
    }

    const likeButton = !props.authenticated ? (
        <MyButton tip="Like">
            <Link to="/login">
                <FavoriteBorder color="primary" />
            </Link>
        </MyButton>
    ) : (
        likedScream() ? (
            <MyButton tip="Undo Like" onClick={() => unlikeTheScream(props.scream.screamId)}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={() => likeTheScream(props.scream.screamId)}>
                <FavoriteBorder color="primary" />
            </MyButton>
        )
    )

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

                {likeButton}

                <span>{likeCount} Likes</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>
                <ScreamDialog screamId={screamId} userHandle={userHandle} />
            </CardContent>

        </Card>
    )
    
}

Scream.protoTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}



export default withStyles(styles)(Scream)