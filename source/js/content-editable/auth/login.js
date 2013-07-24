$('body.admin #login').live('submit', function (event)
{
	var user, pass, secret;
	
	event.preventDefault();

	user = $('#user').val();
	pass = $('#pass').val();

	$('#user').val('');
	$('#pass').val('');

	cors.post({
	  url: 'auth/login.php',
	  data: {
	  	'user': user,
	  	'pass': pass
	  },
	  success: function (response)
	  {
	  	if (typeof response.success.auth != 'undefined')
	  	{
	  		// logged in
	  		localStorage.secret = response.secret;

	  		$('body').addClass('auth');
	  		$('body.admin #status').html(response.success.auth);

	  		// content editable
	  		make_editable(true);
	  	}
	  	else
	  	{
	  		$('body.admin #status').html(response.error.join(', '))
	  	}
	  }
	});
});