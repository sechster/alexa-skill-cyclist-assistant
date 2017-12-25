let moment = require('moment');

const averageSpeed = 25; // km/h

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
        endTime: endTime.toDate()
    }
}
