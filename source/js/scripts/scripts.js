// Opt-in for popovers
$('a[data-toggle=popover]').popover(
	{
		trigger:'hover',
		placement:'top',
		title:'Mer om mig...'
	});

// Read more/close-buttons. Apply class .collapsed to <a>.
$('a[data-toggle="collapse"]').live('click', function() {
	if($(this).hasClass('collapsed')) {
		$(this).children(':last').addClass('hide');
		$(this).children(':first').removeClass('hide');
	} else {
		$(this).children(':first').addClass('hide');
		$(this).children(':last').removeClass('hide');
	}
});

// nav on load
$(document).ready(function() {
	var url, view, slashes;

	url = window.location.href;

	// removes eventual http://
	url = url.substring(url.lastIndexOf('.') + 1);

	slashes = url.split('/').length - 1;

	if (slashes === 2)
	{
		// http://url/path/ => path
		view = url.substring(url.indexOf('/') + 1, url.lastIndexOf('/'));
	}
	else
	{
		// http://url/path => path
		view = url.substring(url.lastIndexOf('/') + 1);
	}

	if(view.length)
	{
		if(view.indexOf('.') > -1)
		{
			view = view.substring(0, view.indexOf('.'));
		} else if(view.indexOf('#') > -1)
		{
			view = view.substring(0, view.indexOf('#'));
		}
	}
	else
	{
		view = 'index';
	}

	$('.nav #' + view).parent('li').addClass('active');
});

// tabs on load
$(document).ready(function() {
	tags();
});
$('.footer a').click(function() {
	setTimeout(function() {
		tags();
	}, 1);
});

function tags() {
	var url, tag;

	url = window.location.href;

	if(url.indexOf('#') > -1) {
		tag = url.substring(url.lastIndexOf('#'));

		$('.tab-pane').removeClass('active in');

		$(tag).addClass('active in');
	}
}