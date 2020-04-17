import AuthorizedView from './components/views/AuthorizedView';
import ConsentContent from './components/pages/ConsentContent';
import Home from './components/pages/Home';
import Offer from './components/pages/Offer';
import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState
  } from 'react';
import Receipts from './components/pages/Receipts';
import Resources from './Resources';
import WarzoneLayout from './components/WarzoneLayout';
import { BrowserRouter } from 'react-router-dom';
import { IAppUser, SwaggerException, UsersClient } from './ApiClient';
import { Route, Switch } from 'react-router';
import './styles/warzone.css';
import 'antd/dist/antd.css';

export interface IAppUserContext {
  appUserCtx: IAppUser | undefined;
  authorizedCtx: boolean | undefined;
  toggleAppUser: any;
}

export const AppUserContext = createContext<IAppUserContext>({ appUserCtx: undefined, toggleAppUser: undefined, authorizedCtx: false });

const App: React.FunctionComponent = () => {
  useEffect(() => {
    CheckIfAuthorized();
  }, [])



  const [authorized, setAuthorized] = useState<boolean>();
  const [appUser, setAppUser] = useState<IAppUser>();// nie uzywac appUser, uzyj appUserCtx

  const { appUserCtx, authorizedCtx } = useContext<IAppUserContext>(AppUserContext);

  const toggleAppUser = (newAppUser: IAppUser | undefined) => {
    console.log("toggleAppUser: authorized = " + authorized + ", authorizedCtx = " + authorizedCtx);

    setAppUser(newAppUser);
    setAuthorized(newAppUser ? true : false);

  };

  const CheckIfAuthorized = () => {
    new UsersClient().authorize(appUserCtx && appUserCtx.token ? appUserCtx.token : null).then(appUser => {
      toggleAppUser(appUser ? appUser : undefined);
    }).catch(ex => {
      if (SwaggerException.isSwaggerException(ex) && (ex as SwaggerException).status === 401) {
        toggleAppUser(undefined);
      }
    });
  }

  const TryLogin = (username: string, password: string) => {
    new UsersClient().authenticate(username, password).then(resp => {
      toggleAppUser(resp ? resp : undefined);
    }).catch(ex => {
      if (SwaggerException.isSwaggerException(ex) && (ex as SwaggerException).status === 400) {
        toggleAppUser(undefined);
        alert("zly login lub haslo");
      }
    });
  }

  return (
    <BrowserRouter>
      <AppUserContext.Provider value={{ appUserCtx, toggleAppUser, authorizedCtx }}>
        <WarzoneLayout>
          <Switch>
            <Route
              path={Resources.pageAdresses.home}
              exact
              render={(props) => <Home {...props} TryLogin={TryLogin} />}
            />
            <AuthorizedView authorized={authorizedCtx}>
              <Route path={Resources.pageAdresses.consent} component={ConsentContent} />
              <Route path={Resources.pageAdresses.offer} component={Offer} />
              <Route path={Resources.pageAdresses.receipts} component={Receipts} />
            </AuthorizedView>
          </Switch>
        </WarzoneLayout>
      </AppUserContext.Provider>
    </BrowserRouter>
  );

}

export default App;