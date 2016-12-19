npm install --save express
npm install --save express-handlebars

: << COMMENTBLOCK
	Обратите внимание на то, что мы использовали --save-dev вместо --save; этот
	флаг указывает npm занести данный пакет в список зависимостей, предназначенных
	для разработки, а не зависимостей, предназначенных для реального запуска
COMMENTBLOCK

npm install --save-dev mocha
mkdir public/vendor
cp node_modules/mocha/mocha.js public/vendor
cp node_modules/mocha/mocha.css public/vendor

npm install --save-dev chai
cp node_modules/chai/chai.js public/vendor

npm install --save async
#npm install --save-dev zombie@3.1.1 - error
npm install -g jshint

sudo npm install -g grunt-cli
npm install --save-dev grunt

npm install --save-dev grunt-cafe-mocha
npm install --save-dev grunt-contrib-jshint
npm install --save-dev grunt-exec

npm install --save-dev broken-link-checker -g