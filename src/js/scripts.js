$(document).ready(function() {	

	/**
	 * Colorpicker Init
	 */
	$('.color').colorpicker();

	/**
	 * Return device
	 */
	function isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

});


/**
 * Window resize
 */
var id;
$(window).resize(function() {
	clearTimeout(id);
	id = setTimeout(doneResizing, 500);
});


/**
 * Window resize Function
 */
function doneResizing() {
	
}