module.exports = function shoesAdvisorModule() {

    function advise(conditions) {
        if (conditions.getMinimumTemperature() < 10) {
            return "high shoes";
        }

        return "regular shoes";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}