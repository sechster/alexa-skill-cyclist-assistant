module.exports = function glovesAdvisorModule() {

    function advise(conditions) {
        if (conditions.getMinimumTemperature() < 5) {
            return "winter gloves";
        }
        else if (conditions.getMinimumTemperature() < 15) {
            return "autumn gloves";
        }
        else {
            return "short gloves";
        }
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}