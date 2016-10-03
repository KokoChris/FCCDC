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
    console.log(GetRoomCenter(room), orderOfDoors);

    const numberOfDoors = _.random(1, 20);
    if (numberOfDoors <= 12) {
        console.log('sliced 1 entrence', _.slice(orderOfDoors, 3));
        return _.slice(orderOfDoors, 3)
    } else if (numberOfDoors <= 16) {
        console.log('sliced 2 entrence', _.slice(orderOfDoors, 2));
        return _.slice(orderOfDoors, 2)
    } else if (numberOfDoors <= 19)
        return _.slice(orderOfDoors, 1)
    else return orderOfDoors;

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


    return (kruskal(verticies, edges, dist)).map(alpha => [verticies[alpha[0]], verticies[alpha[1]]]);

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
                        if ((x1<lowerLeft[0])&(x2<lowerRight[0]))

                            //if (y1>upp)




                    }

                }

            )

        }
*/
    export {
        TriangulateDungeon,
        GetDungeonPaths
    };
