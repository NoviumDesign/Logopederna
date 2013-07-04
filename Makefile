JADE = $(shell find . -wholename './*.jade')
HTML = $(JADE:.jade=.html )

all: $(HTML)

%.html: %.jade
	jade < $< --path $< > $@

clean:
	rm -f $(HTML)

.PHONY: clean

# Specify where our binaries are (I'm using package.json and npm to handle dependencies)
LESSC = node_modules/.bin/lessc
UGLIFYJS = node_modules/.bin/uglifyjs
 
# Our LESS input file(s)
LESS = less/main.less
 
# Our CSS list (replaces .less with .css in the list)
CSS = $(LESS:.less=.css) 
 
# Our minified CSS list
CSS_MIN = $(CSS:.css=.min.css)
 
# Translate from .less to .css using the following command ($< = input file, $@ = output file)
%.css: %.less
	$(LESSC) $< > $@
 
# The same as above, bith with minification using the YUI CSS Compressor
%.min.css: %.less
	$(LESSC) --yui-compress $< > $@
 
# This is our default target, so simply typing `make` will run this (dependency is the `dist` target)
all: dist
 
# This target simply creates distribution versions of our JavaScript and CSS files
dist: css-dist
 
# Here's the amazing part, this variable resolves to any outstanding less -> css conversions depending 
# on when each .less file was last modified
css: $(CSS)
 
# The same as above, except we clean up the generated combined CSS files after minifying
css-dist: $(CSS_MIN)
	rm -f $(CSS)
 
# Clean up everything we can possibly have made
clean:
	rm -f $(CSS) $(CSS_MIN)
 
# These can never be valid targets (because we have folders with these names)
.PHONY: css