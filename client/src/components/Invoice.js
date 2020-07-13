import React, { Component } from "react";
import InvoiceList from './InvoiceList';
import axios from "axios";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import NotesOutlinedIcon from '@material-ui/icons/NotesOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import Grid from '@material-ui/core/Grid';


export default class Invoice extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmployee = this.onChangeEmployee.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      amount: "",
      service: "",
      
    };
  }


  onChangeEmployee(e) {
    this.setState({
      service: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      amount: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const workOrder = {
      amount: this.state.amount,
      service: this.state.service,
      
    };

    console.log(workOrder);

    axios
      .post("https://pacific-wildwood-91690.herokuapp.com/createinvoice", workOrder)
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
          label="Amount"
          id="filled-start-adornment"
          className={clsx()}
          onChange={this.onChangeDescription}
          value={this.state.amount}
          InputProps={{
            startAdornment: <InputAdornment position="start">
              <AttachMoneyOutlinedIcon fontSize="small" color="disabled"/> </InputAdornment>,
          }}
          variant="filled"
        />        
        <br></br>
        <div className="form-group">
          <TextField
          style={{marginBottom: '1rem'}}
          label="Service Description"
          id="filled-start-adornment"
          className={clsx()}
          onChange={this.onChangeEmployee}
          value={this.state.service}
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
           item md={6} sm={6} xs={16}
           style={{marginTop: '5rem', padding: '1rem'}}
           className="InvoiceList">
          <InvoiceList />
           </Grid>
        </Grid>
      </div>
    );
  }
}
