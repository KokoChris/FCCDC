import React , {Component} from 'react';

//ManageCharacter has to be responsible for passing props to Character
//*getCoordinates()-> onKeypress
//
//

export default class ManageCharacter extends Component {
    constructor (props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);

    }
    handleKeyPress (ev) {
        ev.preventDefault();
        console.log(ev.key);
    }

    render() {
        return (
             <div onKeyDown={this.handleKeyPress} tabIndex="1">  Madafucker </div>
        )
    }
}