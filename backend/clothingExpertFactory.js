module.exports = function clothingExpertFactoryModule() {

    function create(conditions) {

        if (conditions.averageTemperature > 17) {
            return require("./summerClothingExpert")(conditions);
        }
        else if (conditions.averageTemperature > 10) {
            return require("./springClothingExpert")(conditions);
        }
        else if (conditions.averageTemperature > 0) {
            return require("./autumnClothingExpert")(conditions);
        }
        else {
            return require("./winterClothingExpert")(conditions);
        }
    }

    return {
        create: create
    };
}