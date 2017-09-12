require('dotenv').config()
const request = require('request');
const fs = require('fs');

var GITHUB_USER = "PSH-21";

function getRepoContributors(repoOwner, repoName, cb) {
  const requestURL = 'https://'+ GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/' + 'contributors'
  const options = {
    url: requestURL,
    headers : {
      'User-Agent': 'request'
    }
  };


  request(options, function (err, response, body) {

      let parsed = JSON.parse(body);
      cb(err, parsed);

    });
}

function saveAvatar(err, parsed) {
    for (let i = 0; i < parsed.length; i++) {
        let url = parsed[i]['avatar_url'];
        let filePath = `./avatars/${parsed[i]['login']}.jpg`;
        downloadImageByURL(url, filePath);
    }
}

getRepoContributors('jquery', 'jquery', saveAvatar);

function downloadImageByURL(url, filePath) {
  request(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(`./${filePath}`));
}


//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")



