import React from 'react'
import {Link} from 'react-router-dom'
import MyButton from '../utils/MyButton'
import PropTypes from 'prop-types'

// icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// redux
import {connect, useDispatch} from 'react-redux'
import {likeScream, unlikeScream} from '../redux/actions/dataActions'

function LikeButton(props)  {

    const {authenticated, likes} = props.user
    
    const dispatch = useDispatch()

    // verificar se a scream tem like
    const likedScream = () => {
        // se tiver um array de likes e achar um like para o id dessa scream retornar true
        if(likes && likes.find(like => like.screamId === props.screamId)){
            return true
        } else {
            return false
        }  
    }

    const likeTheScream = (screamId) => {
        dispatch(likeScream(screamId))
    }

    const unlikeTheScream = (screamId) => {
        dispatch(unlikeScream(screamId))
    }

    const likeButton = !authenticated ? (
        <Link to="/login">
        <MyButton tip="Like">
            <FavoriteBorder color="primary" />
        </MyButton>
        </Link>
    ) : (
        likedScream() ? (
            <MyButton tip="Undo Like" onClick={() => unlikeTheScream(props.screamId)}>
                <FavoriteIcon color="primary" />
            </MyButton>
        ) : (
            <MyButton tip="Like" onClick={() => likeTheScream(props.screamId)}>
                <FavoriteBorder color="primary" />
            </MyButton>
        )
    )
        
    return likeButton;
    
}

LikeButton.prototype = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeTheScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
