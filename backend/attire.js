// builder pattern - director module
module.exports = function AttireModule(expert) {

    let attire = {
        headGear: expert.adviseHeadGear(),
        smogMask: expert.adviseSmogMask(),
        shirt: expert.adviseShirt(),
        jacket: (expert.adviseJacket || function() {})(),
        gloves: expert.adviseGloves(),
        pants: expert.advisePants(),
        socks: expert.adviseSocks(),
        shoes: expert.adviseShoes(),
        overshoes: (expert.adviseOvershoes || function() {})(),
        armWarmers: expert.adviseArmWarmers(),
        legWarmers: (expert.adviseLegWarmers || function() {})(),
        rainJacket: expert.adviseRainJacket(),
        glasses: expert.adviseGlasses()
    }

    function getAdvice() {
        return Object.keys(attire).map(function(key) {
            return attire[key];
        }).join(", ");
    }    

    return {
        getAdvice: getAdvice
    }
}