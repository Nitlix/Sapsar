async function repeat(times, func=(time)=>{console.log(time)}, start = 0, shiftStart=false, step=1){
    let repeatTimes = times; 
    if (shiftStart) repeatTimes += start;
    for (let time = start; time < repeatTimes; time += step) {
        await func(time)
    }
}

module.exports = repeat;