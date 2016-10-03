// 'use strict';
import Path from '../node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Populatedungeon, PopulateDungeon2} from './helper.js';
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

function DrawRoom(room) {

    let {x, y, width, height} = room;
    return Path().moveto(x, y).hlineto(x + width).vlineto(y + height).hlineto(x).closepath();

}

let tmp = PopulateDungeon2(2000, 1000, 6, 3);

let RoomArray = RandomChoose(tmp, 10);

let dungeon = RoomArray.map(alpha => DrawRoom(alpha));

let pathsArray = GetDungeonPaths(RoomArray, true);
console.log(pathsArray);

let centerList = TriangulateDungeon(RoomArray, false);

console.log("centerlist",centerList);

let triangles = centerList.map(arr => Path().moveto(arr[0][0], arr[0][1])
                                            .lineto(arr[1][0], arr[1][1])
                                            .lineto(arr[2][0], arr[2][1])
                                            .lineto(arr[0][0], arr[0][1])
                                            .closepath());
//triangleList = _.flatten(triangles);
//console.log(triangles);

let paths = pathsArray.map(arr => Path().moveto(arr[0][0], arr[0][1]).lineto(arr[1][0], arr[1][1]))

class Hello extends React.Component {
    render() {

        return (
            <svg width={grid.width} height={grid.height} viewBox={"0 0 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "#FFF8C6"
            }}>

                {dungeon.map((x, index) => <g key={"room No: " + index}>
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
