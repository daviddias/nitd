all: dist/issue-tracker.css dist/issue-tracker.js

dist/issue-tracker.css: assets/css/*.scss
	node_modules/.bin/node-sass assets/css/issue-tracker.scss public/css/issue-tracker.css

dist/issue-tracker.js: assets/js/**/*.js assets/vendor/js/**/*.js
	node_modules/.bin/browserify -t brfs --debug -e assets/js/issue-tracker.js -o public/js/issue-tracker.js

clean:
	rm -f public/js/issue-tracker.js public/css/issue-tracker.css