let moment = require('moment');
let config = require('config');

const averageSpeed = config.get("rideTime.averageSpeed"); // km/h


module.exports.getRideTimeData = function getRideTimeDataModule(now, rideDistance) {

    let endTime = moment(now).add(rideDistance * 60 / averageSpeed, 'm');

    if (rideDistance > averageSpeed) {
        let hoursOfRiding = Math.floor(rideDistance / averageSpeed);
        const shortBrakeInMinutes = 10;
        endTime = endTime.add(hoursOfRiding * shortBrakeInMinutes, 'm');
    }

    if (rideDistance > 100) {
        let numberOfHundrets = Math.floor(rideDistance / 100);
        const longBrakeInMinutes = 30;
        endTime = endTime.add(numberOfHundrets * longBrakeInMinutes, 'm');
    }

    return {
        startTime: now,
        endTime: endTime.toDate(),
    }
}
