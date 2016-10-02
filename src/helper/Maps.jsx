function DrawRoom(room) {
    let {x, y, width, height} = room;
    (room.x, room.y, room.width, room.height);
    return Path().moveto(x, y).hlineto(x + width).vlineto(-1*y -1*height).hlineto(x).closepath();

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

        if ((x1 < x2) && (x2 < x1 + w1))
            if ((y2 < y1) && (y1 + h1 < y2 + h2))
                return true;

        if ((x2 < x1) && (x1 < x2 + w2))
            if ((y1 < y2) && (y2 + h2 < y1 + h1))
                return true;

        if ((x1 < x2) && (x2 + w2 < x1 + w1))
            if ((y2 < y1) && (y1 < y2 + h2))
                return true;

        if ((x2 < x1) && (x1 + w1 < x2 + w2))
            if ((y1 < y2) && (y2 < y1 + h1))
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
