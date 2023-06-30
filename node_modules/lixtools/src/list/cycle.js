function list_cycle(list=['hello', 'world'], func=(item, index)=>{console.log(`Item: ${item}, Index: ${index}`)}){
    for (let index in list) {
        func(list[index], index)
    }
}

module.exports = list_cycle;