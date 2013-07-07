var page_data_url, distribute_content;

page_data_url = 'http://logopederna.local/backend/get-page-data.php';

distribute_content = function (content_json)
{
	var data, element, paragraphs, paragraph, i;

	data = jQuery.parseJSON(content_json);

	for(element in data.content)
	{
		if (typeof data.content[element] === 'string')
		{
			$('[data-content-editable=' + element + ']').html(data.content[element]);
		}
		else
		{
			paragraphs = data.content[element];
			paragraph = $('[data-content-editable=' + element + ']');

			// add content to paragraph
			paragraph.html(paragraphs[0]);

			// create new paragraphs
			for (i = paragraphs.length - 1; i > 0; i--)
			{
				paragraph.after('<p>' + paragraphs[i] + '</p>')
			}
		}
	}
}

$(document).ready(function ()
{
	var secret, page_id;

	if (localStorage.secret)
	{
		secret = localStorage.secret;
	}

	page_id = $('body').attr('class');

	$.ajax({
		type: 'POST',
		url: page_data_url,
		data: {
			'secret': secret,
			'page_id': page_id
		},
		dataType : 'json',
		success: function (response)
		{
			// has auth?
			if (response.auth)
			{
				// make admin panel available
				$('body').addClass('auth');
			}
			else if (localStorage.secret)
			{
				// session exired
				alert(response.error.auth);

				// remove secret from localstorage
				localStorage.removeItem('secret');
			}

			// has data?
			if (response.data)
			{
				distribute_content(response.data);
			}
			else
			{
				alert(response.error.data);
			}
		}
	});
});