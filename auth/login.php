<?php
	// headers
	include('../configs/headers.php');

	// get Auth class
	include('../lib/Auth.php');
	$auth = new Auth();

	// get login details
	$configs = parse_ini_file('../configs/application.ini', 'true');
	$login = $configs['login_details'];

	// output array
	$output = array('error' => '', 'success' => '', 'secret' => '');

	if (isset($_POST['secret']) && $auth->check_session($_POST['secret']))
	{
		// allready logged in
		$output['error'][] = 'Du är redan inloggad';
	}
	else
	{
		if ( ! isset($_POST['user']) OR ! isset($_POST['pass']))
		{
			// invalid data set
			$output['error'][] = 'Felaktig data skickad till servern';
		}
		else
		{
			if ($login['user'] !== $_POST['user'] OR $login['pass'] !== $_POST['pass'])
			{
				// invalid information
				$output['error'][] = 'Felaktig inloggningsinformation angiven';
			}
			else
			{
				// logged in
				$my_secret = $auth->new_session();

				$output['secret'] = $my_secret;
				$output['success']['auth'] = 'Inloggningen lyckades!';
			}
		}
	}
		
	// output array as json
	echo json_encode($output);