# TypeScript Node Starter
The main purpose of this repository is to show a working Node.js API Server and workflow for writing Node code in TypeScript.

It is not a goal to be a comprehensive and definitive guide to making a TypeScript and Node project, but as a working reference maintained by the community. If you are interested in starting a new TypeScript project - check out the bootstrapping tools reference in the TypeScript Website


# Pre-requisites
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Setup
- Clone the repository
```
git clone https://gitlab.com/simpragma/starters/TypeScript-Node-Starter.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db

# starting from macOS 10.15 even the admin cannot create directory at root
# so lets create the db directory under the home directory.
mkdir -p ~/data/db
# user account has automatically read and write permissions for ~/data/db.
```
- Start your mongoDB server (you'll probably want another command prompt)
```bash
mongod

# on window or above the db directory is under home directory
mongod --dbpath ~/data/db
```
- Run project
```
npm start
```

Finally, hit this `http://localhost:3000/trades` and you will gate the user trade list( If data is present in mongo ) !

# Code Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | This contains the TypeScript build code that we deploy in the server.                         |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | This contains the mongodb connection, swagger document and other config code related to App   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/payload-schema**   | This contains the API payload schema                                                          |
| **src/route**            | This contains the All end point                                                               |
| **src/util**             | This contains token validation, schema validation, logger, other validation related to APP    |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Separate from source because there is a different build process.         |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .gitignore               | This contains the ignore files and folders                                                    |
| package.json             | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| nodemon.json             | Config settings for automatically restart the server                                          |

### Configuring TypeScript compilation
TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.
```json
"compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
        "*": [
            "node_modules/*",
            "src/types/*"
        ]
    }
},
```
The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context:
```json
"include": [
    "src/**/*"
]
```
`include` takes an array of glob patterns of files to include in the compilation.
This project is fairly simple and all of our .ts files are under the `src` folder.
For more complex setups, you can include an `exclude` array of glob patterns that removes specific files from the set defined with `include`.
There is also a `files` option which takes an array of individual file names which overrides both `include` and `exclude`.

### Running command
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:


| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `build`                   | Full build. Runs ALL build tasks.                                                                 |
| `dev`                     | Runs node on dev server                                                                           |
| `prod`                    | Runs node on production server                                                                    |
| `test`                    | Runs tests using mocha and chai                                                                   |
| `lint`                    | Runs ESLint on project files                                                                      |

# Environment specific configuration

An environment variable is a KEY=value pair that is stored on the system where your code/app is being run and is accessible from within your code.

Create a .env file in the root of your project and insert your key/value pairs in the following format of KEY=VALUE:

```.env
MONGODB_URI=mongodb://localhost:27017/trades
SECRET_KEY=ashdfjhasdlkjfhalksdjhflak
PORT=3000
```

Node.js gives you access to the variables defined in your environment in the process.env global object.

We can directly use this env var in our project

```js
let PORT = process.env.PORT
```

# Build

- To Build this project, We just need to run this command
```
    npm run build
```
- After build, dist folder will create automatically which contains js files. 
- We need to create .env file inside the dist folder with all key and values.

# Test

For this project, I chose [Mocha and chai](https://mochajs.org/) as our test framework.
It provides functionality for testing both synchronous and asynchronous code with a very simple and similar interface

### Install the components
To add TypeScript + Mocha and chai support, first install a few npm packages:
```
npm install -D mocha chai @types/mocha @types/chai
```
`Mocha` is the testing framework, and `chai` is a assertion library to make running TypeScript tests a little easier.

### Configure Mocha & chai
We need to atach this command in scripts of package.json
```js
"test": "mocha -r ts-node/register test/**/*.test.ts"
```
Basically we are telling that we want it to consume all files that match the pattern `"**/test/**/*.test.(ts|js)"` (all `.test.ts`/`.test.js` files in the `test` folder), but we want to preprocess the `.ts` files first.
This preprocess step is very flexible, but in our case, we just want to compile our TypeScript to JavaScript using our `tsconfig.json`.
This all happens in memory when you run the tests, so there are no output `.js` test files for you to manage.

### Running tests

Write testcase inside test folder.

Simply run this command `npm run test` for unit testing.

## ESLint
ESLint is a code linter which mainly helps catch quickly minor code quality and style issues.

### ESLint rules
Like most linters, ESLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `.eslintrc` configuration file.
In this project, we are using a fairly basic set of rules with no additional custom rules.

### Running ESLint
Like the rest of our build steps, we use npm scripts to invoke ESLint.
To run ESLint you can call the main build script or just the ESLint task.
```
npm run build   // runs full build including ESLint
npm run lint    // runs only ESLint
```
Notice that ESLint is not a part of the main watch task.

If you are interested in seeing ESLint feedback as soon as possible, I strongly recommend the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).