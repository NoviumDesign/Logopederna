$('#logout').live('click', function (event)
{
	var ajax_url;

	event.preventDefault();

	$.ajax({
		type: 'POST',
		url: 'auth/logout.php',
		success: function ()
		{
			localStorage.removeItem('secret');

			$('body').removeClass('auth');

			// unavailable
			make_editable(false);
		}
	});	
});