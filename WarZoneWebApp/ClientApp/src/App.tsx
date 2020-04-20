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

const usePersistentState = (key: string, defaultValue: any) => {
  const _key = `persistent_state_${key}`;
  const [getPersistentState, setPersistentState] = useState(
    localStorage.getItem(_key) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(_key, getPersistentState);
  }, [key, getPersistentState]);
  return [getPersistentState, setPersistentState];
}

export interface IPersistentState {
  usePersistentState: (key: string, defaultValue: any) => any[];
}

export interface IAppContext {
  toggleAppUser: ((newAppUser: IAppUser | undefined) => void) | undefined;
}

export const PersistentStateContext = createContext<IPersistentState>({ usePersistentState: usePersistentState });
export const AppContext = createContext<IAppContext>({ toggleAppUser: undefined });

const App: React.FunctionComponent = () => {
  useEffect(() => {
    CheckIfAuthorized();
  }, [])

  const [authorized, setAuthorized] = useState<boolean>();
  const { usePersistentState } = useContext<IPersistentState>(PersistentStateContext);
  /*   const [appUserToken, setAppUserToken] = usePersistentState(Resources.persistentKeys.appUser, undefined); */

  const toggleAppUser = (newAppUser: IAppUser | undefined) => {
    //console.log("toggleAppUser: authorized = " + authorized + ", authorizedCtx = " + authorizedCtx);
    /*     setAppUserToken(newAppUser ? newAppUser.token : undefined); */
    setAuthorized(newAppUser !== undefined);
  };

  const CheckIfAuthorized = () => {
    new UsersClient().authorize().then(appUser => {
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
      <PersistentStateContext.Provider value={{ usePersistentState }}>
        <AppContext.Provider value={{ toggleAppUser }}>
          <WarzoneLayout>
            <Switch>
              <Route
                path={Resources.pageAdresses.home}
                exact
                render={(props) => <Home {...props} TryLogin={TryLogin} />}
              />
              <AuthorizedView authorized={authorized}>
                <Route path={Resources.pageAdresses.consent} component={ConsentContent} />
                <Route path={Resources.pageAdresses.offer} component={Offer} />
                <Route path={Resources.pageAdresses.receipts} component={Receipts} />
              </AuthorizedView>
            </Switch>
          </WarzoneLayout>
        </AppContext.Provider>
      </PersistentStateContext.Provider>
    </BrowserRouter>
  );

}

export default App;