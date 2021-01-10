import React, { Component } from 'react';
import axios from 'axios'
import Container from "@material-ui/core/Container/Container";
import Grid from "@material-ui/core/Grid/Grid";
import { GridListView } from "../custom";
import { ListItem } from "../custom";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,

            works: [
                {
                    id: 1,
                    name: "Social Media Virtual Assistants",
                    img: "/images/admin.jpg"
                },
                {
                    id: 2,
                    name: "Remote Programmer & Developers",
                    img: "/images/web-development.jpg"
                },
                {
                    id: 3,
                    name: "Filipino Graphic Designer",
                    img: "/images/graphics.jpg"
                },
                {
                    id: 4,
                    name: "Amazon Virtual Assistant",
                    img: "/images/admin.jpg"
                },
                {
                    id: 5,
                    name: "General Virtual Assistant",
                    img: "/images/admin.jpg"
                },
                {
                    id: 6,
                    name: "SEO Experts / Digital Marketers",
                    img: "/images/marketing.jpg"
                },
                {
                    id: 7,
                    name: "Accountants / Bookkeepers",
                    img: "/images/writing.jpg"
                },
                {
                    id: 8,
                    name: "Telemarketing / Callcenter / BPO",
                    img: "/images/webmaster.jpg"
                },
            ]
        };

        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    receivedData() {
        axios
            .get(`https://api.mocki.io/v1/7a85ca5d`)
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

    componentDidMount() {
        this.receivedData()
    }
    render() {
        console.log(this.state.data);
        return (
            <Container maxWidth="md">
                <div style={{alignItems: 'center'}}>
                    <Grid style={{marginTop: 100}}/>
                    <ListItem items={this.state.data} />
                </div>
            </Container>


        )
    }
}
