var render_event;

render_event = function (content_json)
{
	var data, html;

	data = jQuery.parseJSON(content_json);

	html = 
		'<div class="row">' +
			'<div class="span12" style="position:relative">' +
				'<a href="#event-modal" data-toggle="modal" class="btn btn-warning edit-event">' +
					'<i class="icon-edit icon-white"></i>' +
				'</a>' +
				'<p>' + data.when + '</p>' +
				'<h2>' + data.title + '</h2>' +
				'<p class="eventlead">' + data.lead + '</p>' +
				'<div id="collapse-' + data.time + '" class="collapse">' +
					'<p>' + data.text + '</p>' +
					'<h6>Tid och plats</h6>' +
					'<p>' + data.how + '</p>' +
					'<h6>Anmälan</h6>' +
					'<p>' + data.registration + '</p>' +
				'</div>' +
				'<a data-toggle="collapse" href="#collapse-' + data.time + '" class="btn collapsed">' +
					'<span>Läs mer...</span>' +
					'<span class="hide">Stäng</span>' +
				'</a>' +
			'</div>' +
		'</div>';

	$('#events').append(html);
}

$(document).ready(function ()
{
	var ajax_url;

	ajax_url = 'http://logopederna.local/backend/get-events.php';

	page_id = $('body').attr('class');

	$.ajax({
		type: 'POST',
		url: ajax_url,
		data: {
			'secret': localStorage.secret
		},
		dataType : 'json',
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
				for (i in response.data)
				{
					render_event(response.data[i]);
				}
			}
		}
	});
});