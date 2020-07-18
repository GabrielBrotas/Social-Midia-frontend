import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'

// redux
import {connect} from 'react-redux'
import {logoutUser, uploadImage} from '../redux/actions/userActions'

// MUI stuffs
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
 
const styles = (theme) => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})

class Profile extends Component {
    
  // Mudar foto do perfil
  handleImageChange = (event) => {
    // pegar a imagem, mesmo escolhendo apenas uma vai vim em um array entao vamos pegar a primeira
    const image = event.target.files[0]

    // criar um formData para mandar pro backend
    const formData = new FormData();
    // nesse form colocar um name, o arquivo e o blob name
    formData.append('image', image, image.name)
    // mandar para action do redux fazer o upload
    this.props.uploadImage(formData)
  }

  // quando clicar no icone de editar
  handleEditPicture = () => {
    // pegar o id do input onde escolher o arquivo
    const fileInput = document.getElementById('imageInput')
    // e clicar
    fileInput.click()
  }

  render() {
    // dados do user autenticado
      const {
        classes,
        user: {
          credentials: {handle, createdAt, imageUrl, bio, website, location},
          loading,
          authenticated}
      } = this.props

      // se nao estiver carregando os dados...
      let profileMarkup = !loading 
        // verificar se esta autenticado
      ? (authenticated 
          // se estiver...
          ? ( 
            // colocar o profile em um content 'Papeer'
            <Paper className={classes.paper} > 
              <div className={classes.profile}>

                {/* imagem do perfil content */}
                <div className="image-wrapper">

                  {/* imagem */}
                  <img className="profile-image" src={imageUrl} alt="profile"></img>

                  {/* input para trocar de imagem */}
                  <input type="file" id="imageInput" onChange={this.handleImageChange} hidden="hidden"/>

                  {/* tooltip vai mostrar um nome(title) quando o mouse passar por cima do icone */}
                  <Tooltip title="Edit profile picture" placement="top">
                    {/* icone de editar  */}
                    <IconButton onClick={this.handleEditPicture} className="button">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>

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
          ) : (
            // se nao esetiver autenticado...
            <Paper className={classes.paper}>

              {/* texto.. */}
              <Typography variant="body2" align="center">
              No profile found, please login again
              </Typography>

              {/* butao para logar ou se registrar */}
              <div className={classes.buttons}>
                  <Button variant="contained" color="primary" component={Link} to="/login">Login
                  </Button>
                  <Button variant="contained" color="secondary" component={Link} to="/sign up">Sign up
                  </Button>
              </div>

            </Paper>
          ))
          // carregando... 
      : (<p>loading...</p>)

      return profileMarkup
  }
}

Profile.protoTypes = {
    user: PropTypes.object.isRequired, // user data
    classes: PropTypes.object.isRequired, // styles
    logoutUser: PropTypes.func.isRequired, // function to logout usere
    uploadImage: PropTypes.func.isRequired, // function to upload new profile imagee
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapActionsToProps = {logoutUser, uploadImage}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
