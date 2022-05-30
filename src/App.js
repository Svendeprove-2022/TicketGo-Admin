import './App.css';

import Login from './pages/Login';
import Admin from './Admin';
import { RealmAppProvider, useRealmApp } from './RealmApp';
import RealmApolloProvider from './RealmApolloProvider';


export const APP_ID = "ticketgo-uttab"

/* const items = [
  {label: ((<a href='/'>Home</a>)), key: 'item-1'}, 
  {label: (<a href='/events'>Events</a>), key:'item-2'},
  {label: (<a href='/artists'>Artists</a>), key:'item-3'},
  {label: (<a href='/sales'>Sales</a>), key:'item-4'},
  {label: (<a href='/login'>Login</a>), key:'item-5'}
]
 */

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
