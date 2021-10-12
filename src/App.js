import React from 'react';
import { Route } from 'react-router-dom';
import HeaderContainer from './containers/Base/HeaderContainer';
import { Home, Auth, Table } from './pages';
import Mypage from './pages/mypage';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/user" component={Auth}/>
      <Route path="/table" component={Table}/>
      <Route path="/mypage" component={Mypage}/>
    </div>
  );
}

export default App;
