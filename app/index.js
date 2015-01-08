'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var colors = require('../node_modules/colors');

var AngularfireFabGenerator = yeoman.generators.Base.extend({

  promptUser: function(){
    var done = this.async();

    // have yeoman greet the user
    console.log(this.yeoman);

    var prompts = [
      {
        name: 'app_name',
        message: 'Good day, fine person. What would the app\'s name be?'
      },
      {
        name: 'app_description',
        message: 'What would the apps\'s description be?'
      },
      {
        name: 'app_author',
        message: 'And finally, the author?'
      },
      {
        name: 'githubusername',
        message: 'Do you have a github account? If so, please type your username. The app\'s name will be your repo'
      }
    ];

    this.prompt(prompts, function(props){
      this.app_name = props.app_name;
      this.app_description = props.app_description;
      this.app_author = props.app_author;
      this.githubusername = props.githubusername;
      done();
    }.bind(this));
  },

  scaffoldFolders: function(){
    this.mkdir("app");
    this.mkdir("app/css");
    this.mkdir("app/js");
    this.mkdir("app/js/controllers");
    this.mkdir("app/js/factories");
    this.mkdir("app/js/services");
    this.mkdir("app/views");
    this.mkdir("build");
  },

  copyMainFiles: function(){

    this.copy("_firstTemplate.html", "app/views/firstTemplate.html");
    this.copy("_secondTemplate.html", "app/views/secondTemplate.html");
    this.copy("_style.css", "app/css/style.css");
    this.copy("_gruntfile.js", "Gruntfile.js");

    var context = {
        app_name: this.app_name,
        app_description: this.app_description,
        app_author: this.app_author,
        githubusername: this.githubusername
    };

    this.template("_package.json", "package.json", context);
    this.template("_bower.json", "bower.json", context);

    this.template("_README.md", "README.md", context);
    this.template("_index.html", "app/index.html", context);
    this.template("_config.js", "app/js/config.js", context);
    this.template("_firstCtrl.js", "app/js/controllers/firstCtrl.js", context);
    this.template("_secondCtrl.js", "app/js/controllers/secondCtrl.js", context);

  },

  runNpm: function(){
    console.log("\nSetting up...\n".bold.magenta);

    this.bowerInstall("", function(){
      console.log("\nBower finished installing components !!!\n".bold.magenta);
    });

    this.npmInstall("", function(){
        console.log("\nNode finished installing components !!!\n".bold.magenta);
    });
  }
});

module.exports = AngularfireFabGenerator;
