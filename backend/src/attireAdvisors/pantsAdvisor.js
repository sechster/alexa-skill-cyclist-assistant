module.exports = function pantsAdvisorModule() {

    function advise(conditions) {
        if (conditions.getMinimumTemperature() < 7) {
            return "long pants";
        }

        return "short pants";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}