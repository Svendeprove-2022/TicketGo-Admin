import { Layout, Menu, Breadcrumb } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'

import {Route, Routes} from 'react-router-dom'
import { RealmAppProvider, useRealmApp } from './RealmApp';

import Home from './pages/Home';
import Events from './pages/Events';
import Venues from './pages/Venues';
import Sales from './pages/Sales';
import Logout from './pages/logout';
import Users from './pages/Users';
import EditUser from './pages/EditUser';

import CreateEvent from './pages/create/EventCreate';
import ReadEvent from './pages/read/ReadEvent';
import EditEvent from './pages/EditEvent';
import VenueCreate from './pages/create/VenueCreate'
import VenueEdit from './pages/edit/VenueEdit'

const items = [
    {label: (<a href='/'>Home</a>), key: 'item-1'}, 
    {label: (<a href='/events'>Events</a>), key:'item-2'},
    {label: (<a href='/venues'>Venues</a>), key:'item-3'},
    {label: (<a href='/users'>Users</a>), key:'item-6'},
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
            <Route path='/events/create' element={ <CreateEvent/> }/>
            <Route path='/events/:id' element={<ReadEvent/>}/>
            <Route path='/events/edit/:id' element={<EditEvent/>} />

            <Route path="/users" element={ <Users/> }/>
            <Route path="/users/edit/:id" element={ <EditUser/> }/>
            
            <Route path="/venues" element={ <Venues/> }/>
            <Route path="/venues/create" element={ <VenueCreate/> }/>
            <Route path="/venues/edit/:id" element={ <VenueEdit/> }/>

            <Route path="/logout" element={ <Logout/> }/>
        </Routes>
    </Content>
    <Footer></Footer>
    </Layout>
    )
}