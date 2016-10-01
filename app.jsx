'use strict'
import Path from './node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import PopulateDungeon from './helper.jsx';


const grid = {
    width: 1000,
    height: 500
};let tmp = (PopulateDungeon(2000, 150, 800, 1000, 100, 400));
console.log(tmp);


function DrawRoom(room) {
    let {x, y, width, height} = room;
    (room.x, room.y, room.width, room.height);
    return Path().moveto(x, y).hlineto(x + width).vlineto(y + height).hlineto(x).closepath();

}

let Trooms = PopulateDungeon(2000, 150, 800, 1000, 100, 400); // GenerateDungeon(100, 2000, 1000);

let Tdungeon = []

for (let i = 0; i < 10; i++)
    Tdungeon = _.concat(Tdungeon, Trooms.splice(_.random(0, Trooms.length - 1), 1));

let DrawnDungeon = Tdungeon.map(x => DrawRoom(x));

//DrawRoom(room[0]);


class Hello extends React.Component {
    render() {
         let rooms = Tdungeon.map(alpha => {
            return DrawRoom(alpha)
        });

        return (
            <svg width={grid.width} height={grid.height} viewBox={"0 0 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "#FFF8C6"
            }}>

                {DrawnDungeon.map((x, index) => <g key={"room No: " + index}>
                    <path d={x.print()} fill="none" stroke="blue"/>
                </g>)}
            </svg>
        )
    }
};

ReactDOM.render(
    <Hello/>, document.getElementById('App'));
