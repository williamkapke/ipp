
var xref = require('./ipputil').xref;

//http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml#ipp-registrations-7
//http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml#ipp-registrations-8
//http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml#ipp-registrations-9
var tags = [
	,									// 0x00 http://tools.ietf.org/html/rfc2910#section-3.5.1
	"operation-attributes-tag",			// 0x01 http://tools.ietf.org/html/rfc2910#section-3.5.1
	"job-attributes-tag",				// 0x02 http://tools.ietf.org/html/rfc2910#section-3.5.1
	"end-of-attributes-tag",			// 0x03 http://tools.ietf.org/html/rfc2910#section-3.5.1
	"printer-attributes-tag",			// 0x04 http://tools.ietf.org/html/rfc2910#section-3.5.1
	"unsupported-attributes-tag",		// 0x05 http://tools.ietf.org/html/rfc2910#section-3.5.1
	"subscription-attributes-tag",		// 0x06 http://tools.ietf.org/html/rfc3995#section-14
	"event-notification-attributes-tag",// 0x07 http://tools.ietf.org/html/rfc3995#section-14
	"resource-attributes-tag",			// 0x08 http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-11    did not get standardized
	"document-attributes-tag",			// 0x09 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
	,,,,,,								// 0x0A - 0x0F
	"unsupported",						// 0x10 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"default",							// 0x11 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"unknown",							// 0x12 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"no-value",							// 0x13 http://tools.ietf.org/html/rfc2910#section-3.5.2
	,									// 0x14
	"not-settable",						// 0x15 http://tools.ietf.org/html/rfc3380#section-8.1
	"delete-attribute",					// 0x16 http://tools.ietf.org/html/rfc3380#section-8.2
	"admin-define",						// 0x17 http://tools.ietf.org/html/rfc3380#section-8.3
	,,,,,,,,,							// 0x18 - 0x20
	"integer",							// 0x21 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"boolean",							// 0x22 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"enum",								// 0x23 http://tools.ietf.org/html/rfc2910#section-3.5.2
	,,,,,,,,,,,,						// 0x24 - 0x2F
	"octetString",						// 0x30 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"dateTime",							// 0x31 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"resolution",						// 0x32 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"rangeOfInteger",					// 0x33 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"begCollection",					// 0x34 http://tools.ietf.org/html/rfc3382#section-7.1
	"textWithLanguage",					// 0x35 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"nameWithLanguage",					// 0x36 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"endCollection",					// 0x37 http://tools.ietf.org/html/rfc3382#section-7.1
	,,,,,,,,,							// 0x38 - 0x40
	"textWithoutLanguage",				// 0x41 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"nameWithoutLanguage",				// 0x42 http://tools.ietf.org/html/rfc2910#section-3.5.2
	,									// 0x43
	"keyword",							// 0x44 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"uri",								// 0x45 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"uriScheme",						// 0x46 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"charset",							// 0x47 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"naturalLanguage",					// 0x48 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"mimeMediaType",					// 0x49 http://tools.ietf.org/html/rfc2910#section-3.5.2
	"memberAttrName"					// 0x4A http://tools.ietf.org/html/rfc3382#section-7.1
];
tags[0x7F] = "extension";// http://tools.ietf.org/html/rfc2910#section-3.5.2
module.exports = xref(tags);
