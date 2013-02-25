
var xref = require('./ipputil').xref;
var enums = {
	"document-state": xref([			// ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
		,,,				// 0x00-0x02
		"pending",		// 0x03
		,				// 0x04
		"processing",	// 0x05
		,				// 0x06
		"canceled",		// 0x07
		"aborted",		// 0x08
		"completed"		// 0x09
	]),
	"finishings": xref([
		,,,// 0x00 - 0x02
		"none",						// 0x03 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple",					// 0x04 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"punch",					// 0x05 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"cover",					// 0x06 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"bind",						// 0x07 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"saddle-stitch",			// 0x08 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"edge-stitch",				// 0x09 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"fold",						// 0x0A http://tools.ietf.org/html/rfc2911#section-4.2.6
		"trim",						// 0x0B ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		"bale",						// 0x0C ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		"booklet-maker",			// 0x0D ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		"jog-offset",				// 0x0E ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		,,,,,						// 0x0F - 0x13 reserved for future generic finishing enum values.
		"staple-top-left",			// 0x14 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-bottom-left",		// 0x15 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-top-right",			// 0x16 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-bottom-right",		// 0x17 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"edge-stitch-left",			// 0x18 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"edge-stitch-top",			// 0x19 http://tools.ietf.org/html/rfc2911#section-4.2.6
		"edge-stitch-right",		// 0x1A http://tools.ietf.org/html/rfc2911#section-4.2.6
		"edge-stitch-bottom",		// 0x1B http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-dual-left",			// 0x1C http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-dual-top",			// 0x1D http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-dual-right",		// 0x1E http://tools.ietf.org/html/rfc2911#section-4.2.6
		"staple-dual-bottom",		// 0x1F http://tools.ietf.org/html/rfc2911#section-4.2.6
		,,,,,,,,,,,,,,,,,,			// 0x20 - 0x31 reserved for future specific stapling and stitching enum values.
		"bind-left",				// 0x32 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		"bind-top",					// 0x33 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		"bind-right",				// 0x34 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		"bind-bottom",				// 0x35 ftp://ftp.pwg.org/pub/pwg/ipp/new_VAL/pwg5100.1.pdf
		,,,,,,						// 0x36 - 0x3B
		"trim-after-pages",			// 0x3C ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
		"trim-after-documents",		// 0x3D ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
		"trim-after-copies",		// 0x3E ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
		"trim-after-job"			// 0x3F ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf (IPP Everywhere)
	]),
	"operations-supported": xref([
		,									// 0x00
		,									// 0x01
		"Print-Job",						// 0x02 http://tools.ietf.org/html/rfc2911#section-3.2.1
		"Print-URI",						// 0x03 http://tools.ietf.org/html/rfc2911#section-3.2.2
		"Validate-Job",						// 0x04 http://tools.ietf.org/html/rfc2911#section-3.2.3
		"Create-Job",						// 0x05 http://tools.ietf.org/html/rfc2911#section-3.2.4
		"Send-Document",					// 0x06 http://tools.ietf.org/html/rfc2911#section-3.3.1
		"Send-URI",							// 0x07 http://tools.ietf.org/html/rfc2911#section-3.3.2
		"Cancel-Job",						// 0x08 http://tools.ietf.org/html/rfc2911#section-3.3.3
		"Get-Job-Attributes",				// 0x09 http://tools.ietf.org/html/rfc2911#section-3.3.4
		"Get-Jobs",							// 0x0A http://tools.ietf.org/html/rfc2911#section-3.2.6
		"Get-Printer-Attributes",			// 0x0B http://tools.ietf.org/html/rfc2911#section-3.2.5
		"Hold-Job",							// 0x0C http://tools.ietf.org/html/rfc2911#section-3.3.5
		"Release-Job",						// 0x0D http://tools.ietf.org/html/rfc2911#section-3.3.6
		"Restart-Job",						// 0x0E http://tools.ietf.org/html/rfc2911#section-3.3.7
		,									// 0x0F
		"Pause-Printer",					// 0x10 http://tools.ietf.org/html/rfc2911#section-3.2.7
		"Resume-Printer",					// 0x11 http://tools.ietf.org/html/rfc2911#section-3.2.8
		"Purge-Jobs",						// 0x12 http://tools.ietf.org/html/rfc2911#section-3.2.9
		"Set-Printer-Attributes",			// 0x13 IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.1
		"Set-Job-Attributes",				// 0x14 IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.2
		"Get-Printer-Supported-Values",		// 0x15 IPP2.1 http://tools.ietf.org/html/rfc3380#section-4.3
		"Create-Printer-Subscriptions",		// 0x16 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.1.2
		"Create-Job-Subscription",			// 0x17 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.1.1
		"Get-Subscription-Attributes",		// 0x18 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.4
		"Get-Subscriptions",				// 0x19 IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.5
		"Renew-Subscription",				// 0x1A IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.6
		"Cancel-Subscription",				// 0x1B IPP2.1 http://tools.ietf.org/html/rfc3995#section-7.1 && http://tools.ietf.org/html/rfc3995#section-11.2.7
		"Get-Notifications",				// 0x1C IPP2.1 IPP2.1 http://tools.ietf.org/html/rfc3996#section-9.2 && http://tools.ietf.org/html/rfc3996#section-5
		"ipp-indp-method",					// 0x1D did not get standardized
		"Get-Resource-Attributes",			// 0x1E http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.1 did not get standardized
		"Get-Resource-Data",				// 0x1F http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.2 did not get standardized
		"Get-Resources",					// 0x20 http://tools.ietf.org/html/draft-ietf-ipp-get-resource-00#section-4.3 did not get standardized
		"ipp-install",						// 0x21 did not get standardized
		"Enable-Printer",					// 0x22 http://tools.ietf.org/html/rfc3998#section-3.1.1
		"Disable-Printer",					// 0x23 http://tools.ietf.org/html/rfc3998#section-3.1.2
		"Pause-Printer-After-Current-Job",	// 0x24 http://tools.ietf.org/html/rfc3998#section-3.2.1
		"Hold-New-Jobs",					// 0x25 http://tools.ietf.org/html/rfc3998#section-3.3.1
		"Release-Held-New-Jobs",			// 0x26 http://tools.ietf.org/html/rfc3998#section-3.3.2
		"Deactivate-Printer",				// 0x27 http://tools.ietf.org/html/rfc3998#section-3.4.1
		"Activate-Printer",					// 0x28 http://tools.ietf.org/html/rfc3998#section-3.4.2
		"Restart-Printer",					// 0x29 http://tools.ietf.org/html/rfc3998#section-3.5.1
		"Shutdown-Printer",					// 0x2A http://tools.ietf.org/html/rfc3998#section-3.5.2
		"Startup-Printer",					// 0x2B http://tools.ietf.org/html/rfc3998#section-3.5.3
		"Reprocess-Job",					// 0x2C http://tools.ietf.org/html/rfc3998#section-4.1
		"Cancel-Current-Job",				// 0x2D http://tools.ietf.org/html/rfc3998#section-4.2
		"Suspend-Current-Job",				// 0x2E http://tools.ietf.org/html/rfc3998#section-4.3.1
		"Resume-Job",						// 0x2F http://tools.ietf.org/html/rfc3998#section-4.3.2
		"Promote-Job",						// 0x30 http://tools.ietf.org/html/rfc3998#section-4.4.1
		"Schedule-Job-After",				// 0x31 http://tools.ietf.org/html/rfc3998#section-4.4.2
		,									// 0x32
		"Cancel-Document",					// 0x33 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
		"Get-Document-Attributes",			// 0x34 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
		"Get-Documents",					// 0x35 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
		"Delete-Document",					// 0x36 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
		"Set-Document-Attributes",			// 0x37 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippdocobject10-20031031-5100.5.pdf
		"Cancel-Jobs",						// 0x38 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
		"Cancel-My-Jobs",					// 0x39 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
		"Resubmit-Job",						// 0x3A ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
		"Close-Job",						// 0x3B ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext10-20101030-5100.11.pdf
		"Identify-Printer",					// 0x3C ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
		"Validate-Document"					// 0x3D ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
	]),
	"job-collation-type": xref([	// IPP2.1 http://tools.ietf.org/html/rfc3381#section-6.3
		"other",				// 0x01
		"unknown",				// 0x02
		"uncollated-documents",	// 0x03
		'collated-documents',	// 0x04
		'uncollated-documents'	// 0x05
	]),
	"job-state": xref([			//http://tools.ietf.org/html/rfc2911#section-4.3.7
		,,,						// 0x00-0x02
		"pending",				// 0x03
		"pending-held",			// 0x04
		"processing",			// 0x05
		"processing-stopped",	// 0x06
		"canceled",				// 0x07
		"aborted",				// 0x08
		"completed"				// 0x09
	]),
	"orientation-requested": xref([// http://tools.ietf.org/html/rfc2911#section-4.2.10
		,,,						// 0x00-0x02
		"portrait",				// 0x03
		"landscape",			// 0x04
		"reverse-landscape",	// 0x05
		"reverse-portrait",		// 0x06
		"none"					// 0x07 ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobprinterext3v10-20120727-5100.13.pdf
	]),
	"print-quality": xref([		// http://tools.ietf.org/html/rfc2911#section-4.2.13
		,,,						// 0x00-0x02
		"draft",				// 0x03
		"normal",				// 0x04
		"high"					// 0x05
	]),
	"printer-state": xref([		// http://tools.ietf.org/html/rfc2911#section-4.4.11
		,,,						// 0x00-0x02
		"idle",					// 0x03
		"processing",			// 0x04
		"stopped"				// 0x05
	])
};
enums["finishings-default"] = enums.finishings;
enums["finishings-ready"] = enums.finishings;
enums["finishings-supported"] = enums.finishings;
enums["media-source-feed-orientation"] = enums["orientation-requested"];
enums["orientation-requested-default"] = enums["orientation-requested"];
enums["orientation-requested-supported"] = enums["orientation-requested"];//1setOf
enums["print-quality-default"] = enums["print-quality"];
enums["print-quality-supported"] = enums["print-quality"];//1setOf



module.exports = enums;