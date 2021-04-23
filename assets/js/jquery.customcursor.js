/*
   -----------------------------------------------------
     jQuery Custom Cursor   	 
	 � 2020 Boom Apps

	 This is licenced software, you can purchase licence here: https://codecanyon.net/user/boom-apps/portfolio
	 
   -----------------------------------------------------
*/

	jQuery(function($) {
		var $Body = $('body'),
			$Document = $(document);
			$Window = $(window);
		
		$Body.append('<div id="Cursor" class="Cursor"><span class="First"><i></i></span><span class="Second"><i></i></span></div>');
		$Body.addClass('CustomCursor');
		var $Cursor = $('#Cursor'),
			$CursorFirst = $('#Cursor > .First'),
			$CursorShadow = $('#Cursor > .Second');
			
		var $Hover = 'a, button, input, select, .left-t, .right-t, .left, .right, .service-item-detail, .place-control-ca-nav span, .event-slider-two .item, .doc-ig-sq, .news-item-cat .thumbnail';
		
		var CurrentX = 0, CurrentY = 0;
		var ShadowX = 0, ShadowY = 0;
		
		var FirstMove = true;
		
		$Body.on('mousemove', function() { $Cursor.addClass('MouseMove'); });
		
		setInterval(_setShadow, 10);
		window.requestAnimationFrame(_AnimFrame);
		
		function _AnimFrame() {	
			$CursorFirst.css('transform','translate3d('+CurrentX+'px,'+CurrentY+'px,0px)');
			$CursorShadow.css('transform','translate3d('+ShadowX+'px,'+ShadowY+'px,0px)');	
			
			window.requestAnimationFrame(_AnimFrame);
		}
		
		function _setShadow() {	
			if (!FirstMove) {
				ShadowX = ShadowX - (ShadowX - (CurrentX)) / 5;
				ShadowY = ShadowY - (ShadowY - (CurrentY)) / 5;
			}
		}
		
		$Document.on('mousemove', function (e) {
			CurrentX = e.pageX - 15;
			CurrentY = e.pageY - 15 - $Window.scrollTop();
		
			if (FirstMove) {				
				ShadowX = CurrentX;
				ShadowY = CurrentY;
				FirstMove = false;
			}		
		});

		$Body.on('mouseenter', $Hover, function () {
		   $Cursor.addClass('Hover');
		});

		$Body.on('mouseleave', $Hover, function () {
		   $Cursor.removeClass('Hover');
		});
		
	});
