<?php
//saca los valores de POST
$usertb = $_POST['usertb'];
$pass01 = $_POST['pass01'];

//conecta al db
require_once 'conecta/conecta.php';
if($cnx){
	require_once 'lee/registraQueries.php';
	$recurso = pg_query($cnx, $queryCheckUserName);
	if($recurso){
		$isNewName;
		if($fila = pg_fetch_row($recurso)){
			$isNewName = false;
		}else{
			$isNewName = true;
		}
		if($isNewName){
			$recurso = pg_query($cnx, $queryRegisterUserReturningId);
			if($recurso && $filaConId = pg_fetch_row ($recurso)){
				$id = $filaConId[0];
				$respuesta = json_decode('{"registrado":true, "feedback":"you are registered", "id":'  .  $id  . '}');
			}else{
				pg_close($cnx); //maybe not needed but doesn't hurt
				throw new Exception('Mal query.  Sin RECURSO, para queryRegisterUserReturningId.  (username es nuevo, pero hubo error.)');				
			}
		}else{
			$respuesta = json_decode('{"registrado":false, "feedback":"username is already taken"}');
		}
		pg_close($cnx); //maybe not needed but doesn't hurt
		echo json_encode ($respuesta);
	}else{
		pg_close($cnx); //maybe not needed but doesn't hurt
		throw new Exception('Mal query.  Sin RECURSO, para queryCheckUserName.  (Ni chequie el username.)');
		//echo "<li>Error, pg_query, no produjo un recurso para result... en escritos\login</li>";
	}
}
?>