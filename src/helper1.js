'use strict'
import _ from 'lodash';
import Delaunay from 'faster-delaunay';
import Kruskal from 'kruskal';
let kruskal = Kruskal.kruskal

function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function GetRoomCenter(room) {
    const {
        x,
        y,
        width,
        height
    } = room;

    return [
        x + (.5 * width),
        y + (.5 * height)
    ]

}


function SetRoomDoors(room) {
    const {
        x,
        y,
        width,
        height
    } = room;
    const Hpadding = width / 5,
        Vpadding = height / 5;
    const upperDoor = [_.random(x + Hpadding, x + width - Hpadding, true), y],
        leftDoor = [x, _.random(y + Vpadding, y + height - Vpadding, true)],
        lowerDoor = [_.random(x + Hpadding, x + width - Hpadding, true), y + height],
        rightDoor = [x + width, _.random(y + Vpadding, y + height - Vpadding, true)];

    const orderOfDoors = _.shuffle([upperDoor, leftDoor, lowerDoor, rightDoor])

    const numberOfDoors = _.random(1, 20);
    if (numberOfDoors <= 12) {
        return _.slice(orderOfDoors, 3)
    } else if (numberOfDoors <= 16) {
        return _.slice(orderOfDoors, 2)
    } else if (numberOfDoors <= 19)
        return _.slice(orderOfDoors, 1)
    else return orderOfDoors;

}

function getRectangleSides(room) {
    const {
        x,
        y,
        width,
        height
    } = room;

    return [{
        x1: x,
        y1: y,
        x2: x + width,
        y2: y
    }, {
        x1: x + width,
        y1: y,
        x2: x + width,
        y2: y + height
    }, {
        x1: x + width,
        y1: y + height,
        x2: x,
        y2: y + height
    }, {
        x1: x,
        y1: y + height,
        x2: x,
        y2: y
    }];

}

function TriangulateDungeon(dungeon, withDoors = false) {
    let verticies
    if (!withDoors)
        verticies = dungeon.map(room => GetRoomCenter(room));
    else verticies = _.flatten(dungeon.map(room => SetRoomDoors(room)));



    let delaunay = new Delaunay(verticies);
    return _.chunk(delaunay.triangulate(), 3)
}

function GetDungeonPaths(dungeon, withDoors = false) {
    let verticies
    if (!withDoors)
        verticies = dungeon.map(room => GetRoomCenter(room));
    else verticies = _.flatten(dungeon.map(room => SetRoomDoors(room)));

    const delaunay = _.chunk((new Delaunay(verticies)).triangulate(), 3)

    let GetEdges = (arr) => {

        let indecies = arr.map(x => _.findIndex(verticies, d => ((d[0] === x[0]) && (d[1] === x[1]))));
        return [
            [
                indecies[0], indecies[1]
            ],
            [
                indecies[1], indecies[2]
            ],
            [indecies[0], indecies[2]]
        ]

    }
    let edges = _.flatten(delaunay.map(arr => GetEdges(arr)));
    let skata = 0;

    let TrimedEdges = edges.filter(arr => {
        let notIntersect = true;
        const line = {
            x1: verticies[arr[0]][0],
            y1: verticies[arr[0]][1],
            x2: verticies[arr[1]][0],
            y2: verticies[arr[1]][1]
        }

        for (let i = 0; i < dungeon.length; i++) {
            skata = LineRoomIntersaction(line,dungeon[i]);
            if (skata > 1)
                notIntersect = false;
            console.log("skata", skata);

        }
        return notIntersect;

    })



    //console.log("edges", edges);
    //    console.log("verticies", verticies);
    //    console.log("delaunay", delaunay);

    console.log('TrimEdges?:', TrimedEdges);


    return (kruskal(verticies, edges, dist)).map(alpha => [verticies[alpha[0]], verticies[alpha[1]]]);

}

function CheckLineIntersection(lineA, lineB) {

    const {
        x1,
        y1,
        x1,
        y2
    } = lineA;
    const {
        z1,
        w1,
        z2,
        w2
    } = lineB;

    console.log('lineA', lineA);
    console.log('lineB', lineB);
    let orinentation1 = ((y2 - y1) * (z1 - x2) - (w1 - y2) * (x2 - x1) < 0) ? 'counterclockwise' : "clockwise";
    let orinentation2 = ((y2 - y1) * (z2 - x2) - (w2 - y2) * (x2 - x1) < 0) ? 'counterclockwise' : "clockwise";

    let orinentation3 = ((w2 - w1) * (x1 - z1) - (y1 - w2) * (z2 - z1) < 0) ? 'counterclockwise' : "clockwise";
    let orinentation4 = ((w2 - w1) * (x2 - z2) - (y2 - w2) * (z2 - z1) < 0) ? 'counterclockwise' : "clockwise";

    console.log(orinentation1,orinentation2,orinentation3,orinentation4);


    return ((orinentation1 != orinentation2) || (orinentation3 != orinentation4));

}

function LineRoomIntersaction(line, room) {
    const sideList = getRectangleSides(room);
    let counter = 0;

    for (let i = 0; i < 4; i++)
        if (CheckLineIntersection(line, sideList[i]))
            counter++;
    return counter;

}


/*
function TrimEdges(edges, verticies, room) {
    const upperLeft = [room.x, room.y],
        lowerLeft[ = [room.x, room.y + room.height],
            upperRight = [room.x + room.width, room.y + room.height],
            lowerRight = [room.x, room.y + room.height];



            let TrimedGraph = edges.filter(edge => {
                    const x1 = verticies[edge[0][0]]
                    const y1 = verticies[edge[0][1]]
                    const x2 = verticies[edge[1][0]]
                    const y2 = verticies[edge[0][1]]
                    for (let i = 0; i < Edges.length; i++) {
                        if ((x1 < lowerLeft[0]) & (x2 < lowerRight[0]))





                    }

                }

            )

        }*/
export {
    TriangulateDungeon,
    GetDungeonPaths
};
