const config = require('config');

module.exports = function airConditionService(externalAirConditionService) {

    function getCurrentAirCondition() {
        let latitude = config.get('airCondition.latitude');
        let longitude = config.get('airCondition.longitude');

        return externalAirConditionService.getMeasurement(latitude, longitude)
            .then(function(airConditionData) { 
                let result = {
                    caqiLevel: airConditionData.airQualityIndex,
                }
        
                return result;
            } );
    }

    let publicApi = {
        getCurrentAirCondition: getCurrentAirCondition
    };

    return publicApi;
};

