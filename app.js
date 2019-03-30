const express = require('express');

/**
 * chalk is a npm module to print styled output to the console
 * There are many utilities provided by chalk. For more visit:
 * https://github.com/chalk/chalk
 */
const chalk = require('chalk');
/**
 * debug is a npm module to print the console line only in debug mode.
 * There are few other utilities provided by debug. For more visit:
 * https://github.com/visionmedia/debug
 * The debug logs are printed only in debug mode. To enable debug mode
 * on windows, run your app as :  set DEBUG=* & node app.js
 * While using with *, it consoles all the debug from the project.
 * If you want to print debugs from just one file you can specify the
 * file while requiring debug as:
 * const debug = require('debug')('someName');
 * and then run debug as set DEBUG=someName & node app.js
 * The debug command might act up in VS code terminal. It however
 * works find in the windows terminal.
 */
const debug = require('debug')('app');

/**
 * this is an inbuilt node module which makes the path concatenation easy.
 */
const path = require('path');

/**
 * this npm modules helps us get the request body in our POST requests.
 */
const bodyParser = require('body-parser');

/**
 * Double clicking on a variable and pressing F2 helps you change
 * all the occurrences of a variable in a file.
 */
const app = express();

/**
 * Just some boiler-plate code needed for using body-parser module.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/**
 * the below way we set our public path in the express project.
 * All the paths referenced in index.html for css and js are 
 * automatically referenced from this file.
 */
app.use(express.static(path.join(__dirname , 'public')));

/**
 * While the custom css and any js can be referenced from public folder as
 * shown above, the third-party css and js should always be rendered from
 * node_modules. This way they are easy to manage and update, else you always 
 * have to copy paste the latest files in to the public folder.
 * Below here, we are directing express to look in the below folders too for 
 * any css/js path referenced in index.html if not found in public folder.
 */
app.use('/css',express.static(path.join(__dirname , '/node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname , '/node_modules/bootstrap/dist/js')));
app.use('/js',express.static(path.join(__dirname , '/node_modules/jquery/dist/js')));

/**
 * the default folder where the express will look for all the files to render.
 * We just specify the file name in render as done below, because we know where
 * the file will be and we know that the extension of the file will be as 
 * specified below in view engine.
 */
app.set('views', (path.join(__dirname , 'views')));
app.set('view engine', 'ejs');

/**
 * to specify different routes on our server, we use the router component.
 * This can be used to render different pages if we are rendering pages 
 * from our server or can be used for various api endpoints while rendering
 * data from the server. We can specify various router based on our pages
 * or API modules. Specify the base path in the import router, then specify the
 * specifc endpoints in router file
 */
const gitRouter = require('./routers/gitRouter');
const dbRouter = require('./routers/dbRouter');
app.use('/api/v1/github', gitRouter);
app.use('/api/v1/dbData', dbRouter);

/**
 * We can then chain handlers for GET, POST etc to each route path.
 * I will however extract this logic to a separate file
 */
// gitRouter.route('/')
// 	.get((req, res) => {
// 		res.send('hello from Git Router');
// 	});

// gitRouter.route('/single')
// .get((req, res) => {
// 	res.send('hello from single Git Router');
// });

app.listen(3000, ()=> {
	debug(chalk.green.bgWhite.bold('Server up and running at port 3000'));
});

app.get('/', (req, res) => {
	res.render('index', {}); // data obj to be used in rendered page
})