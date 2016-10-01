'use strict'
import _ from 'lodash';
import Delaunay from 'faster-delaunay';
import Kruskal from 'kruskal';
let kruskal = Kruskal.kruskal

function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function GetRoomCenter(room) {
    const {x, y, width, height} = room;

    return [
        x + (.5 * width),
        y + (.5 * height)
    ]

}

function TriangulateDungeon(dungeon) {
    let verticies = dungeon.map(room => GetRoomCenter(room));
    let delaunay = new Delaunay(verticies);
    return _.chunk(delaunay.triangulate(), 3)
}

function GetDungeonPaths(dungeon) {
    let verticies = dungeon.map(room => GetRoomCenter(room));
    console.log('verticies', verticies);

    let GetEdges = (arr) => {

        let indecies = arr.map(x => _.findIndex(verticies, d => {
console.log("------------fucking_debbuging--------");
            console.log(d);
            console.log(x);
            console.log((d[0]===x[0])&&(d[1]===x[1]));
            return ((d[0]===x[0])&&(d[1]===x[1]));

        }));
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
    let edges = _.flatten((TriangulateDungeon(dungeon)).map(arr => GetEdges(arr)));
    console.log('edges', edges);
    console.log(TriangulateDungeon(dungeon));
    return (kruskal(verticies, edges, dist)).map(alpha => [verticies[alpha[0]],verticies[alpha[1]]]) ;

}
export {TriangulateDungeon, GetDungeonPaths};
