import React, { Component } from 'react';
import axios from 'axios'
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";
import { GridListView } from "../custom";
import { ListItem } from "../custom";
import Button from "@material-ui/core/Button/Button";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

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
    }
});

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            quantity: 0
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {
        axios
            .get(`http://localhost:8080/cart/get_cart_item/`+localStorage.getItem('user_id'))
            .then(res => {

                const data = res.data;
                this.setState({ data: data})
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };

    addQuantity(item){
        console.log(item.quantity);
        var bodyFormData = new FormData();
        bodyFormData.append('cart_id', item.cart_id);
        bodyFormData.append('quantity', parseInt(item.quantity)+1);
        axios
            .post(`http://localhost:8080/cart/update_cart`,bodyFormData)
            .then(res => {

                window.location.reload()
            });

    }

    minusQuantity(item){
        var bodyFormData = new FormData();
        bodyFormData.append('cart_id', item.cart_id);
        bodyFormData.append('quantity', parseInt(item.quantity)-1);
        axios
            .post(`http://localhost:8080/cart/update_cart`,bodyFormData)
            .then(res => {

                window.location.reload()
            });
    }

    componentDidMount() {
        this.receivedData()
    }
    render() {
        console.log(this.state.data);
        const { classes } = this.props;
        return (

            <Container maxWidth="md" style={{textAlign: 'center'}}>
                <div style={{alignItems: 'center'}}>
                    <Grid style={{marginTop: 100}}/>
                    <ListItem
                        items={this.state.data}
                        addQuantity={this.addQuantity}
                        minusQuantity={this.minusQuantity}
                    />
                </div>

                <Button variant="contained" uppercase={false} className={classes.btnExtraLarge} color="primary">
                    Place Order
                </Button>
            </Container>


        )
    }
}

Cart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Cart);