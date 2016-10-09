require("./../style.min.css");
import Map from './components/map/Map';
import ManageCharacter from './components/character/ManageCharacter'
import ReactDOM from 'react-dom';
import React from 'react';
import {Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();


import Room from './components/room/room';

ReactDOM.render(
    <Provider store={store}>
        <Room dimensions={{width:'640',height:'480'}} TILE_SIZE= {'20'}/>
    </Provider>, document.getElementById('App'));