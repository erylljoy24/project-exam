import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { withStyles  } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { authActions } from '../../actions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { history } from '../../helpers/history';
import HomeIcon from '@material-ui/icons/Home';

import {
    Link, Redirect
} from "react-router-dom";
import axios from "axios";
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

        this.handleMenu = this.handleMenu.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            anchorEl: null,
            isOpen: false,
            data:   []
        }
    }

    logoutUser(e){
        e.preventDefault();
        localStorage.clear();
        history.push('/');
    };

    addItemView(e){
        e.preventDefault();
        history.push('/add_item');
    };

    viewMyItems(e){
        e.preventDefault();
        history.push('/view_my_items');
    };

    toDashboard(e){
        e.preventDefault();
        history.push('/dashboard');
    }
    routeChange(e){
        e.preventDefault();
        history.push('/cart');
    }

    handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
        this.setState({ isOpen: true });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ isOpen: false });
    };

    receivedData() {
        axios
            .get(`http://localhost:8080/cart/get_cart_item/`+localStorage.getItem('user_id'))
            .then(res => {

                const data = res.data;
                this.setState({ data: data})
            });
    }

    componentDidMount() {
        this.receivedData()
    }

    render() {
        const { classes } = this.props;
        return (
            <div  className={classes.root}>
                <AppBar position="fixed" color="inherit" style={{textAlign:'end', alignItems:'flex-end'}} className={classes.appBar} >
                    <Toolbar>
                        <div className={classes.sectionMobile}>
                            <Typography className={`${classes.menuLink} ${classes.sectionDesktop}`}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    className={classes.menuAppbar}
                                    disableFocusRipple={true}
                                    disableRipple={true}
                                    onClick={this.toDashboard}
                                    color="inherit"
                                >
                                    <HomeIcon aria-label="Demo" variant="rounded" className={classes.avatar} src="/images/avatar/sample.jpg" ></HomeIcon>
                                    {/*<Typography variant="body2" className="font500">{user.fullName}</Typography>*/}
                                </IconButton>
                                <IconButton onClick={this.routeChange} aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={this.state.data.length} color="primary">
                                        <ShoppingCartIcon />
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
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={this.state.isOpen}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.toDashboard}>Dashboard</MenuItem>
                                    <MenuItem onClick={this.addItemView}>Add Item</MenuItem>
                                    <MenuItem onClick={this.viewMyItems}>View My Items</MenuItem>
                                    <MenuItem onClick={this.logoutUser}>Logout</MenuItem>
                                </Menu>
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