$('#save-changes').live('click', function ()
{	var elements_with_content, page_id, ajax_url;

	ajax_url = 'http://logopederna.local/backend/edit-page-data.php';

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

	$.ajax({
		type: 'POST',
		url: ajax_url,
		data: {
			'secret': localStorage.secret,
			'page_id': page_id,
			'page_content': elements_with_content
		},
		dataType : 'json',
		success: function (response)
		{
			alert('vad ska hända?')
		}
	});

});