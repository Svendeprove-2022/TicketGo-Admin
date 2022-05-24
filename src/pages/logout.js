import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { RealmAppProvider, useRealmApp } from '../RealmApp';

export default function Logout(){
    const app = useRealmApp();
    app.logOut()
}