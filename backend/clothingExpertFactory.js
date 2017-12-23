module.exports = function clothingExpertFactoryModule() {

    let experts = { 
        summer: require("./summerClothingExpert"),
        spring: require("./springClothingExpert"),
        autumn: require("./autumnClothingExpert"),
        winter: require("./winterClothingExpert"),
    } ;

    function create(conditions) {
        return experts[conditions.getCurrentSeason()](conditions);
    }

    return {
        create: create
    };
}