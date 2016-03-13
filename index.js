var path = __dirname + '/data';
var fs = require('fs');
var later = require('later');
var simpleGit = require('simple-git')(path).log(function(err, log) {
  if(err){
    console.log('ERROR NO REPO');
    gitInit();
    //process.exit();
  }
})

// options
var jsonPath = path + '/data.json';
var gitRepoURL = 'https://github.com/cropcrop/funny-git-data.git';
var textSched = later.parse.text('every 10 s');


//init
var timer = later.setInterval(task, textSched);


// Task to execute
function task() {
  var date = new Date();
  var content = { date: date }

  fs.writeFile( jsonPath , JSON.stringify(content), function(err) {
    if(err) {
      return console.log(err);
    }
    gitPush();
  });
}


//git push
function gitPush(){
  var date = new Date();
  simpleGit
    .pull('origin', 'master')
    .add('./*')
    .commit('Commit ' + date)
    .push('origin', 'master')
    .then(function() {
        console.log('push done', date);
     });
}

//git init
function gitInit(){
  simpleGit
    .init()
    .add('./*')
    .commit('INIT')
    .addRemote('origin', gitRepoURL)
    .push('origin', 'master')
    .then(function() {
        console.log('git init done');
     });
 }
