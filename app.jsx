import Path from './node_modules/paths-js/path.js';
import React from 'react';
import ReactDOM from 'react-dom';
import * as lodash from 'lodash';
const width = 1000,
    height = 500;



function GenerateDungeon(){
const Rnum = 15;
const minDim = {x:width/(15*3),y:height/(15*3)}
const maxDim = {x:width/10,y:height/10}

let dungeon = (_.times(arrayLength, _.constant(null)))


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
let path = Path().moveto(10, 20).lineto(30, 50).lineto(25, 28).qcurveto(27, 30, 32, 27).closepath();

class Hello extends React.Component {
    render() {
        return (
            <svg width={width} height={height} viewBox={"-1000 -500 2000 1000"} preserveAspectRatio={"none"} style={{
                background: "white"
            }}>
                <path d={path.print()} fill="blue"/>
            </svg>
        )
    }
};

ReactDOM.render(
    <Hello/>, document.getElementById('App'));
