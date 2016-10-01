import _ from 'lodash';

function dist(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function IntervalPartition(dim, mindim) {
    const {left, right} = dim;
    const {min, max} = mindim;
    let Bound = false;
    let partition = [left, right];
    let tmpArray = [];
    let counter = 100

    while ((!Bound) && (counter > 0)) {
        counter--;
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

function EqualGridPartition(dim, pointNum) {
    const {up, right} = dim;
    const {xNum, yNum} = pointNum;
    let yInterval = up / yNum;
    let xInterval = right / xNum;
    let Grid = [];

    for (let i = 0; i < xNum; i++)
        for (let j = 0; j < yNum; j++)
            Grid.push({
                x: (i * xInterval),
                y: (j * yInterval),
                width: xInterval,
                height: yInterval
            })



    return Grid;

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
        for (let j = 1; j < yPartion.length; j++) {
            GridPartition.push({
                x: xPartion[i],
                y: yPartion[j - 1],
                width: xPartion[i + 1] - xPartion[i],
                height: yPartion[j] - yPartion[j - 1]
            })
        }

    return GridPartition;
}

function PopulateDungeon2(width, height, xNum, yNum) {

    const dim = {
            up: height,
            right: width
        },
        pointNum = {
            xNum: xNum,
            yNum: yNum
        };
    let rooms = EqualGridPartition(dim, pointNum);



    let Dungeon = rooms.map((Gd) => {

        Gd.x = Math.floor(Gd.x);
        Gd.y = Math.floor(Gd.y);
        Gd.width = _.random(.4 * Gd.width, .8 * Gd.width, false);
        Gd.height = _.random(.4 * Gd.height, .8 * Gd.height, false);
        return Gd;

    })

    return Dungeon;

}
export {PopulateDungeon, PopulateDungeon2};
