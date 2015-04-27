# cleat
A command line tool to modify web pages. Stay in your happy place.

You do everything from the command line. Then why spoil your perfect setup with vim or emacs if you just want to make some simple edits?

### installation
```shell
sudo npm -g cleat
```

### basics
```shell
cleat use index.html text "h1" "this is a header"

cleat use index.html add ".p" "<i>hi</i>" add ".p" "<b>also this</b>"

cleat use "*.html" css ".p" "color" "red"
```

You can use JQuery style selectors like `".class"` and filenames with wildcards like `"*.html"` if you use `"`.

### shell
You can open up a shell with:
```shell
cleat open "*.html"
```

### command list

###### default
Sets the text to	
```html
<!DOCTYPE html>
<html lang="en">
	<head>
	</head>
	<body>
	</body>
</html>
```

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
Will change the attribute `attribute` of `query` to `value`. Useful for changing the `id` of items.

###### removeAttr <query, attribute>
Will remove `attribute` from `query`.

###### toggleClass <query, class>
If `query` has `class`, it will be removed. Otherwise, it will be added.

###### replaceWith <query, html>
Replaces `query` with `html`.

###### css <query, property, val>
Changes `property` of `query` to `val`.

###### stylesheet <href>
Adds a `<link rel="stylesheet" href="<href>">` to the `head` of the file. 

###### script  <src>
Adds a `<script src="<src>"></script>` to the end of the `body` of the file.

###### text <query> <text>
Changes the inner text of `query` to `text`.

### other

`-o`: displays the changed files after they are changed.

`--help`: help text
