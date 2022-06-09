import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { RealmAppProvider, useRealmApp } from '../RealmApp';

const Logout = () => {
    const app = useRealmApp()
    app.logOut()
}

export default Logout