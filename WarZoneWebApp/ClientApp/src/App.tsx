import AuthorizedView from './components/views/AuthorizedView';
import ConsentContent from './components/pages/ConsentContent';
import Home from './components/pages/Home';
import Offer from './components/pages/Offer';
import React, { Children, useState } from 'react';
import Receipts from './components/pages/Receipts';
import Resources from './Resources';
import WarzoneLayout from './components/WarzoneLayout';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { UsersClient } from './ApiClient';
import './styles/warzone.css';
import 'antd/dist/antd.css';

const App: React.FunctionComponent = () => {
  const [authorized, setAuthorized] = useState<boolean>();

  /*   const CheckIfAuthorized = () => {
      new UsersClient().authenticate()
    } */

  return (
    <BrowserRouter>
      <WarzoneLayout>
        <Switch>
          <Route path={Resources.pageAdresses.home} exact component={Home} />
          <Route path={Resources.pageAdresses.consent} component={ConsentContent} />
          <AuthorizedView authorized={true}>
            <Route path={Resources.pageAdresses.offer} component={Offer} />
            <Route path={Resources.pageAdresses.receipts} component={Receipts} />
          </AuthorizedView>

        </Switch>
      </WarzoneLayout>
    </BrowserRouter>
  );

}

export default App;