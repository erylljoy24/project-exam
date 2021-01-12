import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

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

class AddItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            item_name: "",
            item_price: "",
            error: {
                item_name: {
                    status: false,
                    message: "Please input Item Name"
                },
                item_price: {
                    status: false,
                    message: "Please input Item Price"
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

        if (this.state.item_name && this.state.item_price) {
            var bodyFormData = new FormData();
            bodyFormData.append('name', this.state.item_name);
            bodyFormData.append('price', this.state.item_price);
            bodyFormData.append('user_id', localStorage.getItem('user_id'));
            bodyFormData.append('image', '/logo512.png');
            axios
                .post(`http://localhost:8080/menu/save_menu`,bodyFormData)
                .then(res => {
                    const data = res.data;
                    console.log(data);
                    // this.setState({ data: data})
                });
        }else{
            this.setState(prevState => ({
                error: {
                    ...prevState.error,
                    item_name: {
                        ...prevState.error.item_name,
                        status: true
                    },
                    item_price: {
                        ...prevState.error.item_price,
                        status: true
                    }
                }
            }));
        }
    }

    render() {
        const { message, classes } = this.props;
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

                                    <Backdrop className={classes.backdrop}>
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                    <div className={classes.cardBody}>
                                        <br/>
                                        <CardContent>
                                            <form noValidate autoComplete="off">
                                                <div>
                                                    <InputLabel htmlFor="first_name" className="text-black pb10 font500">Item Name</InputLabel>
                                                    <TextField id="outlined-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} type="text" className="full-width" label=""  id="item_name" name="item_name" value={this.state.first_name} onChange={this.onChange} variant="outlined" />
                                                </div>
                                                <div className="pt1">
                                                    <InputLabel htmlFor="last_name" className="text-black pb10 font500">Price</InputLabel>
                                                    <TextField id="outlined-basic" InputLabelProps={{
                                                        shrink: true,
                                                    }} type="text" className="full-width" label=""  id="item_price" name="item_price" value={this.state.item_price} onChange={this.onChange} variant="outlined" />
                                                </div>
                                                <div className="pt1">
                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id="profile-image"
                                                            multiple
                                                            type="file"
                                                        />
                                                        <label htmlFor="profile-image">
                                                            <Button variant="contained" component="span" color="primary">
                                                                Upload new picture
                                                            </Button>
                                                        </label>
                                                    </div>
                                                </div>
                                            </form>
                                        </CardContent>
                                        <CardActions className={classes.cardFooter}>
                                            <Button variant="contained" className={classes.btnExtraLarge} color="primary" onClick={this.onSubmit}>
                                                Add Item
                                            </Button>
                                        </CardActions>
                                        <div className="text-center mt-10">
                                            <Typography variant="overline">
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

AddItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(AddItem);