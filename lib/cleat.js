#! /usr/bin/env node

var colors = require("colors");
var fs = require("fs");
var cheerio = require('cheerio');
var readline = require('readline');
var glob = require("glob");
var rl = readline.createInterface(process.stdin, process.stdout);

var tags = [];
var commands = [];
var file = [];
var html = [];

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
stylesheet [done]
script [done
text [done]
html [done]
*/

//**
//COMMANDS
//**

var func = {};

func.add = function(dest, to_add){ //like: cleat use index.html add ".p" "<i>hi</i>"
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

func.stylesheet = function(href){
  if($("head").length === 0){
    $("body").perpend("<head></head>");
  }
  $("head").append("<link rel=\"stylesheet\" href=\""+href+"\">");
}

func.script = function(src){
  $("body").append("<script src=\""+src+"\"></script>")
}

func.text = function(dest, txt){
	$(dest).text(txt);
};

func.html = function(dest, val){
	$(dest).html(val);
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

  //can do stuff like: node cleat.js use "test.html index.html" css ".p" "color" "red"

  if(commands[0] === "open"){
      open(commands[1]);
      show_info();

      rl.setPrompt('[cleat> ');
      rl.prompt();
      rl.on('line', function(line){
        var input = line.trim();
        if(input === "exit"){
          rl.close();
          process.exit(0);
        }
        else if(input === "help"){
          show_help();
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

            applyFunc(command_name, args);
            i+=(num_args + 1);
          }

          writeAll();
          if(tags.indexOf("-o") !== -1){
            show_res();
          }

        }

        rl.prompt();
      }).on('close', function() {
        process.exit(0);
      });
  }
  else if(commands[0] === "use"){
      open(commands[1]);
      show_info();

      var i = 2;
      while(i < (commands.length - 1)){ //this mess allows for chains: node cleat.js use index.html add ".p" "<i>hi</i>" add ".p" "<b>also this</b>"
        var command_name = commands[i];
        var num_args = func[command_name].length;
        var args = commands.slice(i + 1, i + 2 + num_args);

        applyFunc(command_name, args);
        i+=(num_args + 1);
      }

      writeAll();
      console.log(tags);
      if(tags.indexOf("-o") !== -1){
        show_res();
      }

      process.exit(0);
  }
  else if((typeof commands[0]) !== (typeof undefined)){
    throw_err("cleat: " + commands[0] + ": command not defined. Try cleat --help to see all possible commands");
  }
  else{
    //no first command...
    if(tags.length > 0){
      if(tags.indexOf("--help") !== -1){
        show_help();
        process.exit(0);
      }
      else{
        process.exit(0);
      }
    }
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
  show_help();
  process.exit(0);
}

//**
//HELPER FUNCTIONS
//**

function open(path){
  var paths = path.split(" ");

  for(var i = 0; i < paths.length; i++){
      var glob_find = findFiles(paths[i]);
      if(glob_find.length > 0){
        for(var j = 0; j < glob_find.length; j++){
          file.push(glob_find[j]);
          html.push(fs.readFileSync(glob_find[j], "utf8"));
        }
      }
      else{

      }
  }

}

function applyFunc(my_func, args){
  for(var i = 0; i < file.length; i++){
    var this_file = file[i];
    var this_html = html[i];
    $ = cheerio.load(this_html);

    func[my_func].apply(this, args);
    html[i] = $.html();
  }
}

function writeAll(){
  for(var i = 0; i < file.length; i++){
    fs.writeFileSync(file[i], html[i]);
  }
}

function findFiles(exp){ //like this: node cleat.js use "*.html" css ".p" "color" "red"
  return glob.sync(exp,{});
}

function stripQuote(str){
  return str.replace(/"/g, "").replace(/'/g, "");
}

function throw_err(er){
  console.log(er);
  process.exit(0);
}

function show_help(){
var helptext = (function () {/*
usage: cleat <mode> <files> [<command> <args>]

mode: use

  example: cleat use index.html add ".p" "<i>hi</i>" add ".p" "<b>also this</b>"
  example: cleat use "*.html" css ".p" "color" "red"

  where <command> <args> can be:
    add           <query, html>
    prepend       <query, html>
    append        <query, html>
    addClass      <query, class>
    removeClass   <query, class>
    remove        <query>
    after         <query, html>
    before        <query, html>
    attr          <query, attribute, value>
    removeAttr    <query, attribute>
    toggleClass   <query, class>
    replaceWith   <query, html>
    css           <query, property, val>
    stylesheet    <href>
    script        <src>

mode: open

  opens up a shell

  example: cleat open index.html

other:
  -o : displays the modified files' text
  --help: displays this text
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
console.log(helptext)
}

function show_info(){
  if(file.length > 0){
    console.log("✓".green + " " + file.length + " files opened");
  }
  else{
    console.log("✗".red + " " + file.length + " files opened");
  }
}

function show_res(){
  var text = "";
  for(var i = 0; i < file.length; i++){
    text += ("\n" + file[i]).underline.bold;
    text += ("\n" + html[i]);
  }
  console.log(text);
}
