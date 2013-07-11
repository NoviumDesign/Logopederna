// modal
$('body.auth #new-event').live('click', function ()
{
	$('#event-modal').attr('data-which', 'new-event');
	$('#event-modal-label').html('Ny händelse');
});


$('body.auth #event-modal[data-which=new-event] #event-modal-submit').live('click', function ()
{
	var event_title, event_lead, event_text, event_how, event_registration, event_start, event_end, ajax_url;

	ajax_url = 'http://logopederna.local/backend/event-new.php';

	event_title = $('#event-title').text();
	event_lead = $('#event-lead').text();
	event_text = $('#event-text').text();
	event_how = $('#event-how').text();
	event_registration = $('#event-registration').text();
	event_start = $('#event-start').val();
	event_end = $('#event-end').val();

	console.log(event_title, event_lead, event_text, event_how, event_registration, event_start, event_end)

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
				'end': event_end
			},
			dataType : 'json',
			success: function (response)
			{
				console.log(response)
				alert('nu? tomt fält how och registration med!!! logout old event .only-admin!')
			}
		});
	}
	else
	{
		alert('Du måste åtmistone ange en rubrik, en ingress, en allmän text samt ett startdatum!')
	}

});