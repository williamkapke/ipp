
var xref = require('./ipputil').xref;

var status = [];
/* Success 0x0000 - 0x00FF */
status[0x0000] = 'successful-ok';										//http://tools.ietf.org/html/rfc2911#section-13.1.2.1
status[0x0001] = 'successful-ok-ignored-or-substituted-attributes';		//http://tools.ietf.org/html/rfc2911#section-13.1.2.2 & http://tools.ietf.org/html/rfc3995#section-13.5
status[0x0002] = 'successful-ok-conflicting-attributes';				//http://tools.ietf.org/html/rfc2911#section-13.1.2.3
status[0x0003] = 'successful-ok-ignored-subscriptions';					//http://tools.ietf.org/html/rfc3995#section-12.1
status[0x0004] = 'successful-ok-ignored-notifications';					//http://tools.ietf.org/html/draft-ietf-ipp-indp-method-05#section-9.1.1    did not get standardized
status[0x0005] = 'successful-ok-too-many-events';						//http://tools.ietf.org/html/rfc3995#section-13.4
status[0x0006] = 'successful-ok-but-cancel-subscription';				//http://tools.ietf.org/html/draft-ietf-ipp-indp-method-05#section-9.2.2    did not get standardized
status[0x0007] = 'successful-ok-events-complete';						//http://tools.ietf.org/html/rfc3996#section-10.1

status[0x0400] = 'client-error-bad-request';							//http://tools.ietf.org/html/rfc2911#section-13.1.4.1
status[0x0401] = 'client-error-forbidden';								//http://tools.ietf.org/html/rfc2911#section-13.1.4.2
status[0x0402] = 'client-error-not-authenticated';						//http://tools.ietf.org/html/rfc2911#section-13.1.4.3
status[0x0403] = 'client-error-not-authorized';							//http://tools.ietf.org/html/rfc2911#section-13.1.4.4
status[0x0404] = 'client-error-not-possible';							//http://tools.ietf.org/html/rfc2911#section-13.1.4.5
status[0x0405] = 'client-error-timeout';								//http://tools.ietf.org/html/rfc2911#section-13.1.4.6
status[0x0406] = 'client-error-not-found';								//http://tools.ietf.org/html/rfc2911#section-13.1.4.7
status[0x0407] = 'client-error-gone';									//http://tools.ietf.org/html/rfc2911#section-13.1.4.8
status[0x0408] = 'client-error-request-entity-too-large';				//http://tools.ietf.org/html/rfc2911#section-13.1.4.9
status[0x0409] = 'client-error-request-value-too-long';					//http://tools.ietf.org/html/rfc2911#section-13.1.4.1
status[0x040A] = 'client-error-document-format-not-supported';			//http://tools.ietf.org/html/rfc2911#section-13.1.4.11
status[0x040B] = 'client-error-attributes-or-values-not-supported';		//http://tools.ietf.org/html/rfc2911#section-13.1.4.12 & http://tools.ietf.org/html/rfc3995#section-13.2
status[0x040C] = 'client-error-uri-scheme-not-supported';				//http://tools.ietf.org/html/rfc2911#section-13.1.4.13 & http://tools.ietf.org/html/rfc3995#section-13.1
status[0x040D] = 'client-error-charset-not-supported';					//http://tools.ietf.org/html/rfc2911#section-13.1.4.14
status[0x040E] = 'client-error-conflicting-attributes';					//http://tools.ietf.org/html/rfc2911#section-13.1.4.15
status[0x040F] = 'client-error-compression-not-supported';				//http://tools.ietf.org/html/rfc2911#section-13.1.4.16
status[0x0410] = 'client-error-compression-error';						//http://tools.ietf.org/html/rfc2911#section-13.1.4.17
status[0x0411] = 'client-error-document-format-error';					//http://tools.ietf.org/html/rfc2911#section-13.1.4.18
status[0x0412] = 'client-error-document-access-error';					//http://tools.ietf.org/html/rfc2911#section-13.1.4.19
status[0x0413] = 'client-error-attributes-not-settable';				//http://tools.ietf.org/html/rfc3380#section-7.1
status[0x0414] = 'client-error-ignored-all-subscriptions';				//http://tools.ietf.org/html/rfc3995#section-12.2
status[0x0415] = 'client-error-too-many-subscriptions';					//http://tools.ietf.org/html/rfc3995#section-13.2
status[0x0416] = 'client-error-ignored-all-notifications';				//http://tools.ietf.org/html/draft-ietf-ipp-indp-method-06#section-9.1.2    did not get standardized
status[0x0417] = 'client-error-client-print-support-file-not-found';	//http://tools.ietf.org/html/draft-ietf-ipp-install-04#section-10.1         did not get standardized
status[0x0418] = 'client-error-document-password-error';				//ftp://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippjobprinterext3v10-20120420.pdf     did not get standardized
status[0x0419] = 'client-error-document-permission-error';				//ftp://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippjobprinterext3v10-20120420.pdf     did not get standardized
status[0x041A] = 'client-error-document-security-error';				//ftp://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippjobprinterext3v10-20120420.pdf     did not get standardized
status[0x041B] = 'client-error-document-unprintable-error';				//ftp://ftp.pwg.org/pub/pwg/ipp/wd/wd-ippjobprinterext3v10-20120420.pdf     did not get standardized
/* Server error 0x0500 - 0x05FF */
status[0x0500] = 'server-error-internal-error';							//http://tools.ietf.org/html/rfc2911#section-13.1.5.1
status[0x0501] = 'server-error-operation-not-supported';				//http://tools.ietf.org/html/rfc2911#section-13.1.5.2
status[0x0502] = 'server-error-service-unavailable';					//http://tools.ietf.org/html/rfc2911#section-13.1.5.3
status[0x0503] = 'server-error-version-not-supported';					//http://tools.ietf.org/html/rfc2911#section-13.1.5.4
status[0x0504] = 'server-error-device-error';							//http://tools.ietf.org/html/rfc2911#section-13.1.5.5
status[0x0505] = 'server-error-temporary-error';						//http://tools.ietf.org/html/rfc2911#section-13.1.5.6
status[0x0506] = 'server-error-not-accepting-jobs';						//http://tools.ietf.org/html/rfc2911#section-13.1.5.7
status[0x0507] = 'server-error-busy';									//http://tools.ietf.org/html/rfc2911#section-13.1.5.8
status[0x0508] = 'server-error-job-canceled';							//http://tools.ietf.org/html/rfc2911#section-13.1.5.9
status[0x0509] = 'server-error-multiple-document-jobs-not-supported';	//http://tools.ietf.org/html/rfc2911#section-13.1.5.10
status[0x050A] = 'server-error-printer-is-deactivated';					//http://tools.ietf.org/html/rfc3998#section-5.1
status[0x050B] = 'server-error-too-many-jobs';							//ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobext10-20031031-5100.7.pdf
status[0x050C] = 'server-error-too-many-documents';						//ftp://ftp.pwg.org/pub/pwg/candidates/cs-ippjobext10-20031031-5100.7.pdf

module.exports = xref(status);
