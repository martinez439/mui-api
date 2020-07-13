import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';

export class ReminderItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      borderBottom: "1px #ccc dotted",
      
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
          <p style={{display: 'flex', flex: '1' , paddingLeft: '1rem', paddingRight:'2rem',justifyContent:'flex-start', alignContent:'center', alignItems: 'center'}}>
    
            {" "}
            {reminder}
            {"      "}
            </p>
          <Button 
          variant="contained" 
          color="primary" 
          size="small"
          style={{marginTop: '1rem', marginBottom: '1rem'}}
          onClick={() => {this.props.markComplete(_id);} } 
          type="submit">
            <CheckIcon /> 
          </Button>

          <IconButton 
          aria-label="delete" 
          onClick={this.props.deleteReminder.bind(this,_id)} 
          >
            <DeleteIcon style={{color: '#ed8b8a'}}/> 
          </IconButton>
          </div>
          {/* <button style={btnStyle} onClick={this.props.deleteReminder.bind(this,_id)}>
            x
             </button> */}
        
      </div>
    );
  }
}

// PropTypes
ReminderItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  updateCompletedList: PropTypes.func.isRequired
 
};



export default ReminderItem;