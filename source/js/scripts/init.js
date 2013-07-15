// URL to backend root
var BACKEN_URL = 'http://logopederna.local/backend/';

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