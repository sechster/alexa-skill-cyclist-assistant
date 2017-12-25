const moment = require('moment');

module.exports.getText = function getText(startTime, endTime) {

    let timeSpan = moment.utc(moment(endTime).diff(moment(startTime)))
    let hours = timeSpan.hours();
    let minutes = timeSpan.minutes();

    let hoursText = hours != 1 ? `${hours} hours` : "1 hour";
    let minutesText = minutes != 1 ? `${minutes} minutes` : "1 minute";

    return `${hoursText} and ${minutesText}`;
}