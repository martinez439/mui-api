import React, { Component } from 'react'
import axios from 'axios';
import FinishedItem from './FinishedItem';
import Paper from '@material-ui/core/Paper';




export default class CompletedReminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
        todos: []
      };
      this.deleteReminder = this.deleteReminder.bind(this);
      this.undoReminder = this.undoReminder.bind(this);
      this.updateCompletedList = this.updateCompletedList.bind(this);
      
     
    }

      componentDidMount() {
        axios
          .get("https://pacific-wildwood-91690.herokuapp.com/reminders/unchecked")
    
          .then(response => {

            console.log(response.data)
            let mongoInfo = response.data

            this.setState({ todos: mongoInfo });
          })
          .catch(error => {
            console.log(error);
          });
          
      }


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
            todos: this.state.todos.filter(todo => todo._id !== id)
          });
          window.location.reload();
            
      };

      deleteReminder(id) {
        axios.delete("https://pacific-wildwood-91690.herokuapp.com/reminders/" + id).then(response => {
          console.log(response.data);
        });
    
        this.setState({
          todos: this.state.todos.filter(todo => todo._id !== id)
        });
      }

      updateCompletedList = () => {
        axios
          .get("https://pacific-wildwood-91690.herokuapp.com/reminders/unchecked")
    
          .then(response => {

            console.log(response.data)
            let mongoInfo = response.data

            this.setState({ todos: mongoInfo });
          })
          .catch(error => {
            console.log(error);
          });
          
      }
  
      remList() {
        return this.state.todos.map(todo => {
          return (
            <FinishedItem
              todo={todo}
              key={todo._id}
              deleteReminder={this.deleteReminder}
              undoReminder={this.undoReminder}
              updateCompletedList={this.updateCompletedList}
            />
          );
        });
      }

    
      render() {
        return (
         
            <div className="CompletedSection">
              <div className="container">
                
                    <React.Fragment>
                      <Paper 
                      elevation={3} 
                      style={{marginLeft: '2rem', 
                      marginTop: '5.5rem', 
                      paddingLeft: '.5rem',
                      paddingRight: '.5rem'}}>

                      <h1 
                      style={{display: 'flex', 
                      marginBottom:'.5rem',
                      alignContent: 'center', 
                      alignItems:'center', 
                      justifyContent:'center'}}> Completed:</h1> 
                      {this.remList()}

                      </Paper>
                    </React.Fragment>
                
               
              </div>
            </div>
          
        );
      }
    }
