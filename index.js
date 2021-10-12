const cheerio = require("cheerio");
const express = require("express");
const axios = require("axios");
const app = express();

app.get('/', async(req, res) => {
    try {
        // fetching Profile URL from Query Parameters 
        const url = req.query.url;
        // Fetch HTML of the Page
        const { data } = await axios.get(url);
        // Parse fetched HTML
        const $ = cheerio.load(data);
        // Select desired class and tags
        const avatarName = $(".ql-headline-1").text().split("\n").join("");
        const avatarImg = $(".text--center").children("ql-avatar").attr("src");
        // console.log(avatarImg);
        const badgeListItems = $(".profile-badges .profile-badge");
        // Stores data for all countries
        var badges = [];
        badgeListItems.each((idx, el) => {
            var badge = { name: "", completed_on: "" };
            var components = $(el).text().split("\n\n\n")
            var name = components[1];
            var completionDate = components[2].split("\n\n");
            badge.name = name;
            badge.completed_on = completionDate[0].substring(7, completionDate[0].length);
            if (badge.name.substr(0, 13) != "Learn to Earn") {
                badges.push(badge);
            }
        });
        const responseObj = {
            "name": avatarName,
            "img": avatarImg,
            "profileURL": url,
            "num_badges": badges.length,
            "badges": badges
        }
        res.send(responseObj);
    } catch (error) {
        console.error(error);
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));