# Advanced Configuration Options

## Detached Mode (Best Experience)

Out of the box, starting vlc-discord-rpc will open VLC, and closing VLC will close vlc-discord-rpc.
This is the "attached" mode, and it is the default because "it just works" in most cases.

Detached mode will not open VLC for you, and closing VLC won't close vlc-discord-rpc.
It requires a bit of tweaking, but once it is configured, it allows you to open and close VLC as
you normally would and still show a rich presence.

### Instructions

These instructions apply to all platforms. For a visual guide, see
[this GIF](https://github.com/Pigpog/vlc-discord-rpc/blob/develop/setup.gif?raw=true)

 1. Open VLC Media Player

 2. In the Tools drop-down menu, select Preferences to open the Preferences window.

 3. To the bottom left corner of the Preferences window, you'll see a box labeled "Show settings". Choose
"All" to reveal the advanced preferences.

 4. Type "Lua" into the search bar that appears in the top left, and click "Main interfaces" from the results.

 5. Enable the HTTP interface by checking the "Web" checkbox.

 6. Under "Main interfaces" in the left pane, click "Lua".

 7. Enter a fresh new password into the Password field under Lua HTTP.

 8. Click the Save button at the bottom of the window.

 9. Open the config/config.js file in a text editor

 10. Put the password you made earlier between the single-quotes of the `password: '',` line, and change `detached: false`
to `detached: true` to enable detached mode.
