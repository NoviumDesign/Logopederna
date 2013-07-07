<?php

	// get Auth class
	include('Auth.php');
	$auth = new Auth();

	// get Content class
	include('Page_data.php');
	$page_data = new Page_data();

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


	// get page data
	if (isset($_POST['page_id']))
	{
		// check with db for data
		$this_page_data = $page_data->get($_POST['page_id']);

		if ($this_page_data)
		{
			$output['data'] = $this_page_data;
		}
		else
		{
			$output['error']['data'] = 'Det gick inte att hämta något innehåll till denna sida.';
		}
	}
	
		
	// output array as json
	echo json_encode($output);