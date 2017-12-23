// builder pattern - director module
module.exports = function AttireModule(expert) {

    let attire = {
        headGear: (expert.adviseHeadGear || function() {})(),
        smogMask: (expert.adviseSmogMask || function() {})(),
        shirt: (expert.adviseShirt || function() {})(),
        jacket: (expert.adviseJacket || function() {})(),
        gloves: (expert.adviseGloves || function() {})(),
        pants: (expert.advisePants || function() {})(),
        socks: (expert.adviseSocks || function() {})(),
        shoes: (expert.adviseShoes || function() {})(),
        overshoes: (expert.adviseOvershoes || function() {})(),
        armWarmers: (expert.adviseArmWarmers || function() {})(),
        legWarmers: (expert.adviseLegWarmers || function() {})(),
        rainJacket: (expert.adviseRainJacket || function() {})(),
        glasses: (expert.adviseGlasses || function() {})()
    }

    function getAdvice() {
        return Object.keys(attire).filter(key => { if(attire[key]) return key; }).map(key => attire[key]).join(", ");
    }    

    return {
        getAdvice: getAdvice
    }
}