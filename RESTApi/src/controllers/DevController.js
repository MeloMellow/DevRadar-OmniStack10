const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = { 
    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res){
        let {github_username, techs, latitude, longitude} = req.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            console.log("dentro da porra do if");
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            let {name = login, avatar_url, bio} = apiResponse.data;

            let techsArray = parseStringAsArray(techs);

            console.log(name, avatar_url, bio, github_username);

            let location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs : techsArray,
                location
            });
        }

        return res.json(dev);
    }
}