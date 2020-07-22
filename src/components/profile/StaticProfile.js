import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'

// MUI
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

// icons 
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'

import CalendarToday from '@material-ui/icons/CalendarToday'

const styles = (theme) => ({
  ...theme.allRest
})


function StaticProfile(props) {
    const {classes, profile: {handle, createdAt, imageUrl, bio, website, location}} = props

    return (
        <Paper className={classes.paper} > 
              <div className={classes.profile}>

                {/* imagem do perfil content */}
                <div className="image-wrapper">

                  {/* imagem */}
                  <img className="profile-image" src={imageUrl} alt="profile"></img>

                </div>
                <hr />

                {/* detalhes do usuario */}
                <div className="profile-details">

                  {/* link para o perfil dele */}
                  <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                      @{handle}
                  </MuiLink>
                  <hr/>

                  {/* bio... */}
                  {bio && <Typography variant="body2">{bio}</Typography>}
                  <hr/>

                  {/* localização... */}
                  {location && (
                      <Fragment>
                          <LocationOn color="primary" /> <span>{location}</span>
                      <hr />
                      </Fragment>
                  )}

                  {/* url do site.. */}
                  {website && (
                      <Fragment>
                          <LinkIcon color="primary" />
                          <a href={website} target="_blank" rel="noopener noreferrer">
                              {" "}{website}
                          </a>
                          <hr />
                      </Fragment>
                  )}

                  {/* dia em que criou o perfil */}
                  <CalendarToday color="primary"/> {" "} <span> Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    
                </div>

              </div>
        </Paper>
    )
}

StaticProfile.protoTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StaticProfile)
