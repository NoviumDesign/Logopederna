// url to send secret
var auth_logout_url = 'http://logopederna.local/backend/auth-logout.php';

$('#logout').live('click', function (event)
{
	event.preventDefault();

	$.ajax({
		type: 'POST',
		url: auth_logout_url,
		data: {
			'secret': localStorage.secret
		},
		dataType : 'json',
		success: function ()
		{
			localStorage.removeItem('secret');

			$('body').removeClass('auth');

			// unavailable
			make_editable(false);
		}
	});	
});