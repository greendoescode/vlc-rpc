# VLC-RPC

![GitHub License](https://img.shields.io/github/license/greendoescode/vlc-rpc) ![Discord](https://img.shields.io/discord/1044078573142687814)

VLC-RPC is a Discord-rich presence integration for the VLC media player. This fork of [PigPog's VLC Discord RPC](https://github.com/Pigpog/vlc-discord-rpc) adds automatic album art.

![Example](./example.png)

Join our community on [Discord](https://discord.gg/CHegxjdFCD).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Common Requirements](#common-requirements)
  - [Using Prebuilt Release](#using-prebuilt-release)
  - [Using Manual Build](#using-manual-build)
- [Configuration](#configuration)
- [Limitations](#limitations)
- [Known Bugs](#known-bugs)
- [Nightly Builds](#nightly-builds)
- [Development](#development)
- [License](#license)
- [Contact](#contact)

## Features

- Displays currently playing media in Discord
- Automatic album art display
- Easy to configure

## Installation

You can install VLC-RPC by downloading a prebuilt archive or by building the project yourself.

### Common Requirements

- [VLC Media Player](https://www.videolan.org/index.html)
- [Discord Desktop Client](https://discord.com/)

### Using Prebuilt Release

1. [Download the latest release for your platform](https://github.com/GreenDiscord/vlc-rpc/releases).
2. Unzip the downloaded file.
3. Launch `start.bat` (on Windows) or `start.sh` (on Linux).
4. Play media in the VLC window that opens.

### Using Manual Build

#### Additional Requirements

- [Node.js and NPM](https://nodejs.org/en/)

#### Steps

1. Clone the repository:
   `git clone https://github.com/greendoescode/vlc-rpc.git`
2. Navigate to the cloned repository directory:
   `cd vlc-rpc`
3. Launch `start.bat` (on Windows) or `start.sh` (on Linux).
4. Alternatively, install the dependencies with:
   `npm install`

## Configuration

Configuration is done by editing the `config/config.js` file. This file is created when first starting VLC-RPC.

Each option in the configuration file is explained by a comment above it. For advanced features, see [ADVANCED.md](./advanced.md).

## Limitations

- When running multiple concurrent instances, only the first-opened instance of VLC will have a rich presence.
- This program does NOT allow you to stream media to others.

## Known Bugs

If you find any bugs, please report them in the [Issues](https://github.com/greendoescode/vlc-rpc/issues) or on [Discord](https://discord.gg/CHegxjdFCD).

## Nightly Builds

Nightly builds are posted as "Pre-releases" after every commit. These nightly builds may add features but with minimal implementations. Using these builds can help us diagnose issues while giving you early access to new features. [Click here](https://github.com/greendoescode/vlc-rpc/releases/tag/nightly) to get the latest nightly builds.

## Development

This repository uses "conventional commits" from this commit forward. [Here's a rundown](https://dev.to/jordharr/an-introduction-to-conventional-commits-bd4) on what they are and how to use them properly.

If you'd like to help out, you can clean up the code and help set up automatic testing of builds.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contact

For any questions or support, join our [Discord community](https://discord.gg/CHegxjdFCD).
