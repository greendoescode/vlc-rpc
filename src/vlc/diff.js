/**
 * Checks to see if VLC's
 * status updated
 */
const VLC = require('vlc.js');
const log = require('../helpers/lager.js');
const config = require('../helpers/configLoader.js').getOrInit();

// VLC server (8080) detection status
var detectVlc = true;

const VLCClient = new VLC.VLCClient(config.vlc);
// last check
const last = {
  filename: '',
  now_playing: '',
  state: '',
  time: 0,
};

/**
 * @param {Function} callback<Object, Boolean>
 */

async function detect(callback, retries = 5) {
  VLCClient.getStatus()
    .then((status) => {
      if (status.information) {
        detectVlc = true;
        const { meta } = status.information.category;
        if (meta.now_playing !== last.now_playing) {
          // check stream
          log('Stream updated');
          callback(status, true);
        } else if (meta.filename !== last.filename) {
          // check song
          log('Filename updated');
          callback(status, true);
        } else if (status.state !== last.state) {
          // check state
          log('VLC\'s state updated');
          callback(status, true);
        } else if (
          status.time - (last.time + config.rpc.updateInterval / 1000)
          > 3 || last.time > status.time
        ) {
          // check time
          log('Playback time updated');
          callback(status, true);
        } else if (status.volume !== last.volume) {
          // check volume
          log('Volume updated');
          callback(status, true);
          last.volume = status.volume;
        } else callback(status, false);
        last.filename = status.information ? meta.filename : undefined;
        last.now_playing = meta.now_playing;
      } else callback(status);
      last.state = status.state;
      last.time = status.time;
    })
    .catch(async (err) => {
      if(err.code === "ECONNREFUSED") {
        if(detectVlc) {
          console.log("Failed to reach VLC. Is it open? Retrying...");
          if (retries > 0)
          {
            // Sleep for a second, then retry (in case VLC is still starting up)
            await new Promise(resolve => setTimeout(resolve, 1000));
            await detect(callback, retries - 1);
          }
          else
          {
            // Clear the rich presence by sending stopped state
            callback({state:"stopped"}, false);
            detectVlc = false;
          }
        }
      }
      else
      {
        throw err;
        detectVlc = false;
      }
    });
};

module.exports = detect;
