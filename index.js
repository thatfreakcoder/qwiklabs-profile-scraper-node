const cheerio = require("cheerio");
const fs = require("fs");
const express = require("express");
const axios = require("axios");
const app = express();

app.get('/', async(req, res) => {
    try {
        const url = req.query.url;
        // Fetch HTML of the Page
        const { data } = await axios.get(url);
        // Parse HTML fetched before
        const $ = cheerio.load(data);
        // Select desired class and tags
        const avatarName = $(".ql-headline-1");
        console.log(avatarName.text());
        const badgeListItems = $(".profile-badges .profile-badge");
        // Stores data for all countries
        const badges = [];
        badgeListItems.each((idx, el) => {
            const badge = { name: "", completed_on: "" };
            var components = $(el).text().split("\n\n\n")
            var name = components[1];
            var completionDate = components[2].split("\n\n");
            badge.name = name;
            badge.completed_on = completionDate[0].substring(7, completionDate[0].length);
            if (badge.name.substr(0, 13) != "Learn to Earn") {
                badges.push(badge);
            }
        });
        if (badges.length == 0) {
            res.send({
                "response": "error",
                "message": "No Badges Completed"
            })
        } else {
            res.send(badges);
        }
        // Write countries array in countries.json file
        // fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     console.log("Successfully written data to file");
        // });

    } catch (error) {
        console.error(error);
    }
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));