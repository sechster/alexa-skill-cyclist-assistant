module.exports = function jacketAdvisorModule() {

    function advise(conditions) {
        if (conditions.getCurrentTemperature() < 5) {
            return "cycling jacket";
        }

        if (conditions.getMinimumTemperature() < 5) {
            return "take a cycling jacket";
        }

        if (conditions.itMightRain()) {
            return "take rain jacket";
        }

        return "";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}