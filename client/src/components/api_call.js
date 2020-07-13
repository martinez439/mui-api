import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export default class ApiCall extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        this.onSubmit = this.apiCall.bind(this)
      };
    
       apiCall() {
        fetch("https://pacific-wildwood-91690.herokuapp.com/getCompanyInfo")
          .then(res => res.json())
          .then(
            (result) => 
              this.setState({
                items: result.CompanyInfo.CompanyName
              }),
              
          )
      }
    


    render() {
      const { items } = this.state;
        return (
            <div>
              <Button variant="contained" onClick={this.apiCall.bind(this)}>Get Company Info</Button>
              <h1>{items}</h1>
            </div>
        )
    }
}


