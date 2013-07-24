var make_editable = function (bool)
{
	if(bool === true)
	{
		// make editable
		$('[data-content-editable]').attr('contenteditable', '');

	}
	else
	{
		// make uneditable
		$('[data-content-editable]').removeAttr('contenteditable');
	}
}

// changed data
var change_content = false;
$(window).bind('beforeunload', function(){
	if (change_content)
	{
		return 'Vi har märkt att du kan ha ändrat på lite information. Är du säker på att du vill lämna sidan utan att spara dessa eventuella ändringar?';
	}
});

// prevent built in styling
$('[contenteditable]').live('keydown', function (event)
{
	// not a modal
	if ( ! change_content && typeof $(this).parents('#event-modal')[0] == 'undefined') {
		change_content = true;
	}

	if (event.ctrlKey)
	{
		if (event.keyCode === 66 || event.keyCode === 85 || event.keyCode === 73)
		{
			// bold, italic or underline preventer
			event.preventDefault();

			// inner html = inner text
			$(this).html($(this).text());
		}
		else if (event.keyCode === 86)
		{
			// paste, remove all tags

			var that = $(this);
			setTimeout(function ()
				{
					// inner html = inner text
					that.html(that.text());
				}, 0);
		}
	}

	if (event.keyCode === 13)
	{
		// space
		event.preventDefault();
	}
});

$('[contenteditable]').live('paste', function (event)
{
	// works for both, but better safe than sorry... ;)
	var that = $(this);
	setTimeout(function ()
		{
			// inner html = inner text
			that.html(that.text());
		}, 0);
});


$('#save-changes').live('click', function ()
{	
	var elements_with_content, page_id;

	elements_with_content = {};
	page_id = $('body').attr('id');

	$('body.auth [data-content-editable]').each(function ()
	{
		var index, content, paragraph, i;

		index = $(this).data('content-editable');

		if ($(this).is('p'))
		{
			content = {};
			content[0] = $(this).html();
			paragraph = $(this).next();

			i = 1;
			while (paragraph.is('p') && ! paragraph.is('[data-content-editable]'))
			{
				content[i++] = paragraph.html();
				paragraph = paragraph.next();
			}
		}
		else
		{
			content = $(this).html();
		}

		elements_with_content[index] = content;
	});

	cors.post({
		url: 'page-data/edit.php',
		data: {
			'page_id': page_id,
			'page_content': elements_with_content
		},
		success: function (response)
		{
			if (response.data)
			{
				// reset
				change_content = false;

				alert('Ändringarna sparade!')
				
				distribute_content(response.data);
			}

			if ( ! response.auth)
			{
				localStorage.removeItem('secret');
			}

			if (response.error)
			{
				for (i in response.error)
				{
					alert(response.error[i])
				}
			}
		}
	});

});