// modal
$('body.auth #new-event').live('click', function ()
{
	$('#event-modal').attr('data-which', 'new-event');
	$('#event-modal-label').html('Ny händelse');

	// reset fields
	$('#event-title').html('Rubrik');
	$('#event-lead').html('Ingress');
	$('#event-text').html('Allmänt om händelsen');
	$('#event-how').html('');
	$('#event-registration').html('');
	$('#event-start').val('');
	$('#event-end').val('');
});


$('body.auth #event-modal[data-which=new-event] #event-modal-submit').live('click', function ()
{
	var event_title, event_lead, event_text, event_how, event_registration, event_start, event_end;

	event_title = $('#event-title').text();
	event_lead = $('#event-lead').text();
	event_text = $('#event-text').text();
	event_how = $('#event-how').text();
	event_registration = $('#event-registration').text();
	event_start = $('#event-start').val();
	event_end = $('#event-end').val();

	if (event_title && event_lead && event_text && event_start)
	{
		cors.post({
			url: 'event/new.php',
			data: {
				'title': event_title,
				'lead': event_lead,
				'text': event_text,
				'how': event_how,
				'registration': event_registration,
				'start': event_start,
				'end': event_end
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