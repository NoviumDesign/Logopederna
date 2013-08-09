<?php
// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

/*
 * jQuery < 1.4.0 adds an X-Requested-With header which requires pre-flighting

 * requests. This involves an OPTIONS request before the actual GET/POST to 

 * make sure the client is allowed to send the additional headers.
 * We declare what additional headers the client can send here.

 */

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With');


// Exit early so the page isn't fully loaded for options requests
if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}


// If raw post data, this could be from IE8 XDomainRequest
// Only use this if you want to populate $_POST in all instances
if (isset($HTTP_RAW_POST_DATA)) {
	$data = explode('&', $HTTP_RAW_POST_DATA);
	foreach ($data as $val)
	{
		if (!empty($val))
		{
			list($key, $value) = explode('=', $val);
			
			$value = urldecode($value);
			
			$json_try = json_decode($value, true);

			if ( ! $json_try || $json_try === $value)
			{
				// bad json
				$_POST[$key] = $value;
			}
			else
			{
				// god json
				$_POST[$key] = $json_try;
			}
		}
	}
}
