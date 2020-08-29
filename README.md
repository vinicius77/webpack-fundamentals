# Webpack Fundamentals

## Bundling

Even though ES6 modules are defined in the ECMAScript standard, no browser actually knows how to handle code that is divided into modules.

For this reason, code that is divided into modules must be bundled for browsers, meaning that all of the source code files are transformed into a single file that contains all of the application code.

The create-react-app script makes use of webpack under the hood.

## Starting

Let's create a new directory for the project with the following subdirectories and files:

```
├── build
├── package.json
├── src
│ └── index.js
└── webpack.config.js
```

The contents of _the package.json_ file can be as following:

```javascript
{
"name": "webpack-part7",
"version": "0.0.1",
"description": "practising webpack",
"scripts": {},
"license": "MIT"
}
```

### Installing Webpack

```
npm install --save-dev webpack webpack-cli
```

### Defining the Webpack Configuration

In the webpack.config.js file

```javascript
const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js"
  }
};

module.exports = config;
```

### Defining a new _npm script_ called build that will execute the bundling with webpack:

In the _package.json_ file

```javascript
// ...
"scripts": {
  "build": "webpack --mode=development"
},
// ...

```

### Adding some code just for example purposes

```javascript
const hello = name => {
  console.log(`hello ${name}`);
};
```

When executing the <code>npm run build</code> command the application code will be bundled by webpack. The operation produces a new main.js file which is added under the build directory:

```
npm run build
```

### Adding a App.js file under the src directory with the following content:

```javascript
const App = () => {
  return null;
};

export default App;
```

### Importing and using the App module in the index.js file:

```javascript
import App from "./App";

const hello = name => {
  console.log(`hello ${name}`);
};

App();
```

## Bundling React

Transforming the application into a minimal React application installing the required libraries:

```
npm install --save react react-dom
```

## Turning the application into a React application by adding the familiar definitions in the _index.js_ file:

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

## Making the following changes to the _App.js_ file:

```javascript
import React from "react";

const App = () => <div>hello webpack</div>;

export default App;
```

The _build/index.html_ file will serve as the "main page" of our application that will load our bundled JavaScript code with a script tag

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript" src="./main.js"></script>
  </body>
</html>
```

## Loaders

The application needs an appropriate _loader_ to bundle the _App.js_ file correctly. By default, webpack only knows how to deal with plain _JavaScript_ and the appliaction is actually using _JSX_ for rendering our views in _React_.

### Configuring a loader to the application that transforms the JSX code into regular JavaScript:

Loaders are defined under the module property in the rules array.

```javascript
const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: { presets: ["@babel/preset-react"] }
      }
    ]
  }
};
```

### Installing the loader and its required packages as a development dependency

```
npm install @babel/core babel-loader @babel/preset-react --save-dev
```

__Bundling the application will now succeed.__

If the bundled application's source code uses _async/await_, in some browsers nothing will be rendered.

It is needed to install one more missing dependency, that is __@babel/polyfill__:

```
npm install --save @babel/polyfill
```

## Making the following changes to the entry property of the webpack configuration.

_ webpack.config.js__ file:

```javascript
entry: ['@babel/polyfill', './src/index.js']
```

## Transpilers

The general definition of the term is to compile source code by transforming it from one language to another.

Most browsers do not support the latest features that were introduced in ES6 and ES7, and for this reason the code is usually transpiled to a version of JavaScript that implements the ES5 standard.

The transpilation process that is executed by Babel is defined with plugins. In practice, most developers use ready-made presets that are groups of pre-configured plugins.

Currently the project is using the __@babel/preset-react__ preset for transpiling the source code of our application:

Let's add the __@babel/preset-env__ plugin that contains everything needed to take code using all of the latest features and transpile it to code that is compatible with the ES5 standard:

```javascript
{
  test: /\.js$/,
  loader: 'babel-loader',
  query: {
    // here 
    presets: ['@babel/preset-env', '@babel/preset-react']  }
}
```

Installing the preset with the command

```
npm install @babel/preset-env --save-dev
```

## Adding CSS

Creating a new _src/index.css_ file,

```css
.container {
  margin: 10;
  background-color: #dee8e4;
}
```
importing it on _index.js_ file,
```javascript
import './index.css'
```
and using this in the App component:

```javascript
const App = () => {
  return (
    <div className="container">
      hello webpack
    </div>
  )
}
```

When using CSS, we also have to use css and style loaders: (_webpack.config.js_)

```javascript
{
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
            },
        },
        {      
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        },  
    ];
}
```
The job of the css loader is to load the CSS files and the job of the style loader is to generate and inject a style element that contains all of the styles of the application.

With this configuration the CSS definitions are included in the main.js file of the application. For this reason there is no need to separately import the CSS styles in the main index.html file of the application.

If needed, the application's CSS can also be generated into its own separate file by using the mini-css-extract-plugin.

When we install the loaders:

```
npm install style-loader css-loader --save-dev
```

The bundling will succeed once again and the application gets new styles. 

## Webpack-dev-server

The _webpack-dev-server_ provides you with a simple web server and the ability to use __live reloading__.

```
npm install --save-dev webpack-dev-server
```

### Defining a npm script for starting the dev-server:

_package.json_ file:

```javascript
{
  // ...
  "scripts": {
    "build": "webpack --mode=development",
    "start": "webpack-dev-server --mode=development"  
    },
  // ...
}
```

### Adding a new devServer property to the configuration object in the webpack.config.js file:

```javascript
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js',
    },
    devServer: {    
        contentBase: path.resolve(__dirname, 'build'), compress: true,    
        port: 3000  
    },
    // ...
};
```
The <code>npm start</code> command will now start the dev-server at the port 3000, meaning that our application will be available by visiting http://localhost:3000

**Note:** The error messages don't show up the same way as they did with applications made using create-react-app. For this reason we have to pay more attention to the console.

## Source maps

The location of the error indicated in the message does not match the actual location of the error the source code. If we click the error message, we notice that the displayed source code does not resemble our application code:

Source maps allow us tou see the actual source code in the error message.

The source map can be generated by adding a new _devtool_ property to the configuration object with the value 'source-map'

```javascript
const config = {
  entry: './src/index.js',
  output: {
    // ...
  },
  devServer: {
    // ...
  },
  devtool: 'source-map',  // ..
};

```

## Minifying the code

If we inspect the contents of the bundle file, we notice that it could be greatly optimized in terms of file size by removing all of the comments. There's no point in manually optimizing these files, as there are many existing tools for the job.

Starting from version 4 of webpack, the minification plugin does not require additional configuration to be used. It is enough to modify the npm script in the package.json file to specify that webpack will execute the bundling of the code in production mode.

```javascript
"scripts": {
    "build": "webpack --mode=production",
    // ...
  },
```
When we bundle the application again, the size of the resulting main.js decreases substantially:

The output of the minification process resembles old-school C code; all of the comments and even unnecessary whitespace and newline characters have been removed, and variable names have been replaced with a single character.

```javascript
function h(){if(!d){var e=u(p);d=!0;for(var t=c.length;t;){for(s=c,c=[];++f<t;)s&&s[f].run();f=-1,t=c.length}s=null,d=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===l||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}a.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)
```

## Development and production configuration