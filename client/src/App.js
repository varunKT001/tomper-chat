import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { LoginAndRegister, ChatsPage, PrivateRoute } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <ChatsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginAndRegister />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
