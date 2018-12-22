module.exports = function masterAdvisorModule() {

    const attireAdvisors = 
    {
        headGearAdvisor: require("./attireAdvisors/headGearAdvisor"),
        smogMaskAdvisor: require("./attireAdvisors/smogMaskAdvisor"),
        shirtAdvisor: require("./attireAdvisors/shirtAdvisor"),
        jacketAdvisor: require("./attireAdvisors/jacketAdvisor"),
        glovesAdvisor: require("./attireAdvisors/glovesAdvisor"),
        pantsAdvisor: require("./attireAdvisors/pantsAdvisor"),
        socksAdvisor: require("./attireAdvisors/socksAdvisor"),
        shoesAdvisor: require("./attireAdvisors/shoesAdvisor"),
        overshoesAdvisor: require("./attireAdvisors/overshoesAdvisor"),
        armWarmersAdvisor: require("./attireAdvisors/armWarmersAdvisor"),
        legWarmersAdvisor: require("./attireAdvisors/legWarmersAdvisor"),
        glassesAdvisor: require("./attireAdvisors/glassesAdvisor")
    };

    let advisors = new Array();
    advisors.push(attireAdvisors.headGearAdvisor());
    advisors.push(attireAdvisors.smogMaskAdvisor());
    advisors.push(attireAdvisors.shirtAdvisor());
    advisors.push(attireAdvisors.jacketAdvisor());
    advisors.push(attireAdvisors.glovesAdvisor());
    advisors.push(attireAdvisors.pantsAdvisor());
    advisors.push(attireAdvisors.socksAdvisor());
    advisors.push(attireAdvisors.shoesAdvisor());
    advisors.push(attireAdvisors.overshoesAdvisor());
    advisors.push(attireAdvisors.armWarmersAdvisor());
    advisors.push(attireAdvisors.legWarmersAdvisor());
    advisors.push(attireAdvisors.glassesAdvisor());

    function advise(conditions) {
        let attireSet = advisors.map(a => a.advise(conditions)).filter(b => b != "");
        return attireSet;
    }

    let publicApi = {
        advise: advise,
    } 

    return publicApi;
}