
/*

The attributes and their syntaxes are complicated. The functions in this 
file serve as syntactic sugar that allow the attribute definitions to remain 
close to what you will see in the spec. A bit of processing is done at the end
to convert it to one big object tree. If you want to understand what is going on,
uncomment the console.log() at the end of this file.

 */
var tags = require('./tags');

function text(max){
	if(!max) max = 1023;
	return { type:arguments.callee.name, max: max };
}
function integer(min,max){
	if(max==MAX || max===undefined) max = 2147483647;
	if(min===undefined) min = -2147483648;
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], min: min, max: max };
}
function rangeOfInteger(min,max){
	if(max==MAX || max===undefined) max = 2147483647;
	if(min===undefined) min = -2147483648;
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], min: min, max: max };
}
function boolean(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name] };
}
function charset(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], max: 63 };
}
function keyword(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], min:1, max:1023 };
}
function naturalLanguage(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], max: 63 };
}
function dateTime(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name] };
}
function mimeMediaType(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], max: 255 };
}
function uri(max){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], max: max||1023 };
}
function uriScheme(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], max: 63 };
}
function enumeration(){
	return { type:arguments.callee.name, tag:tags['enum'] };
}
function resolution(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name] };
}
function unknown(){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name] };
}
function name(max){
	return { type:arguments.callee.name, max: max||1023 };
}
function novalue(){
	return { type:arguments.callee.name, tag:tags['no-value'] };
}
function octetString(max){
	return { type:arguments.callee.name, tag:tags[arguments.callee.name], max: max||1023 };
}

//Some attributes allow alternate value syntaxes.
//I want to keep the look and feel of the code close to
//that of the RFCs. So, this _ (underscore) function is
//used to group alternates and not be intrusive visually.
function _(arg1, arg2, arg3){
	var args = Array.prototype.slice.call(arguments);
	args.lookup = {};
	function deferred(){
		args.forEach(function(a,i){
			if(typeof a==="function")
				args[i] = a();
			args.lookup[args[i].type] = args[i];
		});
		args.alts = Object.keys(args.lookup).sort().join();
		return args;
	}
	return args.some(function(a){ return a.name==="deferred" }) ? deferred : deferred();
}

// In IPP, "1setOf" just means "Array"... but it must 1 or more items
// In javascript, functions can't start with a number- so let's just use...
function setof(type){
	if(type.name === "deferred"){
		return function deferred(){
			type = type();
			type.setof=true;
			return type;
		}
	}
	if(typeof type === "function" && type.name != "deferred"){
		type = type();
	}
	type.setof=true;
	return type;
}

// In IPP, a "collection" is an set of name-value
// pairs. In javascript, we call them "Objects".
function collection(group, name){
	if(!arguments.length)
		return { type: "collection", tag:tags.begCollection }

	if(typeof group === "string"){
		return function deferred(){
			return {
				type: "collection",
				tag:tags.begCollection,
				members: attributes[group][name].members
			}
		}
	}
	var defer = Object.keys(group).some(function(key){
		return group[key].name==="deferred"
	})
	function deferred(){
		return {
			type: "collection",
			tag:tags.begCollection,
			members: resolve(group)
		}
	}
	return defer? deferred : deferred();
}



var MAX = {};

