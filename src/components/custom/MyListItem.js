import React from 'react'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(4)
    },
    employerName: {
        fontWeight: '600'
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    avatarSkeletonContainer: {
        position: "relative"
    },
    avatarLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
    bodyContentSpacing:{
        padding: 25
    },
    btnExtraLarge: {
        height: 30,
        padding: '0 50px',
        marginTop: '15px'
    },
    colorText:{
        color: '#283263',
        fontWeight: 'bold'
    }
}));

export default function MyListItem(props) {
    const { items, itemDelete } = props;
    const classes = useStyles();

    return (
        <div>
            {
                items.map((item, index) =>
                    <Card className={classes.root} key={item.id}>
                        <Grid container spacing={0}>
                            <Grid item xs={5} className={classes.avatarSkeletonContainer}>
                                <img className={classes.avatarLoader} src={item.image} />
                            </Grid>
                            <Grid item xs={7} className={classes.bodyContentSpacing}>
                                <CardContent>
                                    <Grid container spacing={0} style={{width: 150, display: 'flex', alignItems: 'center'}}>

                                    </Grid>
                                    <Typography variant="h5" className={classes.colorText}>{item.name}</Typography>
                                    <Button variant="contained" uppercase={false} className={classes.btnExtraLarge} onClick={() => itemDelete(item)} color="primary">
                                        Delete Item
                                    </Button>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                )
            }
        </div>
    )
}
