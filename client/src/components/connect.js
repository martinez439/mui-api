import React, { Component } from 'react'


import Grid from '@material-ui/core/Grid';


class ConnectQb extends Component {

    render(){
        return (
            
            <Grid>
            <div>
           
                
                <button onClick={() => {
            window.location = window.location.href
              ? 'https://pacific-wildwood-91690.herokuapp.com/login' 
              : 'https://pacific-wildwood-91690.herokuapp.com/' }
                }
                style={{padding: '8px', 
                'fontSize': '20px', 
                'marginTop': '1rem', 
                'marginLeft' : '1rem' }}>
              Connect QuickBooks</button>
        
            </div>
            </Grid>
        )
    }
}
export default ConnectQb;

