import React, { Component } from 'react';
import * as Feather from 'react-feather';
import { connect } from 'react-redux';
// import { authActions } from '../../../actions';
import { withStyles  } from '@material-ui/core/styles';
import {
    Link
} from "react-router-dom";

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        backgroundColor: 'rgba(255, 255, 255, 0.85)'
    },
    loadingProgress: {
        zIndex: theme.zIndex.drawer + 2
    },
    containerBackdrop: {
        position: 'relative'
    },
    cardBody: {
        padding: theme.spacing(5),
    },
    cardFooter: {
        display: 'block !important',
        textAlign: 'center'
    },
    btnExtraLarge: {
        height: 60,
        padding: '0 50px'
    },
    loginContainer: {
        paddingLeft: '80px',
        paddingRight: '80px'
    }
});

class Signup extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            error: {
                first_name: {
                    status: false,
                    message: "Please input First Name"
                },
                last_name: {
                    status: false,
                    message: "Please input Last Name"
                },
                username: {
                    status: false,
                    message: "Please input username"
                },
                password: {
                    status: false,
                    message: "Please input password"
                }
            },
            open: true
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.username && this.state.password) {
            this.setState(prevState => ({
                error: {
                    ...prevState.error,
                    fist_name: {
                        ...prevState.error.fist_name,
                        status: false
                    },
                    last_name: {
                        ...prevState.error.last_name,
                        status: false
                    },
                    username: {
                        ...prevState.error.username,
                        status: false
                    },
                    password: {
                        ...prevState.error.password,
                        status: false
                    }
                }
            }));
            const { dispatch } = this.props;
            const credentials = {
                fullName: "Admin",
                username: this.state.username,
                password: this.state.password,
                role: "employer"
            }
            // dispatch(authActions.register(credentials));
        }else{
            this.setState(prevState => ({
                error: {
                    ...prevState.error,
                    first_name: {
                        ...prevState.error.first_name,
                        status: true
                    },
                    last_name: {
                        ...prevState.error.last_name,
                        status: true
                    },
                    username: {
                        ...prevState.error.username,
                        status: true
                    },
                    password: {
                        ...prevState.error.password,
                        status: true
                    }
                }
            }));
        }
    }

    render() {
        const { loggingIn, message, classes } = this.props;
        return (
            <Container className={`${classes.loginContainer} page-padding mb4`} maxWidth="md">
                <Toolbar/>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={9}>
                        <Box>
                            { message ? <Alert severity="error" className="mb2">{message}</Alert> : '' }

                            <Paper elevation={3}>
                                <Card className={classes.containerBackdrop}>
                                    { loggingIn ? <LinearProgress className={classes.loadingProgress} /> : '' }
                                    <Backdrop className={classes.backdrop} open={loggingIn}>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <div className={classes.cardBody}>
                                        <br/>
                                        <CardContent>
                                            <form noValidate autoComplete="off">
                                                <div>
                                                    <InputLabel htmlFor="first_name" className="text-black pb10 font500">First Name</InputLabel>
                                                    <TextField id="outlined-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} error={this.state.error.first_name.status} helperText={this.state.error.first_name.status ? this.state.error.first_name.message : ''} type="text" className="full-width" label=""  id="first_name" name="first_name" value={this.state.first_name} onChange={this.onChange} variant="outlined" />
                                                </div>
                                                <div className="pt1">
                                                    <InputLabel htmlFor="last_name" className="text-black pb10 font500">Last Name</InputLabel>
                                                    <TextField id="outlined-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} error={this.state.error.last_name.status} helperText={this.state.error.last_name.status ? this.state.error.last_name.message : ''} type="text" className="full-width" label=""  id="last_name" name="last_name" value={this.state.last_name} onChange={this.onChange} variant="outlined" />
                                                </div>
                                                <div className="pt1">
                                                    <InputLabel htmlFor="username" className="text-black pb10 font500">Username</InputLabel>
                                                    <TextField id="outlined-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} error={this.state.error.username.status} helperText={this.state.error.username.status ? this.state.error.username.message : ''} type="text" className="full-width" label=""  id="username" name="username" value={this.state.username} onChange={this.onChange} variant="outlined" />
                                                </div>
                                                <div className="pt1">
                                                    <InputLabel htmlFor="password" className="text-black pb10 font500">Password</InputLabel>
                                                    <TextField id="outlined-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} error={this.state.error.password.status} helperText={this.state.error.password.status ? this.state.error.password.message : ''} type="password" className="full-width" label="" id="password" name="password" value={this.state.password} onChange={this.onChange} variant="outlined" />
                                                </div>
                                            </form>
                                        </CardContent>
                                        <CardActions className={classes.cardFooter}>
                                            <Button variant="contained" className={classes.btnExtraLarge} color="primary" onClick={this.onSubmit}>
                                                Register
                                            </Button>
                                        </CardActions>
                                        <div className="text-center mt-10">
                                            <Typography variant="overline">
                                                Already have an account? <Link to="/login" className="font600">Login</Link>
                                            </Typography>
                                        </div>
                                    </div>
                                </Card>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const { loggingIn, message } = state.authentication;
    return {
        loggingIn,
        message
    };
}

export default connect(mapStateToProps)(withStyles(useStyles)(Signup));