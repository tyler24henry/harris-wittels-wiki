export const convertMonthToInt = str => {
    let month;
    let strSliced = str.slice(0,3).toLowerCase();
    if(strSliced === 'jan'){
        month = 0;
    } else if(strSliced === 'feb'){
        month = 1;
    } else if(strSliced === 'mar'){
        month = 2;
    } else if(strSliced === 'apr'){
        month = 3;
    } else if(strSliced === 'may'){
        month = 4;
    } else if(strSliced === 'jun'){
        month = 5;
    } else if(strSliced === 'jul'){
        month = 6;
    } else if(strSliced === 'aug'){
        month = 7;
    } else if(strSliced === 'sep'){
        month = 8;
    } else if(strSliced === 'oct'){
        month = 9;
    } else if(strSliced === 'nov'){
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