[vlc.js](../README.md) › [Globals](../globals.md) › ["http/classes/VLCStatus"](../modules/_http_classes_vlcstatus_.md) › [VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)

# Class: VLCStatus

**`class`** VLCStatus

**`description`** Current status about VLC.

## Hierarchy

* **VLCStatus**

## Index

### Constructors

* [constructor](_http_classes_vlcstatus_.vlcstatus.md#constructor)

### Properties

* [apiversion](_http_classes_vlcstatus_.vlcstatus.md#apiversion)
* [audiodelay](_http_classes_vlcstatus_.vlcstatus.md#audiodelay)
* [audiofilters](_http_classes_vlcstatus_.vlcstatus.md#audiofilters)
* [currentplid](_http_classes_vlcstatus_.vlcstatus.md#currentplid)
* [date](_http_classes_vlcstatus_.vlcstatus.md#optional-date)
* [equalizer](_http_classes_vlcstatus_.vlcstatus.md#equalizer)
* [fullscreen](_http_classes_vlcstatus_.vlcstatus.md#fullscreen)
* [information](_http_classes_vlcstatus_.vlcstatus.md#optional-information)
* [length](_http_classes_vlcstatus_.vlcstatus.md#length)
* [loop](_http_classes_vlcstatus_.vlcstatus.md#loop)
* [position](_http_classes_vlcstatus_.vlcstatus.md#position)
* [random](_http_classes_vlcstatus_.vlcstatus.md#random)
* [rate](_http_classes_vlcstatus_.vlcstatus.md#rate)
* [repeat](_http_classes_vlcstatus_.vlcstatus.md#repeat)
* [state](_http_classes_vlcstatus_.vlcstatus.md#state)
* [stats](_http_classes_vlcstatus_.vlcstatus.md#stats)
* [subtitledelay](_http_classes_vlcstatus_.vlcstatus.md#subtitledelay)
* [time](_http_classes_vlcstatus_.vlcstatus.md#time)
* [version](_http_classes_vlcstatus_.vlcstatus.md#version)
* [videoeffects](_http_classes_vlcstatus_.vlcstatus.md#videoeffects)
* [volume](_http_classes_vlcstatus_.vlcstatus.md#volume)

## Constructors

###  constructor

\+ **new VLCStatus**(`vlcRequest`: [VLCRequest](_http_classes_vlcrequest_.vlcrequest.md)): *[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)*

*Defined in [http/classes/VLCStatus.ts:28](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L28)*

**`constructor`** 

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vlcRequest` | [VLCRequest](_http_classes_vlcrequest_.vlcrequest.md) |   |

**Returns:** *[VLCStatus](_http_classes_vlcstatus_.vlcstatus.md)*

## Properties

###  apiversion

• **apiversion**: *number*

*Defined in [http/classes/VLCStatus.ts:11](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L11)*

___

###  audiodelay

• **audiodelay**: *number*

*Defined in [http/classes/VLCStatus.ts:10](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L10)*

___

###  audiofilters

• **audiofilters**: *[AudioFilters](../interfaces/_http_classes_vlcstatus_.audiofilters.md)*

*Defined in [http/classes/VLCStatus.ts:17](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L17)*

___

###  currentplid

• **currentplid**: *number*

*Defined in [http/classes/VLCStatus.ts:12](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L12)*

___

### `Optional` date

• **date**? : *undefined | string*

*Defined in [http/classes/VLCStatus.ts:24](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L24)*

___

###  equalizer

• **equalizer**: *[Equalizer](../interfaces/_http_classes_vlcstatus_.equalizer.md)[]*

*Defined in [http/classes/VLCStatus.ts:28](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L28)*

___

###  fullscreen

• **fullscreen**: *boolean*

*Defined in [http/classes/VLCStatus.ts:8](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L8)*

___

### `Optional` information

• **information**? : *[Information](../interfaces/_http_classes_vlcstatus_.information.md)*

*Defined in [http/classes/VLCStatus.ts:25](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L25)*

___

###  length

• **length**: *number*

*Defined in [http/classes/VLCStatus.ts:15](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L15)*

___

###  loop

• **loop**: *boolean*

*Defined in [http/classes/VLCStatus.ts:21](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L21)*

___

###  position

• **position**: *number*

*Defined in [http/classes/VLCStatus.ts:23](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L23)*

___

###  random

• **random**: *boolean*

*Defined in [http/classes/VLCStatus.ts:16](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L16)*

___

###  rate

• **rate**: *number*

*Defined in [http/classes/VLCStatus.ts:18](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L18)*

___

###  repeat

• **repeat**: *boolean*

*Defined in [http/classes/VLCStatus.ts:26](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L26)*

___

###  state

• **state**: *[VLCPlaylistStatus](../enums/_http_classes_vlcstatus_.vlcplayliststatus.md)*

*Defined in [http/classes/VLCStatus.ts:20](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L20)*

___

###  stats

• **stats**: *object | undefined*

*Defined in [http/classes/VLCStatus.ts:9](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L9)*

___

###  subtitledelay

• **subtitledelay**: *number*

*Defined in [http/classes/VLCStatus.ts:27](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L27)*

___

###  time

• **time**: *number*

*Defined in [http/classes/VLCStatus.ts:13](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L13)*

___

###  version

• **version**: *string*

*Defined in [http/classes/VLCStatus.ts:22](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L22)*

___

###  videoeffects

• **videoeffects**: *[VideoEffects](../interfaces/_http_classes_vlcstatus_.videoeffects.md)*

*Defined in [http/classes/VLCStatus.ts:19](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L19)*

___

###  volume

• **volume**: *number*

*Defined in [http/classes/VLCStatus.ts:14](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCStatus.ts#L14)*
