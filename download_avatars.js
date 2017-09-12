require('dotenv').config()
const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);

function getRepoContributors(args, cb) {
  const requestURL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + args[0] + '/' + args[1] + '/' + 'contributors'
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
    if ( args.length != 2 ){
      console.log('Error: Please provide a gitOwner name and a Repo Name \n ie. node download_avatars.js <owner> <repo>')
    }
    for (let i = 0; i < parsed.length; i++) {
        let url = parsed[i]['avatar_url'];
        let filePath = `./avatars/${parsed[i]['login']}.jpg`;
        downloadImageByURL(url, filePath);
    }
}

function downloadImageByURL(url, filePath) {
  request(url)
       .on('error', function (err) {
         throw err;
       })
       .pipe(fs.createWriteStream(`./${filePath}`));
}

getRepoContributors(args, saveAvatar);

