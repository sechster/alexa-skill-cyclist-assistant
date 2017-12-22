module.exports = function summerClothingExpertModule(conditions) {

    function adviseHeadGear() {
        if (conditions.isSunny()) {
            return "cycling cap";
        }

        return "";
    }

    function adviseSmogMask() {
        if (conditions.isSmoggy()) {
            return "smog mask";
        }

        return "";
    }

    function adviseShirt(){
        return "short sleeve shirt";
    }

    function adviseGloves() {
        return "short gloves";
    }

    function advisePants() {
        return "short pants";
    }

    function adviseSocks(){
        return "short socks";
    }

    function adviseShoes() {
        return "low shoes";
    }

    function adviseArmWarmers() {
        // if temp falls below 17 before the ride ends - arm warmers
        if (conditions.isChilly()) {
            return "take arm warmers";
        }

        return "";
    }

    function adviseRainJacket() {
        // if it might rain - rain jacket
        if (conditions.itMightRain()) {
            return "take rain jacket";
        }

        return "";
    }

    function adviseGlasses(){
        // if there is sun - dark glasses
        // if there is no sun - moderate glasses
        // if it is dark - transparent glasses

        if (conditions.isSunny()) {
            return "sunglasses level three";
        } else if (conditions.isCloudy()) {
            return "sunglasses level two";
        } else if (conditions.isDark()) {
            return "transparent glasses";
        }

        return "";
    }

    let attire = {
        headGear: adviseHeadGear(),
        smogMask: adviseSmogMask(),
        shirt: adviseShirt(),
        gloves: adviseGloves(),
        pants: advisePants(),
        socks: adviseSocks(),
        shoes: adviseShoes(),
        armWarmers: adviseArmWarmers(),
        rainJacket: adviseRainJacket(),
        glasses: adviseGlasses()
    }

    function getAdvice() {
        return Object.values(attire).join(", ");
    }    

    return {
        getAdvice: getAdvice
    }
}