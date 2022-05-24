import { Layout, Menu, Breadcrumb } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'

import {Route, Routes} from 'react-router-dom'
import { RealmAppProvider, useRealmApp } from './RealmApp';

import Home from './pages/Home';
import Events from './pages/Events';
import Artists from './pages/Artists';
import Sales from './pages/Sales';
import Logout from './pages/logout';
import editEvent from './pages/edit/editEvent';

const items = [
    {label: ((<a href='/'>Home</a>)), key: 'item-1'}, 
    {label: (<a href='/events'>Events</a>), key:'item-2'},
    {label: (<a href='/artists'>Artists</a>), key:'item-3'},
    {label: (<a href='/sales'>Sales</a>), key:'item-4'},
    {label: (<a href='/logout'>Log out</a>), key:'item-5'},
  ]

export default function Admin(){
    const app = useRealmApp();

    return (
    <Layout style={{minHeight: '100vh'}}>
    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
        <div className="logo"  style={{height: '30px', width:'120px', float: 'left', margin: '16px 24px 16px 0', background: 'rgba(255, 255, 255, 0.3)'}}/>
        <Menu theme='dark' mode='horizontal' items={items}/>  
    </Header>
    <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64,}}>
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/sales" element={ <Sales/> }/>
            <Route path="/events" element={ <Events/> }/>
            <Route path="/events/edit/" element= { <editEvent/> }/>
            <Route path="/artists" element={ <Artists/> }/>
            <Route path="/logout" element={ <Logout/> }/>
        </Routes>
    </Content>
    <Footer></Footer>
    </Layout>
    )
}