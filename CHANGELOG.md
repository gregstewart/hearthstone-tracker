# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
Features:

  - Upgrade to electron 1.2.2 (and many other packages after enabling [Greenkeeper](https://greenkeeper.io/))
  - Use [Datascript](https://github.com/tonsky/datascript) (and [mori](http://swannodette.github.io/mori/)) now for data retrieval and manipulation

### Added

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
