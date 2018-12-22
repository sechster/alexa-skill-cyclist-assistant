module.exports = function headGearAdvisorModule() {

    function advise(conditions) {
        if (conditions.getCurrentTemperature() <= 0) {
            return "balaclava";
        }
        else if (conditions.getCurrentTemperature() <= 10) {
            return "winter cap";
        }

        if (conditions.getMinimumTemperature() <= 0) {
            return "take a balaclava";
        }
        else if (conditions.getMinimumTemperature() <= 10) {
            return "take a winter cap";
        }

        if (conditions.isCloudy() == false) {
            return "cycling cap";
        }

        return "";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}