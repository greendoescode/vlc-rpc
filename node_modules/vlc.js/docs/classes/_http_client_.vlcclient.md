[vlc.js](../README.md) › [Globals](../globals.md) › ["http/Client"](../modules/_http_client_.md) › [VLCClient](_http_client_.vlcclient.md)

# Class: VLCClient

**`class`** VLCClient

**`description`** Promise-oriented VLC HTTP endpoint Client.

## Hierarchy

* **VLCClient**

## Index

### Constructors

* [constructor](_http_client_.vlcclient.md#constructor)

### Properties

* [details](_http_client_.vlcclient.md#private-details)

### Methods

* [add](_http_client_.vlcclient.md#add)
* [command](_http_client_.vlcclient.md#command)
* [empty](_http_client_.vlcclient.md#empty)
* [fullscreen](_http_client_.vlcclient.md#fullscreen)
* [getPlaylist](_http_client_.vlcclient.md#getplaylist)
* [getStatus](_http_client_.vlcclient.md#getstatus)
* [loop](_http_client_.vlcclient.md#loop)
* [next](_http_client_.vlcclient.md#next)
* [pause](_http_client_.vlcclient.md#pause)
* [play](_http_client_.vlcclient.md#play)
* [previous](_http_client_.vlcclient.md#previous)
* [random](_http_client_.vlcclient.md#random)
* [remove](_http_client_.vlcclient.md#remove)
* [repeat](_http_client_.vlcclient.md#repeat)
* [update](_http_client_.vlcclient.md#update)
* [volume](_http_client_.vlcclient.md#volume)

## Constructors

###  constructor

\+ **new VLCClient**(`details`: [VLCCredentials](../modules/_http_requester_.md#vlccredentials)): *[VLCClient](_http_client_.vlcclient.md)*

*Defined in [http/Client.ts:9](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L9)*

**`constructor`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`details` | [VLCCredentials](../modules/_http_requester_.md#vlccredentials) |   |

**Returns:** *[VLCClient](_http_client_.vlcclient.md)*

## Properties

### `Private` details

• **details**: *[VLCCredentials](../modules/_http_requester_.md#vlccredentials)*

*Defined in [http/Client.ts:9](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L9)*

## Methods

###  add

▸ **add**(`mrl`: string, `play`: boolean | undefined): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:40](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L40)*

**`description`** Add song based on MRL (media resource locator)

**`link`** https://wiki.videolan.org/Media_resource_locator/

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`mrl` | string | - | media resource locator |
`play` | boolean &#124; undefined |  undefined | Play the added media |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  command

▸ **command**(`vlcCommand`: [VLCCommand](../enums/_http_requester_.vlccommand.md), `query`: string[] | undefined): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:158](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L158)*

**`description`** Execute a VLC HTTP endpoint command

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`vlcCommand` | [VLCCommand](../enums/_http_requester_.vlccommand.md) | - | - |
`query` | string[] &#124; undefined |  undefined |   |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  empty

▸ **empty**(): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:48](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L48)*

**`description`** Clear playlist

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  fullscreen

▸ **fullscreen**(`isFullscreen`: boolean): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:56](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L56)*

**`description`** Toggle fullscreen (pretty useless)

**Parameters:**

Name | Type |
------ | ------ |
`isFullscreen` | boolean |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  getPlaylist

▸ **getPlaylist**(): *Promise‹[VLCPlaylist](_http_classes_vlcplaylist_.vlcplaylist.md)›*

*Defined in [http/Client.ts:29](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L29)*

**Returns:** *Promise‹[VLCPlaylist](_http_classes_vlcplaylist_.vlcplaylist.md)›*

___

###  getStatus

▸ **getStatus**(): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:22](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L22)*

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  loop

▸ **loop**(`isLoop`: boolean): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:67](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L67)*

**`description`** Loop playlist

**Parameters:**

Name | Type |
------ | ------ |
`isLoop` | boolean |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  next

▸ **next**(): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:78](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L78)*

**`description`** Play next song

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  pause

▸ **pause**(`isPaused`: true): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:86](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L86)*

**`description`** Pause current song

**Parameters:**

Name | Type |
------ | ------ |
`isPaused` | true |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  play

▸ **play**(`id`: string): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:101](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L101)*

**`description`** Play song based on ID If no ID is provided it'll play current song (restart /
    unpause)

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  previous

▸ **previous**(): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:109](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L109)*

**`description`** Play previous song

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  random

▸ **random**(`isRandom`: boolean): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:137](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L137)*

**`description`** Randomize the playlist

**Parameters:**

Name | Type |
------ | ------ |
`isRandom` | boolean |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  remove

▸ **remove**(`id`: string): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:118](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L118)*

**`description`** Remove song based on ID. If an ID isn't provided it'll remove current song

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  repeat

▸ **repeat**(`isRepeat`: boolean): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:126](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L126)*

**`description`** Repeat the current song

**Parameters:**

Name | Type |
------ | ------ |
`isRepeat` | boolean |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  update

▸ **update**(`details`: [VLCCredentials](../modules/_http_requester_.md#vlccredentials)): *void*

*Defined in [http/Client.ts:162](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](../modules/_http_requester_.md#vlccredentials) |

**Returns:** *void*

___

###  volume

▸ **volume**(`value`: number | string): *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Client.ts:149](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Client.ts#L149)*

**`description`** Set volume

**Parameters:**

Name | Type |
------ | ------ |
`value` | number &#124; string |

**Returns:** *Promise‹[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)›*
