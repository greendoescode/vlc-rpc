# vlc-rpc
![GitHub](https://img.shields.io/github/license/GreenDiscord/vlc-rpc) ![Discord](https://img.shields.io/discord/1044078573142687814)

Discord rich presence for VLC media player.
This is a fork of [PigPogs](https://github.com/Pigpog/vlc-discord-rpc) VLC RPC, adding automatic album art.

![Example](./example.png)

Join us on [Discord](https://discord.gg/CHegxjdFCD).

### Still in development and bugs will ecour

# Setup

### Requirements

- [Node.JS and NPM](https://nodejs.org/en/)
- [VLC](https://www.videolan.org/index.html)
- [Discord desktop client](https://discord.com/)

### Steps

 1. [Download the latest release for your platform](https://github.com/GreenDiscord/vlc-rpc/releases)
 2. Unzip the file
 3. Launch the start file
 4. Play media in the VLC window that opens

### Configuration

Configuration is done by editing the [config/config.js](./config/config.js) file.
Each option is explained in a comment above it.

For advanced features, see [ADVANCED.md](./info/ADVANCED.md).

## Limitations

 - When running multiple concurrent instances, only the first-opened instance of VLC will have a rich presence
 - This program does NOT allow you to stream media to others


