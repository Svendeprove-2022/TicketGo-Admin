import { Layout, Menu} from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'

import {Route, Routes} from 'react-router-dom'
import { useRealmApp } from './RealmApp';
import { Link,useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Events from './pages/Events';
import Venues from './pages/Venues';
import Orders from './pages/Orders';
import Logout from './pages/logout';
import Users from './pages/Users';
import EditUser from './pages/edit/EditUser';

import CreateEvent from './pages/create/EventCreate';
import ReadEvent from './pages/read/ReadEvent';
import EditEvent from './pages/edit/EditEvent';

import VenueCreate from './pages/create/VenueCreate'
import VenueEdit from './pages/edit/VenueEdit'

import CreateOrder from './pages/create/CreateOrder';
import EditOrder from './pages/edit/EditOrder';

const items = [
    {label: (<Link to='/'>Home</Link>), key: 'item-1'}, 
    {label: (<Link to='/events'>Events</Link>), key:'item-2'},
    {label: (<Link to='/venues'>Venues</Link>), key:'item-3'},
    {label: (<Link to='/orders'>Orders</Link>), key:'item-4'},
    {label: (<Link to='/users'>Users</Link>), key:'item-5'},
    {label: (<Link to='/logout'>Log out</Link>), key:'item-6'},
  ]

export default function Admin(){
    const app = useRealmApp();

    return (
    <Layout style={{minHeight: '100vh'}}>
    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
        <div className="logo"  style={{
            height: '30px', width:'120px', 
            float: 'left', margin: '16px 24px 16px 0', background: 'rgba(255, 255, 255, 0.3)'}}/>
        <Menu theme='dark' mode='horizontal' items={items}/>  
    </Header>
    <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64,}}>
        <Routes>
            <Route path="/" element={ <Home/> }/>

            <Route path="/orders" element={ <Orders/> }/>
            <Route path='/orders/create' element={<CreateOrder/>}/>
            <Route path='/orders/edit/:id' element={<EditOrder/>}/>

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
    <Footer/>
    </Layout>
    )
}