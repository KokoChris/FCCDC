require("./../style.min.css");
import Map from './components/map/Map';
import ManageCharacter from './components/character/ManageCharacter'
import ReactDOM from 'react-dom';
import React from 'react';
import Room from './components/room/room';
ReactDOM.render(
    <Room width={640} height={480} />, document.getElementById('App'));
