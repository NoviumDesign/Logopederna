// ajax settings
$.ajaxSetup({
	beforeSend: function (xhr, request)
	{
		// prepends base path
		request.url = BACKEN_URL + '/' + request.url;
	},
	data:
	{
		// adds status
		secret: localStorage.secret
	},
	// set data type as json
	dataType: 'json'
});

cors.beforeSend = function ()
{
	// append secret to send
	if (localStorage.secret !== 'undefined' && localStorage.secret)
	{
		if (this.data !== 'undefined' && this.data)
		{
			this.data.secret = localStorage.secret;
		}
		else
		{
			this.data = {};
			this.data.secret = localStorage.secret;
		}
	}

    // apend backend url
    this.url = BACKEN_URL + '/' + this.url;
}