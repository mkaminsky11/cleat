var colors = require("colors");
var fs = require("fs");
var cheerio = require('cheerio');
var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var tags = [];
var commands = [];
var file = null;
var html = null;

//TODO:
/*
add [done?] still TODO: add to body by default...?
prepend [done]
append: same as add [done?]
addClass [done]
removeClass [done]
remove [done]
after [done]
before [done]
attr [done]
removeAttr [done]
toggleClass [done]
replaceWith [done]
css [done]
*/

//**
//COMMANDS
//**

var func = {};

func.add = function(dest, to_add){ //like: ohmahgerd use index.html add ".p" "<i>hi</i>"
  $(dest).append(to_add);
};

func.append = func.add;

func.prepend = function(dest, to_add){
  $(dest).prepend(to_add);
};

func.addClass = function(dest, to_add){
  $(dest).addClass(to_add);
};

func.removeClass = function(dest, to_remove){
  $(dest).removeClass(to_remove);
};

func.toggleClass = function(dest, to_toggle){
  $(dest).toggleClass(to_toggle);
};

func.remove = function(to_remove){
  $(to_remove).remove();
};

func.after = function(dest, to_add){
  $(dest).after(to_add);
};

func.before = function(dest, to_add){
  $(dest).before(to_add);
};

func.attr = function(dest, attr, val){
  $(dest).attr(attr, val);
};

func.removeAttr = function(dest, to_remove){
  $(dest).removeAttr(to_remove);
};

func.replaceWith = function(dest, replace_with){
  $(dest).replaceWith(replace_with);
};

func.css = function(dest, prop, val){
  $(dest).css(prop, val);
};

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
        if(input === "exit"){
          rl.close();
          process.exit(0);
        }
        else{
          var array = line.match(/\w+|"[^"]+"/g); //results in stuff like [ 'hi', '"there also"' ]

          for(var i = 0; i < array.length; i++){
            array[i] = stripQuote(array[i]);
          }

          console.log(array);

          var i = 0;
          while(i < array.length){
            var command_name = array[i];
            var num_args = func[command_name].length;
            var args = array.slice(i + 1, i + 2 + num_args);

            func[command_name].apply(this, args);
            i+=(num_args + 1);
          }

          //write changes
          if(file !== null){
            fs.writeFileSync(file, $.html());
          }

        }

        rl.prompt();
      }).on('close', function() {
        process.exit(0);
      });
  }
  else if(commands[0] === "use"){
      use(commands[1]);

      var i = 2;
      while(i < (commands.length - 1)){ //this mess allows for chains: node ohmahgerd.js use index.html add ".p" "<i>hi</i>" add ".p" "<b>also this</b>"
        var command_name = commands[i];
        var num_args = func[command_name].length;
        var args = commands.slice(i + 1, i + 2 + num_args);

        func[command_name].apply(this, args);
        i+=(num_args + 1);
      }

      if(file !== null){
        fs.writeFileSync(file, $.html());
      }

      process.exit(0);
  }
  else{
    console.log(colors.red.bold.underline('This command does not exist'));
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

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function stripQuote(str){
  return str.replace(/"/g, "").replace(/'/g, "");
}
