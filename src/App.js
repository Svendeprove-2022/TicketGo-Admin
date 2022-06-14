import './App.css';

import Login from './pages/Login';
import Admin from './admin';
import { RealmAppProvider, useRealmApp } from './RealmApp';
import RealmApolloProvider from './RealmApolloProvider';

export const APP_ID = "ticketgo-uttab"

const RequireLoggedInUser = ({children}) => {
  const app = useRealmApp();
  return app.currentUser ? children : <Login/>
}

function App() {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <Admin/>
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}

export default App;
