module.exports = function airConditionService(externalAirConditionService) {

    function getCurrentAirCondition(location) {

        return externalAirConditionService.getMeasurement(location.latitude, location.longitude)
            .then(function(airConditionData) { 
                let result = {
                    caqiLevel: airConditionData.current.indexes.filter(index => index.name == "AIRLY_CAQI")[0].value,
                }
        
                return result;
            } );
    }

    let publicApi = {
        getCurrentAirCondition: getCurrentAirCondition
    };

    return publicApi;
};

