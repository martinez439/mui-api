import React, { Component } from 'react'


export default class CardThree extends Component {

    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        
      };
      
      componentDidMount() {
        fetch("https://pacific-wildwood-91690.herokuapp.com/receive")
          .then(res => res.json())
          .then(
            (result) => 
              this.setState({
                items: result.Rows.Row[2].Summary.ColData[6].value},
                console.log(result)
              ),
             
              
          )
      
    }


    render() {
      const { items } = this.state;
      let cardThreeNum = Math.trunc(items);
      let newNumThree = cardThreeNum.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );
      
        return (
            <div>
              <>
              <h1 style={{marginLeft: '1.5rem'}}>${newNumThree}</h1>
              </>
            </div>
        )
    }
}