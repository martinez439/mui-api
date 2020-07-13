import React, { Component } from "react";
import axios from "axios";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import CreateIcon from '@material-ui/icons/Create';
import CustomerList from "./CustomerList";
import Grid from '@material-ui/core/Grid';



export default class Tickets extends Component {
  
  constructor(props) {
    super(props);

    this.onChangeEmployee = this.onChangeEmployee.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      customer: "",
      notes: "",
      
    };
  }


  onChangeEmployee(e) {
    this.setState({
      customer: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      notes: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const workOrder = {
      customer: this.state.customer,
      notes: this.state.notes,
      
    };

    console.log(workOrder);

    axios
      .post("https://pacific-wildwood-91690.herokuapp.com/customer", workOrder)
      .then(res => console.log(res.data))
      .catch(console.error);
    window.location = "/";
  }
  

  render() {

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item md={4} sm={6}>
        <form onSubmit={this.onSubmit} style={{marginLeft: '12rem', marginTop: '5rem'}}>
          
        <TextField
          style={{marginBottom: '1rem'}}
          label="Customer Name"
          id="filled-start-adornment"
          className={clsx()}
          onChange={this.onChangeDescription}
          value={this.state.customer}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <CreateIcon fontSize="small" color="disabled"/> </InputAdornment>,
          }}
          variant="filled"
        />        
        <br></br>
        <div className="form-group">
          <TextField
          style={{marginBottom: '1rem'}}
          label="Description"
          id="filled-start-adornment"
          className={clsx()}
          onChange={this.onChangeEmployee}
          value={this.state.notes}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <NotesOutlinedIcon fontSize="small" color="disabled"/>
            </InputAdornment>,
          }}
          variant="filled"
        /> 
        </div>
        
        
      


          <div className="form-group">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onSubmit={this.onSubmit}
            >
              Create
            </Button>


           {/* <input
              type="submit"
              value="Create WO"
              className="btn btn-primary"
              onSubmit={this.onSubmit}
           /> */}
          </div>
          
        </form>
        </Grid>
           
           <Grid 
           item md={8} sm={6}
           style={{marginTop: '5rem', padding: '1rem'}}
           >
           <CustomerList  />
           </Grid>

        </Grid>
      </div>
    );
  }
}
