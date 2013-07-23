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