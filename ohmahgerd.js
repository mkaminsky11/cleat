var colors = require("colors");
var fs = require("fs");

var tags = [];
var commands = [];
var open_file = null;
var use_file = null;
var html = null;

if(process.argv.length > 2){
  //first, get tags and commands
  process.argv.forEach(function(val, index, array){
    if(index >= 2){
      if(val[0] === "-"){
        tags.push(val);
      }
      else{
        commands.push(val);
      }
    }
  });

  //TODO: implement tags
  /*
  --help : help
  -o : output file after command
  */

  if(commands[0] === "open"){
      open(commands[1]);
  }
  else if(commands[0] === "use"){
      use(commands[1]);
  }
  else{
    console.log(colors.red.bold.underline('This command does not exist'));
  }

}
else{
  //no arguments passed
  console.log(colors.red.bold.underline('You didn\'t pass any arguments!'));
  console.log('Try \'ohmahgerd --help\'')
}

function open(path){
  if(fs.existsSync(path)) {
      open_file = path;

  }
  else{
    console.log(colors.red.bold.underline('The file ' + path + ' does not exist'));
  }
}

function use(path){
  if(fs.existsSync(path)) {
      use_file = path;
  }
  else{
    console.log(colors.red.bold.underline('The file ' + path + ' does not exist'));
  }
}

function read(path){
  html = fs.readFileSync(path, "utf8");
}
