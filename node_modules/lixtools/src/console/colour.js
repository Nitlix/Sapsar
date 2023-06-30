const colour = {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    
    light_gray: "\x1b[90m",
    light_red: "\x1b[91m",
    light_green: "\x1b[92m",
    light_yellow: "\x1b[93m",
    light_blue: "\x1b[94m",
    light_magenta: "\x1b[95m",
    light_cyan: "\x1b[96m",
    light_white: "\x1b[97m",

    reset: "\x1b[0m",
    default: "\x1b[39m",

    background: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        
        light_gray: "\x1b[100m",
        light_red: "\x1b[101m",
        light_green: "\x1b[102m",
        light_yellow: "\x1b[103m",
        light_blue: "\x1b[104m",
        light_magenta: "\x1b[105m",
        light_cyan: "\x1b[106m",
        light_white: "\x1b[107m",

        reset: "\x1b[49m",
        default: "\x1b[49m",
    }
}

module.exports = colour;