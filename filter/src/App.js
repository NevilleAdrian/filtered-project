import React from 'react';
import Filter from './Filter/filter'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
    <Route exact path="/" component={Filter} />
    </Router>
  );
}

export default App;

