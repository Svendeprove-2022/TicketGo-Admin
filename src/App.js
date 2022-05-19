import './App.css';

import { Layout, Menu, Breadcrumb } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'

import { HashRouter, Link ,Route, Routes, useLocation} from 'react-router-dom'

import Home from './pages/Home'
import Events from './pages/Events'
import Artists from './pages/Artists'
import Sales from './pages/Sales'

const items = [
  {label: ((<a href='/'>Home</a>)), key: 'item-1'}, 
  {label: (<a href='/sales'>Sales</a>), key:'item-2'},
  {label: (<a href='/events'>Events</a>), key:'item-3'},
  {label: (<a href='/artists'>Artists</a>), key:'item-4'}
]

const breadCrumbMap = {
  '/home':'home',
  '/sales': 'sales',
  '/sales/details': 'details',
  '/events/': 'events',
  '/events/details': 'details',
}

/* https://ant.design/components/breadcrumb/ */

function App() {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
        <div className="logo" />
        <Menu theme='dark' mode='horizontal' items={items}/>  
      </Header>
      <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64,}}>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/sales" element={ <Sales/> }/>
          <Route path="/events" element={ <Events/> }/>
          <Route path="/artists" element={ <Artists/> }/>
        </Routes>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}

export default App;
