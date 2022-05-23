import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client"

const root = ReactDOM.createRoot(document.getElementById('root'));

const link = new HttpLink({
  uri: "https://eu-central-1.aws.realm.mongodb.com/api/client/v2.0/app/ticketgo-realm-yiuzm/graphql",
  headers
})

const ticketgoClient = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache()
})

root.render(
  <BrowserRouter>
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
