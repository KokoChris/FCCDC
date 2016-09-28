import Path from './node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
const width = 1000,
    height = 500;

function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
function moveAway(beta, alpha) {
    const dify = beta.y - alpha.y - alpha.height;
    const difx = beta.x - alpha.x - alpha.width;
    let newBeta = beta;
    if ((dify <= 0) && (difx <= 0))
        if (difx > dify)
            newBeta.x = beta.x - difx ;
        else
            newBeta.y = beta.y - dify ;


    console.log(difx, dify , beta.x, beta.y)

    return newBeta;

}

function GenerateDungeon(size, width, height) {

    const minDim = {
        x: width / (15 * 3),
        y: height / (15 * 3)
    };
    const maxDim = {
        x: width / 10,
        y: height / 10
    };
    let IsDisjoint = false;

    let dungeon = (_.times(size, (a) => {
        return {
            x: (_.random(width) - width / 2),
            y: (_.random(height) - height / 2),
            width: Math.floor(_.random(minDim.x, maxDim.x, true)),
            height: Math.floor(_.random(minDim.y, maxDim.y, true))
        }
    })).sort((alpha, beta) => {
        return dist(alpha.x, alpha.y) - dist(beta.x, beta.y)
    })
    console.log(dungeon);
    for (let j = 1; j < dungeon.length; j++)
        for (let i = 0; i < j; i++)
            dungeon[j] = (moveAway(dungeon[j], dungeon[i]));

    return dungeon;

};

function DrawRoom(room) {
    const {x, y, width, height} = room;
    return Path().moveto(x, y).hlineto(x + width).vlineto(y + height).hlineto(x).closepath();

}

class Hello extends React.Component {
    render() {
        let dungeon = GenerateDungeon(30, 2000, 1000);
        let rooms = dungeon.map(x => DrawRoom(x));

        return (
            <svg width={width} height={height} viewBox={"-1000 -500 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "white"
            }}>
                {rooms.map(x => <g>
                    <path d={x.print()} fill="none" stroke="blue"/>
                </g>)}
            </svg>
        )
    }
};

/*
function GenerateRoom(center, dim, exits) {
    const {width, height} = dim;
    const {cx, cy} = center;
    let exitArr = []

    let GenExits = () => switch (_.random(0, 3)) {
        case 0:
            return {
                x: cx,
                y: cy - _.random(0.1, height / 2)
            };
        case 1:
            return {
                x: cx + _.random(0.1, width / 2),
                y: cy
            }
        case 2:
            return {
                x: cx,
                y: cy + _.random(0.1, height / 2)
            };
        case 3:
            return {
                x: cx - _.random(0.1, width / 2),
                y: cy
            }

    }
    return (_.times(arrayLength, _.constant(null))).map(x => GenExits());

}
*/

ReactDOM.render(
    <Hello/>, document.getElementById('App'));
