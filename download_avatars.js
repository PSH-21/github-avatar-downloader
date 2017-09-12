require('dotenv').config()
const request = require('request');

var GITHUB_USER = "PSH-21";
var repoOwner = 'jquery';
var repoName = 'jquery';

var requestURL = 'https://'+ GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

console.log(requestURL);

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});