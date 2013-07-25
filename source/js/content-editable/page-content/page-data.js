var distribute_content;

distribute_content = function (content_json)
{
	var data, element, paragraphs, paragraph, i, function_name, template;

	data = jQuery.parseJSON(content_json);

	// if edit, then delete all second paragraphs

	$('body [data-content-editable=""]').each(function ()
	{
		$(this).remove();
	});

	for(element in data.content)
	{
		if (typeof data.content[element] === 'string')
		{
			$('[data-content-editable=' + element + ']').html(data.content[element]);
			$('[data-content=' + element + ']').html(data.content[element]);
		}
		else
		{
			paragraphs = data.content[element];
			paragraph = $('[data-content-editable=' + element + ']');

			template = paragraph.clone().attr('data-content-editable', '').html('');

			// add content to paragraph
			paragraph.html(paragraphs[0]);

			// create new paragraphs
			for (i = paragraphs.length - 1; i > 0; i--)
			{
				paragraph.after(template.html(paragraphs[i]));
			}
		}
	}

	// functions for specific page
	function_name = 'render_' + $('body').attr('id').replace(/-/g, '_');

	if (typeof window[function_name] == 'function')
	{
		window[function_name]();
	}

}

$(document).ready(function ()
{
	var secret, page_id;

	page_id = $('body').attr('id');

	cors.post({
		url: 'page-data/get.php',
		data: {
			'page_id': page_id
		},
		success: function (response)
		{
			// has auth?
			if (response.auth)
			{
				// make admin panel available
				$('body').addClass('auth');
				make_editable(true);
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
			else if(response.error)
			{
				alert(response.error.data);
			}
		}
	});
});