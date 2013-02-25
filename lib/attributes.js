




/*
* 
* 
*           THIS IS A WORK-IN-PROGRESS.
*           Do not try to use this file!
*           
*           
* 
* */






/* This script was on http://www.iana.org/assignments/ipp-registrations/ipp-registrations.xml used (in part) to generate this content.

//client side:
var obj = {};
$('#table-ipp-registrations-2 tbody tr').each(function(tr){
	var $tr = $(this);
	var $tds = $tr.find("td");
	//if(!$tds[4].innerHTML) return;
	var group = $tds[0].innerHTML;
	var name = $tds[1].innerHTML;
	var attr = $tds[2].innerHTML;
	var subattr = $tds[3].innerHTML;
	var syntax = $tds[4].innerHTML;
	var cols = [attr,subattr,syntax];

	if(!obj[group]) obj[group]={};

	if(obj[group][name]){
		if(Array.isArray(obj[group][name][0]))
			obj[group][name].push(cols)
		else
			obj[group][name] = [obj[group][name],cols];
	}
	else obj[group][name] = cols;

})
JSON.stringify(obj, null, '\t');


//server side:
var t = "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t";
console.log('var x = {');
Object.keys(attributes).forEach(function(group,j,arr1){
	console.log('\t"'+group+'":{');
	Object.keys(attributes[group]).forEach(function(name, i, arr2){
		var tabs = t.substr(-(12-(name.length/4)));
		console.log('\t\t"'+name+'":' +tabs+ JSON.stringify(attributes[group][name]) + (arr2.length-1 == i? '':','));
	});
	console.log('\t}' + (arr1.length-1 == j? '':','));
});
console.log('};');
 */

