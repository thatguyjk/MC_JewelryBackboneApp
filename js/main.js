
//Simple UI event handlers for the main pages. 
$(document).ready(function() {

	$('.searchForm').focus(function(){
		if($('#scrollbar3').data('page') !== "searchPage"){
			document.location.href = "./search.html";	
		}
	});

	$('.searchForm').keypress(function(e){
	    if (e.keyCode == '13'){

	      e.preventDefault();

	      //mcProductRouter.navigate('search');

	      mcProductGallery.filteredList = null;
	      mcProductGallery.$el.children().remove();
	      mcProductGallery.findProduct($('.searchForm').val());

	      return false;
	    }
	});


	$('#scrollbar1').tinyscrollbar({ sizethumb: 30 });
	$('#scrollbar2').tinyscrollbar({ axis: 'x', sizethumb: 100});
	$('#scrollbar3').tinyscrollbar({ sizethumb: 30});

	$('.homeclsqImg').click(function() {
		window.location = 'classique.html';
	});

	$('.homechicImg').click(function() {
		window.location = 'chic.html';
	});

	$('.classiqueCollection').click(function() {

		mcProductGallery.render("CLASSIQUE");

		mcProductRouter.navigate('!products');

		$('#contentView').show();
		$('#scrollbar1').tinyscrollbar_update();
	});

	$('.chicCollection').click(function() {

		mcProductGallery.render("CHIC");

		mcProductRouter.navigate('!products');
		
		$('#contentView').show();
		$('#scrollbar1').tinyscrollbar_update();
	});

	$('#contactForm').click(function(){
		$('#recaptcha').fadeIn();
	});

	$(".clsqProductImage").css( "background-size", "cover" );
	$(".chicProductImage").css( "background-size", "cover" );

	$('.closeMe').children("img").on("click", function(){
		$('#detailContainer').hide();		
	});

	//$('div#detailContainer').drags();

	//$('div#shopTheLook').drags();


	// Generate thumbnail callbacks for each lookbook thumbnail
	var view_Port_Width = 915;
	var thumb_Center_At_Percent = .5;
	var thumb_Offset_From_Center = 0;
	var thumb_Width = 117;
	var thumb_Width_Before = -(thumb_Width);

	var idx = 1;
	$('#lookBookThumbs > a').each(function() {

		$(this).attr('id', 'thumb_'+idx);
		idx = idx+1;

		thumb_Width_Before = thumb_Width_Before + thumb_Width;
		thumb_Left = (thumb_Width_Before+thumb_Width-(view_Port_Width*thumb_Center_At_Percent)-((thumb_Width/2)+thumb_Offset_From_Center));
		if (thumb_Left <= 0){
			thumb_Left = 0;
		}
		$(this).data(toString(idx), parseInt(thumb_Left));

		$(this).on('click', function() {

			currThumb = $(this);

			$(currThumb).prevAll().children('img').css('border', '2px solid rgb(228, 224, 206)');
			$(currThumb).nextAll().children('img').css('border', '2px solid rgb(228, 224, 206)');

			$(this).children('img').css('border', '2px solid #c3b69b');

			var imgURL = $(this).children('img').attr('src');  // get the thumbnail url for the current image
			imgURL = imgURL.replace('thumbs/', '', 'gi');	// strip the 'thumbs/' folder from the url the full image is one directory up'
			imgURL = imgURL.substr(0, imgURL.indexOf('_')) + ".jpg"; 	// remove the thumb suffix from the name and replace it with the .jpg extension

			var index_num = $(this).children('img').attr('src');  // get the thumbnail url for the current image
			index_num = index_num.substr(imgURL.indexOf('lookBook-')+9,imgURL.indexOf('_')-imgURL.indexOf('lookBook-')-9);

			if (imgURL !== $('#bookPageImg').attr('src')) {
				slideThumbs($(this).data(toString(index_num)));

				$('#bookPageImg').stop(true, false);
				$('#bookPageImg').fadeOut('fast').attr('src', imgURL).delay(600).fadeIn('slow');		// set the image tag to the full size image
				$('#bookPageImg').css({'display' : 'none', 'margin' : '0 auto'}).delay(400).fadeIn('slow');	// center the full size image
			}
		});
	});

	// Slide the image left of right depending on which page is visible
	$('.leftArrowScroll').click(function() {
		$(currThumb).prev().trigger('click');
	});

	$('.rightArrowScroll').click(function() {
		$(currThumb).next().trigger('click');
	});


	// Change the year in the footer to reflect the system year
	var date = new Date();
	var currentYear = date.getFullYear();

	$(".copyright").html("Copyright " + currentYear + " Richline Group. All rights reserved.<br/>Marie Claire is a trademark of Marie Claire Group. Manufactured by Richline Group under license.");


	if($.fancybox !== undefined) {

		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});

	}

});


$(document).ready(function(){
	// Detect browser and display
	if($.browser.msie) {
		if( parseInt($.browser.version, 10) < 9 ) {
			$('#browserPrompt').html('This site is best viewed in <a href="https://www.google.com/intl/en/chrome/browser/" target="new">Chrome</a> and <a href="http://www.mozilla.org/en-US/firefox/new/" target="new">Firefox</a>.');
		}
	}
});


function slideThumbs(new_left){
	var i=1;
	var i_end=100;
	var total_moved=0;

	var start_left = $('#lookBookThumbs').attr('style'); // 0 - (-1584px)
	start_left = start_left.replace('left:', '', 'gi');
	start_left = start_left.replace('px;', '', 'gi');
	start_left = -(parseInt(start_left.replace(' ', '', 'gi')));

	difference=new_left-start_left;
	increment=difference/i_end;

	loopHere();
	function loopHere(){
		setTimeout(function(){
			i++;
			if(i<i_end){
				total_moved=total_moved+increment;
				$('#scrollbar2').tinyscrollbar_update(start_left+total_moved);
				loopHere();
			}
		}, 4)
	}
}
