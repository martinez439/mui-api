import React from 'react';
import ClippedDrawer from './components/sidebar';
import DashBoard from './components/dashboard';
import Navbar from './components/navbar';
import Tickets from './components/Tickets';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConnectQb from './components/connect';
import Invoice from './components/Invoice'



function App() {
  return (
    <Router>
      <div className="App">
    
    <Navbar />
    <ClippedDrawer />
      <Switch>
        <Route path="/" exact component={DashBoard} />
        <Route path="/tickets" component={Tickets} />
        <Route path="/connect" component={ConnectQb} />
        <Route path="/invoice" component={Invoice} />
        
      </Switch>
    
    </div>
    </Router>
   );
}

export default App;
