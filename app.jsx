'use strict'
import Path from './node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const grid = {
    width: 1000,
    height: 500
};

function IntervalPartition(dim, mindim) {
    const {left, right} = dim;
    const {min, max} = mindim;
    let Bound = false;
    let partition = [left, right];
    let tmpArray = [];
    let counter = 100

    while ((!Bound) && (counter > 0)) {
        counter--;
        console.log(partition);
        Bound = true;
        for (let i = 0; i < partition.length - 1; i++) {
            if (partition[i + 1] - partition[i] > max) {
                Bound = false;
                let point;
                for (let j = 0; j < 100; j++) {
                    point = _.random(partition[i], partition[i + 1], false)

                    if ((point - partition[i] >= min) && (partition[i + 1] - point >= min)) {
                        break;
                    } else {
                        point = null;
                    }
                }
                if (point != null)
                    tmpArray.push(Math.floor(point));
                }
            else if (partition[i + 1] - partition[1] > 3 * min) {
                let point;
                for (let j = 0; j < 100; j++) {
                    point = _.random(partition[i], partition[i + 1], false)
                    if ((point - partition[i] >= min) && (partition[i + 1] - point >= min))
                        break;
                    else
                        point = null;

                    }
                if (point != null)
                    tmpArray.push(Math.floor(point));
                }
            }
        partition = (_.concat(partition, tmpArray)).sort((a, b) => a - b);;
        tmpArray = [];

    }

    return partition;

}

function PopulateDungeon(width, minWidth, maxWidth, height, minHeigh, maxHeigh) {
    let xPartion = IntervalPartition({
        left: 0,
        right: width
    }, {
        min: minWidth,
        max: maxWidth

    });

    let yPartion = IntervalPartition({
        left: 0,
        right: height
    }, {
        min: minHeigh,
        max: maxHeigh
    });

    let GridPartition = [];

    for (let i = 0; i < xPartion.length - 1; i++)
        for (let j = 1; j < yPartion.length ; j++) {
            GridPartition.push({
                x: xPartion[i],
                y: yPartion[j-1],
                width: xPartion[i + 1] - xPartion[i],
                height: yPartion[j] - yPartion[j-1]
            })
        }

    return GridPartition;
}

let tmp = PopulateDungeon(2000, 100, 500, 1000, 100, 400);
console.log(tmp);


function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
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

        const w = _.random(grid.width * 0.5, 1.25 * grid.width);
        const h = _.random(0.5 * grid.height, 1.25 * grid.height);

        const room = {

            x: w,
            y: h,
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
    return Path().moveto(x, y).hlineto(x + width).vlineto(y + height).hlineto(x).closepath();

}

class Hello extends React.Component {
    render() {
        let dungeon = GenerateDungeon(100, 800, 400);
        let rooms = tmp.map(alpha => {
            return DrawRoom(alpha)
        });

        return (
            <svg width={grid.width} height={grid.height} viewBox={"0 0 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "#FFF8C6"
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
