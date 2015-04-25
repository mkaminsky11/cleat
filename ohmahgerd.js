var colors = require("colors");
var fs = require("fs");
var cheerio = require('cheerio');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var tags = [];
var commands = [];
var file = null;
var html = null;

//**
//MAIN LOGIC
//**

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

  //
  //COMMANDS
  //

  if(commands[0] === "open"){
      open(commands[1]);

      rl.setPrompt('OMG> ');
      rl.prompt();
      rl.on('line', function(line){
        var input = line.trim();
        //
        if(input === "exit"){
          rl.close();
          process.exit(0);
        }
        else{
          
        }


        //

        rl.prompt();
      }).on('close', function() {
        process.exit(0);
      });
  }
  else if(commands[0] === "use"){
      use(commands[1]);
      if(commands[2] === "add"){
        //by default, add to body
        if((typeof commands[4]) === (typeof undefined)){
          $("body").append(commands[3]); //like: node ohmahgerd.js use index.html add "<h1>hi</h1>"
        }
        else{
          $(commands[3]).append(commands[4]);
        }
      }

      //TODO:
      /*
      addClass
      removeClass
      remove
      after
      before
      */
  }
  else{
    console.log(colors.red.bold.underline('This command does not exist'));
  }

  if(file !== null){
    fs.writeFileSync(file, $.html());
  }

  //
  //TAGS
  //

  //TODO: implement tags
  /*
  --help : help
  -o : output file after command
  */

}
else{
  //no arguments passed
  console.log(colors.red.bold.underline('You didn\'t pass any arguments!'));
  console.log('Try \'ohmahgerd --help\'')
}

//**
//HELPER FUNCTIONS
//**

function open(path){
  if(fs.existsSync(path)) {
      file = path;
      html = fs.readFileSync(path, "utf8");
      $ = cheerio.load(html);
  }
  else{
    console.log(colors.red.bold.underline('The file ' + path + ' does not exist'));
  }
}

function use(path){
  if(fs.existsSync(path)) {
      file = path;
      html = fs.readFileSync(path, "utf8");
      $ = cheerio.load(html);
  }
  else{
    console.log(colors.red.bold.underline('The file ' + path + ' does not exist'));
  }
}
