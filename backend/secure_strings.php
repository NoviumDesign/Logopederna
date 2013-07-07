<?php

function convert_string($string)
{
	return htmlentities($string, ENT_QUOTES, "UTF-8");
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