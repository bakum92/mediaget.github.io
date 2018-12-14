$(document).ready(function(){
            
	$(".pagenum").bind("click", function(){
		var rel = $(this).attr('rel');
		$(this).addClass('active');
	});

	/*#rezult return false*/
	$("#rezult").bind("click", function(e){
		e.preventDefault();

		runFaqSearch();
	});

	// FAQ live search
	var liveTimeout = null;
	$("#keyword").keyup(function() {
		liveTimeout = setTimeout("runFaqSearch()", 500);
	});

	$("#keyword").keydown(function() {
		if(liveTimeout != null) {
			clearInterval(liveTimeout);
		}
	});

	/*SHOw - block.content*/
	$(".content").eq(0).addClass("actual");
	/*
	$(".faq li:not(:first)").bind("click", function(){
		var cur = $(this).index();
		$(".content").fadeOut(1);
		$(".content").eq(cur).fadeIn(600, "easeInOutQuart");
	});
	*/

	/*head-menu -> .activo*/
	$("#head-menu .act").css({overflow:'visible'})
	.append("<div class='activo'></div>");
	var wA = $(".act a").width();
	$(".activo").css({width:wA+'px'});

	/*search-enter*/
	var rc1 = /(\s*\S)/gim, rc2 = /(\w*\S)/gim;
	$(".sf-c").bind("focus", function(){
		var clearF = ($(this).val()).match(rc1);
		if( clearF === null ){
			$(this).parents("#super-enter").find("p").animate({opacity:0},400);
		} else {}
	}).bind("blur",function(){
		var clearB = ($(this).val()).match(rc2);
		if( clearB === null ){
			$(this).parents("#super-enter").find("p").animate({opacity:1},400);
		} else if( clearB !== null ){
			$(this).parents("#super-enter").find("p").animate({opacity:0},400);
		} else {}
	});

        

	// Support form
	initSupportForm();

	/*#spiski li p <- toggle*/
	$('.faqQuestionA').live('click', function(e){
		var SS = $(this).next('div'), SSH = SS.children('div').height();
		$('#spiski li .demon').stop().animate({height:0});
		$(SS).stop().animate({ height: SSH});
		if( $(SS).height() > 0 ){
			$(SS).stop().animate({ height: 0});
		}
		return false;
	});

	/*_________________________________*/
	/*textarea border-radius only IE7-8*/
	if( $.browser.msie && $.browser.version.substr(0,3) <= 8 ){
		$(".messa").wrapAll("<div class='fIE'></div>");
		$(".fIE").css({
			position: 'relative',
			width: 480
		});
		for ( var i=0, l=3; i<=l; i++ ){
			$(".fIE").append("<div class='boro da"+i+"'></div>");
		}
	} else {}


});

function checkEmail() {
	var regex = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
	return $('#mail').val().match(regex);
}

function checkFileSize() {
	if(!$('#attachment').get(0).files || $('#attachment').get(0).files.length == 0)
		return true;

	return ($('#attachment').get(0).files[0].size/1024/1024) < 50;
}

function runFaqSearch() {
	$.get('/action.php?actionType=FaqAjaxAction&method=search&keyword=' + $('#keyword').val(), function(data) {
		$('#spiski').html(data);
	});
}

function calculateWidthOfGrayBorder(){
	var cnt=$('.hoverGrayBorder').length;
	var maxWidth=0;
	for (i=0; i<cnt; i++){
		if(maxWidth<$('.hoverGrayBorder').eq(i).width()){
			maxWidth=$('.hoverGrayBorder').eq(i).width();
		}
	}
	$('.hoverGrayBorder').width(maxWidth+54);
}

