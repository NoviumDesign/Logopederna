// URL to backend root
var BACKEN_URL = 'http://54.217.236.59/';

$.ajaxSetup({
	beforeSend: function (xhr, request)
	{
		// prepends base path
		request.url = BACKEN_URL + request.url;
	},
	data:
	{
		// adds status
		secret: localStorage.secret
	},
	// set data type as json
	dataType: 'json'
});