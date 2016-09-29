'use strict'
import Path from './node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
const grid = {
    width: 1000,
    height: 500
};

function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
function Spread(beta, alpha) {

    const dify = Math.abs(beta.y) - Math.abs(alpha.y) - alpha.height;
    const difx = Math.abs(beta.x) - Math.abs(alpha.x) - alpha.width;
    let newBeta = beta;
    let sign = {};
    if ((dify <= 0) && (difx <= 0)) {
        sign.x = ((beta.x < 0) || (alpha.x < 0))
            ? (-1)
            : 1;
        sign.y = ((beta.y < 0) || (alpha.y < 0))
            ? (-1)
            : 1;

        if (difx > dify)
            newBeta.x = sign.x * (beta.x * sign.x - difx + _.random(10, 30));
        else
            newBeta.y = sign.y * (beta.y * sign.y - dify + _.random(10, 30));

        }

    return newBeta;
    return beta;
}

function RadialSpread(beta, alpha) {
    const dify = Math.abs(beta.y) - Math.abs(alpha.y) - alpha.height;
    const difx = Math.abs(beta.x) - Math.abs(alpha.x) - alpha.width;
    let newRoom = beta;

    if ((dify <= 0) && (difx <= 0)) {

        /// Radial coordinates
        const betaPhi = Math.atan2(beta.y, beta.x);
        const betaRadius = Math.sqrt(beta.x * beta.x + beta.y * beta.y);
        //const alphaPhi = Math.atan2(alpha.y, alpha.x);
        //const alphaRadius = Math.sqrt(alpha.x * alpha.x + alpha.y * alpha.y);
        const alphaDiameter = Math.sqrt(alpha.x * alpha.x + alpha.y * alpha.y);

        newRoom.x = (betaRadius + alphaDiameter) * Math.cos(betaPhi);
        newRoom.y = (betaRadius + alphaDiameter) * Math.sin(betaPhi);

    }
    return newRoom

}

function GenerateDungeon(size, width, height) {

    let dungeon = [];
    let room;
    let tmpRoom;
    let tmpBool = true;

    const minDim = {
        x: (width / 50),
        y: (height / 100)
    };
    const maxDim = {
        x: width,
        y: height
    };

    let SpawnRoom = () => {

        const w = _.random(-1 * grid.width, (3 / 2) * grid.width);
        const h = _.random(-1 * grid.height, (3 / 2) * grid.height);

        const room = {

            x: (w - Math.floor(width / 2)),
            y: (h - Math.floor(height / 2)),
            width: Math.floor(_.random(minDim.x, maxDim.x, true)),
            height: Math.floor(_.random(minDim.y, maxDim.y, true))
        }
        return room;

    }

    let InterSects = (roomA, roomB) => {
        let x1 = roomA.x,
            y1 = roomA.y,
            w1 = roomA.width,
            h1 = roomA.height,
            x2 = roomB.x,
            y2 = roomB.y,
            w2 = roomB.width,
            h2 = roomB.height;

        if ((x1 <= x2) && (x2 <= x1 + w1))
            if ((y1 <= y2) && (y2 <= y1 + h1))
                return true;

        if ((x2 <= x1) && (x1 <= x2 + w2))
            if ((y2 <= y1) && (y1 <= y2 + h2))
                return true;

        return false;
    }
    dungeon.push(SpawnRoom());
    //    console.log(dungeon);

    for (let i = 0; i < 50; i++) {
        room = SpawnRoom();
        for (let j = 0; j < dungeon.length; j++)
            if (InterSects(dungeon[j], room)) {
                tmpBool = false;
                break;
            }

        if (tmpBool)
            dungeon.push(room)
        tmpBool = true;

    }

    return dungeon

};

function DrawRoom(room) {
    let {x, y, width, height} = room;
    (room.x, room.y, room.width, room.height);
    return Path().moveto(x, y).hlineto(x + width).vlineto(-1*y -1*height).hlineto(x).closepath();

}

class Hello extends React.Component {
    render() {
        let dungeon = GenerateDungeon(100, 800, 400);
        let rooms = dungeon.map(alpha => {
            return DrawRoom(alpha)
        });

        return (
            <svg width={grid.width} height={grid.height} viewBox={"-1000 -500 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "white"
            }}>

                {rooms.map((x, index) => <g key={"room No: " + index}>
                    <path d={x.print()} fill="none" stroke="blue"/>
                </g>)}
            </svg>
        )
    }
};

ReactDOM.render(
    <Hello/>, document.getElementById('App'));
