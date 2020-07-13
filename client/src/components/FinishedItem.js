import React, { Component } from "react";
import PropTypes from "prop-types";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';


export class FinishedItem extends Component {
  getStyle = () => {
    return {
      color: "gray",
      background: "white",
      
      width: "280px",
      borderBottom: "3px #ccc dotted",
      
    };
  };

  componentDidMount = (props) => {

    
    //console.log(this.props.todo);
  };


  render() {
    const { _id, reminder } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <div style={{display: 'flex', justifyContent:'flex-end',alignContent:'center'}}>
        <p style={{display: 'flex',flex: '1' , justifyContent:'flex-start', alignContent:'center', textDecoration: "line-through",}}>
         
          {reminder}
       </p>
         

            <IconButton 
            aria-label="delete" 
            onClick={() => {this.props.undoReminder(_id);} } 
            >
            <UndoIcon style={{color: 'gray'}}/> 
            </IconButton>

          <IconButton 
          aria-label="delete" 
          onClick={this.props.deleteReminder.bind(this,_id)} 
          >
            <DeleteIcon style={{color: '#ed8b8a'}}/> 
          </IconButton>
          </div>
      </div>
    );
  }
}

// PropTypes
FinishedItem.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteReminder: PropTypes.func.isRequired,
  updateCompletedList: PropTypes.func.isRequired
 
};



export default FinishedItem;