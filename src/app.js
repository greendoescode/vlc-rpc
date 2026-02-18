/**
 * Starting point for
 * vlc-discord-rpc
 */
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os')
const config = require('./helpers/configLoader.js').getOrInit('config.js');
const log = require('./helpers/lager.js');
const crypto = require('crypto');
require('./rpc/client.js');

const platformDefaults = {
	win32: 'C:/Program Files/VideoLAN/VLC/vlc.exe',
	// Alternative path to Windows VLC executable
	winalt: 'C:/Program Files (x86)/VideoLAN/VLC/vlc.exe',
	linux: '/usr/bin/vlc',
	// Alternative path if you were using flatpak instead of apt/dnf/pacman/etc...
	flatpak: '/var/lib/flatpak/app/org.videolan.VLC/x86_64/stable/active/export/bin/org.videolan.VLC',
	unix: '/usr/bin/vlc',
	// Mac OS
	darwin: '/Applications/VLC.app/Contents/MacOS/VLC',
};

// Generates a random password
function randomPass() {
	return crypto.randomBytes(32);
}

// Use a random password if none is supplied
if (config.vlc.password === "") config.vlc.password = randomPass();

log('Started, config', config);
if (!(config.rpc.detached || process.argv.includes('detached'))) {
	if (process.platform === "win32") {
		if (!fs.existsSync(platformDefaults.win32)) {
			// Use alternative Windows path
			platformDefaults.win32 = platformDefaults.winalt;
		}
	}
	if (process.platform === "linux") {
		if (fs.existsSync(platformDefaults.flatpak)) {
			// If linux path doesn't exist (which is likely if you don't use apt/dnf/pacman).
			platformDefaults.linux = platformDefaults.flatpak;
		} else {
			const flatpakUserPath = `${os.homedir()}/.local/share/flatpak/app/org.videolan.VLC/x86_64/stable/active/export/bin/org.videolan.VLC`;
			if (fs.existsSync(flatpakUserPath)) {
				platformDefaults.linux = flatpakUserPath;
			}
		}
	}

	const command = config.vlcPath || platformDefaults[process.platform] || 'vlc';
	const child = spawn(command, ['--extraintf', 'http', '--http-host', config.vlc.address, '--http-password', config.vlc.password, '--http-port', config.vlc.port]);
	child.on('exit', () => {
		console.log("VLC closed; Exiting.");
		process.exit(0);
	});
	child.on('error', () => {
		console.log("------------------------------------");
		console.log("ERROR: A problem occurred while launching VLC. Most likely, you installed VLC to a weird spot and will need to set the vlcPath value in config/config.js to the path to your vlc executable (eg. vlcPath: \"C:/Program Files/videolan/vlc/vlc.exe\")");
		console.log("------------------------------------");
		console.log("Waiting 20 seconds before exiting to give you time to read the error message :)");
		setTimeout(process.exit, 20000, 1)
	});
}
