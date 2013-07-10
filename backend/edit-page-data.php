<?php

	// get Auth class
	include('Auth.php');
	$auth = new Auth();

	// get Content class
	include('Page_data.php');
	$page_data = new Page_data();

	// html entities ...
	include('secure_strings.php');

	// output array
	$output = array('error' => false, 'auth' => false, 'data' => false);

	if (isset($_POST['secret']))
	{	
		// secret exist on client
		if ($auth->check_session($_POST['secret']))
		{
			$output['auth'] = true;

			if (isset($_POST['page_id']) && isset($_POST['page_content']))
			{
				$this_page_data = array();

				$this_page_data['time'] = time();
				$this_page_data['content'] = secure_strings($_POST['page_content']);

				$page_data->set($_POST['page_id'], json_encode($this_page_data));

				// sends back the data for update
				$output['data'] = json_encode($this_page_data);
			}
			else
			{
				$output['error']['parameters'] = 'Inte tillräckligt med information skickad';
			}
		}
		else
		{
			$output['error']['auth'] = 'Din inloggningssession har gått ut och du är därmed inte längre inloggad. Men sörj ej, öppna bara en ny flik och logga in där, sedan ska det funka att spara dina ändringar! ;)';
		}
	}
	else
	{
		$output['error']['auth'] = 'Du måste vara inloggad för att redigera en sida!';
	}
		
	// output array as json
	echo json_encode($output);