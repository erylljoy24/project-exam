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
        height: 50,
        padding: '0 50px',
        marginTop: '15px'
    },
    colorText:{
        color: '#283263',
        fontWeight: 'bold'
    }
}));

export default function ListItem(props) {
    const { items } = props;
    const classes = useStyles();

    return (
        <div>
            {
                items.map((item, index) =>
                    <Card className={classes.root} key={item.id}>
                        <Grid container spacing={0}>
                            <Grid item xs={5} className={classes.avatarSkeletonContainer}>
                                <img className={classes.avatarLoader} src={item.thumbnailUrl} />
                                {/* <Skeleton variant="rect" animation={false} className={classes.avatarLoader}/> */}
                            </Grid>
                            <Grid item xs={7} className={classes.bodyContentSpacing}>
                                <CardContent>
                                    <Grid container spacing={0} style={{width: 150, display: 'flex', alignItems: 'center'}}>
                                        <Grid item xs={4}>
                                            <IconButton type="submit" className={classes.iconButton}>
                                                <RemoveIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={4} className={classes.colorText} style={{textAlign: 'center'}}>
                                            2pcs
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton type="submit" className={classes.iconButton}>
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="h5" className={classes.colorText}>{item.title}</Typography>
                                    <Button variant="contained" uppercase={false} className={classes.btnExtraLarge} color="primary">
                                        Read Article
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
