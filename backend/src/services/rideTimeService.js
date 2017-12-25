let moment = require('moment');

const averageSpeed = 25; // km/h

function calculateDuration() {
    let timeSpan = moment.utc(moment(this.endTime).diff(moment(this.startTime)))
    let hours = timeSpan.hours();
    let minutes = timeSpan.minutes();

    return hours + minutes/60;
}

module.exports.getRideTimeData = function getRideTimeDataModule(now, rideDistance) {

    let endTime = moment(now).add(rideDistance * 60 / averageSpeed, 'm');

    if (rideDistance > averageSpeed) {
        endTime = endTime.add(Math.floor(rideDistance / averageSpeed) * 10, 'm');
    }

    if (rideDistance > 100) {
        endTime = endTime.add(Math.floor(rideDistance / 100) * 30, 'm');
    }

    return {
        startTime: now,
        endTime: endTime.toDate(),
        calculateDuration: calculateDuration
    }
}
