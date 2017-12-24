// builder pattern - director module
module.exports = function attireBuildDirectorModule(builder) {

    let attire = {
        headGear: (builder.adviseHeadGear || function() {})(),
        smogMask: (builder.adviseSmogMask || function() {})(),
        shirt: (builder.adviseShirt || function() {})(),
        jacket: (builder.adviseJacket || function() {})(),
        gloves: (builder.adviseGloves || function() {})(),
        pants: (builder.advisePants || function() {})(),
        socks: (builder.adviseSocks || function() {})(),
        shoes: (builder.adviseShoes || function() {})(),
        overshoes: (builder.adviseOvershoes || function() {})(),
        armWarmers: (builder.adviseArmWarmers || function() {})(),
        legWarmers: (builder.adviseLegWarmers || function() {})(),
        rainJacket: (builder.adviseRainJacket || function() {})(),
        glasses: (builder.adviseGlasses || function() {})()
    }

    function buildAdvice() {
        return Object.keys(attire).filter(key => { if(attire[key]) return key; }).map(key => attire[key]).join(", ");
    }    

    return {
        buildAdvice: buildAdvice
    }
}