$('body.admin #login').live('submit', function (event)
{
	var user, pass, secret, ajax_url;

	ajax_url = 'http://logopederna.local/backend/auth/login.php';
	
	event.preventDefault();

	user = $('#user').val();
	pass = $('#pass').val();

	$.ajax({
	  type: 'POST',
	  url: ajax_url,
	  data: {
	  	'user': user,
	  	'pass': pass,
	  	'secret': localStorage.secret
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