var attributes = {};
attributes["Document Description"] = {
	"attributes-charset":							charset,
	"attributes-natural-language":					naturalLanguage,
	"compression":									keyword,
	"copies-actual":								setof(integer(1,MAX)),
	"cover-back-actual":							setof(collection("Job Template","cover-back")),
	"cover-front-actual":							setof(collection("Job Template", "cover-front")),
	"current-page-order":							keyword,
	"date-time-at-completed":						_(dateTime, novalue),
	"date-time-at-creation":						dateTime,
	"date-time-at-processing":						_(dateTime, novalue),
	"detailed-status-messages":						setof(text),
	"document-access-errors":						setof(text),
	"document-charset":								charset,
	"document-digital-signature":					keyword,
	"document-format":								mimeMediaType,
	"document-format-details":						setof(collection("Operation", "document-format-details")),
	"document-format-details-detected":				setof(collection("Operation","document-format-details")),
	"document-format-detected":						mimeMediaType,
	"document-format-version":						text(127),
	"document-format-version-detected":				text(127),
	"document-job-id":								integer(1, MAX),
	"document-job-uri":								uri,
	"document-message":								text,
	"document-metadata":							setof(octetString),
	"document-name":								name,
	"document-natural-language":					naturalLanguage,
	"document-number":								integer(1,MAX),
	"document-printer-uri":							uri,
	"document-state":								enumeration,
	"document-state-message":						text,
	"document-state-reasons":						setof(keyword),
	"document-uri":									uri,															
	"document-uuid":								uri(45),
	"errors-count":									integer(0,MAX),
	"finishings-actual":							setof(enumeration),
	"finishings-col-actual":						setof(collection("Job Template","finishings-col")),
	"force-front-side-actual":						setof(integer(1,MAX)),
	"imposition-template-actual":					setof(_(keyword, name)),
	"impressions":									integer(0,MAX),
	"impressions-completed":						integer(0,MAX),
	"impressions-completed-current-copy":			integer(0,MAX),
	"insert-sheet-actual":							setof(collection("Job Template","insert-sheet")),
	"k-octets":										integer(0,MAX),
	"k-octets-processed":							integer(0,MAX),
	"last-document":								boolean,
	"media-actual":									setof(_(keyword, name)),
	"media-col-actual":								setof(collection("Job Template","media-col")),
	"media-input-tray-check-actual":				setof(_(keyword, name)),
	"media-sheets":									integer(0,MAX),
	"media-sheets-completed":						integer(0,MAX),
	"more-info":									uri,
	"number-up-actual":								setof(integer),
	"orientation-requested-actual":					setof(enumeration),
	"output-bin-actual":							setof(name),
	"output-device-assigned":						name(127),
	"overrides-actual":								setof(collection("Document Template","overrides")),
	"page-delivery-actual":							setof(keyword),
	"page-order-received-actual":					setof(keyword),
	"page-ranges-actual":							setof(rangeOfInteger(1,MAX)),
	"pages":										integer(0,MAX),
	"pages-completed":								integer(0,MAX),
	"pages-completed-current-copy":					integer(0,MAX),
	"presentation-direction-number-up-actual":		setof(keyword),
	"print-content-optimize-actual":				setof(keyword),
	"print-quality-actual":							setof(enumeration),
	"printer-resolution-actual":					setof(resolution),
	"printer-up-time":								integer(1,MAX),
	"separator-sheets-actual":						setof(collection("Job Template","separator-sheets")),
	"sheet-completed-copy-number":					integer(0,MAX),
	"sides-actual":									setof(keyword),
	"time-at-completed":							_(integer, novalue),
	"time-at-creation":								integer,
	"time-at-processing":							_(integer, novalue),
	"x-image-position-actual":						setof(keyword),
	"x-image-shift-actual":							setof(integer),
	"x-side1-image-shift-actual":					setof(integer),
	"x-side2-image-shift-actual":					setof(integer),
	"y-image-position-actual":						setof(keyword),
	"y-image-shift-actual":							setof(integer),
	"y-side1-image-shift-actual":					setof(integer),
	"y-side2-image-shift-actual":					setof(integer)
};
attributes["Document Template"] = {
	"copies":integer(1,MAX),
	"cover-back":									collection("Job Template","cover-back"),
	"cover-front":									collection("Job Template","cover-front"),
	"feed-orientation":								keyword,
	"finishings":									setof(enumeration),
	"finishings-col":								collection("Job Template","finishings-col"),
	"font-name-requested":							name,
	"font-size-requested":							integer(1,MAX),
	"force-front-side":								setof(integer(1,MAX)),
	"imposition-template":							_(keyword, name),
	"insert-sheet":									setof(collection("Job Template","insert-sheet")),
	"media":										_(keyword, name),
	"media-col":									collection("Job Template","media-col"),
	"media-input-tray-check":						_(keyword, name),
	"number-up":									integer(1,MAX),
	"orientation-requested":						enumeration,
	"overrides":									setof(collection({
		//Any Document Template attribute (TODO)
		"document-copies":							setof(rangeOfInteger),
		"document-numbers":							setof(rangeOfInteger),
		"pages":									setof(rangeOfInteger)
	})),
	"page-delivery":								keyword,
	"page-order-received":							keyword,
	"page-ranges":									setof(rangeOfInteger(1,MAX)),
	"pdl-init-file":								setof(collection("Job Template","pdl-init-file")),
	"presentation-direction-number-up":				keyword,
	"print-color-mode":								keyword,
	"print-content-optimize":						keyword,
	"print-quality":								enumeration,
	"print-rendering-intent":						keyword,
	"printer-resolution":							resolution,
	"separator-sheets":								collection("Job Template","separator-sheets"),
	"sheet-collate":								keyword,
	"sides":										keyword,
	"x-image-position":								keyword,
	"x-image-shift":								integer,
	"x-side1-image-shift":							integer,
	"x-side2-image-shift":							integer,
	"y-image-position":								keyword,
	"y-image-shift":								integer,
	"y-side1-image-shift":							integer,
	"y-side2-image-shift":							integer
};
attributes["Event Notifications"] = {
	"notify-subscribed-event":						keyword,
	"notify-text":									text
};
attributes["Job Description"] = {
	"attributes-charset":							charset,
	"attributes-natural-language":					naturalLanguage,
	"compression-supplied":							keyword,
	"copies-actual":								setof(integer(1,MAX)),
	"cover-back-actual":							setof(collection("Job Template","cover-back")),
	"cover-front-actual":							setof(collection("Job Template","cover-front")),
	"current-page-order":							keyword,
	"date-time-at-completed":						_(dateTime, novalue),
	"date-time-at-creation":						dateTime,
	"date-time-at-processing":						_(dateTime, novalue),
	"document-charset-supplied":					charset,
	"document-digital-signature-supplied":			keyword,
	"document-format-details-supplied":				setof(collection("Operation","document-format-details")),
	"document-format-supplied":						mimeMediaType,
	"document-format-version-supplied":				text(127),
	"document-message-supplied":					text,
	"document-metadata":							setof(octetString),
	"document-name-supplied":						name,
	"document-natural-language-supplied":			naturalLanguage,
	"document-overrides-actual":					setof(collection),
	"errors-count":									integer(0,MAX),
	"finishings-actual":							setof(enumeration),
	"finishings-col-actual":						setof(collection("Job Template","finishings-col")),
	"force-front-side-actual":						setof(setof(integer(1, MAX))),
	"imposition-template-actual":					setof(_(keyword, name)),
	"impressions-completed-current-copy":			integer(0,MAX),
	"insert-sheet-actual":							setof(collection("Job Template","insert-sheet")),
	"job-account-id-actual":						setof(name),
	"job-accounting-sheets-actual":					setof(collection("Job Template","job-accounting-sheets")),
	"job-accounting-user-id-actual":				setof(name),
	"job-attribute-fidelity":						boolean,
	"job-collation-type":							enumeration,
	"job-collation-type-actual":					setof(keyword),
	"job-copies-actual":							setof(integer(1,MAX)),
	"job-cover-back-actual":						setof(collection("Job Template","cover-back")),
	"job-cover-front-actual":						setof(collection("Job Template","cover-front")),
	"job-detailed-status-messages":					setof(text),
	"job-document-access-errors":					setof(text),
	"job-error-sheet-actual":						setof(collection("Job Template","job-error-sheet")),
	"job-finishings-actual":						setof(enumeration),
	"job-finishings-col-actual":					setof(collection("Job Template","media-col")),
	"job-hold-until-actual":						setof(_(keyword, name)),
	"job-id":										integer(1,MAX),
	"job-impressions":								integer(0,MAX),
	"job-impressions-completed":					integer(0,MAX),
	"job-k-octets":									integer(0,MAX),
	"job-k-octets-processed":						integer(0,MAX),
	"job-mandatory-attributes":						setof(keyword),
	"job-media-sheets":								integer(0,MAX),
	"job-media-sheets-completed":					integer(0,MAX),
	"job-message-from-operator":					text(127),
	"job-message-to-operator-actual":				setof(text),
	"job-more-info":								uri,
	"job-name":										name,
	"job-originating-user-name":					name,
	"job-originating-user-uri":						uri,
	"job-pages":									integer(0,MAX),
	"job-pages-completed":							integer(0,MAX),
	"job-pages-completed-current-copy":				integer(0,MAX),
	"job-printer-up-time":							integer(1,MAX),
	"job-printer-uri":								uri,
	"job-priority-actual":							setof(integer(1,100)),
	"job-save-printer-make-and-model":				text(127),
	"job-sheet-message-actual":						setof(text),
	"job-sheets-actual":							setof(_(keyword, name)),
	"job-sheets-col-actual":						setof(collection("Job Template","job-sheets-col")),
	"job-state":									_(enumeration, unknown),
	"job-state-message":							text,
	"job-state-reasons":							setof(keyword),
	"job-uri":										uri,
	"job-uuid":										uri(45),
	"media-actual":									setof(_(keyword, name)),
	"media-col-actual":								setof(collection("Job Template","media-col")),
	"media-input-tray-check-actual":				setof(_(keyword, name)),
	"multiple-document-handling-actual":			setof(keyword),
	"number-of-documents":							integer(0,MAX),
	"number-of-intervening-jobs":					integer(0,MAX),
	"number-up-actual":								setof(integer(1,MAX)),
	"orientation-requested-actual":					setof(enumeration),
	"original-requesting-user-name":				name,
	"output-bin-actual":							setof(_(keyword, name)),
	"output-device-actual":							setof(name(127)),
	"output-device-assigned":						name(127),
	"overrides-actual":								setof(collection("Job Template","overrides")),
	"page-delivery-actual":							setof(keyword),
	"page-order-received-actual":					setof(keyword),
	"page-ranges-actual":							setof(rangeOfInteger(1,MAX)),
	"presentation-direction-number-up-actual":		setof(keyword),
	"print-content-optimize-actual":				setof(keyword),
	"print-quality-actual":							setof(enumeration),
	"printer-resolution-actual":					setof(resolution),
	"separator-sheets-actual":						setof(collection("Job Template", "separator-sheets")),
	"sheet-collate-actual":							setof(keyword),
	"sheet-completed-copy-number":					integer(0,MAX),
	"sheet-completed-document-number":				integer(0,MAX),
	"sides-actual":									setof(keyword),
	"time-at-completed":							_(integer, novalue),
	"time-at-creation":								integer,
	"time-at-processing":							_(integer, novalue),
	"warnings-count":								integer(0,MAX),
	"x-image-position-actual":						setof(keyword),
	"x-image-shift-actual":							setof(integer),
	"x-side1-image-shift-actual":					setof(integer),
	"x-side2-image-shift-actual":					setof(integer),
	"y-image-position-actual":						setof(keyword),
	"y-image-shift-actual":							setof(integer),
	"y-side1-image-shift-actual":					setof(integer),
	"y-side2-image-shift-actual":					setof(integer)
};
attributes["Job Template"] = {
	"copies":										integer(1,MAX),
	"cover-back":									collection({
		"cover-type":								keyword,
		"media":									_(keyword, name),
		"media-col":								collection("Job Template","media-col")
	}),
	"cover-front":									collection({
		"cover-type":								keyword,
		"media":									_(keyword, name),
		"media-col":								collection("Job Template","media-col")
	}),
	"feed-orientation":								keyword,
	"finishings":									setof(enumeration),
	"finishings-col":								collection({
		"finishing-template":						name,
		"stitching":								collection({
			"stitching-locations":					setof(integer(0,MAX)),
			"stitching-offset":						integer(0,MAX),
			"stitching-reference-edge":				keyword
		})
	}),
	"font-name-requested":							name,
	"font-size-requested":							integer(1,MAX),
	"force-front-side":								setof(integer(1,MAX)),
	"imposition-template":							_(keyword, name),
	"insert-sheet":									setof(collection({
		"insert-after-page-number":					integer(0,MAX),
		"insert-count":								integer(0,MAX),
		"media":									_(keyword, name),
		"media-col":								collection("Job Template","media-col")
	})),
	"job-account-id":								name,
	"job-accounting-sheets":						collection({
		"job-accounting-output-bin":				_(keyword, name),
		"job-accounting-sheets-type":				_(keyword, name),
		"media":									_(keyword, name),
		"media-col":								collection("Job Template","media-col")
	}),
	"job-accounting-user-id":						name,
	"job-copies":									integer(1,MAX),
	"job-cover-back":								collection("Job Template","cover-back"),
	"job-cover-front":								collection("Job Template","cover-front"),
	"job-delay-output-until":						_(keyword, name),
	"job-delay-output-until-time":					dateTime,
	"job-error-action":								keyword,
	"job-error-sheet":								collection({
		"job-error-sheet-type":						_(keyword, name),
		"job-error-sheet-when":						keyword,
		"media":									_(keyword, name),
		"media-col":								collection("Job Template","media-col")
	}),
	"job-finishings":								setof(enumeration),
	"job-finishings-col":							collection("Job Template","finishings-col"),
	"job-hold-until":								_(keyword, name),
	"job-hold-until-time":							dateTime,
	"job-message-to-operator":						text,
	"job-phone-number":								uri,
	"job-priority":									integer(1,100),
	"job-recipient-name":							name,
	"job-save-disposition":							collection({
		"save-disposition":							keyword,
		"save-info":							    setof(collection({
			"save-document-format":					mimeMediaType,
			"save-location":						uri,
			"save-name":							name
		}))
	}),
	"job-sheet-message":							text,
	"job-sheets":									_(keyword, name),
	"job-sheets-col":								collection({
		"job-sheets":								_(keyword,name),
		"media":									_(keyword,name),
		"media-col":								collection("Job Template","media-col")
	}),
	"media":                                        _(keyword,name),
	"media-col":									collection({
		"media-back-coating":						_(keyword,name),
		"media-bottom-margin":						integer(0,MAX),
		"media-color":								_(keyword,name),
		"media-front-coating":						_(keyword,name),
		"media-grain":								_(keyword,name),
		"media-hole-count":							integer(0,MAX),
		"media-info":								text(255),
		"media-key":								_(keyword,name),
		"media-left-margin":						integer(0,MAX),
		"media-order-count":						integer(1,MAX),
		"media-pre-printed":						_(keyword,name),
		"media-recycled":							_(keyword,name),
		"media-right-margin":						integer(0,MAX),
		"media-size":								collection,
		"media-size-name":							_(keyword,name),
		"media-source":								_(keyword,name),
		"media-thickness":							integer(1,MAX),
		"media-tooth":								_(keyword,name),
		"media-top-margin":							integer(0,MAX),
		"media-type":								_(keyword,name),
		"media-weight-metric":						integer(0,MAX)
	}),
	"media-input-tray-check":						_(keyword, name),
	"multiple-document-handling":					keyword,
	"number-up":									integer(1,MAX),
	"orientation-requested":						enumeration,
	"output-bin":									_(keyword, name),
	"output-device":								name(127),
	"overrides":									setof(collection({
		//Any Job Template attribute (TODO)
		"document-copies":							setof(rangeOfInteger),
		"document-numbers":							setof(rangeOfInteger),
		"pages":									setof(rangeOfInteger)
	})),
	"page-delivery":								keyword,
	"page-order-received":							keyword,
	"page-ranges":									setof(rangeOfInteger(1,MAX)),
	"pages-per-subset":								setof(integer(1,MAX)),
	"pdl-init-file":								collection({
		"pdl-init-file-entry":						name,
		"pdl-init-file-location":					uri,
		"pdl-init-file-name":						name
	}),
	"presentation-direction-number-up":				keyword,
	"print-color-mode":								keyword,
	"print-content-optimize":						keyword,
	"print-quality":								enumeration,
	"print-rendering-intent":						keyword,
	"printer-resolution":							resolution,
	"proof-print":									collection({
		"media":									_(keyword, name),
		"media-col":								collection("Job Template", "media-col"),
		"proof-print-copies":						integer(0,MAX)
	}),
	"separator-sheets":								collection({
		"media":									_(keyword, name),
		"media-col":								collection("Job Template", "media-col"),
		"separator-sheets-type":					setof(keyword)
	}),
	"sheet-collate":								keyword,
	"sides":										keyword,
	"x-image-position":								keyword,
	"x-image-shift":								integer,
	"x-side1-image-shift":							integer,
	"x-side2-image-shift":							integer,
	"y-image-position":								keyword,
	"y-image-shift":								integer,
	"y-side1-image-shift":							integer,
	"y-side2-image-shift":							integer
};
attributes["Operation"] = {
	"attributes-charset":							charset,
	"attributes-natural-language":					naturalLanguage,
	"compression":									keyword,
	"detailed-status-message":						text,
	"document-access-error":						text,
	"document-charset":								charset,
	"document-digital-signature":					keyword,
	"document-format":								mimeMediaType,
	"document-format-details":						setof(collection({
		"document-format":							mimeMediaType,
		"document-format-device-id":				text(127),
		"document-format-version":					text(127),
		"document-natural-language":				setof(naturalLanguage),
		"document-source-application-name":			name,
		"document-source-application-version":		text(127),
		"document-source-os-name":					name(40),
		"document-source-os-version":				text(40)
	})),
	"document-message":								text,
	"document-metadata":							setof(octetString),
	"document-name":								name,
	"document-natural-language":					naturalLanguage,
	"document-password":							octetString,
	"document-uri":									uri,
	"first-index":									integer(1,MAX),
	"identify-actions":								setof(keyword),
	"ipp-attribute-fidelity":						boolean,
	"job-hold-until":								_(keyword, name),
	"job-id":										integer(1,MAX),
	"job-ids":										setof(integer(1,MAX)),
	"job-impressions":								integer(0,MAX),
	"job-k-octets":									integer(0,MAX),
	"job-mandatory-attributes":						setof(keyword),
	"job-media-sheets":								integer(0,MAX),
	"job-message-from-operator":					text(127),
	"job-name":										name,
	"job-password":									octetString(255),
	"job-password-encryption":						_(keyword, name),
	"job-state":									enumeration,
	"job-state-message":							text,
	"job-state-reasons":							setof(keyword),
	"job-uri":										uri,
	"last-document":								boolean,
	"limit":										integer(1,MAX),
	"message":										text(127),
	"my-jobs":										boolean,
	"original-requesting-user-name":				name,
	"preferred-attributes":							collection,
	"printer-message-from-operator":				text(127),
	"printer-uri":									uri,
	"requested-attributes":							setof(keyword),
	"requesting-user-name":							name,
	"requesting-user-uri":							uri,
	"status-message":								text(255),
	"which-jobs":									keyword
};
attributes["Printer Description"] = {
	"charset-configured":							charset,
	"charset-supported":							setof(charset),
	"color-supported":								boolean,
	"compression-supported":						setof(keyword),
	"copies-default":								integer(1,MAX),
	"copies-supported":								rangeOfInteger(1,MAX),
	"cover-back-default":							collection("Job Template","cover-back"),
	"cover-back-supported":							setof(keyword),
	"cover-front-default":							collection("Job Template","cover-front"),
	"cover-front-supported":						setof(keyword),
	"device-service-count":							integer(1,MAX),
	"device-uuid":									uri(45),
	"document-charset-default":						charset,
	"document-charset-supported":					setof(charset),
	"document-creation-attributes-supported":		setof(keyword),
	"document-digital-signature-default":			keyword,
	"document-digital-signature-supported":			setof(keyword),
	"document-format-default":						mimeMediaType,
	"document-format-details-default":				collection("Operation","document-format-details"),
	"document-format-details-supported":			setof(keyword),
	"document-format-supported":					setof(mimeMediaType),
	"document-format-varying-attributes":			setof(keyword),
	"document-format-version-default":				text(127),
	"document-format-version-supported":			setof(text(127)),
	"document-natural-language-default":			naturalLanguage,
	"document-natural-language-supported":			setof(naturalLanguage),
	"document-password-supported":					integer(0,1023),
	"feed-orientation-default":						keyword,
	"feed-orientation-supported":					keyword,
	"finishings-col-default":						collection("Job Template","finishings-col"),
	"finishings-col-ready":							setof(collection("Job Template","finishings-col")),
	"finishings-col-supported":						setof(keyword),
	"finishings-default":							setof(enumeration),
	"finishings-ready":								setof(enumeration),
	"finishings-supported":							setof(enumeration),
	"font-name-requested-default":					name,
	"font-name-requested-supported":				setof(name),
	"font-size-requested-default":					integer(1,MAX),
	"font-size-requested-supported":				setof(rangeOfInteger(1,MAX)),
	"force-front-side-default (under review)":		setof(integer(1,MAX)),
	"force-front-side-supported (under review)":	rangeOfInteger(1,MAX),
	"generated-natural-language-supported":			setof(naturalLanguage),
	"identify-actions-default":						setof(keyword),
	"identify-actions-supported":					setof(keyword),
	"imposition-template-default":					_(keyword, name),
	"imposition-template-supported":				setof(_(keyword, name)),
	"insert-after-page-number-supported":			rangeOfInteger(0,MAX),
	"insert-count-supported":						rangeOfInteger(0,MAX),
	"insert-sheet-default":							setof(collection("Job Template","insert-sheet")),
	"insert-sheet-supported":						setof(keyword),
	"ipp-features-supported":						setof(keyword),
	"ipp-versions-supported":						setof(keyword),
	"ippget-event-life":							integer(15,MAX),
	"job-account-id-default":						_(name, novalue),
	"job-account-id-supported":						boolean,
	"job-accounting-sheets-default":				_(collection("Job Template", "job-accounting-sheets"), novalue),
	"job-accounting-sheets-supported":				setof(keyword),
	"job-accounting-user-id-default":				_(name, novalue),
	"job-accounting-user-id-supported":				boolean,
	"job-constraints-supported":					setof(collection),
	"job-copies-default":							integer(1,MAX),
	"job-copies-supported":							rangeOfInteger(1,MAX),
	"job-cover-back-default":						collection("Job Template","cover-back"),
	"job-cover-back-supported":						setof(keyword),
	"job-cover-front-default":						collection("Job Template","cover-front"),
	"job-cover-front-supported":					setof(keyword),
	"job-creation-attributes-supported":			setof(keyword),
	"job-delay-output-until-default":				_(keyword, name),
	"job-delay-output-until-supported":				setof(_(keyword, name)),
	"job-delay-output-until-time-supported":		rangeOfInteger(0,MAX),
	"job-error-action-default":						keyword,
	"job-error-action-supported":					setof(keyword),
	"job-error-sheet-default":						_(collection("Job Template", "job-error-sheet"), novalue),
	"job-error-sheet-supported":					setof(keyword),
	"job-finishings-col-default":					collection("Job Template","finishings-col"),
	"job-finishings-col-ready":						setof(collection("Job Template","finishings-col")),
	"job-finishings-col-supported":					setof(keyword),
	"job-finishings-default":						setof(enumeration),
	"job-finishings-ready":							setof(enumeration),
	"job-finishings-supported":						setof(enumeration),
	"job-hold-until-default":						_(keyword, name),
	"job-hold-until-supported":						setof(_(keyword, name)),
	"job-hold-until-time-supported":				rangeOfInteger(0,MAX),
	"job-ids-supported":							boolean,
	"job-impressions-supported":					rangeOfInteger(0,MAX),
	"job-k-octets-supported":						rangeOfInteger(0,MAX),
	"job-media-sheets-supported":					rangeOfInteger(0,MAX),
	"job-message-to-operator-default":				text,
	"job-message-to-operator-supported":			boolean,
	"job-password-encryption-supported":			setof(_(keyword, name)),
	"job-password-supported":						integer(0,255),
	"job-phone-number-default":						_(uri, novalue),
	"job-phone-number-supported":					boolean,
	"job-priority-default":							integer(1,100),
	"job-priority-supported":						integer(1,100),
	"job-recipient-name-default":					_(name, novalue),
	"job-recipient-name-supported":					boolean,
	"job-resolvers-supported":						setof(collection({
		"resolver-name":							name
	})),
	"job-settable-attributes-supported":			setof(keyword),
	"job-sheet-message-default":					text,
	"job-sheet-message-supported":					boolean,
	"job-sheets-col-default":						collection("Job Template","job-sheets-col"),
	"job-sheets-col-supported":						setof(keyword),
	"job-sheets-default":							_(keyword, name),
	"job-sheets-supported":							setof(_(keyword, name)),
	"job-spooling-supported":						keyword,
	"max-save-info-supported":						integer(1,MAX),
	"max-stitching-locations-supported":			integer(1,MAX),
	"media-back-coating-supported":					setof(_(keyword, name)),
	"media-bottom-margin-supported":				setof(integer(0,MAX)),
	"media-col-database":							setof(collection({
		//TODO: Member attributes are the same as the "media-col" Job Template attribute
		"media-source-properties":					collection({
			"media-source-feed-direction":			keyword,
			"media-source-feed-orientation":		enumeration
		})
	})),
	"media-col-default":							collection("Job Template","media-col"),
	"media-col-ready":								setof(collection({
		//TODO: Member attributes are the same as the "media-col" Job Template attribute
		"media-source-properties":					collection({
			"media-source-feed-direction":			keyword,
			"media-source-feed-orientation":		enumeration
		})
	})),
	"media-col-supported":							setof(keyword),
	"media-color-supported":						setof(_(keyword, name)),
	"media-default":								_(keyword, name, novalue),
	"media-front-coating-supported":				setof(_(keyword, name)),
	"media-grain-supported":						setof(_(keyword, name)),
	"media-hole-count-supported":					setof(rangeOfInteger(0,MAX)),
	"media-info-supported":							boolean,
	"media-input-tray-check-default":				_(keyword, name, novalue),
	"media-input-tray-check-supported":				setof(_(keyword, name)),
	"media-key-supported":							setof(_(keyword, name)),
	"media-left-margin-supported":					setof(integer(0,MAX)),
	"media-order-count-supported":					setof(rangeOfInteger(1,MAX)),
	"media-pre-printed-supported":					setof(_(keyword, name)),
	"media-ready":									setof(_(keyword, name)),
	"media-recycled-supported":						setof(_(keyword, name)),
	"media-right-margin-supported":					setof(integer(0,MAX)),
	"media-size-supported":							setof(collection({
		"x-dimension":								_(integer(1,MAX),rangeOfInteger(1,MAX)),
		"y-dimension":								_(integer(1,MAX),rangeOfInteger(1,MAX))
	})),
	"media-source-supported":						setof(_(keyword, name)),
	"media-supported":								setof(_(keyword, name)),
	"media-thickness-supported":					rangeOfInteger(1,MAX),
	"media-tooth-supported":						setof(_(keyword, name)),
	"media-top-margin-supported":					setof(integer(0,MAX)),
	"media-type-supported":							setof(_(keyword, name)),
	"media-weight-metric-supported":				setof(rangeOfInteger(0,MAX)),
	"multiple-document-handling-default":			keyword,
	"multiple-document-handling-supported":			setof(keyword),
	"multiple-document-jobs-supported":				boolean,
	"multiple-operation-time-out":					integer(1,MAX),
	"multiple-operation-timeout-action":			keyword,
	"natural-language-configured":					naturalLanguage,
	"number-up-default":							integer(1,MAX),
	"number-up-supported":							_(integer(1,MAX), rangeOfInteger(1,MAX)),
	"operations-supported":							setof(enumeration),
	"orientation-requested-default":				_(novalue, enumeration),
	"orientation-requested-supported":				setof(enumeration),
	"output-bin-default":							_(keyword, name),
	"output-bin-supported":							setof(_(keyword, name)),
	"output-device-supported":						setof(name(127)),
	"overrides-supported":							setof(keyword),
	"page-delivery-default":						keyword,
	"page-delivery-supported":						setof(keyword),
	"page-order-received-default":					keyword,
	"page-order-received-supported":				setof(keyword),
	"page-ranges-supported":						boolean,
	"pages-per-minute":								integer(0,MAX),
	"pages-per-minute-color":						integer(0,MAX),
	"pages-per-subset-supported":					boolean,
	"parent-printers-supported":					setof(uri),
	"pdl-init-file-default":						_(collection("Job Template","pdl-init-file"), novalue),
	"pdl-init-file-entry-supported":				setof(name),
	"pdl-init-file-location-supported":				setof(uri),
	"pdl-init-file-name-subdirectory-supported":	boolean,
	"pdl-init-file-name-supported":					setof(name),
	"pdl-init-file-supported":						setof(keyword),
	"pdl-override-supported":						keyword,
	"preferred-attributes-supported":				boolean,
	"presentation-direction-number-up-default":		keyword,
	"presentation-direction-number-up-supported":	setof(keyword),
	"print-color-mode-default":						keyword,
	"print-color-mode-supported":					setof(keyword),
	"print-content-optimize-default":				keyword,
	"print-content-optimize-supported":				setof(keyword),
	"print-quality-default":						enumeration,
	"print-quality-supported":						setof(enumeration),
	"print-rendering-intent-default":				keyword,
	"print-rendering-intent-supported":				setof(keyword),
	"printer-alert":								setof(octetString),
	"printer-alert-description":					setof(text),
	"printer-charge-info":							text,
	"printer-charge-info-uri":						uri,
	"printer-current-time":							dateTime,
	"printer-detailed-status-messages":				setof(text),
	"printer-device-id":							text(1023),
	"printer-driver-installer":						uri,
	"printer-geo-location":							uri,
	"printer-get-attributes-supported":				setof(keyword),
	"printer-icc-profiles":							setof(collection({
		"xri-authentication":						name,
		"profile-url":								uri
	})),
	"printer-icons":								setof(uri),
	"printer-info":									text(127),
	"printer-is-accepting-jobs":					boolean,
	"printer-location":								text(127),
	"printer-make-and-model":						text(127),
	"printer-mandatory-job-attributes":				setof(keyword),
	"printer-message-date-time":					dateTime,
	"printer-message-from-operator":				text(127),
	"printer-message-time":							integer,
	"printer-more-info":							uri,
	"printer-more-info-manufacturer":				uri,
	"printer-name":									name(127),
	"printer-organization":							setof(text),
	"printer-organizational-unit":					setof(text),
	"printer-resolution-default":					resolution,
	"printer-resolution-supported":					resolution,
	"printer-settable-attributes-supported":		setof(keyword),
	"printer-state":								enumeration,
	"printer-state-change-date-time":				dateTime,
	"printer-state-change-time":					integer(1,MAX),
	"printer-state-message":						text,
	"printer-state-reasons":						setof(keyword),
	"printer-supply":								setof(octetString),
	"printer-supply-description":					setof(text),
	"printer-supply-info-uri":						uri,
	"printer-up-time":								integer(1,MAX),
	"printer-uri-supported":						setof(uri),
	"printer-uuid":									uri(45),
	"printer-xri-supported":						setof(collection({
		"xri-authentication":						keyword,
		"xri-security":								keyword,
		"xri-uri":									uri
	})),
	"proof-print-default":							_(collection("Job Template", "proof-print"), novalue),
	"proof-print-supported":						setof(keyword),
	"pwg-raster-document-resolution-supported":		setof(resolution),
	"pwg-raster-document-sheet-back":				keyword,
	"pwg-raster-document-type-supported":			setof(keyword),
	"queued-job-count":								integer(0,MAX),
	"reference-uri-schemes-supported":				setof(uriScheme),
	"repertoire-supported":							setof(_(keyword, name)),
	"requesting-user-uri-supported":				boolean,
	"save-disposition-supported":					setof(keyword),
	"save-document-format-default":					mimeMediaType,
	"save-document-format-supported":				setof(mimeMediaType),
	"save-location-default":						uri,
	"save-location-supported":						setof(uri),
	"save-name-subdirectory-supported":				boolean,
	"save-name-supported":							boolean,
	"separator-sheets-default":						collection("Job Template","separator-sheets"),
	"separator-sheets-supported":					setof(keyword),
	"sheet-collate-default":						keyword,
	"sheet-collate-supported":						setof(keyword),
	"sides-default":								keyword,
	"sides-supported":								setof(keyword),
	"stitching-locations-supported":				setof(_(integer(0,MAX), rangeOfInteger(0,MAX))),
	"stitching-offset-supported":					setof(_(integer(0,MAX), rangeOfInteger(0,MAX))),
	"subordinate-printers-supported":				setof(uri),
	"uri-authentication-supported":					setof(keyword),
	"uri-security-supported":						setof(keyword),
	"user-defined-values-supported":				setof(keyword),
	"which-jobs-supported":							setof(keyword),
	"x-image-position-default":						keyword,
	"x-image-position-supported":					setof(keyword),
	"x-image-shift-default":						integer,
	"x-image-shift-supported":						rangeOfInteger,
	"x-side1-image-shift-default":					integer,
	"x-side1-image-shift-supported":				rangeOfInteger,
	"x-side2-image-shift-default":					integer,
	"x-side2-image-shift-supported":				rangeOfInteger,
	"xri-authentication-supported":					setof(keyword),
	"xri-security-supported":						setof(keyword),
	"xri-uri-scheme-supported":						setof(uriScheme),
	"y-image-position-default":						keyword,
	"y-image-position-supported":					setof(keyword),
	"y-image-shift-default":						integer,
	"y-image-shift-supported":						rangeOfInteger,
	"y-side1-image-shift-default":					integer,
	"y-side1-image-shift-supported":				rangeOfInteger,
	"y-side2-image-shift-default":					integer,
	"y-side2-image-shift-supported":				rangeOfInteger
};
attributes["Subscription Description"] = {
	"notify-job-id":								integer(1,MAX),
	"notify-lease-expiration-time":					integer(0,MAX),
	"notify-printer-up-time":						integer(1,MAX),
	"notify-printer-uri":							uri,
	"notify-sequence-number":						integer(0,MAX),
	"notify-subscriber-user-name":					name,
	"notify-subscriber-user-uri":					uri,
	"notify-subscription-id":						integer(1,MAX),
	"subscription-uuid":							uri
};
attributes["Subscription Template"] = {
	"notify-attributes":							setof(keyword),
	"notify-attributes-supported":					setof(keyword),
	"notify-charset":								charset,
	"notify-events":								setof(keyword),
	"notify-events-default":						setof(keyword),
	"notify-events-supported":						setof(keyword),
	"notify-lease-duration":						integer(0,67108863),
	"notify-lease-duration-default":				integer(0,67108863),
	"notify-lease-duration-supported":				setof(_(integer(0, 67108863), rangeOfInteger(0, 67108863))),
	"notify-max-events-supported":					integer(2,MAX),
	"notify-natural-language":						naturalLanguage,
	"notify-pull-method":							keyword,
	"notify-pull-method-supported":					setof(keyword),
	"notify-recipient-uri":							uri,
	"notify-schemes-supported":						setof(uriScheme),
	"notify-time-interval":							integer(0,MAX),
	"notify-user-data":								octetString(63)
}

//convert all the syntactical sugar to an object tree
function resolve(obj){
	if(obj.type) return obj;
	Object.keys(obj).forEach(function(name){
		var item = obj[name];
		if(typeof item === "function")
			obj[name] = item();
		else if(typeof item === "object" && !item.type)
			obj[name] = resolve(item);
	});
	return obj;
}
resolve(attributes);

module.exports = attributes;
//console.log("var x = ",JSON.stringify(attributes, null, '\t'));
