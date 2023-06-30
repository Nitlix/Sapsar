function dict_cycle(dict={"hello": "world", "hola": "world", "privet": "mir"}, func=(key, value)=>{console.log(`Key: ${key}, Value: ${value}`)}){
    for (const key in dict) {
        func(key, dict[key])
    }
}

module.exports = dict_cycle;