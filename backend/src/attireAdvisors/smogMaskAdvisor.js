module.exports = function smogMaskAdvisorModule() {

    function advise(conditions) {
        if (conditions.isSmoggy()) {
            return "smog mask";
        }

        return "";
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}