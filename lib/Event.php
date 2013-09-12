<?php

class Event
{	
	private $db_connection;

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

	public function create ($event_data)
	{
		$start_date = $event_data['start'];
		$end_date = $event_data['end'];
		$event_data_json = json_encode($event_data);
		$event_id = $this->new_secret(20);

		$query = mysqli_query($this->db_connection, "
			INSERT INTO events
			(event_id, data, start_date, end_date)
			VALUES
			('$event_id', '$event_data_json', '$start_date', '$end_date')
			");
		
		return true;
	}

	public function update ($event_id, $event_data)
	{
		$start_date = $event_data['start'];
		$end_date = $event_data['end'];
		$event_data_json = json_encode($event_data);

		$query = mysqli_query($this->db_connection, "
			UPDATE events
			SET data = '$event_data_json', start_date = '$start_date', end_date = '$end_date'
			WHERE event_id = '$event_id'
			");

		return true;
	}

	public function get_all ($auth)
	{
		// get outdated events
		$where = '';
		if ( ! $auth) {
			$where = 'WHERE end_date > ' . time();
		}

		$query = mysqli_query($this->db_connection, "
			SELECT event_id, data
			FROM events
			" . $where . "
			ORDER BY start_date
			");

		// have to this to get all events apparently... -_-
		$output = array();
		while ($row = mysqli_fetch_array($query, MYSQLI_ASSOC))
		{
			// replace nl with br
			$data_without_nl = nl2br($row['data']);

			// nl haven't disapeard, remove them
			$data_without_nl = trim(preg_replace('/\s\s+/', ' ', $data_without_nl));

			$output[$row['event_id']] = $data_without_nl;
		}

		return $output;
	}

	public function get ($event_id)
	{
		$query = mysqli_query($this->db_connection, "
			SELECT data
			FROM events
			WHERE event_id = '$event_id'
			");

		$row = mysqli_fetch_object($query);

		// replace nl with br
                $data_without_nl = nl2br($row->data);

                // nl haven't disapeard, remove them
                $data_without_nl = trim(preg_replace('/\s\s+/', ' ', $data_without_nl));


		return $data_without_nl;
	}

	public function delete ($event_id)
	{
		$query = mysqli_query($this->db_connection, "
			DELETE FROM events
			WHERE event_id = '$event_id'
			");

		return true;
	}

	public function when ($start, $end)
	{
		$this_year = date('Y', time());
		$start_year = date('Y', $start);
		$end_year = date('Y', $end);
		$start_month = '{' . date('n', $start) . '}';
		$end_month = '{' . date('n', $end) . '}';
		$start_day = date('j', $start);
		$end_day = date('j', $end);
		$start_time = date('H:i', $start);
		$end_time = date('H:i', $end);

		$needle = array('{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', '{10}', '{11}', '{12}');
		$swe_months = array('jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sept', 'okt', 'nov', 'dec');


		$when_start = $start_day . ' ' . $start_month;

		// this year?
		$year_added = false;
		if ($this_year != $start_year)
		{
			// add year
			$when_start .= ' ' . $start_year;

			$year_added = true;
		}

		// identical?
		if ($start == $end)
		{
			$when_start .= ' ' . $start_time;

			return str_replace($needle, $swe_months, $when_start);
		}
		elseif ($start_year != $end_year && ! $year_added)
		{
			// different year and start year not yet added

			// add year
			$when_start .= ' ' . $start_year;
		}

		// add time
		$when_start .= ' ' .$start_time; 


		// end
		if ($start_year != $end_year || $year_added)
		{
			// not same year

			// full date
			$when_end = $end_day . ' ' . $end_month . ' ' . $end_year . ' ' . $end_time;
		}
		elseif ($start_month != $end_month || $start_day != $end_day)
		{
			// not same month or day, same way...

			// full date - year
			$when_end = $end_day . ' ' . $end_month . ' ' . $end_time;
		}
		else
		{
			// different time

			// only time
			$when_end = $end_time;
		}

		$when = $when_start . ' - ' . $when_end;

		return str_replace($needle, $swe_months, $when);
	}
}
