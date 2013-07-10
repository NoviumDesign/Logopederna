$('body.auth .delete-event').live('click', function ()
{
	var event_id, ajax_url, event_html;

	ajax_url = 'http://logopederna.local/backend/event/delete.php';

	event_id = $(this).data('event-id');

	event_html = $(this).parents('.event');

	$.ajax({
		type: 'POST',
		url: ajax_url,
		data: {
			'secret': localStorage.secret,
			'event_id': event_id 
		},
		dataType : 'json',
		success: function (response)
		{
			if ( ! response.auth)
			{
				alert(response.error.auth);

				localStorage.removeItem('secret');
			}
			else if (response.error)
			{
				alert(response.error.join(', '));
			}

			if (response.data)
			{
				// render events
				render_event_list(response.data);
			}
		}
	});
});