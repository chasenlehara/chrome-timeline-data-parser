var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var parseFile = require('./parse-file');

/* Get the file path */
var providedPath = process.argv[2];
var eventMessage = process.argv[3];

/* Determine whether the provided path is a directory or file */
console.info('About to get the stats for:', providedPath);
fs.lstatAsync(providedPath).then(function(stats) {
    console.info('Successfully getting stats:', stats);

    if (stats.isDirectory()) {
        console.info('Parsing path as directory');
        fs.readdirAsync(providedPath).then(function(fileNames) {
            var filePaths = fileNames.map(function(fileName) {
                return path.join(providedPath, fileName);
            });
            var parsingPromises = filePaths.map(function(filePath) {
                return parseFile(filePath, eventMessage);
            });
            Promise.all(parsingPromises).then(function(fileTimestamps) {
                var timestamps = [].concat.apply([], fileTimestamps);

                timestamps.forEach(function(timestamp) {
                    console.info(timestamp);
                });

            }, function(error) {
                console.error('Error parsing files:', error);
            });

        }, function(error) {
            console.error('Error getting files:', error);
        });

    } else if (stats.isFile()) {
        console.info('Parsing path as file');
        parseFile(providedPath, eventMessage).then(function(timestamps) {
            timestamps.forEach(function(timestamp) {
                console.info(timestamp);
            });
        }, function(error) {
            console.error('Error parsing file:', error);
        });

    } else {
        console.error('Unsupported path provided');
    }
}, function(error) {
    console.error('Error getting stats:', error);
});