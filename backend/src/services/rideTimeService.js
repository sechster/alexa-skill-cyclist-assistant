let moment = require('moment');
let config = require('config');

const averageSpeed = config.get("rideTime.averageSpeed"); // km/h


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
    }
}
