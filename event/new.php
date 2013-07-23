<?php

	// get Auth class
	include('../lib/Auth.php');
	$auth = new Auth();

	// get Content class
	include('../lib/Event.php');
	$event = new Event();

	// html entities ...
	include('../lib/secure_strings.php');

	// output array
	$output = array('error' => false, 'auth' => false, 'data' => false);

	if (isset($_POST['secret']))
	{	
		// secret exist on client
		if ($auth->check_session($_POST['secret']))
		{
			$output['auth'] = true;

			// htmlentities
			$secured_post = secure_strings($_POST);

			// make timestamp
			$event_start = strtotime($secured_post['start']);
			if ($secured_post['end'])
			{
				$event_end = strtotime($secured_post['end']);
			}
			else
			{
				$event_end = $event_start;
			}

			// when
			$when = $event->when($event_start, $event_end);

			$this_event_data = array(
				'title' => $secured_post['title'],
				'lead' => $secured_post['lead'],
				'text' => $secured_post['text'],
				'how' => $secured_post['how'],
				'registration' => $secured_post['registration'],
				'start' => $event_start,
				'end' => $event_end,
				'time' => time(),
				'when' => $when,
				'start_date' => $secured_post['start'],
				'end_date' => $secured_post['end']
				);

			$event->create($this_event_data);

			// sends back the data for update
			$output['data'] = $event->get_all(true);	
		}
		else
		{
			$output['error']['auth'] = 'Din inloggningssession har gått ut och du är därmed inte längre inloggad. Men sörj ej, öppna bara en ny flik och logga in där, sedan ska det funka att spara dina ändringar! ;)';
		}
	}
	else
	{
		$output['error']['auth'] = 'Du måste vara inloggad för att skapa en händelse!';
	}
		
	// output array as json
	echo json_encode($output);