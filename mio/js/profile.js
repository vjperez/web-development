jQuery('document').ready(
	function(){
		var $cuandoHidable = jQuery('table#cuandoHidable');
		var $queHidable = jQuery('ul#queHidable');
		var $dondeHidable = jQuery('div#dondeHidable');
		
		$cuandoHidable.hide();
		$queHidable.hide();
		$dondeHidable.hide();
		
		jQuery('div#cuando').on('click mouseover', function(){
			$cuandoHidable.show();
			$queHidable.hide();
			$dondeHidable.hide();			
			/* same code
			if($tableCuandoHidable.is(":visible")){
				$tableCuandoHidable.hide();
			}else{
				$tableCuandoHidable.show();
			}
			*/
		});
		
		
		jQuery('div#que').on('click mouseover', function(){
			$cuandoHidable.hide();
			$queHidable.show();
			$dondeHidable.hide();
		});	

		
		jQuery('div#donde').on('click mouseover', function(){
			$cuandoHidable.hide();
			$queHidable.hide();
			$dondeHidable.show();
		});			
		
	}
);