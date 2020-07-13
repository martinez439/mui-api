import React, { Component } from 'react'


export default class CardTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        
      };
      
      componentDidMount() {
        fetch("https://pacific-wildwood-91690.herokuapp.com/profitloss")
          .then(res => res.json())
          .then(
            (result) => 
              this.setState({
                items: result.Rows.Row[3].Summary.ColData[1].value},
                console.log(typeof result.Rows.Row[3].Summary.ColData[1].value)
              ),
             
              
          )
      
    }
   


    render() {
      const { items } = this.state;
      let firstNum = Math.trunc(items);
      let newNum = firstNum.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );
      
        return (
            <div>
              <>
              <h1 style={{marginLeft: '1.5rem'}}>${newNum}</h1>
              </>
            </div>
        )
    }
}