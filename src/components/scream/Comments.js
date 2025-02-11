import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
// MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = themes => ({
    ...themes.allRest,
        commentImage: {
            maxWidth: '100%',
            height: 100,
            objectFit: 'cover',
            borderRadius: '50%'
        },
        commentData: {
            marginLeft: 20
        }
})

class Comments extends Component {

    render(){
        const {comments, classes} = this.props

        return(
            <Grid container>
                {comments.map( comment => {
                    const {body, createdAt, userImage, userHandle} = comment

                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                <hr className={classes.invisibleSeparator} />
                                    <Grid item sm={2}>
                                        
                                        <img src={userImage} alt="comment" className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={9}>
                                    
                                        <div className={classes.commentData}>
                                        
                                            <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                            </Typography>

                                            <Typography
                                            variant="body2"
                                            color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>

                                            <Typography
                                            variant="body1"
                                            >{body}</Typography>

                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Fragment>
                    )
                })}
            </Grid>
        )
    }

}

Comments.protoTypes = {
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)