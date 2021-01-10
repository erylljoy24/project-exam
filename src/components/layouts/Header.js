import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { withStyles  } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { authActions } from '../../actions';

import {
    Link, Redirect
} from "react-router-dom";
const useStyles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuAppbar: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    menuLink: {
        "& > * + *": {
            marginLeft: theme.spacing(2)
        },
        marginRight: '30px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'flex',
        flexGrow: 1,
    },
    logo: {
        marginTop: theme.spacing(1.7),
        maxWidth: 200,
    },
    headerDivider: {
        borderRight: '1px solid black',
        borderWidth: 'thin'
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        marginRight: theme.spacing(1)
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
    },
    sectionMobile: {
        display: 'flex',
        alignItems: 'end'
    },
});

class Header extends Component {
    constructor(props){
        super(props);


    }

    logoutUser(e){
        e.preventDefault();

        const { dispatch } = this.props;
        this.setState({ anchorEl: null });
        this.setState({ isOpen: false });
        dispatch(authActions.logout());
    };

    render() {
        const { classes } = this.props;
        return (
            <div  className={classes.root}>
                <AppBar position="fixed" color="inherit" className={classes.appBar}>
                    <Toolbar>
                        <div className={classes.sectionMobile}>
                            <Typography className={`${classes.menuLink} ${classes.sectionDesktop}`}>
                                <Link className="text-black" to="/how-it-works-employer">How it Works</Link>
                                <IconButton aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="primary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    className={classes.menuAppbar}
                                    disableFocusRipple={true}
                                    disableRipple={true}
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    {/* {user.fullName.charAt(0).toUpperCase()} */}
                                    <Avatar aria-label="Demo" variant="rounded" className={classes.avatar} src="/images/avatar/sample.jpg" ></Avatar>
                                    {/*<Typography variant="body2" className="font500">{user.fullName}</Typography>*/}
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >

                                    <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
                                </Menu>
                                {/* <a href="#" className="text-white" onClick={this.logoutUser}>Logout</a> */}
                            </Typography>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles, { withTheme: true })(Header);