// url to send auth details
var auth_url = 'http://logopederna.local/backend/auth-login.php';


// submit login form
$('body.admin #login').live('submit', function (event)
{
	event.preventDefault();

	var user, pass, secret;

	if (typeof localStorage.secret != 'undefined')
	{
		secret = localStorage.secret;
	}

	user = $('#user').val();
	pass = $('#pass').val();

	$.ajax({
	  type: 'POST',
	  url: auth_url,
	  data: {
	  	'user': user,
	  	'pass': pass,
	  	'secret': secret
	  },
	  dataType : 'json',
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