<?php

$widget = [
	[ "fridge",  0 ],
	[ "coffee",  4 ],
	[ "temp",    12.5 ],

	[ "fridge",  8 ],
	[ "coffee",  2 ],
	[ "temp",    3 ],

	[ "fridge",  0 ],
	[ "coffee",  5 ],
	[ "temp",    20 ],

	[ "fridge",  3 ],
	[ "coffee",  0 ],
	[ "temp",    24.5 ],

	[ "fridge",  0 ],
	[ "coffee",  7 ],
	[ "temp",    5 ],

	[ "fridge",  10 ],
	[ "coffee",  8 ],
	[ "temp",    7 ],

	[ "fridge",  0 ],
	[ "coffee",  10 ],
	[ "temp",    18.5],

	[ "fridge",  7 ],
	[ "coffee",  20 ],
	[ "temp",    19.5 ],
];

//date_default_timezone_set("America/New_York");
$widgetLength = count($widget);

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header("Connection: keep-alive");


$lastId = $_SERVER["HTTP_LAST_EVENT_ID"];
if (isset($lastId) && !empty($lastId) ) {
	$lastId = intval($lastId);
	$lastId++;
} else {
	$lastId = 0;
}

// Check that lastId is not larger than the size of array - if it is larger star from zero.
if ($lastId >= $widgetLength) {
	$lastId = 0;
}



$counter = rand(1, 10);
while (true) {

	sendMessage($lastId, $widget[$lastId][0], $widget[$lastId][1]);
	$lastId++;
 	// Check that lastId is not larger than the size of array - if it is larger close connection.
	if ($lastId >= $widgetLength ) {
		die();
	}

	// Sleep some random seconds
	sleep(rand(1, 7));
  }
  

  // Function to send data in format "ticket:price".
function sendMessage($id, $widget, $content) {
	echo "id: $id\n";
	echo "data: $widget:$content\n\n";
	//ob_end_flush();????
	ob_flush();
	flush();
}


?>