$(document).ready(function(){
	// Mask Input
	$("input[type='tel']").mask("+7 (999) 999-99-99");
	// end Mask Input
	// Form Submit
	var modal__result = $("div.remodal.modal__result").remodal();
	$("form").submit(function() {
        var msg   = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: msg,
        success: function() {
            $("input[type='text']").val("");
            $("input[type='email']").val("");
            $("input[type='tel']").val("");
            modal__result.open();
        },
        error:  function(xhr, str){
            alert("Возникла ошибка: " + xhr.responseCode);
            console.log("Ошибка отправки!" + xhr.responseCode);
        }
        });
        return false;
	});
	// end Form Submit
	// Preloader
	$(".preloader").delay(400).fadeOut('slow');
	// end Preloader
});