BABEL     = $$(npm bin)/babel
COVERALLS = $$(npm bin)/coveralls
KARMA     = $$(npm bin)/karma
SASS      = $$(npm bin)/node-sass
WATCH     = $$(npm bin)/watch
WEBPACK   = $$(npm bin)/webpack

.PHONY: clean test test-coverage build package.json javascript docs release example

build:
	make clean
	make javascript
	make sass
	make package.json
	make documentation

javascript: $(shell find {src,addons} -name '*.js*' ! -name '*.test.js*')
	mkdir -p dist
	$(BABEL) -d dist $^

sass:
	mkdir -p dist
	cp -r style dist/style
	$(SASS) ./dist/style/colonel.scss --stdout > dist/colonel-kurtz.css

sass-watch:
	$(WATCH) 'make sass' style

package.json:
	node -p 'p=require("./package");p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

documentation: README.md LICENSE.md docs
	mkdir -p dist
	cp -r $^ dist

release:
	make build
	npm publish dist

example:
	open example/index.html
	$(WEBPACK) -wd

clean:
	rm -rf dist

test:
	NODE_ENV=test $(KARMA) start

test-once:
	NODE_ENV=test $(KARMA) start --single-run

test-coverage:
	make test-once
	$(COVERALLS) < coverage/report-lcov/lcov.info