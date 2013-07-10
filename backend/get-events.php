<?php

	// get Auth class
	include('Auth.php');
	$auth = new Auth();

	// get Content class
	include('Event.php');
	$event = new Event();

	// output array
	$output = array('error' => false, 'auth' => false, 'data' => false);

	// check auth
	if (isset($_POST['secret']))
	{	
		// secret exist on client
		if ($auth->check_session($_POST['secret']))
		{
			// auth still exist
			$output['auth'] = true;
		}
		else
		{
			$output['error']['auth'] = 'Din inloggningssession har gått ut och du är därmed inte längre inloggad.';
		}
	}

	// get events
	if ($output['auth'])
	{
		$output['data'] = $event->get_all(true);
	}
	else
	{
		$output['data'] = $event->get_all(false);
	}
	
		
	// output array as json
	echo json_encode($output);