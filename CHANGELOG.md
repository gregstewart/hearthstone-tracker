# Change Log
All notable changes to this project will be documented in this file.
This project tried to adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

### Added

## [0.4.1] - (2017-01-08)

Features:

  - Show basic stats for today/this week/this month and for all time
  - Compare to last season (#23 @gregstewart)
  - Update to `electron 1.4.13`
  - Many packages upgraded thanks to [Greenkeeper](https://greenkeeper.io/)

## [0.4.0] - (2016-11-04)

Features:

  - New hero is being added: Tyrande Whisperwind (#161 @gregstewart)
  - Use `babel-plugin-istanbul` instead of isparta (#144 @gregstewart)
  - All vulnerabilities address (#109 @gregstewart)
  - Update to `electron 1.4.5`
  - Many packages upgraded thanks to [Greenkeeper](https://greenkeeper.io/)

Bugfixes:

 - Fix linting issues (#168 @gregstewart)

## [0.3.1] - (2016-08-03)

Bugfixes:

  - Fix path to feature toggles file (@gregstewart)


## [0.3.0] - (2016-08-02)

Features:

  - Upgrade to electron 1.2.2 (and many other packages after enabling [Greenkeeper](https://greenkeeper.io/))
  - Use [Datascript](https://github.com/tonsky/datascript) (and [mori](http://swannodette.github.io/mori/)) now for data retrieval and manipulation
  - Use [Farseer](https://www.npmjs.com/package/farseer) instead of [hearthstone-log-watcher](https://github.com/chevex-archived/hearthstone-log-watcher). This fixes a bug in the log parsing after patch 5.2

Bugfixes:

  - New Shamen hero (Morgl) added (@gregstewart)
  - Log parsing is broken after patch 5.2 (@gregstewart)

## [0.2.0] - (2016-05-12)

Features:

  - Breakdown of matches won and lost by class (#26 @gregstewart)
  - Reload stats data using a application menu (#30 @gregstewart)
  - Add Quit app option on OSX after adding custom menu
  - Add app icons
  - Added logging
  - Numerous refactoring done and tests added to increase coverage

Bugfixes:

  - New Paladin hero (Lady Liadrin) added (@gregstewart)
  - New Mage hero (Khadgar) added (@gregstewart)
  - Fixed grouping/partition issue in win streak (@gregstewart)
  - Fixed app data location when installed as a package (#33 @gregstewart)
  - Fixed logging and end game conditions (#35 @gregstewart)

## [0.1.4] - (2016-02-13)

Features:

  - Show your win streak (#24 @gregstewart)

## [0.1.3] - (2016-02-03)

Features:

  - Show your win loss stats and win rate (@gregstewart)
  - Capture player name (#5 @gregstewart)

Bugfixes:

  - Win condition is incorrect (#4, @gregstewart)
