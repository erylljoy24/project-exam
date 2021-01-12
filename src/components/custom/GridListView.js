import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default function GridListView(props) {
    const { lists, addCart } = props;

    return (
        <Grid container spacing={3}>
            {
                lists.map((list, index) => (
                    <Grid item xs={3} key={list.id}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    image={list.image}
                                    style={{ height: '200px' }}
                                />
                                <CardContent style={{backgroundColor:'#273161',}}>
                                    <Typography variant="h6" style={{color:'#ffffff', height:'50'}}>{list.name}</Typography>
                                </CardContent>
                                <CardContent style={{textAlign:'center'}} onClick={() => addCart(list)}>
                                    <Typography variant="h6"> Add to cart </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
