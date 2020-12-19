export const convertMonthToInt = str => {
    let month;
    if(str === 'Jan'){
        month = 0;
    } else if(str === 'Feb'){
        month = 1;
    } else if(str === 'Mar'){
        month = 2;
    } else if(str === 'Apr'){
        month = 3;
    } else if(str === 'May'){
        month = 4;
    } else if(str === 'Jun'){
        month = 5;
    } else if(str === 'Jul'){
        month = 6;
    } else if(str === 'Aug'){
        month = 7;
    } else if(str === 'Sept'){
        month = 8;
    } else if(str === 'Oct'){
        month = 9;
    } else if(str === 'Nov'){
        month = 10;
    } else {
        month = 11;
    }
    return month;
}

export const sortByDate = arr => {
    const array = [...arr].sort((a, b) => {
        const aDate = new Date(a.year, convertMonthToInt(a.month), a.day);
        const bDate = new Date(b.year, convertMonthToInt(b.month), b.day);
        const aMs = aDate.getTime();
        const bMs = bDate.getTime();
        if(aMs > bMs){
            return -1;
        } else if(aMs < bMs){
            return 1;
        } else {
            return 0;
        }
    });
    return array;
}