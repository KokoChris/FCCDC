// 'use strict';
import Path from '../node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {PopulateDungeon, PopulateDungeon2} from './helper.js';
import {TriangulateDungeon, GetDungeonPaths} from './helper1.js'


const grid = {
    width: 1500,
    height: 800
};

function RandomChoose(arr, sel) {
    let rndArr = [];

    if ((sel > arr.length))
        console.log("error")
    else
        for (let i = 0; i < 10; i++)
            rndArr = _.concat(rndArr, arr.splice(_.random(0, arr.length - 1), 1));
return rndArr;

}

const rooms = PopulateDungeon(2000, 200, 800, 1000, 200, 400);

function DrawRoom(room) {

    let {x, y, width, height} = room;
    return Path().moveto(x, y).hlineto(x + width).vlineto(y + height).hlineto(x).closepath();

}

let dungeon = RandomChoose(rooms, 10)

let DrawnDungeon = dungeon.map(x => DrawRoom(x));

let tmp = (PopulateDungeon2(2000, 1000, 6, 3))

let RoomArray = RandomChoose(tmp, 10);

let secondDungeon = RoomArray.map(alpha => DrawRoom(alpha));

let pathsArray = GetDungeonPaths(RoomArray);

let paths = pathsArray.map(arr => Path().moveto(arr[0][0], arr[0][1]).lineto(arr[1][0], arr[1][1]))

class Hello extends React.Component {
    render() {

        return (
            <svg width={grid.width} height={grid.height} viewBox={"0 0 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "#FFF8C6"
            }}>

                {secondDungeon.map((x, index) => <g key={"room No: " + index}>
                    <path d={x.print()} fill="none" stroke="blue"/>
                </g>)}
                {paths.map((x, index) => <g key={"path: " + index}>
                    <path d={x.print()} fill="none" stroke="blue"/>
                </g>)}
            </svg>
        )
    }
};

ReactDOM.render(
    <Hello/>, document.getElementById('App'));
