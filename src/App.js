import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Tester from './pages/Tester'
import SignUp from './pages/SignUp'
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {

  const appStyle= {
    marginBottom: "50px",
  }

  return (
    <Router>
      <div style={appStyle}>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/jobs' component={Jobs} />
        <Route path='/tester' component={Tester} />
        <Route path='/sign-up' component={SignUp} />
        
      </Switch>
      </div>
      <div class="footer">
        </div>
    </Router>
  );
}

export default App;