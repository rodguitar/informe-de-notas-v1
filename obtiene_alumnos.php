<?php
error_reporting(E_ALL); 
ini_set( 'display_errors','1');

$rut = $_GET["rut"];


$link = mysql_connect('localhost', 'root', 'samsung')
    or die('No se pudo conectar: ' . mysql_error());

mysql_select_db('cesf')
    or die('No se pudo seleccionar la base de datos');

mysql_query('SET CHARACTER SET utf8');


$query = ' SELECT runalumno, nombres, paterno, materno
FROM `bd_alumno` WHERE run_apoderado = "'.$rut.'" ORDER BY paterno DESC ';

$result = mysql_query($query)
    or die('Consulta fallida: ' . mysql_error());


$data = array();

while ($row=mysql_fetch_assoc($result)) 
  { 
   array_push($data, $row);
  }

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Fecha en el pasado
Header("Content-type: application/json");
echo json_encode($data);?>