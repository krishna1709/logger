const winston = require("winston");
const { format } = winston;
const path = require("path");
const filePath = "./logs/all_events.log";
const level = "info";


const logger = winston.createLogger({
        level: level,
        format: format.combine(
            format.json(),
            format.label({ label: path.basename(process.mainModule.filename) }),
            format.simple(),
            format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
            format.printf(({ level, message, timestamp, label }) => {
                // preparing log formate with event level and timestamp and log message
                return `[${level}] [${timestamp}] [${label}] message: { ${message} }`;
            })
        ),
        transports: [
            new winston.transports.Console({
                json: true,
                timestamp: true,
                colorize: true,
                handleExceptions: true
            }),
            new winston.transports.File({
                filename: filePath,
                handleExceptions: true,
                json: true,
                maxsize: 524288000, //5MB
                maxFiles: 50000000,
                colorize: true,
                timestamp: true,
            }),
        ],
        exitOnError: false
    });
module.exports = logger;
