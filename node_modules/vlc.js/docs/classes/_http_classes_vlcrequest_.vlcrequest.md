[vlc.js](../README.md) › [Globals](../globals.md) › ["http/classes/VLCRequest"](../modules/_http_classes_vlcrequest_.md) › [VLCRequest](_http_classes_vlcrequest_.vlcrequest.md)

# Class: VLCRequest

**`class`** VLCRequest

**`description`** This class stores all the data about a completed request with VLCs' HTTP server.

## Hierarchy

* **VLCRequest**

## Index

### Constructors

* [constructor](_http_classes_vlcrequest_.vlcrequest.md#constructor)

### Properties

* [data](_http_classes_vlcrequest_.vlcrequest.md#data)
* [request](_http_classes_vlcrequest_.vlcrequest.md#request)
* [response](_http_classes_vlcrequest_.vlcrequest.md#response)

## Constructors

###  constructor

\+ **new VLCRequest**(`req`: ClientRequest, `res`: IncomingMessage, `data`: Buffer): *[VLCRequest](_http_classes_vlcrequest_.vlcrequest.md)*

*Defined in [http/classes/VLCRequest.ts:10](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCRequest.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`req` | ClientRequest |
`res` | IncomingMessage |
`data` | Buffer |

**Returns:** *[VLCRequest](_http_classes_vlcrequest_.vlcrequest.md)*

## Properties

###  data

• **data**: *Buffer*

*Defined in [http/classes/VLCRequest.ts:10](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCRequest.ts#L10)*

___

###  request

• **request**: *ClientRequest*

*Defined in [http/classes/VLCRequest.ts:9](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCRequest.ts#L9)*

___

###  response

• **response**: *IncomingMessage*

*Defined in [http/classes/VLCRequest.ts:8](https://github.com/dylhack/vlc.js/blob/3931a7c/src/http/classes/VLCRequest.ts#L8)*
