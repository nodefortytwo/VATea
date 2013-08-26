(function($) {
	$(document).ready(function(){
		var id = 0;

		if($('.container').height() < $(window).height()){
			$('.container').height($(window).height());
		}
		$('.height100').css('height', $('.container').height() + 'px');
		$(window).resize(function() {
			if($('.container').height() < $(window).height()){
				$('.container').height($(window).height());
			}
		});


		$('.names input').bind('input', function(){
			$(this).val(ucwords($(this).val()));
			var node = $(this).parents('.input-row');
			if($(node).next().hasClass('hidden')){
				$(node).next().hide().removeClass('hidden').fadeIn();
			}	
		});

		$('.go').click(function(){
			var vals = [];

			$('.names input').each(function(){

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
			}else{
				var randomIndex = Math.floor(Math.random() * vals.length);
				var val = vals[randomIndex];

				$('.state1').fadeOut(function(){
					$('#name').html(val.name);
					$('.state2').removeClass('hidden').hide().fadeIn();
					$('[data-id="'+val.id+'"]').addClass('used');
					$('.share .scope-note').html('Let <strong>'+val.name+'</strong> know they lost')
					$('.email').html('email them a reminder')
							.attr('target', '_blank')
							.attr('href', "mailto:?subject=Make the Tea!&body=Hey "+val.name+", You were picked to make the tea by Sage's VATea app! Get Brewing");

					var tweet_text = 'Hey, ' + val.name + ' Make the tea!';
					var tweet_url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet_text) + '&url=' + encodeURIComponent('http://www.sage.co.uk') + '&via=' + 'sageuk';
					$('.twitter').attr('href', tweet_url);
				});
			}
 
		});

		$('.replay').click(function(){
			$('.state2').fadeOut(function(){
					$('.state1').removeClass('hidden').hide().fadeIn();
				});
		})

		$('#reset-btn').click(reset);

	});

	var center = function(){

		$('#winner .center').css('margin-top', '-' + ($('#winner .center').height() / 2) + 'px');
		$('#winner .center').css('margin-left', '-' + ($('#winner .center').width() / 2) + 'px');
		$('#winner .center').css('left', '50%');
	}

	var reset = function(){
			$('.used').removeClass('used');
			$('#name').html('');
			$('#reset').modal('hide');
			$('state1').show();
			$('state2').hide();
		}

})(jQuery);

function ucwords (str) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Waldo Malqui Silva
  // +   bugfixed by: Onno Marsman
  // +   improved by: Robin
  // +      input by: James (http://www.james-bell.co.uk/)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: ucwords('kevin van  zonneveld');
  // *     returns 1: 'Kevin Van  Zonneveld'
  // *     example 2: ucwords('HELLO WORLD');
  // *     returns 2: 'HELLO WORLD'
  return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase();
  });
}