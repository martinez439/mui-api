import React from 'react';
import PropTypes from 'prop-types';
//import { NavLink } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';




const drawerWidth = 165;
function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


export default function ClippedDrawer() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
   
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>

        <List aria-label="main mailbox folders">
            <ListItemLink 
            to="/" 
            primary="Dashboard" 
            icon={<HomeIcon />} 
            
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            />
            <ListItemLink 
            to="/tickets" 
            primary="Customers" 
            icon={<PeopleIcon />} 
            
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}/>
            <ListItemLink 
            to="/invoice" 
            primary="Invoices" 
            icon={<DescriptionIcon />} 
            
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            />
          </List>
          <Divider />
          <List aria-label="secondary mailbox folders">
            <ListItemLink to="/connect" primary="Connect" />
            <ListItemLink to="/fake" primary="Random" />
          </List>

         
         
        </div>
      </Drawer>
    </div>
  );
}