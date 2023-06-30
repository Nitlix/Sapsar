function e(){
    return new Date();
}

const unix = {
    int: () => {
        return parseInt(e().now())
    },
    float: () => {
        return parseFloat(e().now())
    },
    string: () => {
        unix.int().toString();
    },

    toDate(timestamp){
        return new Date(timestamp);
    }
}

module.exports = unix;