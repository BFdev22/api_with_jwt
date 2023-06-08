const Model = require("../models/model");

const saveModel = async ({ name, password }) => {
    const count = await Model.countDocuments({ name });
    if(count > 0) throw new Error("User with name already exists");
    const user = await new Model({
      name,
      password
    }).save();
    return user;
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getUser = async ({ name }) => {
    const user = await Model.findOne({ name });
    if(!user) throw new Error("No user not found with given name");

    return { name, name: user.name, password: password }
}

module.exports.saveModel = saveModel;
module.exports.getUser = getUser;