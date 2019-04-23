const generateFormatDate = (date, separator, includeHour) => {
    let dd = date.getDate().toString();
    let MM = (date.getMonth() + 1).toString();
    let yyyy = date.getFullYear().toString();
    if(dd.length === 1){
        dd = `0${dd}`;
    }
    if(MM.length === 1){
        MM = `0${MM}`;
    }
    let format = yyyy + separator + MM + separator + dd;
    if(includeHour){
        let hh = date.getHours().toString()
        let mm = date.getMinutes().toString()
        if(hh.length === 1){
            hh = `0${hh}`;
        }
        if(mm.length === 1){
            mm = `0${mm}`;
        }
        format += separator + hh + separator + mm;
    }
    return format
}

const generateFormatHour = date => {
    let hh = date.getHours().toString()
    let mm = date.getMinutes().toString()
    if(hh.length === 1){
        hh = `0${hh}`;
    }
    if(mm.length === 1){
        mm = `0${mm}`;
    }

    return hh + ':' + mm;
}

export { generateFormatDate, generateFormatHour };