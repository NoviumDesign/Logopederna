// modal
$('body.auth .edit-event').live('click', function ()
{
	var id;

	id = $(this).data('event-id');

	$('#event-modal').attr('data-which', 'edit-event');
	$('#event-modal-label').html('Redigera händelse');
	$('#event-modal-submit').attr('data-event-id', id);

	$.ajax({
		type: 'POST',
		url: 'event/get.php',
		data: {
			'event_id': id 
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
				var data = jQuery.parseJSON(response.data);

				$('#event-title').html(data.title);
				$('#event-lead').html(data.lead);
				$('#event-text').html(data.text);
				$('#event-how').html(data.how);
				$('#event-registration').html(data.registration);
				$('#event-start').val(data.start_date);
				$('#event-end').val(data.end_date);
			}
			else
			{
				$('#event-modal').modal('hide');
			}

		}
	});
});

$('body.auth #event-modal[data-which=edit-event] #event-modal-submit').live('click', function ()
{
	var event_title, event_lead, event_text, event_how, event_registration, event_start, event_end, ajax_url, event_id;

	ajax_url = 'http://logopederna.local/backend/event/edit.php';

	event_id = $(this).data('event-id');

	event_title = $('#event-title').text();
	event_lead = $('#event-lead').text();
	event_text = $('#event-text').text();
	event_how = $('#event-how').text();
	event_registration = $('#event-registration').text();
	event_start = $('#event-start').val();
	event_end = $('#event-end').val();

	if (event_title && event_lead && event_text && event_start)
	{
		$.ajax({
			type: 'POST',
			url: ajax_url,
			data: {
				'secret': localStorage.secret,
				'title': event_title,
				'lead': event_lead,
				'text': event_text,
				'how': event_how,
				'registration': event_registration,
				'start': event_start,
				'end': event_end,
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

					// close modal
					$('#event-modal').modal('hide');
				}
			}
		});
	}
	else
	{
		alert('Du måste åtmistone ange en rubrik, en ingress, en allmän text samt ett startdatum!')
	}
});