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
	var url, view;

	url = window.location.href;
	view = url.substring(url.lastIndexOf('/') + 1);

	if(view.length) {
		if(view.indexOf('.') > -1) {
			view = view.substring(0, view.indexOf('.'));
		} else if(view.indexOf('#') > -1) {
			view = view.substring(0, view.indexOf('#'));
		}
	} else {
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

	$('.tab-pane').not('.default-tab').removeClass('active in');

	if(url.indexOf('#') > -1) {
		tag = url.substring(url.lastIndexOf('#'));

		$(tag).addClass('active in');
	}
}