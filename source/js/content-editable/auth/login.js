var create_admin_stuffs = function ()
{
	$('body').addClass('auth');

	$('body').append(
'<div id="admin-panel" class="pageadd hide">' +
    '<div class="btn-group btn-group-vertical">' +
        '<a href="#event-modal" data-toggle="modal">' +
            '<button id="new-event" class="btn btn-success hide">' +
                '<i class="icon-plus icon-white"></i>' +
            '</button>' +
        '</a>' +
        '<a id="save-changes" class="btn">' +
            '<i class="icon-ok"></i>' +
        '</a>' +
        '<a data-toggle="dropdown" class="btn dropdown-toggle">' +
            '<i class="icon-user"></i>' +
        '</a>' +
        '<ul class="dropdown-menu nav nav-list">' +
            '<li class="nav-header">Kontoinställningar</li>' +
            '<li>' +
                '<a href="#" id="logout">Logga ut</a>' +
            '</li>' +
        '</ul>' +
    '</div>' +
'</div>' +
'<div id="event-modal" class="modal hide fade" tabindex="-1" role="dialog">' +
    '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h3 id="event-modal-label"></h3>' +
    '</div>' +
    '<div class="modal-body">' +
        '<div class="span6">' +
            '<h2 id="event-title" contenteditable>Rubrik</h2>' +
            '<p id="event-lead" class="eventlead" contenteditable>' +
                'Ingress' +
            '</p>' +
            '<p id="event-text" contenteditable>' +
                'Allmänt om händelsen' +
            '</p>' +
            '<h6>Tid och plats</h6>' +
            '<p id="event-how" contenteditable>' +
                '' +
            '</p>' +
            '<h6>Anmälan</h6>' +
            '<p id="event-registration" contenteditable>' +
            '</p>' +
            '<div class="control-group">' +
                '<label class="control-label" for="event-start">Börjar</label>' +
                '<div class="controls">' +
                    '<input type="text" id="event-start" class="datepicker" placeholder="yyyy-mm-dd hh:mm">' +
                '</div>' +
            '</div>' +
            '<div class="control-group">' +
                '<label class="control-label" for="event-end">Slutar</label>' +
                '<div class="controls">' +
                    '<input type="text" id="event-end" class="datepicker" placeholder="yyyy-mm-dd hh:mm">' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
        '<button class="btn" data-dismiss="modal" aria-hidden="true">Stäng</button>' +
        '<button id="event-modal-submit" class="btn btn-primary">Spara</button>' +
    '</div>' +
'</div>'
	);

    // init datepicker
    $(function() {
        $( ".datepicker" ).datetimepicker({
            minDate: 0,
            hourMin: 6,
            hourMax: 24,
            stepMinute: 10,
            currentText: 'Aktuell tid',
            closeText: 'Klar',
            timeOnlyTitle: 'Önskad leveranstid',
            timeText: 'Tid',
            hourText: 'Timma',
            minuteText: 'Minut'
        });
    });
}

$('body.admin #login').live('submit', function (event)
{
	var user, pass, secret;
	
	event.preventDefault();

	user = $('#user').val();
	pass = $('#pass').val();

	$('#user').val('');
	$('#pass').val('');

	cors.post({
	  url: 'auth/login.php',
	  data: {
	  	'user': user,
	  	'pass': pass,
	  	'secret': localStorage.secret  // without "allready logged in" wont show when you hit submit again
	  },
	  success: function (response)
	  {

	  	$('body.admin #status').removeClass('hide alert-error alert-success');


	  	if (typeof response.success.auth != 'undefined')
	  	{
	  		// logged in
	  		localStorage.secret = response.secret;

            // ajax settings
            ajax_settings();

	  		create_admin_stuffs();

	  		$('body.admin #status').html(response.success.auth);
	  		$('body.admin #status').addClass('alert-success');

	  		// content editable
	  		make_editable(true);
	  	}
	  	else
	  	{
	  		$('body.admin #status').html(response.error.join(', '))
	  		$('body.admin #status').addClass('alert-error');
	  	}
	  }
	});
});