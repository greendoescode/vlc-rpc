[vlc.js](../README.md) › [Globals](../globals.md) › ["http/Requester"](_http_requester_.md)

# External module: "http/Requester"

## Index

### Enumerations

* [VLCCommand](../enums/_http_requester_.vlccommand.md)

### Type aliases

* [VLCCredentials](_http_requester_.md#vlccredentials)

### Functions

* [_request](_http_requester_.md#private-_request)
* [command](_http_requester_.md#command)
* [getPlaylist](_http_requester_.md#getplaylist)
* [getStatus](_http_requester_.md#getstatus)

## Type aliases

###  VLCCredentials

Ƭ **VLCCredentials**: *object*

*Defined in [http/Requester.ts:19](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Requester.ts#L19)*

**`interface`** VLCCredentials

**`property`** {String} address

**`property`** {String} password

**`property`** {String|Number} port

**`description`** This is standard login credentials for accessing VLCs' HTTP endpoint.

#### Type declaration:

* **address**: *string*

* **password**: *string*

* **port**: *number*

## Functions

### `Private` _request

▸ **_request**(`address`: URL, `details`: [VLCCredentials](_http_requester_.md#vlccredentials)): *Promise‹[VLCRequest](../classes/_http_classes_vlcrequest_.vlcrequest.md)›*

*Defined in [http/Requester.ts:144](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Requester.ts#L144)*

**Parameters:**

Name | Type |
------ | ------ |
`address` | URL |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |

**Returns:** *Promise‹[VLCRequest](../classes/_http_classes_vlcrequest_.vlcrequest.md)›*

___

###  command

▸ **command**(`details`: [VLCCredentials](_http_requester_.md#vlccredentials), `vlcCommand`: [VLCCommand](../enums/_http_requester_.vlccommand.md), `query?`: string[]): *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Requester.ts:76](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Requester.ts#L76)*

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |
`vlcCommand` | [VLCCommand](../enums/_http_requester_.vlccommand.md) |
`query?` | string[] |

**Returns:** *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*

___

###  getPlaylist

▸ **getPlaylist**(`details`: [VLCCredentials](_http_requester_.md#vlccredentials)): *Promise‹[VLCPlaylist](../classes/_http_classes_vlcplaylist_.vlcplaylist.md)›*

*Defined in [http/Requester.ts:122](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Requester.ts#L122)*

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |

**Returns:** *Promise‹[VLCPlaylist](../classes/_http_classes_vlcplaylist_.vlcplaylist.md)›*

___

###  getStatus

▸ **getStatus**(`details`: [VLCCredentials](_http_requester_.md#vlccredentials)): *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*

*Defined in [http/Requester.ts:103](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/Requester.ts#L103)*

**Parameters:**

Name | Type |
------ | ------ |
`details` | [VLCCredentials](_http_requester_.md#vlccredentials) |

**Returns:** *Promise‹[VLCStatus](../classes/_http_classes_vlcstatus_.vlcstatus.md)›*
