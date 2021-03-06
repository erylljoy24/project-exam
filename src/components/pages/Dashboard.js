import React, { Component } from 'react';
import axios from 'axios'
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";
import { GridListView } from "../custom";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            menu_id: 0,
            user_id: 2
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
        this.onCart = this.onCart.bind(this);
    }
    receivedData() {
        axios
            .get(`http://localhost:8080/menu/menu_list`)
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

    onCart(menu_id){
        if(menu_id){
            console.log(menu_id);
            var bodyFormData = new FormData();
            bodyFormData.append('menu_id', menu_id.menu_id);
            bodyFormData.append('quantity', 1);
            bodyFormData.append('user_id', localStorage.getItem('user_id'));
            axios
                .post(`http://localhost:8080/cart/add_to_cart`,bodyFormData)
                .then(res => {
                    const data = res.data;
                    console.log(data);
                    window.location.reload();
                    // this.setState({ data: data})
                });
        }
    }

    componentDidMount() {
        this.receivedData()
    }

    render() {
        console.log(this.state.data);
        return (
            <Container maxWidth="md">
                <div style={{alignItems: 'center'}}>
                    <Grid style={{marginTop: 100}}/>
                    <GridListView
                        lists={this.state.data}
                        addCart={this.onCart}
                    />
                </div>
            </Container>


        )
    }
}
