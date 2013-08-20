(function($) {
	$(document).ready(function(){
		var id = 0;
		$('#users input').bind('input', function(){

			var node = $(this).parents('.input-row');
			$(node).next().removeClass('hidden');

			$('#winner').css('min-height', $('#users').height() + 'px');
			$('#winner h1').css('line-height', $('#winner').height() + 'px');

		});

		$('.go').click(function(){
			var vals = [];

			$('#users input').each(function(){

				var row = $(this).parents('.input-row');

				if($(this).val().length > 0 && !row.hasClass('used')){
					vals.push({
								id : $(row).attr('data-id'),
								name : $(this).val()
							}
						);
				}
			})

			if (vals.length == 0){
				$('#reset').modal();
			}


			var i = 0;
			var run = function(){
				i++;

				var randomIndex = Math.floor(Math.random() * vals.length);
				var val = vals[randomIndex];
				$('#name').html(val.name);

				if(i < 10){
					setTimeout(run, 100);
				}else{
					$('[data-id="'+val.id+'"]').addClass('used');
				}
			}

			setTimeout(run, 100);



		});

		$('#reset-btn').click(function(){
			$('.used').removeClass('used');
			$('#name').html('');
			$('#reset').modal('hide');
		})


	});



})(jQuery);