import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { history } from '../../helpers/history';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerItem: {
    paddingLeft: '15%',
    '& .MuiListItemText-primary': {
      fontWeight: '500',
      color: theme.palette.primary.main
    }
  },
  drawerItemIcon: {
    padding: theme.spacing(1),
    '& .MuiIcon-root': {
      borderRadius: theme.spacing(.7),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      padding: '3px',
      height: '30px',
      width: '30px'
    }
  },
  drawerItemActive: {
    // borderLeft: '3px solid #f44336',
    // backgroundColor: '#e9effd'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function LeftDrawer(props) {
  const { user, menuItems, currentpath } = props;

  const [ selectedPage, setSelectedPage ] = React.useState(currentpath);

  const classes = useStyles();
    
  function toLink(path){
    if(path){
      setSelectedPage(path);
      history.push(path);
    }
  }

  // className={currentpath == item.path ? classes.drawerItemActive : ''}
  // <Icon color="primary">add_circle</Icon>

  function ListMenuItems(){
    return menuItems.map((item, index) => (
      <ListItem button selected={selectedPage == item.path} className={classes.drawerItem} key={index} onClick={() => { toLink(item.path) }}>
        <ListItemIcon className={classes.drawerItemIcon}>
          <Icon>{item.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={
          item.name
        }></ListItemText>
      </ListItem>
      ))
  }

  return (
      <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
          paper: classes.drawerPaper,
          }}
      >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
                <ListMenuItems/>
            </List>
          </div>
      </Drawer>
  )
}
