import React from 'react';
import CardOne from './CardOne';
import CardTwo from './CardTwo';
import CardThree from './CardThree';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
//import Button from '@material-ui/core/Button';
import { green, pink } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Divider from '@material-ui/core/Divider';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import ReminderList from './reminders';
import ConnectQb from './connect'

//import Toolbar from '@material-ui/core/Toolbar';

//import Icon from "@material-ui/core/Icon";




const drawerWidth = 140;

const useStyles = makeStyles((theme) => (
  {
    root: {
      width: '250px',
      marginTop: '.5rem'
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
    pink: {
      color: theme.palette.getContrastText(pink[500]),
      backgroundColor: pink[500],
    },
    green: {
      color: '#fff',
      backgroundColor: green[500],
    },
    content: {
      
      diplay: 'inline-flex',
      marginLeft: '9.5rem',
      marginTop: '2.5rem',
      flexGrow: 1,
      
      //justifyContent: 'flex-end',
      padding: theme.spacing(5),
    },

    reminders: {
      
      diplay: 'inline-flex',
      marginLeft: '1.5rem',
      marginTop: '.5rem',
      flexGrow: 1,
      
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    
  }));

  
export default function DashBoard() {
  const classes = useStyles();
   return (
          <div>
          
          <Grid container className={classes.content}>
          <Grid item xs={12} sm={4} md={3.5}>
          <Card className={classes.root}>
          <CardHeader
                avatar={<Avatar>
                <FolderIcon />
               </Avatar>}
                title="Card 1"
                subheader="September 14, 2016"
                />
                <Divider variant="inset" />
                
                <CardOne className={classes.centerInteriorContent}/>
         <CardActions>
              <Typography variant="caption" color="primary" gutterBottom>
              One paragraph
              </Typography>
                
          </CardActions>   
          
          </Card>
          </Grid>
          
          <Grid item xs={12} sm={4} md={3.5}>
          <Card className={classes.root}>
          
          <CardHeader
                avatar={<Avatar className={classes.green}>
                  <PageviewIcon />
                </Avatar>}
                title="Card 2"
                subheader="Total Net Income"
                />
          <Divider variant="inset" />
          
            <CardTwo />  
          </Card>
          
          </Grid>
          <Grid item xs={12} sm={4} md={2} >
          <Card className={classes.root}>
          
          <CardHeader
                avatar={<Avatar className={classes.pink}>
                    <AssignmentIcon />
                    </Avatar>}
                title="Receivables"
                subheader="Aging"
                />
             <Divider variant="inset" />
             <CardThree />
         
          </Card>
          
          </Grid>
          <ConnectQb />
        </Grid>
        <Grid container className={classes.reminders}>
          
        <ReminderList />
        
          </Grid>
          
        </div>
      
  
      
)
   }
