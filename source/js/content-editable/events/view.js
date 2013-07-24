var render_event_list, render_promo_event, get_all_events;

// trim event
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

render_event_list = function (events)
{
	var data, html, how, registration, first, collapse, collapse_trigger, event_options;

	// clear event list
	$('#event-list').html('')

	first = true;
	for (id in events)
	{
		// parse json
		data = jQuery.parseJSON(events[id]);

		how = '';
		if (data.how.trim())
		{
			how = '<h6>Tid och plats</h6>' +  '<p>' + data.how + '</p>';
		}

		registration = '';
		if (data.registration.trim())
		{
			registration = '<h6>Anmälan</h6>' +  '<p>' + data.registration + '</p>';
		}

		// parts
		html = 
			'<div class="row event">' +
				'<div class="span12" style="position:relative">';

		collapse = 
			'<div id="collapse-' + id + '" class="collapse">' +
				'<p>' + data.text + '</p>' +
				how +
				registration +
			'</div>';

		collapse_trigger =
			'<a data-toggle="collapse" href="#collapse-' + id + '" class="btn collapsed">' +
				'<span>Läs mer...</span>' +
				'<span class="hide">Stäng</span>' +
			'</a>';

		event_options = 
			'<a href="#event-modal" data-toggle="modal" class="btn btn-warning edit-event" data-event-id="' + id + '">' +
				'<i class="icon-edit icon-white"></i>' +
			'</a>' +
			'<a class="btn btn-danger delete-event" data-event-id="' + id + '">' +
				'<i class="icon-remove icon-white"></i>' +
			'</a>';

		if (first)
		{
			first = false;

			// promoted
			html += 
					'<div class="event apps">' +
						event_options +
						'<p>' + data.when + '</p>' +
						'<h2 class="promoted">' + data.title + '</h2>' +
						'<p class="eventlead">' + data.lead + '</p>' +
						collapse_trigger +
					'</div>' +
				'</div>' +
				'<div class="span6">' +
					collapse;
	}
		else
		{
			// normal event
			html += 
				event_options +
				'<p>' + data.when + '</p>' +
				'<h2>' + data.title + '</h2>' +
				'<p class="eventlead">' + data.lead + '</p>' +
				collapse +
				collapse_trigger;
		}

		html += 
				'</div>' +
			'</div>';

		$('#event-list').append(html);
	}
}

get_all_events = function ()
{
	page_id = $('body').attr('class');

	cors.post({
		url: 'events/get.php',
		data: {
			'test': 'est'
		},
		success: function (response)
		{
			if (response.error.auth)
			{
				// session exired
				alert(response.error.auth);

				// remove secret from localstorage
				localStorage.removeItem('secret');
			}

			if (response.data)
			{
				render_event_list(response.data);
			}
		}
	});
}

$(document).ready(function ()
{
	if ($('body').is('#utbildning')) {
		get_all_events();
	}
});