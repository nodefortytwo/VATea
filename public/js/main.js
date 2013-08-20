(function($) {
	$(document).ready(function(){
		var id = 0;
		$('#users input').bind('input', function(){

			var node = $(this).parents('.input-row');
			$(node).next().removeClass('hidden');

			$('#winner').css('height', $('#users').height() + 'px');


			//$('#winner h1').css('line-height', $('#winner').height() + 'px');

		});

		$('#winner').bind('DOMNodeInserted DOMNodeRemoved', function(){
			center();
		})

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

					var link = $('<a></a>').html('email them a reminder')
							.attr('target', '_blank')
							.attr('href', 'mailto:?subject=Make the Tea!&body=You were selected to make the tea!');

					$('#link').html(link);
				}
			}

			setTimeout(run, 100);



		});

		$('#reset-btn').click(function(){
			$('.used').removeClass('used');
			$('#name').html('');
			$('#reset').modal('hide');
			$('#link').html('&nbsp;');
		})


	});

	var center = function(){

		$('#winner .center').css('margin-top', '-' + ($('#winner .center').height() / 2) + 'px');
		$('#winner .center').css('margin-left', '-' + ($('#winner .center').width() / 2) + 'px');
		$('#winner .center').css('left', '50%');
	}

})(jQuery);