# Qwiklabs Profile Scraper
This is a Qwiklabs Profile Information scraper built on [Node.js](https://nodejs.org/en/) and uses [Cheerio](https://cheerio.js.org/) and [Axios](https://www.npmjs.com/package/axios) for Web Scraping and [Express](https://expressjs.com/) for REST API. 

## Usage
The API scraps the Qwiklabs Public Profile via the Query Parameter mentioned in the base URL.
```http://localhost:4000/?url=https://www.qwiklabs.com/public_profiles/xxxx-xxx-xxxx-xxx```
**make sure the URL is Public**

**Return Output**
- Name of the Profile Holder
- Avatar Image
- Number of Badges aquired in 30 Days of Google Cloud (excepts _Learn to Earn_ Badges)
- Aquired Badges details
    - Name of the badge
    - Date of Earning

## Run Locally
- Fork the Repository [here](https://github.com/thatfreakcoder/qwiklabs-profile-scraper-node/fork?fragment=1)
- Clone into your local system and cd into the directory
```bash
$ git clone https://github.com/thatfreakcoder/qwiklabs-profile-scraper-node && cd qwiklabs-profile-scraper-node
```
- Install Dependencies
```
npm i
```
- Install Nodemon for Continuous Serving
```
npm i --save nodemon
```
- Run Locally over [http://localhost:4000](http://localhost:4000)
```
npm start
```