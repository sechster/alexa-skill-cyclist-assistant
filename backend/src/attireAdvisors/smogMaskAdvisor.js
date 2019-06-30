module.exports = function smogMaskAdvisorModule() {

    function advise(conditions) {
        let advice = new Array();
        if (conditions.isSmoggy()) {
            advice.push("wear smog mask");
        }

        return advice;
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}