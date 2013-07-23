<?php
	// headers
	include('../configs/headers.php');

	// get Auth class
	include('../lib/Auth.php');
	$auth = new Auth();

	if (isset($_POST['secret']) && $auth->check_session($_POST['secret']))
	{
		// delete from db
		$auth->delete_session($_POST['secret']);
	}