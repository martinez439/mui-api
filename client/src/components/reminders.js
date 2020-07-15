import React, { Component } from 'react'
import axios from 'axios';
import AddReminder from './addReminder'
import ReminderItem from './reminderItem';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
import Grid from '@material-ui/core/Grid';








export default class ReminderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        todos: [],
        completedSection: []
      };
      this.markComplete = this.markComplete.bind(this);
      this.deleteReminder = this.deleteReminder.bind(this);
      this.undoReminder = this.undoReminder.bind(this);
      this.remList=this.remList.bind(this);
      this.addNew = this.addNew.bind(this);
    }

      componentDidMount() {
        axios
          .get("https://pacific-wildwood-91690.herokuapp.com/reminders")
    
          .then(response => {

            console.log(response.data)
            //let mongoInfo = response.data

            this.setState({ todos: response.data });
          })
          .catch(error => {
            console.log(error);
          });
          this.updateCompletedList()
      }


      updateCompletedList = () => {
        axios
          .get("https://pacific-wildwood-91690.herokuapp.com/unchecked")
    
          .then(response => {

            console.log(response.data)
            let mongoInfo = response.data

            this.setState({ completedSection: mongoInfo });
          })
          .catch(error => {
            console.log(error);
          });
        }

      markComplete (id, reminder) {
        axios
          .patch("https://pacific-wildwood-91690.herokuapp.com/reminders/" + id, { isComplete: "true" })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });

          
          this.setState({
            todos: this.state.todos.filter(todo => todo._id !== id),
          });
          this.updateCompletedList()
         //window.location.reload();
          
      };



      

      deleteReminder(id) {
        axios.delete("https://pacific-wildwood-91690.herokuapp.com/reminders/" + id).then(response => {
          console.log(response.data);
        });
    
        this.setState({
          todos: this.state.todos.filter(todo => todo._id !== id),
          completedSection: this.state.completedSection.filter(completedItem => completedItem._id !== id)
        });
      }
      
      addNew() {
        axios
          .get("https://pacific-wildwood-91690.herokuapp.com/reminders")
    
          .then(response => {

            console.log(response.data)
            //let mongoInfo = response.data

            this.setState({ todos: response.data });
          })
          .catch(error => {
            console.log(error);
          });
        };
        


        undoReminder (id) {
          axios
            .patch("https://pacific-wildwood-91690.herokuapp.com/reminders/" + id, { isComplete: "false" })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            });
            
            this.setState({
              completedSection: this.state.completedSection.filter(todo => todo._id !== id),

            });
            window.location.reload();
              
        };
  
        
          
  
      remList() {
        return this.state.todos.map(todo => {
          return (
            <ReminderItem
              todo={todo}
              key={todo._id}
              markComplete={this.markComplete}
              deleteReminder={this.deleteReminder}
              updateCompletedList={this.updateCompletedList}
              
              
            />
          );
        });
      }

      doneList = () => {
        
        return (
        this.state.completedSection.map((completedSection) => 
        <div style={{display: 'flex', justifyContent:'flex-end', alignContent:'center'}}>
        <li style={{listStyleType: "none",
            display: 'flex',
            paddingLeft: '1rem',
            flex: '1' , 
            justifyContent:'flex-start', 
            alignContent:'center', 
            textDecoration: "line-through",
            borderBottom: "3px #ccc dotted"
        }}>{ completedSection.reminder } </li>
         <IconButton 
            aria-label="delete" 
            onClick={() => this.undoReminder(completedSection._id)} 
            >
            <UndoIcon style={{color: 'gray'}}/> 
            </IconButton>

          <IconButton 
          aria-label="delete" 
          onClick={() => this.deleteReminder(completedSection._id)} 
          >
            <DeleteIcon style={{color: '#ed8b8a'}}/> 
          </IconButton>
        </div>)
        )}


        getStyle = () => {
          return {
            marginTop: '1rem',
            color: "gray",
            background: "white",
            width: "200px",
            
            
          };
        };

     
    
      render() {
        return (
         
            <div className="App">
              <div className="ReminderSection">
                
                    <React.Fragment>
                    
                

                      <div style={{justifyContent:'flex-end'}}>
                      <AddReminder 
                      addReminder={this.addReminder}
                      addNew={this.addNew}
                      
                      />
                      </div>
                      <Grid container className="GridContainer">
                        <Grid item>
                      <Paper 
                      elevation={3} 
                      style={{marginRight:'1rem'

                      }}>
                        <h1 
                        style={{
                        
                        display: 'flex', 
                        marginBottom:'.5rem',
                        alignContent: 'center', 
                        alignItems:'center', 
                        justifyContent:'center'}}> Reminders</h1> 
                    {/*  {this.remList()} */}
                      </Paper>
                      </Grid>
                      <Grid item>
                      <Paper elevation={3} style={this.getStyle()}>
                        <h1 style={{display: 'flex', 
                        marginBottom:'.5rem',
                        alignContent: 'center', 
                        alignItems:'center', 
                        justifyContent:'center'}}>Completed</h1>
                  {/*     {this.doneList()} */}
                      </Paper>
                      
                      </Grid>
                      </Grid>
                    </React.Fragment>
                    
                
               
              </div>
            </div>
          
        );
      }
    }
