module.exports = function shirtAdvisorModule() {

    function advise(conditions) {
        if (conditions.getCurrentTemperature() < 10) {
            return "long sleeve shirt";
        }

        return "short sleeve shirt";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}