var attributes = {
	"Document Description": {
		"attributes-charset": [
			"",
			"",
			"charset"
		],
		"attributes-natural-language": [
			"",
			"",
			"naturalLanguage"
		],
		"compression": [
			"",
			"",
			"type3 keyword"
		],
		"copies-actual": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"cover-back-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"cover-front-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"current-page-order": [
			"",
			"",
			"type2 keyword"
		],
		"date-time-at-completed": [
			"",
			"",
			"dateTime | no-value"
		],
		"date-time-at-creation": [
			"",
			"",
			"dateTime"
		],
		"date-time-at-processing": [
			"",
			"",
			"dateTime | no-value"
		],
		"detailed-status-messages": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"document-access-errors": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"document-charset": [
			"",
			"",
			"charset"
		],
		"document-digital-signature": [
			"",
			"",
			"type2 keyword"
		],
		"document-format": [
			"",
			"",
			"mimeMediaType"
		],
		"document-format-details": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"document-format-details\" Operation attribute&gt;",
				"",
				""
			]
		],
		"document-format-details-detected": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"document-format-details\" Operation attribute&gt;",
				"",
				""
			]
		],
		"document-format-detected": [
			"",
			"",
			"mimeMediaType"
		],
		"document-format-version": [
			"",
			"",
			"text(127)"
		],
		"document-format-version-detected": [
			"",
			"",
			"text(127)"
		],
		"document-job-id": [
			"",
			"",
			"integer(1:MAX)"
		],
		"document-job-uri": [
			"",
			"",
			"uri"
		],
		"document-message": [
			"",
			"",
			"text(MAX)"
		],
		"document-metadata": [
			"",
			"",
			"1setOf octetString(MAX)"
		],
		"document-name": [
			"",
			"",
			"name(MAX)"
		],
		"document-natural-language": [
			"",
			"",
			"naturalLanguage"
		],
		"document-number": [
			"",
			"",
			"integer(1:MAX)"
		],
		"document-printer-uri": [
			"",
			"",
			"uri"
		],
		"document-state": [
			"",
			"",
			"type1 enum"
		],
		"document-state-message": [
			"",
			"",
			"text(MAX)"
		],
		"document-state-reasons": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"document-uri": [
			"",
			"",
			"uri"
		],
		"document-uuid": [
			"",
			"",
			"uri(45)"
		],
		"errors-count": [
			"",
			"",
			"integer(0:MAX)"
		],
		"finishings-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"finishings-col-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"force-front-side-actual": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"imposition-template-actual": [
			"",
			"",
			"1setOf type3 keyword | name"
		],
		"impressions": [
			"",
			"",
			"integer(0:MAX)"
		],
		"impressions-completed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"impressions-completed-current-copy": [
			"",
			"",
			"integer(0:MAX)"
		],
		"insert-sheet-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"insert-sheet\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"k-octets": [
			"",
			"",
			"integer(0:MAX)"
		],
		"k-octets-processed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"last-document": [
			"",
			"",
			"boolean"
		],
		"media-actual": [
			"",
			"",
			"1setOf type3 keyword | name"
		],
		"media-col-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"media-input-tray-check-actual": [
			"",
			"",
			"1setOf type3 keyword | name"
		],
		"media-sheets": [
			"",
			"",
			"integer(0:MAX)"
		],
		"media-sheets-completed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"more-info": [
			"",
			"",
			"uri"
		],
		"number-up-actual": [
			"",
			"",
			"1setOf integer"
		],
		"orientation-requested-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"output-bin-actual": [
			"",
			"",
			"1setOf name(MAX)"
		],
		"output-device-assigned": [
			"",
			"",
			"name(127)"
		],
		"overrides-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"overrides\" Document Template attribute&gt;",
				"",
				""
			]
		],
		"page-delivery-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"page-order-received-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"page-ranges-actual": [
			"",
			"",
			"1setOf rangeOfInteger(1:MAX)"
		],
		"pages": [
			"",
			"",
			"integer(0:MAX)"
		],
		"pages-completed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"pages-completed-current-copy": [
			"",
			"",
			"integer(0:MAX)"
		],
		"presentation-direction-number-up-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"print-content-optimize-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"print-quality-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"printer-resolution-actual": [
			"",
			"",
			"1setOf resolution"
		],
		"printer-up-time": [
			"",
			"",
			"integer(1:MAX)"
		],
		"separator-sheets-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"separator-sheets\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"sheet-completed-copy-number": [
			"",
			"",
			"integer(0:MAX)"
		],
		"sides-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"time-at-completed": [
			"",
			"",
			"integer(MIN:MAX) | no-value"
		],
		"time-at-creation": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"time-at-processing": [
			"",
			"",
			"integer(MIN:MAX) | no-value"
		],
		"x-image-position-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"x-image-shift-actual": [
			"",
			"",
			"1setOf integer(MIN:MAX)"
		],
		"x-side1-image-shift-actual": [
			"",
			"",
			"1setOf integer(MIN:MAX)"
		],
		"x-side2-image-shift-actual": [
			"",
			"",
			"1setOf integer(MIN:MAX)"
		],
		"y-image-position-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"y-image-shift-actual": [
			"",
			"",
			"1setOf integer(MIN:MAX)"
		],
		"y-side1-image-shift-actual": [
			"",
			"",
			"1setOf integer(MIN:MAX)"
		],
		"y-side2-image-shift-actual": [
			"",
			"",
			"1setOf integer(MIN:MAX)"
		]
	},
	"Document Template": {
		"copies": [
			"",
			"",
			"integer(1:MAX)"
		],
		"cover-back": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"cover-front": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"feed-orientation": [
			"",
			"",
			"type3 keyword"
		],
		"finishings": [
			"",
			"",
			"1setOf type2 enum"
		],
		"finishings-col": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"font-name-requested": [
			"",
			"",
			"name(MAX)"
		],
		"font-size-requested": [
			"",
			"",
			"integer(1:MAX)"
		],
		"force-front-side": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"imposition-template": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"insert-sheet": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"insert-sheet\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"media": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"media-col": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"media-input-tray-check": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"number-up": [
			"",
			"",
			"integer(1:MAX)"
		],
		"orientation-requested": [
			"",
			"",
			"type2 enum"
		],
		"overrides": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Any Document Template attribute&gt;",
				"",
				""
			],
			[
				"document-copies",
				"",
				"1setOf rangeOfInteger"
			],
			[
				"document-numbers",
				"",
				"1setOf rangeOfInteger"
			],
			[
				"pages",
				"",
				"1setOf rangeOfInteger"
			]
		],
		"page-delivery": [
			"",
			"",
			"type2 keyword"
		],
		"page-order-received": [
			"",
			"",
			"type2 keyword"
		],
		"page-ranges": [
			"",
			"",
			"1setOf rangeOfInteger(1:MAX)"
		],
		"pdl-init-file": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"pdl-init-file\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"presentation-direction-number-up": [
			"",
			"",
			"type2 keyword"
		],
		"print-color-mode": [
			"",
			"",
			"type2 keyword"
		],
		"print-content-optimize": [
			"",
			"",
			"type2 keyword"
		],
		"print-quality": [
			"",
			"",
			"type2 num"
		],
		"print-rendering-intent": [
			"",
			"",
			"type2 keyword"
		],
		"printer-resolution": [
			"",
			"",
			"resolution"
		],
		"separator-sheets": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"separator-sheets\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"sheet-collate": [
			"",
			"",
			"type2 keyword"
		],
		"sides": [
			"",
			"",
			"type2 keyword"
		],
		"x-image-position": [
			"",
			"",
			"type2 keyword"
		],
		"x-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-side1-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-side2-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-image-position": [
			"",
			"",
			"type2 keyword"
		],
		"y-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-side1-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-side2-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		]
	},
	"Event Notifications": {
		"notify-subscribed-event": [
			"",
			"",
			"type2 keyword"
		],
		"notify-text": [
			"",
			"",
			"text(MAX)"
		]
	},
	"Job Description": {
		"attributes-charset": [
			"",
			"",
			"charset"
		],
		"attributes-natural-language": [
			"",
			"",
			"naturalLanguage"
		],
		"compression-supplied": [
			"",
			"",
			"type3 keyword"
		],
		"copies-actual": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"cover-back-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"cover-front-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"current-page-order": [
			"",
			"",
			"type2 keyword"
		],
		"date-time-at-completed": [
			"",
			"",
			"dateTime | no-value"
		],
		"date-time-at-creation": [
			"",
			"",
			"dateTime"
		],
		"date-time-at-processing": [
			"",
			"",
			"dateTime | no-value"
		],
		"document-charset-supplied": [
			"",
			"",
			"charset"
		],
		"document-digital-signature-supplied": [
			"",
			"",
			"type2 keyword"
		],
		"document-format-details-supplied": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"document-format-details\" Operation attribute&gt;",
				"",
				""
			]
		],
		"document-format-supplied": [
			"",
			"",
			"mimeMediaType"
		],
		"document-format-version-supplied": [
			"",
			"",
			"text(127)"
		],
		"document-message-supplied": [
			"",
			"",
			"text(MAX)"
		],
		"document-metadata": [
			"",
			"",
			"1setOf octetString(MAX)"
		],
		"document-name-supplied": [
			"",
			"",
			"name(MAX)"
		],
		"document-natural-language-supplied": [
			"",
			"",
			"naturalLanguage"
		],
		"document-overrides-actual": [
			"",
			"",
			"1setOf collection"
		],
		"errors-count": [
			"",
			"",
			"integer(0:MAX)"
		],
		"finishings-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"finishings-col-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"force-front-side-actual": [
			"",
			"",
			"1setOf (1setOf integer(1:MAX))"
		],
		"imposition-template-actual": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"impressions-completed-current-copy": [
			"",
			"",
			"integer(0:MAX)"
		],
		"insert-sheet-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"insert-sheet\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-account-id-actual": [
			"",
			"",
			"1setOf (name(MAX)"
		],
		"job-accounting-sheets-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"job-accounting-sheets\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-accounting-user-id-actual": [
			"",
			"",
			"1setOf (name(MAX)"
		],
		"job-attribute-fidelity": [
			"",
			"",
			"boolean"
		],
		"job-collation-type": [
			"",
			"",
			"type2 enum"
		],
		"job-collation-type-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-copies-actual": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"job-cover-back-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-cover-front-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-detailed-status-messages": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"job-document-access-errors": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"job-error-sheet-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"job-error-sheet\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-finishings-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"job-finishings-col-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-hold-until-actual": [
			"",
			"",
			"1setOf (type3 keyword | name)"
		],
		"job-id": [
			"",
			"",
			"integer(1:MAX)"
		],
		"job-impressions": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-impressions-completed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-k-octets": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-k-octets-processed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-mandatory-attributes": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-media-sheets": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-media-sheets-completed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-message-from-operator": [
			"",
			"",
			"text(127)"
		],
		"job-message-to-operator-actual": [
			"",
			"",
			"1setOf (text(MAX))"
		],
		"job-more-info": [
			"",
			"",
			"uri"
		],
		"job-name": [
			"",
			"",
			"name(MAX)"
		],
		"job-originating-user-name": [
			"",
			"",
			"name(MAX)"
		],
		"job-originating-user-uri": [
			"",
			"",
			"uri"
		],
		"job-pages": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-pages-completed": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-pages-completed-current-copy": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-printer-up-time": [
			"",
			"",
			"integer(1:MAX)"
		],
		"job-printer-uri": [
			"",
			"",
			"uri"
		],
		"job-priority-actual": [
			"",
			"",
			"1setOf integer(1:100)"
		],
		"job-save-printer-make-and-model": [
			"",
			"",
			"text(127)"
		],
		"job-sheet-message-actual": [
			"",
			"",
			"1setOf (text(MAX))"
		],
		"job-sheets-actual": [
			"",
			"",
			"1setOf (type3 keyword | name)"
		],
		"job-sheets-col-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"job-sheets-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-state": [
			"",
			"",
			"type1 enum | unknown"
		],
		"job-state-message": [
			"",
			"",
			"text(MAX)"
		],
		"job-state-reasons": [
			"",
			"",
			"1setOf  type2 keyword"
		],
		"job-uri": [
			"",
			"",
			"uri"
		],
		"job-uuid": [
			"",
			"",
			"uri(45)"
		],
		"media-actual": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"media-col-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\"&gt;",
				"",
				""
			]
		],
		"media-input-tray-check-actual": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"multiple-document-handling-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"number-of-documents": [
			"",
			"",
			"integer(0:MAX)"
		],
		"number-of-intervening-jobs": [
			"",
			"",
			"integer(0:MAX)"
		],
		"number-up-actual": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"orientation-requested-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"original-requesting-user-name": [
			"",
			"",
			"name(MAX)"
		],
		"output-bin-actual": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"output-device-actual": [
			"",
			"",
			"1setOf name(127)"
		],
		"output-device-assigned": [
			"",
			"",
			"name(127)"
		],
		"overrides-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"overrides\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"page-delivery-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"page-order-received-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"page-ranges-actual": [
			"",
			"",
			"1setOf rangeOfInteger(1:MAX)"
		],
		"presentation-direction-number-up-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"print-content-optimize-actual": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"print-quality-actual": [
			"",
			"",
			"1setOf type2 enum"
		],
		"printer-resolution-actual": [
			"",
			"",
			"1setOf resolution"
		],
		"separator-sheets-actual": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"separator-sheets\"&gt;",
				"",
				""
			]
		],
		"sheet-collate-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"sheet-completed-copy-number": [
			"",
			"",
			"integer(0:MAX)"
		],
		"sheet-completed-document-number": [
			"",
			"",
			"integer(0:MAX)"
		],
		"sides-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"time-at-completed": [
			"",
			"",
			"integer(MIN:MAX) | no-value"
		],
		"time-at-creation": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"time-at-processing": [
			"",
			"",
			"integer(MIN:MAX) | no-value"
		],
		"warnings-count": [
			"",
			"",
			"integer(0:MAX)"
		],
		"x-image-position-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"x-image-shift-actual": [
			"",
			"",
			"1setOf (integer(MIN:MAX))"
		],
		"x-side1-image-shift-actual": [
			"",
			"",
			"1setOf (integer(MIN:MAX))"
		],
		"x-side2-image-shift-actual": [
			"",
			"",
			"1setOf (integer(MIN:MAX))"
		],
		"y-image-position-actual": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"y-image-shift-actual": [
			"",
			"",
			"1setOf (integer(MIN:MAX))"
		],
		"y-side1-image-shift-actual": [
			"",
			"",
			"1setOf (integer(MIN:MAX))"
		],
		"y-side2-image-shift-actual": [
			"",
			"",
			"1setOf (integer(MIN:MAX))"
		]
	},
	"Job Template": {
		"copies": [
			"",
			"",
			"integer(1:MAX)"
		],
		"cover-back": [
			[
				"",
				"",
				"collection"
			],
			[
				"cover-type",
				"",
				"type2 keyword"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			]
		],
		"cover-front": [
			[
				"",
				"",
				"collection"
			],
			[
				"cover-type",
				"",
				"type2 keyword"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			]
		],
		"feed-orientation": [
			"",
			"",
			"type3 keyword"
		],
		"finishings": [
			"",
			"",
			"1setOf type2 enum"
		],
		"finishings-col": [
			[
				"",
				"",
				"collection"
			],
			[
				"finishing-template",
				"",
				"name(MAX)"
			],
			[
				"stitching",
				"",
				"collection"
			],
			[
				"stitching",
				"stitching-locations",
				"1setOf integer(0:MAX)"
			],
			[
				"stitching",
				"stitching-offset",
				"integer(0:MAX)"
			],
			[
				"stitching",
				"stitching-reference-edge",
				"type2 keyword"
			]
		],
		"font-name-requested": [
			"",
			"",
			"name(MAX)"
		],
		"font-size-requested": [
			"",
			"",
			"integer(1:MAX)"
		],
		"force-front-side": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"imposition-template": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"insert-sheet": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"insert-after-page-number",
				"",
				"integer(0:MAX)"
			],
			[
				"insert-count",
				"",
				"integer(0:MAX)"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			]
		],
		"job-account-id": [
			"",
			"",
			"name(MAX)"
		],
		"job-accounting-sheets": [
			[
				"",
				"",
				"collection"
			],
			[
				"job-accounting-output-bin",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"job-accounting-sheets-type",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			]
		],
		"job-accounting-user-id": [
			"",
			"",
			"name(MAX)"
		],
		"job-copies": [
			"",
			"",
			"integer(1:MAX)"
		],
		"job-cover-back": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\"&gt;",
				"",
				""
			]
		],
		"job-cover-front": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\"&gt;",
				"",
				""
			]
		],
		"job-delay-output-until": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-delay-output-until-time": [
			"",
			"",
			"dateTime"
		],
		"job-error-action": [
			"",
			"",
			"type2 keyword"
		],
		"job-error-sheet": [
			[
				"",
				"",
				"collection"
			],
			[
				"job-error-sheet-type",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"job-error-sheet-when",
				"",
				"type2 keyword"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			]
		],
		"job-finishings": [
			"",
			"",
			"1setOf type2 enum"
		],
		"job-finishings-col": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-hold-until": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-hold-until-time": [
			"",
			"",
			"dateTime"
		],
		"job-message-to-operator": [
			"",
			"",
			"text(MAX)"
		],
		"job-phone-number": [
			"",
			"",
			"uri"
		],
		"job-priority": [
			"",
			"",
			"integer(1:100)"
		],
		"job-recipient-name": [
			"",
			"",
			"name(MAX)"
		],
		"job-save-disposition": [
			[
				"",
				"",
				"collection"
			],
			[
				"save-disposition",
				"",
				"type3 keyword"
			],
			[
				"save-info",
				"",
				"1setOf collection"
			],
			[
				"save-info",
				"save-document-format",
				"mimeMediaType"
			],
			[
				"save-info",
				"save-location",
				"uri"
			],
			[
				"save-info",
				"save-name",
				"name(MAX)"
			]
		],
		"job-sheet-message": [
			"",
			"",
			"text(MAX)"
		],
		"job-sheets": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-sheets-col": [
			[
				"",
				"",
				"collection"
			],
			[
				"job-sheets",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			]
		],
		"media": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"media-col": [
			[
				"",
				"",
				"collection"
			],
			[
				"media-back-coating",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-bottom-margin",
				"",
				"integer(0:MAX)"
			],
			[
				"media-color",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-front-coating",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-grain",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-hole-count",
				"",
				"integer(0:MAX)"
			],
			[
				"media-info",
				"",
				"text(255)"
			],
			[
				"media-key",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-left-margin",
				"",
				"integer(0:MAX)"
			],
			[
				"media-order-count",
				"",
				"integer(1:MAX)"
			],
			[
				"media-pre-printed",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-recycled",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-right-margin",
				"",
				"integer(0:MAX)"
			],
			[
				"media-size",
				"",
				"collection"
			],
			[
				"media-size-name",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-source",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-thickness",
				"",
				"integer(1:MAX)"
			],
			[
				"media-tooth",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-top-margin",
				"",
				"integer(0:MAX)"
			],
			[
				"media-type",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-weight-metric",
				"",
				"integer(0:MAX)"
			]
		],
		"media-input-tray-check": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"multiple-document-handling": [
			"",
			"",
			"type2 keyword"
		],
		"number-up": [
			"",
			"",
			"integer(1:MAX)"
		],
		"orientation-requested": [
			"",
			"",
			"type2 enum"
		],
		"output-bin": [
			"",
			"",
			"type2 keyword | name(MAX)"
		],
		"output-device": [
			"",
			"",
			"name(127)"
		],
		"overrides": [
			[
				"",
				"",
				"1setOf  collection"
			],
			[
				"&lt;Any Job Template attribute&gt;",
				"",
				""
			],
			[
				"document-copies",
				"",
				"1setOf rangeOfInteger(MAX)"
			],
			[
				"document-numbers",
				"",
				"1setOf rangeOfInteger(MAX)"
			],
			[
				"pages",
				"",
				"1setOf rangeOfInteger(MAX)"
			]
		],
		"page-delivery": [
			"",
			"",
			"type2 keyword"
		],
		"page-order-received": [
			"",
			"",
			"type2 keyword"
		],
		"page-ranges": [
			"",
			"",
			"1setOf rangeOfInteger(1:MAX)"
		],
		"pages-per-subset": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"pdl-init-file": [
			[
				"",
				"",
				"collection"
			],
			[
				"pdl-init-file-entry",
				"",
				"name(MAX)"
			],
			[
				"pdl-init-file-location",
				"",
				"uri"
			],
			[
				"pdl-init-file-name",
				"",
				"name(MAX)"
			]
		],
		"presentation-direction-number-up": [
			"",
			"",
			"type2 keyword"
		],
		"print-color-mode": [
			"",
			"",
			"type2 keyword"
		],
		"print-content-optimize": [
			"",
			"",
			"type2 keyword"
		],
		"print-quality": [
			"",
			"",
			"type2 enum"
		],
		"print-rendering-intent": [
			"",
			"",
			"type2 keyword"
		],
		"printer-resolution": [
			"",
			"",
			"resolution"
		],
		"proof-print": [
			[
				"",
				"",
				"collection"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			],
			[
				"proof-print-copies",
				"",
				"integer(0:MAX)"
			]
		],
		"separator-sheets": [
			[
				"",
				"",
				"collection"
			],
			[
				"media",
				"",
				"type3 keyword | name(MAX)"
			],
			[
				"media-col",
				"",
				"collection"
			],
			[
				"media-col",
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				""
			],
			[
				"separator-sheets-type",
				"",
				"1setOf type2 keyword"
			]
		],
		"sheet-collate": [
			"",
			"",
			"type2 keyword"
		],
		"sides": [
			"",
			"",
			"type2 keyword"
		],
		"x-image-position": [
			"",
			"",
			"type2 keyword"
		],
		"x-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-side1-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-side2-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-image-position": [
			"",
			"",
			"type2 keyword"
		],
		"y-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-side1-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-side2-image-shift": [
			"",
			"",
			"integer(MIN:MAX)"
		]
	},
	"Operation": {
		"attributes-charset": [
			"",
			"",
			"charset"
		],
		"attributes-natural-language": [
			"",
			"",
			"naturalLanguage"
		],
		"compression": [
			"",
			"",
			"type3 keyword"
		],
		"detailed-status-message": [
			"",
			"",
			"text(MAX)"
		],
		"document-access-error": [
			"",
			"",
			"text(MAX)"
		],
		"document-charset": [
			"",
			"",
			"charset"
		],
		"document-digital-signature": [
			"",
			"",
			"type2 keyword"
		],
		"document-format": [
			"",
			"",
			"mimeMediaType"
		],
		"document-format-details": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"document-format",
				"",
				"mimeMediaType"
			],
			[
				"document-format-device-id",
				"",
				"text(127)"
			],
			[
				"document-format-version",
				"",
				"text(127)"
			],
			[
				"document-natural-language",
				"",
				"1setOf naturalLanguage"
			],
			[
				"document-source-application-name",
				"",
				"name(MAX)"
			],
			[
				"document-source-application-version",
				"",
				"text(127)"
			],
			[
				"document-source-os-name",
				"",
				"name(40)"
			],
			[
				"document-source-os-version",
				"",
				"text(40)"
			]
		],
		"document-message": [
			"",
			"",
			"text(MAX)"
		],
		"document-metadata": [
			"",
			"",
			"1setOf octetString(MAX)"
		],
		"document-name": [
			"",
			"",
			"name(MAX)"
		],
		"document-natural-language": [
			[
				"",
				"",
				"naturalLanguage"
			],
			[
				"",
				"",
				"naturalLanguage"
			]
		],
		"document-password": [
			"",
			"",
			"octetString(1023)"
		],
		"first-index": [
			"",
			"",
			"integer(1:MAX)"
		],
		"identify-actions": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"ipp-attribute-fidelity": [
			"",
			"",
			"boolean"
		],
		"job-hold-until": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-id": [
			"",
			"",
			"integer(1:MAX)"
		],
		"job-ids": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"job-impressions": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-k-octets": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-mandatory-attributes": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-media-sheets": [
			"",
			"",
			"integer(0:MAX)"
		],
		"job-message-from-operator": [
			"",
			"",
			"text(127)"
		],
		"job-name": [
			"",
			"",
			"name(MAX)"
		],
		"job-password": [
			"",
			"",
			"octetString(255)"
		],
		"job-password-encryption": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-state": [
			"",
			"",
			"type1 enum"
		],
		"job-state-message": [
			"",
			"",
			"text(MAX)"
		],
		"job-state-reasons": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-uri": [
			"",
			"",
			"uri"
		],
		"last-document": [
			"",
			"",
			"boolean"
		],
		"limit": [
			"",
			"",
			"integer(1:MAX)"
		],
		"message": [
			"",
			"",
			"text(127)"
		],
		"my-jobs": [
			"",
			"",
			"boolean"
		],
		"original-requesting-user-name": [
			"",
			"",
			"name(MAX)"
		],
		"preferred-attributes": [
			"",
			"",
			"collection"
		],
		"printer-message-from-operator": [
			"",
			"",
			"text(127)"
		],
		"printer-uri": [
			"",
			"",
			"uri"
		],
		"requested-attributes": [
			"",
			"",
			"1setOf keyword"
		],
		"requesting-user-name": [
			"",
			"",
			"name(MAX)"
		],
		"requesting-user-uri": [
			"",
			"",
			"uri"
		],
		"status-message": [
			"",
			"",
			"text(255)"
		],
		"which-jobs": [
			"",
			"",
			"type2 keyword"
		]
	},
	"Printer Description": {
		"charset-configured": [
			"",
			"",
			"charset"
		],
		"charset-supported": [
			"",
			"",
			"1setOf charset"
		],
		"color-supported": [
			"",
			"",
			"boolean"
		],
		"compression-supported": [
			"",
			"",
			"1setOf type3 keyword"
		],
		"copies-default": [
			"",
			"",
			"integer(1:MAX)"
		],
		"copies-supported": [
			"",
			"",
			"rangeOfInteger(1:MAX)"
		],
		"cover-back-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"cover-back-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"cover-front-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"cover-front-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"device-service-count": [
			"",
			"",
			"integer(1:MAX)"
		],
		"device-uuid": [
			"",
			"",
			"uri(45)"
		],
		"document-charset-default": [
			"",
			"",
			"charset"
		],
		"document-charset-supported": [
			"",
			"",
			"1setOf charset"
		],
		"document-creation-attributes-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"document-digital-signature-default": [
			"",
			"",
			"type2 keyword"
		],
		"document-digital-signature-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"document-format-default": [
			"",
			"",
			"mimeMediaType"
		],
		"document-format-details-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"document-format-details\" Operation attribute&gt;",
				"",
				""
			]
		],
		"document-format-details-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"document-format-supported": [
			"",
			"",
			"1setOf mimeMediaType"
		],
		"document-format-varying-attributes": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"document-format-version-default": [
			"",
			"",
			"text(127)"
		],
		"document-format-version-supported": [
			"",
			"",
			"1setOf text(127)"
		],
		"document-natural-language-default": [
			"",
			"",
			"naturalLanguage"
		],
		"document-natural-language-supported": [
			"",
			"",
			"1setOf naturalLanguage"
		],
		"document-password-supported": [
			"",
			"",
			"integer(0:1023)"
		],
		"feed-orientation-default": [
			"",
			"",
			"type3 keyword"
		],
		"feed-orientation-supported": [
			"",
			"",
			"1setOf type3 keyword"
		],
		"finishings-col-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"finishings-col-ready": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"finishings-col-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"finishings-default": [
			"",
			"",
			"1setOf type2 enum"
		],
		"finishings-ready": [
			"",
			"",
			"1setOf type2 enum"
		],
		"finishings-supported": [
			"",
			"",
			"1setOf type2 enum"
		],
		"font-name-requested-default": [
			"",
			"",
			"name(MAX)"
		],
		"font-name-requested-supported": [
			"",
			"",
			"1setOf name(MAX)"
		],
		"font-size-requested-default": [
			"",
			"",
			"integer(1:MAX)"
		],
		"font-size-requested-supported": [
			"",
			"",
			"1setOf rangeOfInteger(1:MAX)"
		],
		"force-front-side-default (under review)": [
			"",
			"",
			"1setOf integer(1:MAX)"
		],
		"force-front-side-supported (under review)": [
			"",
			"",
			"rangeOfInteger(1:MAX)"
		],
		"generated-natural-language-supported": [
			"",
			"",
			"1setOf naturalLanguage"
		],
		"identify-actions-default": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"identify-actions-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"imposition-template-default": [
			"",
			"",
			"keyword | name(MAX)"
		],
		"imposition-template-supported": [
			"",
			"",
			"1setOf (keyword | name(MAX))"
		],
		"insert-after-page-number-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"insert-count-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"insert-sheet-default": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"insert-sheet\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"insert-sheet-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"ipp-features-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"ipp-versions-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"ippget-event-life": [
			"",
			"",
			"integer(15:MAX)"
		],
		"job-account-id-default": [
			"",
			"",
			"name(MAX) | no-value"
		],
		"job-account-id-supported": [
			"",
			"",
			"boolean"
		],
		"job-accounting-sheets-default": [
			[
				"",
				"",
				"collection | no-value"
			],
			[
				"&lt;Member attributes are the same as the \"job-accounting-sheets\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-accounting-sheets-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-accounting-user-id-default": [
			"",
			"",
			"name(MAX) | no-value"
		],
		"job-accounting-user-id-supported": [
			"",
			"",
			"boolean"
		],
		"job-constraints-supported": [
			"",
			"",
			"1setOf collection"
		],
		"job-copies-default": [
			"",
			"",
			"integer(1:MAX)"
		],
		"job-copies-supported": [
			"",
			"",
			"rangeOfInteger(1:MAX)"
		],
		"job-cover-back-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-back\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-cover-back-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-cover-front-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"cover-front\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-cover-front-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-creation-attributes-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-delay-output-until-default": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-delay-output-until-supported": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"job-delay-output-until-time-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"job-error-action-default": [
			"",
			"",
			"type2 keyword"
		],
		"job-error-action-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-error-sheet-default": [
			[
				"",
				"",
				"collection | no-value"
			],
			[
				"&lt;Member attributes are the same as the \"job-error-sheet\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-error-sheet-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-finishings-col-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-finishings-col-ready": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"finishings-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-finishings-col-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-finishings-default": [
			"",
			"",
			"1setOf type2 enum"
		],
		"job-finishings-ready": [
			"",
			"",
			"1setOf type2 enum"
		],
		"job-finishings-supported": [
			"",
			"",
			"1setOf type2 enum"
		],
		"job-hold-until-default": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-hold-until-supported": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"job-hold-until-time-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"job-ids-supported": [
			"",
			"",
			"boolean"
		],
		"job-impressions-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"job-k-octets-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"job-media-sheets-supported": [
			"",
			"",
			"rangeOfInteger(0:MAX)"
		],
		"job-message-to-operator-default": [
			"",
			"",
			"text(MAX)"
		],
		"job-message-to-operator-supported": [
			"",
			"",
			"boolean"
		],
		"job-password-encryption-supported": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"job-password-supported": [
			"",
			"",
			"integer(0:255)"
		],
		"job-phone-number-default": [
			"",
			"",
			"uri | no-value"
		],
		"job-phone-number-supported": [
			"",
			"",
			"boolean"
		],
		"job-priority-default": [
			"",
			"",
			"integer(1:100)"
		],
		"job-priority-supported": [
			"",
			"",
			"integer(1:100)"
		],
		"job-recipient-name-default": [
			"",
			"",
			"name(MAX) | no-value"
		],
		"job-recipient-name-supported": [
			"",
			"",
			"boolean"
		],
		"job-resolvers-supported": [
			"",
			"",
			"1setOf collection"
		],
		"job-settable-attributes-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-sheet-message-default": [
			"",
			"",
			"text(MAX)"
		],
		"job-sheet-message-supported": [
			"",
			"",
			"boolean"
		],
		"job-sheets-col-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"job-sheets-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"job-sheets-col-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"job-sheets-default": [
			"",
			"",
			"type3 keyword | name(MAX)"
		],
		"job-sheets-supported": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"job-spooling-supported": [
			"",
			"",
			"type2 keyword"
		],
		"max-save-info-supported": [
			"",
			"",
			"integer(1:MAX)"
		],
		"max-stitching-locations-supported": [
			"",
			"",
			"integer(1:MAX)"
		],
		"media-back-coating-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-bottom-margin-supported": [
			"",
			"",
			"1setOf integer(0:MAX)"
		],
		"media-col-database": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				"",
				""
			],
			[
				"media-source-properties",
				"",
				"collection"
			],
			[
				"media-source-properties",
				"media-source-feed-direction",
				"type2 keyword"
			],
			[
				"media-source-properties",
				"media-source-feed-orientation",
				"type2 enum"
			]
		],
		"media-col-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"media-col-ready": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"&lt;Member attributes are the same as the \"media-col\" Job Template attribute&gt;",
				"",
				""
			],
			[
				"media-source-properties",
				"",
				"collection"
			],
			[
				"media-source-properties",
				"media-source-feed-direction",
				"type2 keyword"
			],
			[
				"media-source-properties",
				"media-source-feed-orientation",
				"type2 enum"
			]
		],
		"media-col-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"media-color-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-default": [
			"",
			"",
			"no-value | type3 keyword | name(MAX)"
		],
		"media-front-coating-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-grain-supported": [
			"",
			"",
			"1setOf type3 keyword | name(MAX)"
		],
		"media-hole-count-supported": [
			"",
			"",
			"1setOf rangeOfInteger(0:MAX)"
		],
		"media-info-supported": [
			"",
			"",
			"boolean"
		],
		"media-input-tray-check-default": [
			"",
			"",
			"keyword | name(MAX) | no-value"
		],
		"media-input-tray-check-supported": [
			"",
			"",
			"1setOf (keyword | name(MAX))"
		],
		"media-key-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-left-margin-supported": [
			"",
			"",
			"1setOf integer(0:MAX)"
		],
		"media-order-count-supported": [
			"",
			"",
			"1setOf rangeOfInteger(1:MAX)"
		],
		"media-pre-printed-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-ready": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"media-recycled-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-right-margin-supported": [
			"",
			"",
			"1setOf integer(0:MAX)"
		],
		"media-size-supported": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"x-dimension",
				"",
				"integer(1:MAX) | rangeOfInteger(1:MAX)"
			],
			[
				"y-dimension",
				"",
				"integer(1:MAX) | rangeOfInteger(1:MAX)"
			]
		],
		"media-source-supported": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"media-supported": [
			"",
			"",
			"1setOf (type3 keyword | name(MAX))"
		],
		"media-thickness-supported": [
			"",
			"",
			"rangeOfInteger(1:MAX)"
		],
		"media-tooth-supported": [
			"",
			"",
			"1setOf type3 keyword | name(MAX)"
		],
		"media-top-margin-supported": [
			"",
			"",
			"1setOf integer(0:MAX)"
		],
		"media-type-supported": [
			"",
			"",
			"1setOf (type2 keyword | name(MAX))"
		],
		"media-weight-metric-supported": [
			"",
			"",
			"1setOf rangeOfInteger(0:MAX)"
		],
		"multiple-document-handling-default": [
			"",
			"",
			"type2 keyword"
		],
		"multiple-document-handling-supported": [
			"",
			"",
			"1setOf (type2 keyword)"
		],
		"multiple-document-jobs-supported": [
			"",
			"",
			"boolean"
		],
		"multiple-operation-time-out": [
			"",
			"",
			"integer(1:MAX)"
		],
		"multiple-operation-timeout-action": [
			"",
			"",
			"type2 keyword"
		],
		"natural-language-configured": [
			"",
			"",
			"naturalLanguage"
		],
		"number-up-default": [
			"",
			"",
			"integer(1:MAX)"
		],
		"number-up-supported": [
			"",
			"",
			"integer(1:MAX) | rangeOfInteger(1:MAX)"
		],
		"operations-supported": [
			"",
			"",
			"1setOf type2 enum"
		],
		"orientation-requested-default": [
			"",
			"",
			"no-value | type2 enum"
		],
		"orientation-requested-supported": [
			"",
			"",
			"1setOf type2 enum"
		],
		"output-bin-default": [
			"",
			"",
			"type2 keyword | name(MAX)"
		],
		"output-bin-supported": [
			"",
			"",
			"1set Of (keyword | name(MAX))"
		],
		"output-device-supported": [
			"",
			"",
			"1setOf name(127)"
		],
		"overrides-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"page-delivery-default": [
			"",
			"",
			"type2 keyword"
		],
		"page-delivery-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"page-order-received-default": [
			"",
			"",
			"type2 keyword"
		],
		"page-order-received-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"page-ranges-supported": [
			"",
			"",
			"boolean"
		],
		"pages-per-minute": [
			"",
			"",
			"integer(0:MAX)"
		],
		"pages-per-minute-color": [
			"",
			"",
			"integer(0:MAX)"
		],
		"pages-per-subset-supported": [
			"",
			"",
			"boolean"
		],
		"parent-printers-supported": [
			"",
			"",
			"1setOf uri"
		],
		"pdl-init-file-default": [
			[
				"",
				"",
				"collection | no-value"
			],
			[
				"&lt;Member attributes are the same as the \"pdl-init-file\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"pdl-init-file-entry-supported": [
			"",
			"",
			"1setOf name(MAX)"
		],
		"pdl-init-file-location-supported": [
			"",
			"",
			"1setOf uri"
		],
		"pdl-init-file-name-subdirectory-supported": [
			"",
			"",
			"boolean"
		],
		"pdl-init-file-name-supported": [
			"",
			"",
			"1setOf name(MAX)"
		],
		"pdl-init-file-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"pdl-override-supported": [
			"",
			"",
			"type2 keyword"
		],
		"preferred-attributes-supported": [
			"",
			"",
			"boolean"
		],
		"presentation-direction-number-up-default": [
			"",
			"",
			"type2 keyword"
		],
		"presentation-direction-number-up-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"print-color-mode-default": [
			"",
			"",
			"type2 keyword"
		],
		"print-color-mode-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"print-content-optimize-default": [
			"",
			"",
			"type2 keyword"
		],
		"print-content-optimize-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"print-quality-default": [
			"",
			"",
			"type2 enum"
		],
		"print-quality-supported": [
			"",
			"",
			"1setOf type2 enum"
		],
		"print-rendering-intent-default": [
			"",
			"",
			"type2 keyword"
		],
		"print-rendering-intent-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"printer-alert": [
			"",
			"",
			"1setOf octetString(MAX)"
		],
		"printer-alert-description": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"printer-charge-info": [
			"",
			"",
			"text(MAX)"
		],
		"printer-charge-info-uri": [
			"",
			"",
			"uri"
		],
		"printer-current-time": [
			"",
			"",
			"dateTime"
		],
		"printer-detailed-status-messages": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"printer-device-id": [
			"",
			"",
			"text(1023)"
		],
		"printer-driver-installer": [
			"",
			"",
			"uri"
		],
		"printer-geo-location": [
			"",
			"",
			"uri"
		],
		"printer-get-attributes-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"printer-icc-profiles": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"profile-name",
				"",
				"name(MAX)"
			],
			[
				"profile-url",
				"",
				"uri"
			]
		],
		"printer-icons": [
			"",
			"",
			"1setOf uri"
		],
		"printer-info": [
			"",
			"",
			"text(127)"
		],
		"printer-is-accepting-jobs": [
			"",
			"",
			"boolean"
		],
		"printer-location": [
			"",
			"",
			"text(127)"
		],
		"printer-make-and-model": [
			"",
			"",
			"text(127)"
		],
		"printer-mandatory-job-attributes": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"printer-message-date-time": [
			"",
			"",
			"dateTime"
		],
		"printer-message-from-operator": [
			"",
			"",
			"text(127)"
		],
		"printer-message-time": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"printer-more-info": [
			"",
			"",
			"uri"
		],
		"printer-more-info-manufacturer": [
			"",
			"",
			"uri"
		],
		"printer-name": [
			"",
			"",
			"name(127)"
		],
		"printer-organization": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"printer-organizational-unit": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"printer-resolution-default": [
			"",
			"",
			"resolution"
		],
		"printer-resolution-supported": [
			"",
			"",
			"resolution"
		],
		"printer-settable-attributes-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"printer-state": [
			"",
			"",
			"type1 enum"
		],
		"printer-state-change-date-time": [
			"",
			"",
			"dateTime"
		],
		"printer-state-change-time": [
			"",
			"",
			"integer(1:MAX)"
		],
		"printer-state-message": [
			"",
			"",
			"text(MAX)"
		],
		"printer-state-reasons": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"printer-supply": [
			"",
			"",
			"1setOf octetString(MAX)"
		],
		"printer-supply-description": [
			"",
			"",
			"1setOf text(MAX)"
		],
		"printer-supply-info-uri": [
			"",
			"",
			"uri"
		],
		"printer-up-time": [
			"",
			"",
			"integer(1:MAX)"
		],
		"printer-uri-supported": [
			"",
			"",
			"1setOf uri"
		],
		"printer-uuid": [
			"",
			"",
			"uri(45)"
		],
		"printer-xri-supported": [
			[
				"",
				"",
				"1setOf collection"
			],
			[
				"xri-authentication",
				"",
				"type2 keyword"
			],
			[
				"xri-security",
				"",
				"type2 keyword"
			],
			[
				"xri-uri",
				"",
				"uri"
			]
		],
		"proof-print-default": [
			[
				"",
				"",
				"collection | no-value"
			],
			[
				"&lt;Member attributes are the same as the \"proof-print\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"proof-print-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"pwg-raster-document-resolution-supported": [
			"",
			"",
			"1setOf resolution"
		],
		"pwg-raster-document-sheet-back": [
			"",
			"",
			"type2 keyword"
		],
		"pwg-raster-document-type-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"queued-job-count": [
			"",
			"",
			"integer(0:MAX)"
		],
		"reference-uri-schemes-supported": [
			"",
			"",
			"1setOf uriScheme"
		],
		"repertoire-supported": [
			"",
			"",
			"1setOf (keyword | name)"
		],
		"requesting-user-uri-supported": [
			"",
			"",
			"boolean"
		],
		"save-disposition-supported": [
			"",
			"",
			"1setOf type3 keyword"
		],
		"save-document-format-default": [
			"",
			"",
			"mimeMediaType"
		],
		"save-document-format-supported": [
			"",
			"",
			"1setOf mimeMediaType"
		],
		"save-location-default": [
			"",
			"",
			"uri"
		],
		"save-location-supported": [
			"",
			"",
			"1setOf uri"
		],
		"save-name-subdirectory-supported": [
			"",
			"",
			"boolean"
		],
		"save-name-supported": [
			"",
			"",
			"boolean"
		],
		"separator-sheets-default": [
			[
				"",
				"",
				"collection"
			],
			[
				"&lt;Member attributes are the same as the \"separator-sheets\" Job Template attribute&gt;",
				"",
				""
			]
		],
		"separator-sheets-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"sheet-collate-default": [
			"",
			"",
			"type2 keyword"
		],
		"sheet-collate-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"sides-default": [
			"",
			"",
			"type2 keyword"
		],
		"sides-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"stitching-locations-supported": [
			"",
			"",
			"1setOf (integer(0:MAX) | rangeOfInteger(0:MAX))"
		],
		"stitching-offset-supported": [
			"",
			"",
			"1setOf (integer(0:MAX) | rangeOfInteger(0:MAX))"
		],
		"subordinate-printers-supported": [
			"",
			"",
			"1setOf uri"
		],
		"uri-authentication-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"uri-security-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"user-defined-values-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"which-jobs-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"x-image-position-default": [
			"",
			"",
			"type2 keyword"
		],
		"x-image-position-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"x-image-shift-default": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-image-shift-supported": [
			"",
			"",
			"rangeOfInteger(MIN:MAX)"
		],
		"x-side1-image-shift-default": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-side1-image-shift-supported": [
			"",
			"",
			"rangeOfInteger(MIN:MAX)"
		],
		"x-side2-image-shift-default": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"x-side2-image-shift-supported": [
			"",
			"",
			"rangeOfInteger(MIN:MAX)"
		],
		"xri-authentication-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"xri-security-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"xri-uri-scheme-supported": [
			"",
			"",
			"1setOf uriScheme"
		],
		"y-image-position-default": [
			"",
			"",
			"type2 keyword"
		],
		"y-image-position-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"y-image-shift-default": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-image-shift-supported": [
			"",
			"",
			"rangeOfInteger(MIN:MAX)"
		],
		"y-side1-image-shift-default": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-side1-image-shift-supported": [
			"",
			"",
			"rangeOfInteger(MIN:MAX)"
		],
		"y-side2-image-shift-default": [
			"",
			"",
			"integer(MIN:MAX)"
		],
		"y-side2-image-shift-supported": [
			"",
			"",
			"rangeOfInteger(MIN:MAX)"
		]
	},
	"Subscription Description": {
		"notify-job-id": [
			"",
			"",
			"integer(1:MAX)"
		],
		"notify-lease-expiration-time": [
			"",
			"",
			"integer(0:MAX)"
		],
		"notify-printer-up-time": [
			"",
			"",
			"integer(1:MAX)"
		],
		"notify-printer-uri": [
			"",
			"",
			"uri"
		],
		"notify-sequence-number": [
			"",
			"",
			"integer(0:MAX)"
		],
		"notify-subscriber-user-name": [
			"",
			"",
			"name(MAX)"
		],
		"notify-subscriber-user-uri": [
			"",
			"",
			"uri"
		],
		"notify-subscription-id": [
			"",
			"",
			"integer(1:MAX)"
		],
		"subscription-uuid": [
			"",
			"",
			"uri"
		]
	},
	"Subscription Template": {
		"notify-attributes": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"notify-attributes-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"notify-charset": [
			"",
			"",
			"charset"
		],
		"notify-events": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"notify-events-default": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"notify-events-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"notify-lease-duration": [
			"",
			"",
			"integer(0:67108863)"
		],
		"notify-lease-duration-default": [
			"",
			"",
			"integer(0:67108863)"
		],
		"notify-lease-duration-supported": [
			"",
			"",
			"1setOf (integer(0: 67108863) | rangeOfInteger(0:67108863))"
		],
		"notify-max-events-supported": [
			"",
			"",
			"integer(2:MAX)"
		],
		"notify-natural-language": [
			"",
			"",
			"naturalLanguage"
		],
		"notify-pull-method": [
			"",
			"",
			"type2 keyword"
		],
		"notify-pull-method-supported": [
			"",
			"",
			"1setOf type2 keyword"
		],
		"notify-recipient-uri": [
			"",
			"",
			"uri"
		],
		"notify-schemes-supported": [
			"",
			"",
			"1setOf uriScheme"
		],
		"notify-time-interval": [
			"",
			"",
			"integer(0:MAX)"
		],
		"notify-user-data": [
			"",
			"",
			"octetString(63)"
		]
	}
};