function initSupportForm() {
	$(".sel-kat").wrapInner('<div class="sub-sel"></div>');
	$(".sel-kat p").css({wordWrap:'break-word'});
	calculateWidthOfGrayBorder();
	$(".chek").bind("click", function(){
		$(".selectBox").stop().animate({
			height: 0
		}, 400, 'easeInOutQuart');
		var nk = $(".sel-kat").css('height'),
		subSel = $(".sub-sel").height();

		if (nk<10+'px'){
			$(".sel-kat").stop().animate({
				height: (subSel)+'px'
			}, 400, 'easeInOutQuart');
		} else if (nk>=10+'px') {
			$(".sel-kat").stop().animate({
				height: 0
			}, 400, 'easeInOutQuart');
		} else {}
	});

	$(".sel-kat p").bind("click", function(){
		var thisT = $(this).text();
		$("#selkat").val(thisT);
		var id = $(this).attr('id').split('-')[1];
		$('#department-select').children('option[value=' + id + ']').attr('selected', true);

		$(".sel-kat").stop().animate({
			height: 0
		}, 200, 'easeInOutQuart');
		$(this).parent().parent().prev().find("span").css({
			visibility:'hidden'
		});

		if ($(this).index() === 0 || $(this).index() === 1) {
			$('.tech-inputs').show();
		} else {
			$('.tech-inputs').hide();
		}

		if ($(this).index() === 3) {
			$('#attachment-file-label').hide();
			$('#attachment-cv-label').css('display', 'block');

			$('#message-default-label').hide();
			$('#message-cv-label').css('display', 'block');

			$('.subject').hide();
			$('.vacancies').css('display', 'block');
		} else {
			$('#attachment-file-label').css('display', 'block');
			$('#attachment-cv-label').hide();

			$('#message-default-label').css('display', 'block');
			$('#message-cv-label').hide();

			$('.subject').css('display', 'block');
			$('.vacancies').hide();
		}
	});

	/*Valid: input-kategory*/
	$("#selkat").bind("blur", function(){
		var iK2 = $(this).val();
		var e = $(this).parent().parent().prev().find("span");
		if( $(this).val() == "" ){
			e.css({
				visibility:'visible'
			});
		} else {
			e.css({
				visibility:'hidden'
			});
		}
	});

	$(".sel-os").wrapInner('<div class="os-sub-sel"></div>');
	$(".sel-os p").css({wordWrap:'break-word'});
	$(".chek-os").bind("click", function(){
		$(".selectBox").stop().animate({
			height: 0
		}, 400, 'easeInOutQuart');
		var nk = $(".sel-os").css('height'),
		subSel = $(".os-sub-sel").height();

		if (nk<10+'px'){
			$(".sel-os").stop().animate({
				height: (subSel)+'px'
			}, 400, 'easeInOutQuart');
		} else if (nk>=10+'px') {
			$(".sel-os").stop().animate({
				height: 0
			}, 400, 'easeInOutQuart');
		} else {}
	});

	$(".sel-os p").bind("click", function(){
		var thisT = $(this).text();
		$("#sel_os").val(thisT);
		var id = $(this).attr('id').substring( $(this).attr('id').indexOf('-')+1 );
		$('#os-select').children('option[value=' + id + ']').attr('selected', true);

		$(".sel-os").stop().animate({
			height: 0
		}, 200, 'easeInOutQuart');
		$(this).parent().parent().prev().find("span").css({
			visibility:'hidden'
		});
	});

	$(".sel-antivirus").wrapInner('<div class="antivirus-sub-sel"></div>');
	$(".sel-antivirus p").css({wordWrap:'break-word'});
	$(".chek-antivirus").bind("click", function(){
		$(".selectBox").stop().animate({
			height: 0
		}, 400, 'easeInOutQuart');
		var nk = $(".sel-antivirus").css('height'),
		subSel = $(".antivirus-sub-sel").height();

		if (nk<10+'px'){
			$(".sel-antivirus").stop().animate({
				height: (subSel)+'px'
			}, 400, 'easeInOutQuart');
		} else if (nk>=10+'px') {
			$(".sel-antivirus").stop().animate({
				height: 0
			}, 400, 'easeInOutQuart');
		} else {}
	});

	$(".sel-antivirus p").bind("click", function(){
		var thisT = $(this).text();
		$("#sel_antivirus").val(thisT);
		var id = $(this).attr('id').substring( $(this).attr('id').indexOf('-')+1 );
		$('#antivirus-select').children("option[value='" + id + "']").attr('selected', true);

		$(".sel-antivirus").stop().animate({
			height: 0
		}, 200, 'easeInOutQuart');
		$(this).parent().parent().prev().find("span").css({
			visibility:'hidden'
		});
	});

	// vacancy select
	$(".sel-vacancy").wrapInner('<div class="vacancy-sub-sel"></div>');
	$(".sel-vacancy p").css({wordWrap:'break-word'});
	$(".chek-vacancy").bind("click", function(){
		$(".selectBox").stop().animate({
			height: 0
		}, 400, 'easeInOutQuart');
		var nk = $(".sel-vacancy").css('height'),
		subSel = $(".vacancy-sub-sel").height();

		if (nk<10+'px'){
			$(".sel-vacancy").stop().animate({
				height: (subSel)+'px'
			}, 400, 'easeInOutQuart');
		} else if (nk>=10+'px') {
			$(".sel-vacancy").stop().animate({
				height: 0
			}, 400, 'easeInOutQuart');
		} else {}
	});

	$(".sel-vacancy p").bind("click", function(){
		var thisT = $(this).text();
		$("#sel_vacancy").val(thisT);
		var id = $(this).attr('id').substring( $(this).attr('id').indexOf('-')+1 );
		$('#vacancy-select').children('option[value=' + id + ']').attr('selected', true);

		$(".sel-vacancy").stop().animate({
			height: 0
		}, 200, 'easeInOutQuart');
		$(this).parent().parent().prev().find("span").css({
			visibility:'hidden'
		});
	});

	/*Valid: input type=[file]*/
	$('.nice-input').css('z-index',0);
	$(".ni-c-f").bind("change", function(){
		var iF = $(this).val();
		$('.inputFileVal').val(iF)
	});

	$('#mail').blur(function() {
		if (!$('#mail').val()) return;

		var e = $('#mail').parent().prev().find('span');

		if (checkEmail()) {
			e.css({visibility:'hidden'});
		} else {
			e.css({visibility:'visible'});
		}
	});

	/*nice-submit*/

	// On page load - choose current category from hidden select
            var selectedDepartment = $('#department-select > option:selected').val();
            $('#dep-' + selectedDepartment).click();
}