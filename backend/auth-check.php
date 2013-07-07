<?php

	// get Auth class
	include('Auth.php');
	$auth = new Auth();

	// output array
	$output = array('error' => '', 'success' => '');

	if (isset($_POST['secret']) && $auth->check_session($_POST['secret']))
	{
		// logged in
		$output['success']['auth'] = true;
	}
	else
	{
		$output['error'][] = 'Din inloggningssession har gått ut och du är därmed inte längre inloggad.';
	}
		
	// output array as json
	echo json_encode($output);