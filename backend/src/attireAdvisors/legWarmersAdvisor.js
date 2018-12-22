module.exports = function legWarmersAdvisorModule() {

    function advise(conditions) {
        if (conditions.getCurrentTemperature() >= 10 && conditions.getMinimumTemperature() < 7) {
            return "take leg warmers";
        }

        return "";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}