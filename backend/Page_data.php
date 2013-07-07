<?php

class Page_data 
{
	private $db_connection;
	private $secret;

	function __construct ()
	{	
		// parse config.ini file
		$configs = parse_ini_file('configs/application.ini', 'true');
		$db = $configs['db_connection'];

		// establish db connection
		$con = mysqli_connect($db['host'], $db['user'], $db['pass'], $db['name']);

		// check connection
		if (mysqli_connect_errno($con))
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
			exit();
		}
		else
		{
			$this->db_connection = $con;
		}
	}

	public function set ($page_id, $page_data)
	{

		$query = mysqli_query($this->db_connection, "
			UPDATE contents
			SET data = '$page_data'
			WHERE page_id = '$page_id'
			");
		
		$affected_rows = mysqli_affected_rows($this->db_connection);

		if($affected_rows === 1)
		{
			// one row has been changed
			return true;
		}
		else
		{
			// nothing has changed, same as before, if nothing went wrong
			return false;
		}
	}

	public function get ($page_id)
	{
		$query = mysqli_query($this->db_connection, "
			SELECT data
			FROM contents
			WHERE page_id = '$page_id'
			");
		$page = mysqli_fetch_object($query);

		if ($page)
		{
			return $page->data;	
		}
		else
		{
			// no row matched the page_id
			return false;
		}
	}
}