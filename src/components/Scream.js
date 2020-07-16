import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import dayjs from 'dayjs' // vamos usar ela para formatar o tempo do post
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...

// MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = {
    card: {
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

class Scream extends Component {
    render() {
        
        dayjs.extend(relativeTime)

        const {classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commenetCount}} = this.props

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

                </CardContent>
                

            </Card>
        )
    }
}

export default withStyles(styles)(Scream)