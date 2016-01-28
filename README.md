# simple-dialogs

Non-blocking HTML5 dialogs.
Features prompt, confirmation, information and multiple choice dialogs.

## How to install

    npm install simple-dialogs

## Usage

Check out the [live demo](http://sparklinlabs.github.io/simple-dialogs/) and its [source code](https://github.com/sparklinlabs/simple-dialogs/blob/master/src/index.jade).

 * Include `SimpleDialogs.js` in your page.
 * Call `new SimpleDialogs.PromptDialog(promptLabel, promptOptions, callback);`
 * Handle result in the callback function

See [index.d.ts](https://github.com/sparklinlabs/simple-dialogs/blob/master/index.d.ts) for the full API and arguments.

## Building from source

 * Make sure you have a recent version of [Node.js](http://nodejs.org/) installed.
 * Clone the repository from `https://github.com/sparklinlabs/simple-dialogs` and run `npm install` once
 * Run `npm run build` to build once or `npm run watch` to start a watcher that will rebuild when changes are detecting