<?php

function convert_string($string)
{
	// remove specials
	// &nbsp; so there will be only single spaces
	$remove = array('&nbsp;', '  ');
	$replace = array(' ', ' ');
	$string = str_replace($remove, $replace, $string);

	// decode beacuse js already "htmlentities" before send
	$string = html_entity_decode($string);

	// remove specials
	// br caused by mozilla...
	$remove = array('<br>');
	$replace = array('');
	$string = str_replace($remove, $replace, $string);

	// trim
	$string = trim($string);

	// html entites
	$string = htmlentities($string, ENT_QUOTES, "UTF-8");

	return $string;
}

function secure_strings($array)
{
	$output_array = array();

	foreach ($array as $key => $value)
	{
		if (is_array($value))
		{
			$output_array[$key] = secure_strings($value);
		}
		else
		{
			$output_array[$key] = convert_string($value);
		}
	}

	return $output_array;
}