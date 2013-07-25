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
	  	'pass': pass,
	  	'secret': localStorage.secret  // without "allready logged in" wont show when you hit submit again
	  },
	  success: function (response)
	  {

	  	$('body.admin #status').removeClass('hide alert-error alert-success');


	  	if (typeof response.success.auth != 'undefined')
	  	{
	  		// logged in
	  		localStorage.secret = response.secret;

	  		$('body').addClass('auth');
	  		$('body.admin #status').html(response.success.auth);
	  		$('body.admin #status').addClass('alert-success');

	  		// content editable
	  		make_editable(true);
	  	}
	  	else
	  	{
	  		$('body.admin #status').html(response.error.join(', '))
	  		$('body.admin #status').addClass('alert-error');
	  	}
	  }
	});
});