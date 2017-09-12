require('dotenv').config()
const request = require('request');
const fs = require('fs');

var GITHUB_USER = "PSH-21";
//var repoOwner = 'jquery';
//var repoName = 'jquery';


// function getOptionsForRepoList(username, accessToken) {
//   return {
//     url: `https://api.github.com/users/${username}/repos`,
//     qs: {
//       sort: 'pushed',
//       access_token: accessToken
//     },
//     headers: {
//       'User-Agent': 'macaroon'
//     }
//   };
// }

// const options = getOptionsForRepoList(process.argv[2], process.env.GITHUB_ACCESS_TOKEN);


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/' + 'contributors'
  var options = {
    url: requestURL,
    headers : {
      'User-Agent': 'request'
    }
  };


  request(options, function (err, response, body) {
      var parsed = JSON.parse(body);
      avatar(parsed);
    });
}

function avatar(parsed) {
    for (var i = 0; i < parsed.length; i++) {
        console.log(parsed[i]['avatar_url']);
    }
  }

getRepoContributors('jquery', 'jquery', avatar);

// request.(requestURL)
//        .on('error', function (err) {
//          throw err;
//        })
//        .on('response', function (response) {
//          console.log(response);
//        });


// Example hardcoded
// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });


