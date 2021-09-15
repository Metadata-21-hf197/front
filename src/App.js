import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HeaderContainer from './containers/Base/HeaderContainer';
import { Home, Auth } from './pages';

function App() {
  return (
    <div>
      <HeaderContainer/>
      <Route exact path="/" component={Home}/>
      <Route path="/auth" component={Auth}/>
    </div>
  );
}

export default App;
