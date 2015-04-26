# cleat
A command line tool to modify web pages. Stay in your happy place.

You do everything from the command line. Then why spoil your perfect setup with vim or emacs if you just want to make some simple edits?

### installation
```shell
sudo npm -g cleat
```

### basics
```shell
cleat use index.html add ".p" "<i>hi</i>" add ".p" "<b>also this</b>"

cleat use "*.html" css ".p" "color" "red"
```

`".p"`: an example of a Jquery-style query
* `p`: all `<p>` elements
* `.class`: all with `class` class
* etc.

`"*.html"`: an example of filenames with wildcards

### shell
You can open up a shell with:
```shell
cleat open "*.html"
```

### command list

###### add <query, html>
Will add `html` at the end of anything that matches `query`. Identical to `append`.


###### prepend <query, html>
Will add `html` at the beginning of anything that matches `query`.

###### append <query, html>
Will add `html` at the end of anything that matches `query`.

###### addClass <query, class>
Will add the class `class` to anything that matches `query`.

###### removeClass <query, class>
Will remove `class` from anything that matches `query`.

###### remove <query>
Will delete `query`.

###### after <query, html>
Will insert `html` after anything that matches `query`.

###### before <query, html>
Will insert `html` before anything that matches `query`.

###### attr <query, attribute, value>
###### removeAttr <query, attribute>
###### toggleClass <query, class>
###### replaceWith <query, html>
###### css <query, property, val>
###### stylesheet <href>
###### script  <src>

### other
