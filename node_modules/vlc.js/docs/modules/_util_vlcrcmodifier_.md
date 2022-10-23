[vlc.js](../README.md) › [Globals](../globals.md) › ["util/VLCRCModifier"](_util_vlcrcmodifier_.md)

# External module: "util/VLCRCModifier"

## Index

### Classes

* [VLCRCModifier](../classes/_util_vlcrcmodifier_.vlcrcmodifier.md)

### Type aliases

* [ConfigItem](_util_vlcrcmodifier_.md#configitem)

### Functions

* [_getPath](_util_vlcrcmodifier_.md#_getpath)
* [_readLine](_util_vlcrcmodifier_.md#_readline)
* [editVLCRC](_util_vlcrcmodifier_.md#editvlcrc)

### Object literals

* [locations](_util_vlcrcmodifier_.md#const-locations)

## Type aliases

###  ConfigItem

Ƭ **ConfigItem**: *object*

*Defined in [util/VLCRCModifier.ts:21](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L21)*

#### Type declaration:

* **enabled**: *boolean*

* **key**: *string*

* **value**: *string*

## Functions

###  _getPath

▸ **_getPath**(): *string | undefined*

*Defined in [util/VLCRCModifier.ts:41](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L41)*

**Returns:** *string | undefined*

___

###  _readLine

▸ **_readLine**(`line`: string): *[ConfigItem](_util_vlcrcmodifier_.md#configitem) | undefined*

*Defined in [util/VLCRCModifier.ts:27](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`line` | string |

**Returns:** *[ConfigItem](_util_vlcrcmodifier_.md#configitem) | undefined*

___

###  editVLCRC

▸ **editVLCRC**(`location?`: undefined | string): *[VLCRCModifier](../classes/_util_vlcrcmodifier_.vlcrcmodifier.md)*

*Defined in [util/VLCRCModifier.ts:67](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L67)*

If no location is provided it will get the default install location

**Parameters:**

Name | Type |
------ | ------ |
`location?` | undefined &#124; string |

**Returns:** *[VLCRCModifier](../classes/_util_vlcrcmodifier_.vlcrcmodifier.md)*

## Object literals

### `Const` locations

### ▪ **locations**: *object*

*Defined in [util/VLCRCModifier.ts:9](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L9)*

**`link`** https://wiki.videolan.org/Preferences/
Last updated: September 15th, 2019

###  win32

• **win32**: *string* =  `${os.homedir()}\\AppData\\Roaming\\vlc\\vlcrc`

*Defined in [util/VLCRCModifier.ts:18](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L18)*

▪ **macos**: *object*

*Defined in [util/VLCRCModifier.ts:14](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L14)*

* **v8**: *string* =  `${os.homedir()}/Library/Preferences/org.videolan.vlc`

* **v9**: *string* =  `${os.homedir()}/Library/Preferences/VLC`

▪ **unix**: *object*

*Defined in [util/VLCRCModifier.ts:10](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L10)*

* **v8**: *string* =  `${os.homedir()}/.vlc/vlcrc`

* **v9**: *string* =  `${os.homedir()}/.config/vlc/vlcrc`
