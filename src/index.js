require("./../style.min.css");
import Map from './components/map/Map';
import ManageCharacter from './components/character/ManageCharacter'
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
    <ManageCharacter />, document.getElementById('App'));
