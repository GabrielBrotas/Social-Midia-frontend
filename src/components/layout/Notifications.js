import React, {Fragment, Component} from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs' // vamos usar ela para formatar o tempo do post
import relativeTime from 'dayjs/plugin/relativeTime' //2days ago.., 2 hours agor...
import PropTypes from 'prop-types'

// MUI Stuffs
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

// icons
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

// Redux
import {connect} from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions'

class Notifications extends Component {

    state = {
        anchorEl: null
    }

    // mostrar o menu dropdown
    handleOpen = (e) => {
        this.setState({ anchorEl: e.target})
    }

    // fechar o menu
    handleClose = () => {
        this.setState({anchorEl: null})
    }

    // quando abrir o menu..
    onMenuOpened = () => {
        // pegar o id das notificações nao lidas
        let unreadNotificationsIds = this.props.notifications
            // filtrar as que nao estao lidas
            .filter(not => !not.read)
            // e retornar o id delas
            .map(not => not.notificationId)

        // disparar ação para marcar as notificações como lidas
        this.props.markNotificationsRead(unreadNotificationsIds)
    }

    
    render() {
        // notificações
        const notifications = this.props.notifications
        // estado do menu
        const anchorEl = this.state.anchorEl

        dayjs.extend(relativeTime)

        let notificationsIcon
        
        // se tiver notificações e for maior que 0
        if(notifications && notifications.length > 0) {

            notifications.filter(notification => notification.read === false).length > 0 
                // filtrar as notificaçoes que nao estao lidas
                ? notificationsIcon = (
                    // quantidade das notificações, gera um pequeno emblema no canto superior direito de seu(s) filho(s). ex: 6
                <Badge badgeContent={notifications.filter( not => not.read === false).length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            ) : (
                // as notificações que estiverem lidas apenas retornar.
                notificationsIcon = <NotificationsIcon />
            )
        } else {
            // Retornar as notificações antigas...
            notificationsIcon = <NotificationsIcon />
        }

        // dropdown do menu
        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map( not => {
                    // constants
                    const verb = not.type === 'like' ? 'liked' : 'commented on'
                    const time = dayjs(not.createdAt).fromNow()
                    const iconColor = not.read ? 'primary' : 'secondary'
                    const icon = not.type === 'like' ? (
                        // se o tipo da notificação for 'like' mostrar o icone de coração
                        <FavoriteIcon color={iconColor} style={{marginRight: 10}} />
                    ) : (
                        // se o tipo da notificação for de comentaio mostrar o icone do chat
                        <ChatIcon color={iconColor} style={{marginRight: 10}} />
                    )

                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography component={Link} color="primary" variant="body1" to={`/users/${not.recipient}/scream/${not.screamId}`}>
                                {not.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                // caso nao tenha notificações
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet
                </MenuItem>
            )

        return(
            <Fragment>

                {/* icone da notificação */}
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>

                {/* menu dropdown */}
                <Menu 
                anchorEl={anchorEl} 
                open={Boolean(anchorEl)} 
                onClose={this.handleClose} 
                onEntered={this.onMenuOpened}
                >
                    {notificationsMarkup}
                </Menu>

            </Fragment>
        )

    }
}


Notifications.protoTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications)