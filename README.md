[![Circle CI](https://circleci.com/gh/gregstewart/hearthstone-tracker.svg?style=shield)](https://circleci.com/gh/gregstewart/hearthstone-tracker)
[![Code Climate](https://codeclimate.com/github/gregstewart/hearthstone-tracker/badges/gpa.svg)](https://codeclimate.com/github/gregstewart/hearthstone-tracker)
[![Test Coverage](https://codeclimate.com/github/gregstewart/hearthstone-tracker/badges/coverage.svg)](https://codeclimate.com/github/gregstewart/hearthstone-tracker/coverage)
[![Issue Count](https://codeclimate.com/github/gregstewart/hearthstone-tracker/badges/issue_count.svg)](https://codeclimate.com/github/gregstewart/hearthstone-tracker)
[![An electron based Hearthstone tracker](https://img.shields.io/npm/v/hearthstone-tracker.svg)](https://www.npmjs.com/package/hearthstone-tracker)
[![Greenkeeper badge](https://badges.greenkeeper.io/gregstewart/hearthstone-tracker.svg)](https://greenkeeper.io/)

# hearthstone-tracker

An electron based Hearthstone tracker

To get started:

`git clone git@github.com:gregstewart/hearthstone-tracker.git && cd hearthstone-tracker`

Then run:

`npm i && npm start`

After a shortish time you should see something like the below the firs time you start the app:

![First screenshot](https://raw.githubusercontent.com/gregstewart/hearthstone-tracker/master/assets/screenshot.png)

Launch `Hearthstone` and play a few games, the UI *should* update after each completed game.

If you see an error similar to the below:

```
> hearthstone-tracker@0.4.0 start /Users/gregstewart/Projects/GitHub/hearthstone-tracker
> electron .

info: undefined undefined
error:  Error: Module version mismatch. Expected 50, got 48. This generally implies that leveldown was built with a different version of node than that which is running now.  You may try fully removing and reinstalling PouchDB or leveldown to resolve.
```

Then run:

`npm run rebuild:leveldb && npm start`

To run the tests:

`npm test`

## Some reources:
* [Simple Hearthstone logging - see your complete play history without TCP, screen capture, or violating the TOS](https://www.reddit.com/r/hearthstone/comments/268fkk/simple_hearthstone_logging_see_your_complete_play)
* [hearthstone-log-watcher](https://www.npmjs.com/package/hearthstone-log-watcher)
* [hearthstone-log-adapter](https://www.npmjs.com/package/hearthstone-log-adapter)


## For packaging
* [electron-packager](https://github.com/maxogden/electron-packager)
