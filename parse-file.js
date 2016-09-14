var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function(filePath, eventMessage) {

    /* Read the file’s contents */
    return fs.readFileAsync(filePath, 'utf8').then(function(fileContents) {

        /* Get the JSON’s content */
        var parsedJSON = JSON.parse(fileContents);

        /* Get the profile events */
        var eventFrames = parsedJSON.filter(function(event) {
            return event.args && event.args.data && event.args.data.message === eventMessage;
        });

        /* Log the times */
        return eventFrames.map(function(event) {
            return event.tts;
        });
    });
};