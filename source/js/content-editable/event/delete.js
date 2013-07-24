$('body.auth .delete-event').live('click', function ()
{
	var event_id, event_html;

	event_id = $(this).data('event-id');

	event_html = $(this).parents('.event');

	cors.post({
		url: 'event/delete.php',
		data: {
			'event_id': event_id 
		},
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