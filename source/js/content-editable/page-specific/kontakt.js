var render_kontakt = function ()
{
	$('.portrait').each(function ()
	{
		var name, mail, anchor;

		anchor = $(this).find('a');
		name = anchor.text();
		mail = $(this).find('[itemprop=email-hidden]').text();

		anchor.attr('href', 'mailto:' + mail);
		anchor.attr('data-content', 'För att maila mig, klicka på mitt namn eller skriv till ' + mail);
		anchor.attr('data-original-title', name);
	});

}