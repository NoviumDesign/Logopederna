<?php

	// get Auth class
	include('../lib/Auth.php');
	$auth = new Auth();

	// get Content class
	include('../lib/Event.php');
	$event = new Event();


	// output array
	$output = array('error' => false, 'auth' => false, 'data' => false);

	if (isset($_POST['secret']))
	{	
		// secret exist on client
		if ($auth->check_session($_POST['secret']))
		{
			$output['auth'] = true;

			if ($_POST['event_id'])
			{
				$data = $event->get($_POST['event_id']);

				// sends back event
				$output['data'] = $data;
			}
			else
			{
				$output['error']['data'] = 'Du har inte skickat tillräckligt med information';
			}	
		}
		else
		{
			$output['error']['auth'] = 'Din inloggningssession har gått ut och du är därmed inte längre inloggad.';
		}
	}
	else
	{
		$output['error']['auth'] = 'Du måste vara inloggad för att redigera en händelse!';
	}
		
	// output array as json
	echo json_encode($output);