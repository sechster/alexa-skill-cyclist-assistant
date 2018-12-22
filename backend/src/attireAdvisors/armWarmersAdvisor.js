module.exports = function armWarmersAdvisorModule() {

    function advise(conditions) {
        if (conditions.getCurrentTemperature() >= 15 && conditions.getMinimumTemperature() < 10) {
            return "take arm warmers";
        }

        return "";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}