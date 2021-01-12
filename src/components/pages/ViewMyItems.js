import React, { Component } from 'react';
import axios from 'axios'
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";
import { GridListView } from "../custom";
import { MyListItem } from "../custom";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

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

class ViewMyItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {
        axios
            .get(`http://localhost:8080/menu/menu_list/`+'2')
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

    onItem(item){
        if (item){
            console.log(item);
            var bodyFormData = new FormData();
            bodyFormData.append('menu_id', item.menu_id);
            axios
                .post(`http://localhost:8080/menu/delete_menu`,bodyFormData)
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
                    <MyListItem items={this.state.data} itemDelete={this.onItem} />
                </div>
            </Container>


        )
    }
}

ViewMyItems.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(ViewMyItems);