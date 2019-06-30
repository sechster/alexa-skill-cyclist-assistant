module.exports = function masterAdvisorModule() {

    const attireAdvisors = 
    {
        headGearAdvisor: require("./attireAdvisors/headGearAdvisor"),
        smogMaskAdvisor: require("./attireAdvisors/smogMaskAdvisor"),
        torsoAdvisor: require("./attireAdvisors/torsoAdvisor"),
        glovesAdvisor: require("./attireAdvisors/glovesAdvisor"),
        legsAdvisor: require("./attireAdvisors/legsAdvisor"),
        feetAdvisor: require("./attireAdvisors/feetAdvisor"),
        glassesAdvisor: require("./attireAdvisors/glassesAdvisor")
    };

    let advisors = new Array();
    advisors.push(attireAdvisors.headGearAdvisor());
    advisors.push(attireAdvisors.smogMaskAdvisor());
    advisors.push(attireAdvisors.torsoAdvisor());
    advisors.push(attireAdvisors.glovesAdvisor());
    advisors.push(attireAdvisors.legsAdvisor());
    advisors.push(attireAdvisors.feetAdvisor());
    advisors.push(attireAdvisors.glassesAdvisor());

    function advise(conditions) {
        let attireSet = advisors.map(a => a.advise(conditions)).reduce((x, y) => x.concat(y));
        return attireSet;
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}