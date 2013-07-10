<?php

class Auth {
	private $db_connection;
	private $secret;

	function __construct ()
	{	
		// parse config.ini file
		$configs = parse_ini_file('../configs/application.ini', 'true');
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

	private function delete_old_sessions ()
	{
		$then = time() - 60*60*24*30;

		// delete auth in db
		$query = mysqli_query($this->db_connection, "
			DELETE FROM auth
			WHERE time < $then
			");
	}

	private function update_session ($my_secret)
	{
		$now = time();

		// delete auth in db
		$query = mysqli_query($this->db_connection, "
			UPDATE auth
			SET time = '$now'
			WHERE token = '$my_secret'
			");
	}

	private function new_secret ($secret_length)
	{
		// symbols to choose from
		$symbols = 'ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		$symbols_length = strlen($symbols);

		// for each character
		$secret = '';
		for ($i = 0; $i < $secret_length; $i++)
		{
			// pick form symbols
			$index = rand(0, $symbols_length -1);
			$secret .= $symbols[$index]; 
		}

		return $secret;
	}

	public function new_session ()
	{
		// generate new secret
		$my_secret = $this->new_secret(20);
		$now = time();

		// insert auth into db
		$query = mysqli_query($this->db_connection, "
			INSERT INTO auth
			(token, time)
			VALUES
			('$my_secret', '$now')
			");

		// return secret
		return $my_secret;
	}

	public function check_session ($my_secret)
	{
		// check for verry expired auth
		$this->delete_old_sessions();

		// check db for auth
		$query = mysqli_query($this->db_connection, "
			SELECT time 
			FROM auth
			WHERE token = '$my_secret'
			");
		$session = mysqli_fetch_object($query);

		if($session)
		{
			$time_diff = time() - $session->time;

			if ($time_diff > 60*60)
			{
				// delete db row
				$this->delete_session($my_secret);

				// auth expired
				return false;
			}
			else
			{
				// update auth
				$this->update_session($my_secret);

				// auth is okay
				return true;
			}
		}
		else
		{
			//no match in db
			return false;
		}
	}

	public function delete_session ($my_secret)
	{
		// delete auth in db
		$query = mysqli_query($this->db_connection, "
			DELETE FROM auth
			WHERE token = '$my_secret'
			");
	}
}