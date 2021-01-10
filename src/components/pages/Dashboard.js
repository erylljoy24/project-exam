import React, { Component } from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container/Container";
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";


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

export default class Dashboard extends React.Component {
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
            .get(`https://jsonplaceholder.typicode.com/photos`)
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

                const postData = slice.map(pd =>
                    <Grid container spacing={3}>
                        <Grid item xs={3} key={pd.id}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        image={pd.thumbnailUrl}
                                        style={{ height: '200px' }}
                                    />
                                    <CardContent style={{backgroundColor:'#273161'}}>
                                        <Typography style={{color:'#ffffff', fontWeight:'bold'}}>{pd.title}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                )

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData
                })
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
        return (
            <Container maxWidth="md">
                <div style={{alignItems: 'center'}}>
                    {this.state.postData}
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </Container>


        )
    }
}
