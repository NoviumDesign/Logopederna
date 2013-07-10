$('#logout').live('click', function (event)
{
	var ajax_url;

	ajax_url = 'http://logopederna.local/backend/auth/logout.php';

	event.preventDefault();

	$.ajax({
		type: 'POST',
		url: ajax_url,
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