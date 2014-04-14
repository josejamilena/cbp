<?php

    include '../config/config.php';

	if (!empty($_POST)) {
		if ($_POST["action"] == "getMaps") {
			$maps = array(0 => array('name' => 'P. 1', 'file' => $MAPS_DIR.'a.svg'), 1 => array('name' => 'P. 2', 'file' => $MAPS_DIR.'b.svg'), 2 => array('name' => 'P. 3', 'file' => $MAPS_DIR.'c.svg'));
			$CLIPBOARD = array(0 => array('name' => 'P. 1', 'points' => array(0 => array('posX' => 225,'posY' => 160,'id' => 1), 1 => array('posX' => 266, 'posY' => 324, 'id' => 2))), 1 => array('name' => 'P. 2', 'points' => array()), 2 => array('name' => 'P. 3', 'points' => array()));
			$arr = array('maps' => $maps, 'CLIPBOARD' => $CLIPBOARD);
			echo json_encode($arr);
		} else {
			echo "No na";
		}
	}
?>