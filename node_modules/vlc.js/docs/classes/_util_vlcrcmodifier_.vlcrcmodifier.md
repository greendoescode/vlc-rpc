[vlc.js](../README.md) › [Globals](../globals.md) › ["util/VLCRCModifier"](../modules/_util_vlcrcmodifier_.md) › [VLCRCModifier](_util_vlcrcmodifier_.vlcrcmodifier.md)

# Class: VLCRCModifier

## Hierarchy

* **VLCRCModifier**

## Index

### Constructors

* [constructor](_util_vlcrcmodifier_.vlcrcmodifier.md#constructor)

### Properties

* [_map](_util_vlcrcmodifier_.vlcrcmodifier.md#private-_map)
* [_original](_util_vlcrcmodifier_.vlcrcmodifier.md#private-_original)

### Methods

* [disable](_util_vlcrcmodifier_.vlcrcmodifier.md#disable)
* [enable](_util_vlcrcmodifier_.vlcrcmodifier.md#enable)
* [export](_util_vlcrcmodifier_.vlcrcmodifier.md#export)
* [get](_util_vlcrcmodifier_.vlcrcmodifier.md#get)
* [set](_util_vlcrcmodifier_.vlcrcmodifier.md#set)

## Constructors

###  constructor

\+ **new VLCRCModifier**(`data`: Buffer): *[VLCRCModifier](_util_vlcrcmodifier_.vlcrcmodifier.md)*

*Defined in [util/VLCRCModifier.ts:79](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Buffer |

**Returns:** *[VLCRCModifier](_util_vlcrcmodifier_.vlcrcmodifier.md)*

## Properties

### `Private` _map

• **_map**: *Map‹string, [ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem)›*

*Defined in [util/VLCRCModifier.ts:78](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L78)*

___

### `Private` _original

• **_original**: *Buffer*

*Defined in [util/VLCRCModifier.ts:79](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L79)*

## Methods

###  disable

▸ **disable**(`key`: string): *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

*Defined in [util/VLCRCModifier.ts:105](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L105)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

___

###  enable

▸ **enable**(`key`: string): *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

*Defined in [util/VLCRCModifier.ts:114](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

___

###  export

▸ **export**(): *Buffer*

*Defined in [util/VLCRCModifier.ts:123](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L123)*

**Returns:** *Buffer*

___

###  get

▸ **get**(`key`: string): *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

*Defined in [util/VLCRCModifier.ts:92](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

___

###  set

▸ **set**(`key`: string, `value`: boolean | number | string): *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*

*Defined in [util/VLCRCModifier.ts:96](https://github.com/dylhack/vlc.js/blob/3931a7c/src/util/VLCRCModifier.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |
`value` | boolean &#124; number &#124; string |

**Returns:** *[ConfigItem](../modules/_util_vlcrcmodifier_.md#configitem) | undefined*
