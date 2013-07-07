// url to send secret
var auth_check_url = 'http://logopederna.local/backend/auth-check.php';

$(document).ready(function ()
{
	if (localStorage.secret && localStorage.secret != 'undefined')
	{
		// secret exist, logged in?
		secret = localStorage.secret;

		$.ajax({
			type: 'POST',
			url: auth_check_url,
			data: {
				'secret': secret
			},
			dataType : 'json',
			success: function (response)
			{
				if (typeof response.success.auth == 'undefined')
				{
					// session exired
					alert(response.error.join(', '));

					// remove secret from localstorage
					localStorage.removeItem('secret');
				}
				else
				{
					$('body').addClass('auth');
				}
			}
		});
	}
});