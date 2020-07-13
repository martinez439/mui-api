import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';


export default class InvoiceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        
      };
      
      componentDidMount() {
        fetch("https://pacific-wildwood-91690.herokuapp.com/invoices")
          .then(res => res.json())
          .then(
            (result) => 
              this.setState({
                items: result.QueryResponse.Invoice},
                console.log(result)
              ),
              
          )
      
    }


    render() {
      const { items } = this.state;
        return (
            <div className="InvoiceList">
              <>
              <Card>
              <List>
              
              {items.map(item => (
                <ListItem alignItems="flex-start" key={item.Id}>
                  <Divider component="li" style={{
                      margin: '0 0 25px 0'
                }}>
                  <li key={item.Id}><h4>{item.CustomerRef.name}| {" "}$
                {item.Line[0].Amount}</h4></li>
                </Divider>
                </ListItem>
              ))}
              
            </List>  
            
              
                
              </Card>
              </>
            </div>
        )
    }
}