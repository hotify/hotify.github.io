/*
*   Siena HTML
*   Copyright 2019, Royalz Store
*  	www.royalz.store
*/

/* Variables
================================================== */

	var $j 						= jQuery.noConflict();
	var displayLoading 			= $j("body").attr("data-display-loading");
	var retina 					= false;
	var scrollWrapper 			= "body";
	var settings;
	var scroll;
	var windowHeight;
	var windowWidth;


/* Functions
================================================== */

	/**
	 * Adjusts the sizes.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaAdjust() {
			windowHeight 	= jQuery(window).height();
			windowWidth 	= jQuery(window).width();
		}


	/**
	 * jQuery Load Event.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaLoad() {

		   	/* Basic
			================================================== */

				sienaAdjust();


		   	/* Page Loading
			================================================== */

				if( $j("body > .page-loading").length ) {
					$j("body > .page-loading").addClass("hidden");
					$j("body").removeClass("page-loading");
				} 


		   	/* Blog
			================================================== */

			   	if ( $j("section.blog").length ) {
			   		sienaBlog();
			   	}


		   	/* Home
			================================================== */

			   	if ( $j("section.home").length ) {
			   		var header 						= $j("header.header");
			   		var slider 						= $j("section.home .section-content");
			   		var sliderNav 					= $j("section.home .slider-nav");
			   		var sliderSlideShowSpeed 		= 5000;
			   		var totalSlides 				= slider.find(".slide").length;
			   		var currentIndex 				= 0;
			   		if( totalSlides < 2 ) {
						var slide = slider.find(".slide").eq(currentIndex);
						var slideTheme = slide.hasClass("slide-theme-light") ? "light" : "dark";
						var invertTheme = slideTheme == "light" ? "dark" : "light";
						slide.addClass("current").siblings().removeClass("current");
						header.removeClass("header-light header-dark").addClass("header-"+invertTheme);
			   			return false;
			   		}
					homeSlide(currentIndex);
					var currentSlide;
					var sliderTimer;
					// Slide function
			   		function homeSlide(index) {
			   			if(typeof index !== 'undefined') {
			   				var nextIndex = index;
			   			} else {
			   				var nextIndex = currentIndex + 1;
			   			}
		   				if( nextIndex == totalSlides ) {
		   					nextIndex = 0;
		   				}
						var slide = slider.find(".slide").eq(nextIndex);
						var slideTheme = slide.hasClass("slide-theme-light") ? "light" : "dark";
						var invertTheme = slideTheme == "light" ? "dark" : "light";
						slide.addClass("current").siblings().removeClass("current");
						header.removeClass("header-light header-dark").addClass("header-"+invertTheme);
						sliderNav.removeClass("slider-nav-light slider-nav-dark").addClass("slider-nav-"+invertTheme);
			   			currentIndex = nextIndex;
			   			sliderTimer = setTimeout(homeSlide, sliderSlideShowSpeed);
			   		}
					// Preview button
					sliderNav.find(".button-prev").click(function(){
						var c = currentIndex - 1;
		    			clearTimeout(sliderTimer);
						homeSlide(c);
					});
					// Next button
					sliderNav.find(".button-next").click(function(){
						var c = currentIndex + 1;
		    			clearTimeout(sliderTimer);
						homeSlide(c);
					});
				}


		   	/* Portfolio
			================================================== */

			   	if ( $j("section.portfolio").length ) {
			   		var portfolio = $j("section.portfolio");
			   		sienaPortfolio();
			   	}

		}


	/**
	 * jQuery Ready Event.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaReady() {
				

		    /* Body
			================================================== */
				
				if( $j("body > .page-loading").length ) {
					$j("body").addClass("page-loading");
				}


		    /* Article
			================================================== */

				if( $j("section.article").length ) {
					$j("section.article .share-facebook a").on("click", function() {
						var url = $j(location).attr('href');
						window.open("https://www.facebook.com/sharer/sharer.php?u="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
					});
					$j("section.article .share-twitter a").on("click", function() {
						var url = $j(location).attr('href');
						window.open("https://twitter.com/home?status="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
					});
				}


		    /* Backgrounds
			================================================== */

				$j(".background.image").each(function() {
					if( !$j(this).hasClass(".image-none") ) {
						var img = $j(this).attr("data-url");
						$j(this).css("background-image", "url("+img+")");
					}
				});
				$j(".background.video").each(function() {
					var video 		= $j(this).attr("data-url");
					var settings  	= $j(this).attr("data-settings");
					var code  		= "<video class='background-video' "+settings+"><source src='"+video+"' type='video/mp4'></video>";
					$j(this).append(code);
					var video = document.querySelector('video.background-video');
					if( video.length ) {
						var promise = video.play();
						if (promise === undefined) {
						  	console.log('Promisified video play() not supported');
						} else {
							promise.then(function() {
								console.log('Video playback successfully initiated, returning a promise');
							}).catch(function(error) {
								console.log('Error initiating video playback: ', error);
							});
						}
					}
				});
				$j(".background").each(function() {
					if ($j(this).hasClass("overlay-dark")) {
						$j(this).append("<div class='overlay-dark'></div>").removeClass("overlay-dark");
					}
					if ($j(this).hasClass("overlay-light")) {
						$j(this).append("<div class='overlay-light'></div>").removeClass("overlay-light");
					}
				});


		    /* Blog
			================================================== */

			   	if( $j("section.blog").length ) {
					$j("section.blog .blog-posts .post").on("hover", function() {
						$j(this).addClass("hover");
						$j(this).siblings().addClass("disabled");
					}, function(){
						$j("section.blog .blog-posts .post").removeClass("hover disabled");
					});
					$j(".blog-pagination .pagniation-button a").addClass("link-with-arrow").wrapInner("<span></span>");
					$j(".blog-pagination .pagniation-button.prev a").addClass("arrow-left");
					$j(".blog-pagination .pagniation-button.next a").addClass("arrow-right");
			   	}


		   	/* Contact
			================================================== */

			   	if( $j("section.contact").length ) {
			   		// Contact Form
					$j("section.contact .form .button-submit").on("click", function() {
						var error       = false;
						var form  		= $j('section.contact .form');
						form.find(".input-with-border").removeClass("input-error");
						form.find(".input-with-border").each(function() {
							var value = $j(this).val();
							if( value == "" || value == " " ) {
								$j(this).addClass("input-error");
								error = true;
							}
						});
						if(error) {
							return false;
						}
						var name 		= form.find(".input-name").val();
						var email 		= form.find(".input-email").val();
						var subject 	= form.find(".input-subject").val();
						var message 	= form.find(".input-message").val();
						$j.ajax({
							type: "POST",
							data: { name: name, email: email, subject: subject, message: message },
							dataType: "html",
							url: 'contact.php',
							success: function(message) {
								if( message === 'ok' ){
									form.find(".input-with-border").val('');
									form.find(".message-success").addClass("active").siblings().removeClass("active");
								} else {
									form.find(".message-error").addClass("active").siblings().removeClass("active");
								}
							},
							error: function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);
							}
						});
						return false;
					});
				}


		   	/* Footer
			================================================== */

				// Copyright Hover
			   $j("footer.footer a.underline").on( "hover", function() {
					$("footer.footer .copyrights .text").addClass("hover");
				}, function(){
					$("footer.footer .copyrights .text").removeClass("hover");
				});


		   	/* Header
			================================================== */

				// Humburger menu toggle button
			   	$j("header.header .header-desktop .header-menu-humburger .toggle-button").click(function(event){
			   		$j("body").toggleClass("header-menu-active");
			   	});
			   	// Wrap menu sub items
				$j("header.header .header-desktop .header-menu-simple > ul > .menu-item-has-children > .sub-menu").each(function() {
					var menu = $j(this);
					menu.wrap("<div class='menu-children-wrapper'></div>");
				});
			   	// 
			   	$j("header.header .header-desktop .header-menu-simple li").hover( function() {
			   		var item = $j(this);
			   		item.addClass("hover").removeClass("disabled");
			   		if( !item.hasClass("menu-item-active") && !$j(".menu-item-active").length ) {
						item.siblings().addClass("disabled");
					}
					if( item.hasClass("menu-item-has-children") ) {
						item.addClass("menu-item-active");
						var o = parseInt( $j("header.header").offset().top );
						item.find(".menu-children-wrapper").css("top", o);
					}
				}, function(){
					var item = $j(this);
					if( !item.hasClass("menu-item-active") && !$j(".menu-item-active").length ) {
						$j("header.header .header-desktop .header-menu li").removeClass("hover disabled");
					} else {
						item.removeClass("hover menu-item-active").addClass("disabled").find('.menu-children-wrapper').css("top", 0);
						$j("header.header .header-desktop .header-menu li").removeClass("hover disabled");
					}
				});
				// Mobile menu toggle button
			   	$j("header.header .header-mobile .header-menu-button .menu-toggle").on( "click", function() {
			   		$j("body").toggleClass("header-menu-active");
			   	});
			   	// 
			   	$j(".wrapper > .menu .menu-toggle").on( "click", function() {
			   		$j(".wrapper > nav.navigation, .wrapper > div.menu").toggleClass("active");
			   	});
			   	//
			   	$j(".wrapper > .navigation.side-menu .menu-button").on( "click", function() {
			   		$j(".wrapper > nav.navigation, .wrapper > div.menu").removeClass("active");
			   	});


		   	/* Links
			================================================== */

				// Links with hashs
				$j("a[href^='#']").click(function(event){
			    	event.preventDefault();
				});
				// Links that open a popup
				$j(".link-with-popup").on( "click", function(event) {
					event.preventDefault();
					var title = typeof $j(this).attr("title") != "undefined" ? $j(this).attr("title") : "";
					var url = typeof $j(this).attr("href") != "undefined" ? $j(this).attr("href") : "";
					if (url == "") {
						return;
					}
					window.open(url, title, "width=600, height=400, status=no, toolbar=no, menubar=no");
				});


		   	/* Portfolio
			================================================== */

				if ( $j("section.portfolio").length ) {
					var portfolio = $j("section.portfolio");
					// 
					$j("section.portfolio .portfolio-sidebar select, section.portfolio .portfolio-albums select").on('change', function() { 
						var album = $j(this).val();
						if( typeof album !== 'undefined' && album != "" && album != portfolio.attr("data-album") ) {
							portfolio.attr("data-album", album);
							sienaPortfolio();
						}
					});
					//
					$j("section.portfolio .sidebar-albums .album").on( "click", function() {
						if( !$j(this).hasClass("album-active") ) {
							$j(this).addClass("album-active").siblings().removeClass("album-active");
							var album = $j(this).attr("data-album-id");
							if( typeof album !== 'undefined' && album != "" && album != portfolio.attr("data-album") ) {
								portfolio.attr("data-album", album);
								sienaPortfolio();
							}
						}
					});
					//
					$j("section.portfolio .portfolio-layouts .button-layout").on( "click", function() {
						var button = $j(this);
						var layout = button.attr("data-layout");
						button.addClass("button-layout-active").siblings().removeClass("button-layout-active");
						portfolio.removeClass("portfolio-layout-cols-2 portfolio-layout-cols-3 portfolio-layout-cols-4 portfolio-layout-masonry portfolio-layout-list").addClass(layout);
					});
					//
					$j("section.portfolio .portfolio-more button").on( "click", function() {
						if( $j(this).parents(".portfolio-more").hasClass("portfolio-more-active") ) {
							sienaPortfolio();
						}
					});
				}

		   	/* Select Box
			================================================== */

				sienaSelectBox();


		   	/* Video
			================================================== */

				$j(".js-video[data-url]").each(function() {
					var url = $j(this).attr("data-url");
					if (url.indexOf(".mp4") != -1) {
						var v = "<div class='video'><video autoplay controls><source src='"+url+"' type='video/mp4'></video></div>";
						$j(this).prepend(v);
					} else if (url.indexOf("vimeo.com") != -1) {
						var i = url.substring(url.lastIndexOf('/') + 1);
						var v = "<iframe src='https://player.vimeo.com/video/"+i+"?autoplay=1&byline=0&portrait=0' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
						$j(this).prepend(v);
					} else if (url.indexOf("youtube.com") != -1) {
						var i = url.substring(url.lastIndexOf('=') + 1);
						var v = "<iframe src='https://www.youtube.com/embed/"+i+"?showinfo=0&controls=0&rel=0&color=black&autoplay=1' frameborder='0'></iframe>";
						$j(this).prepend(v);
					}
				});

		}


	/**
	 * Scroll Functionality.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaScroll() {

		}


	/**
	 * Select Box Functionality.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaSelectBox() {
			for (var i = 0; i < $j('.js-select').length; i++) {
				var select 		= $j('.js-select').eq(i).attr("js-select-id", i);
		   		var selectVal 	= select.val();
		   		select.before("<div class='js-select-box' id='js-select-box-"+i+"' data-select='"+i+"'><div class='box-selected'><div class='box-selected-text'></div></div><div class='box-list'><ul></ul></div></div>");
		   		var box 			= $j('#js-select-box-'+i);
		   		var boxList 		= box.find('.box-list ul');
		   		var boxSelected 	= box.find('.box-selected');
		   		if( select.hasClass("js-select-block") ) {
		   			box.addClass("js-select-box-block");
		   		}
		   		if( select.hasClass("js-select-large") ) {
		   			box.addClass("js-select-box-large");
		   		}
		   		if( select.hasClass("js-select-input") ) {
		   			box.addClass("js-select-box-input");
		   		}
		   		select.find("option").each(function() {
		   			var option 			= $j(this);
		   			var optionClass 	= option.attr("class") || "no-class";
		   			var optionText 		= option.text() || "";
		   			var optionTitle 	= option.attr("title") || "";
		   			var optionVal 		= option.attr("value") || "";
		   			if( optionVal == "" ) {
		   				optionClass += " box-empty-item";
		   			}
		   			if( optionVal == selectVal ) {
		   				optionClass += " box-selected-item";
		   				boxSelected.find('.box-selected-text').text(optionText);
		   			}
		   			box.find('.box-list ul').append("<li class='"+optionClass+"' title='"+optionTitle+"' data-value='"+optionVal+"'>"+optionText+"</li>");
		   		});
		   		boxSelected.on( "click", function() {
		   			var box = $j(this).parent();
		   			box.toggleClass("js-select-box-active");
		   			if(box.hasClass("js-select-box-block")) {
		   				$j("body").addClass("js-select-box-block");
		   			}
		   		});
			   	boxList.find("li").on( "click", function() {
			   		var option  		= $j(this);
			   		var optionName 		= option.text();
			   		var optionVal 		= option.attr("data-value");
		   			var box 			= option.parent().parent().parent();
		   			var boxSelected 	= box.find('.box-selected-text');
		   			var boxID 			= box.attr("data-select");
			   		var select 			= $j("select[js-select-id='"+boxID+"']");
			   		boxSelected.text(optionName);
			   		box.toggleClass("js-select-box-active");
			   		option.addClass("box-selected-item").siblings().removeClass("box-selected-item");
			   		select.focus().val(optionVal).change();
			   		$j("body").removeClass("js-select-box-block");
			   	});
				$j(document).mouseup(function(e){
					if (!boxList.is(e.target)  && boxList.has(e.target).length === 0) {
						box.removeClass("js-select-box-active");
					}
				});
		   	};
		}


	/**
	 * Photograph Functionality.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaPhotograph() {
			// Display photograph
			var portfolio = $j("section.portfolio");
			var photograph = portfolio.find(".photograph-preview");
			function photographDisplay() {
				var photographTitle 	= photograph.find(".photograph-media").attr("data-media-title");
				var photographSource 	= photograph.find(".photograph-media").attr("data-media-url");
				// Photograph Details
				var photographDetails 		= photograph.find(".photograph-details");
				var photographDetailsOutput = "";
				if( photographDetails.length && photographDetails.children().length ) {
					photographDetails.children().each(function(){
						var detail = $j(this);
						detailName = detail.attr("data-name");
						detailValue = detail.attr("data-value");
						if( typeof detailName != "undefined" && typeof detailValue != "undefined" ) {
							photographDetailsOutput += "<div class='photograph-detail column'><div class='container full-width'><div class='name one-full column'>"+detailName+"</div><div class='value one-full column'>"+detailValue+"</div></div></div>";
						}				
					});
				}
				var logo = $j("header.header .header-logo").html();
				// Prepare photograph
				var output = "<div class='photograph-lightbox'>";
				output += "<div class='lightbox-header one-full column'>";
				output += "<div class='container full-width narrow v-center'>";
				output += "<div class='lightbox-logo column'>" + logo + "</div>";
				output += "<div class='lightbox-close column'><div class='close-button'><div class='close'></div></div></div>";
				output += "</div></div>";
				output += "<section class='photograph one-full column'>";
				// Photograph preview
				output += "<div class='section-header entry-header container full-width'>";
				output += "<div class='photograph-media one-full column'>";
				output += "<div class='container full-width full-height'>";
				output += "<div class='photograph-media-file one-full column'>";
				output += "<div class='image'><img src='"+photographSource+"' alt='"+photographTitle+"'></div>";
				output += "</div>";
				output += "<div class='photograph-media-nav one-full column'>";
				output += "<div class='container full-height full-width'>";
				output += "<div class='photograph-media-prev column'><a href='#'></a></div>";
				output += "<div class='photograph-media-next column'><a href='#'></a></div>";
				output += "</div>";
				output += "</div>";
				output += "</div>";
				output += "</div>";
				output += "</div>";
				// Photograph info
				output += "<div class='section-content entry-content container full-width narrow'>";
				output += "<div class='photograph-title entry-title column'>"+photographTitle+"</div>";
				output += "<div class='photograph-share column'>";
				output += "<div class='container full-width'>";
				output += "<div class='share-facebook share-channel column'><a href='#' class='link-with-popup'><i class='fa fa-facebook-official' aria-hidden='true'></i><span>Share</span></a></div>";
				output += "<div class='share-twitter share-channel column'><a href='#' class='link-with-popup'><i class='fa fa-twitter' aria-hidden='true'></i><span>Tweet</span></a></div>";
				output += "</div>";
				output += "</div>";
				output += "</div>";
				// Photograph details
				output += "<div class='section-footer container full-width narrow'>";
				output += "<div class='photograph-details one-full column'>";
				output += "<div class='photograph-details-wrapper container full-width'>";
				output += photographDetailsOutput;
				output += "</div>";
				output += "</div>";
				output += "</div>";
				// Finalize photograph output
				output += "</section></div></div>";
				if( $j("section.photograph").length ) $j("section.photograph").remove();
 				portfolio.after(output);
 				portfolio.parents("body").addClass("photograph-lightbox");
 				//
 				var preview = $j("section.photograph");
 				var lightbox = $j("div.photograph-lightbox");
 				// Next button
 				lightbox.find(".lightbox-close .close-button").on("click", function(event) {
 					event.preventDefault();
 					lightbox.remove();
 					portfolio.parents("body").removeClass("photograph-lightbox");
 				});
 				// Next button
 				preview.find(".photograph-media-next a").on("click", function(event) {
 					event.preventDefault();
 					photographNext();
 				});
 				// Prev button
 				preview.find(".photograph-media-prev a").on("click", function(event) {
 					event.preventDefault();
 					photographPrev();
 				});
 				// Fullscreen
 				preview.find(".photograph-media-file").on( "click", function() {
					photographFullscreen();
				});
				// Swipe gestures
				preview.find('.photograph-media-file .image').on("swipeleft",function(){
					photographNext();
				});
				preview.find('.photograph-media-file .image').on("swiperight",function(){
					photographPrev();
				});
				// Share buttons
				preview.find(".share-facebook a").on("click", function() {
					var url = $j(location).attr('href');
					window.open("https://www.facebook.com/sharer/sharer.php?u="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
				});
				preview.find(".share-twitter a").on("click", function() {
					var url = $j(location).attr('href');
					window.open("https://twitter.com/home?status="+url, "Share", "width=600, height=400, status=no, toolbar=no, menubar=no");
				});
			}
			photographDisplay();
			// Photograph next
			function photographNext() {
				if( photograph.next(".photograph-selected.photograph-active").length ) {
					photograph = photograph.next(".photograph-selected.photograph-active");
					photograph.addClass("photograph-preview").siblings().removeClass("photograph-preview");
					var photographTitle 	= photograph.find(".photograph-media").attr("data-media-title");
					var photographSource 	= photograph.find(".photograph-media").attr("data-media-url");
					// Photograph Details
					var photographDetails 		= photograph.find(".photograph-details");
					var photographDetailsOutput = "";
					if( photographDetails.length && photographDetails.children().length ) {
						photographDetails.children().each(function(){
							var detail = $j(this);
							detailName = detail.attr("data-name");
							detailValue = detail.attr("data-value");
							if( typeof detailName != "undefined" && typeof detailValue != "undefined" ) {
								photographDetailsOutput += "<div class='photograph-detail column'><div class='container full-width'><div class='name one-full column'>"+detailName+"</div><div class='value one-full column'>"+detailValue+"</div></div></div>";
							}				
						});
					}
					//
					var preview = $j("section.photograph");
					preview.find(".photograph-title").html(photographTitle);
					preview.find(".photograph-media-file .image").html("<img src='"+photographSource+"' alt='"+photographTitle+"'>");
					preview.find(".photograph-details-wrapper").html(photographDetailsOutput);
					// Toggle nav visibility state
					preview.find(".photograph-media-next").removeClass("photograph-media-disabled");
					if( photograph.prev(".photograph-selected.photograph-active").length ) {
						preview.find(".photograph-media-prev").removeClass("photograph-media-disabled");
					}
				} else {
					var preview = $j("section.photograph");
					preview.find(".photograph-media-next").addClass("photograph-media-disabled");
				}
			}
			// Photograph prev
			function photographPrev() {
				if( photograph.prev(".photograph-selected.photograph-active").length ) {
					photograph = photograph.prev(".photograph-selected.photograph-active");
					photograph.addClass("photograph-preview").siblings().removeClass("photograph-preview");
					var photographTitle 	= photograph.find(".photograph-media").attr("data-media-title");
					var photographSource 	= photograph.find(".photograph-media").attr("data-media-url");
					// Photograph Details
					var photographDetails 		= photograph.find(".photograph-details");
					var photographDetailsOutput = "";
					if( photographDetails.length && photographDetails.children().length ) {
						photographDetails.children().each(function(){
							var detail = $j(this);
							detailName = detail.attr("data-name");
							detailValue = detail.attr("data-value");
							if( typeof detailName != "undefined" && typeof detailValue != "undefined" ) {
								photographDetailsOutput += "<div class='photograph-detail column'><div class='container full-width'><div class='name one-full column'>"+detailName+"</div><div class='value one-full column'>"+detailValue+"</div></div></div>";
							}				
						});
					}
					//
					var preview = $j("section.photograph");
					preview.find(".photograph-title").html(photographTitle);
					preview.find(".photograph-media-file .image").html("<img src='"+photographSource+"' alt='"+photographTitle+"'>");
					preview.find(".photograph-details-wrapper").html(photographDetailsOutput);
					// Toggle nav visibility state
					preview.find(".photograph-media-prev").removeClass("photograph-media-disabled");
					if( photograph.next(".photograph-selected.photograph-active").length ) {
						preview.find(".photograph-media-next").removeClass("photograph-media-disabled");
					}
				} else {
					var preview = $j("section.photograph");
					preview.find(".photograph-media-prev").addClass("photograph-media-disabled");
				}
			}
			// Photograph fullscreen
			function photographFullscreen() {
				$j("body").toggleClass("photograph-fullscreen");
			}
			// Keyboard navigation
			$j(document).keydown(function(event){
			    var keycode = (event.keyCode ? event.keyCode : event.which);
			    if(keycode == '37') {
			    	photographPrev();
			    } else if(keycode == '39') {
			    	photographNext();
			    }
			});
		}


	/**
	 * Portfolio Functionality.
	 *
	 * @since Siena 1.0
	 *
	================================================== */

		function sienaPortfolio() {
			var portfolio 	= $j("section.portfolio");
			var album 		= portfolio.attr("data-album");
			var more 		= false;
			// Mark photographs as unloaded
			portfolio.find(".photograph").each(function() {
				if( !$j(this).hasClass("photograph-active") ) {
					$j(this).addClass("photograph-virgin");
				}
			});
			// Select photographs
			if( typeof album === "undefined" || album === "-1" ) {
				portfolio.find(".photograph").addClass("photograph-selected");
			} else {
				portfolio.find(".photograph-media[data-album='"+album+"']").parents(".photograph").addClass("photograph-selected");
				portfolio.find(".photograph-media[data-album!='"+album+"']").parents(".photograph").removeClass("photograph-selected photograph-final");
			}
			// Make the necessary calculations
			var loaded 	= portfolio.find(".photograph-selected.photograph-active").length;
			var total 	= portfolio.find(".photograph-selected").length;
			// Show empty message if there is no photographs for current selection
			if( total == 0 ) {
				if( !portfolio.find(".portfolio-empty").length ) {
					portfolio.find(".portfolio-grid > .container").prepend("<div class='portfolio-empty one-full column'><div class='container full-width'><div class='empty-message one-full column'>No Photos</div></div></div>");
				}
				return false;
			} else {
				portfolio.find(".portfolio-empty").remove();
				portfolio.find(".portfolio-footer").removeClass("portfolio-footer-hidden");
			}
			// Show loaded photographs
			portfolio.find(".photograph-selected.photograph-loaded").addClass("photograph-active");
			// Load more photographs if loaded are few or none
			if( loaded < total ) {
				// Show loading
				if(loaded == 0) {
					portfolio.addClass("portfolio-post-loading");
				}
				if( !portfolio.find(".portfolio-loading").length && loaded > 1 ) {
					portfolio.append("<div class='portfolio-loading one-full column'></div>");
				}
				if( loaded > 1 ) {
					portfolio.find(".portfolio-more").removeClass("portfolio-more-active").addClass("portfolio-more-loading");
				}
				//
				j = total - loaded > 10 ? 10 : total - loaded;
				for (var i = 0; i < j; i++) {
					var photograph 	= portfolio.find(".photograph-selected").not(".photograph-active").eq(i);
					var source 		= photograph.find(".photograph-media").attr("data-media-url");
					photograph.css("background-image", "url("+source+")").attr("data-media", source);
				}
				//
				var photographs = document.querySelectorAll(".photograph-selected.photograph-virgin");
				var imgLoaded = imagesLoaded( photographs, { background: true } );
				// Stuff to do when done
				imgLoaded.on("done", function() {
					// Animate: Hapi
					var postsAnimated = anime({
					  	targets: document.querySelectorAll(".photograph-selected.photograph-active:not(.photograph-final)"),
					  	//loop: true,
						duration: function(t,i) { return 1000 + i*75; },
						easing: 'easeOutExpo',
						delay: function(t,i) { return i*200; },
						opacity: { value: [0,1], easing: 'linear' },
						scale: [0,1]	
					});
					// 
					portfolio.find(".photograph-selected.photograph-active").addClass("photograph-final");
					// Remove loading
					portfolio.removeClass("portfolio-post-loading");
					portfolio.removeClass("portfolio-grid-loading");
					// 
					portfolio.find(".portfolio-more").addClass("portfolio-more-active").removeClass("portfolio-more-loading");
					// Redo the necessary calculations
					loaded = portfolio.find(".photograph-final").length;
					total = portfolio.find(".photograph-selected").length;
					if( loaded < total ) { 

					} else {
						// Hide load more button if there is no more photographs
						portfolio.find(".portfolio-more").removeClass("portfolio-more-active");
						portfolio.find(".portfolio-footer").addClass("portfolio-footer-hidden");
					}
				});
				// Photographs loading progress
				imgLoaded.on("progress", function( instance, image ) {
					if( image.isLoaded ) {
				    	// Define image properties
				    	var mediaSource = image.img.src;
				    	var mediaHeight = image.img.naturalHeight;
				    	var mediaWidth = image.img.naturalWidth;
				    	var cssWidth = (300 / mediaHeight) * mediaWidth;
				    	//
				    	var photograph = $j(image.element);
				    	photograph.css("height", 300).css("width", cssWidth);
				    	photograph.removeClass("photograph-virgin").addClass("photograph-active");
				    	//
						photograph.on( "click", function() {
							$j(this).addClass("photograph-preview");
							sienaPhotograph();
						});
					} else {
						var photograph = $j(image.element);
						photograph.remove();
						console.log("("+image.img.src+") is broken :'(");
					}
				});
			} else {
				// Hide load more button if there is no more photographs
				portfolio.find(".portfolio-more").removeClass("portfolio-more-active");
			}
		}



/* Browser Events
================================================== */

	jQuery(document).ready(function($) {
	   sienaReady();
	});


	jQuery(window).load(function() {
		sienaLoad();
	});


	jQuery(window).resize(function() {
		sienaAdjust();
	});


	jQuery(window).scroll(function() {
		sienaScroll();
	});



/* Plugins
================================================== */

	/* SPF 24 (v2.4.0)
	 * (c) 2012-2016 Google Inc.
	 * License: MIT
	================================================== */

		(function(){function l(a,b,c){var d=Array.prototype.slice.call(arguments,2);return function(){var c=d.slice();c.push.apply(c,arguments);return a.apply(b,c)}}function aa(a,b){if(a){var c=Array.prototype.slice.call(arguments,1);try{return a.apply(null,c)}catch(d){return d}}}function m(a,b){if(document.createEvent){var c=document.createEvent("CustomEvent");c.initCustomEvent(a,!0,!0,b);return document.dispatchEvent(c)}return!0}
		var n=window.performance&&window.performance.timing&&window.performance.now?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};function ba(){};function r(a,b){return t[a]=b}var t=window._spf_state||{};window._spf_state=t;var ca={"animation-class":"spf-animate","animation-duration":425,"cache-lifetime":6E5,"cache-max":50,"cache-unified":!1,"link-class":"spf-link","nolink-class":"spf-nolink","navigate-limit":20,"navigate-lifetime":864E5,"reload-identifier":null,"request-timeout":0,"url-identifier":"?spf=__type__"},v={};"config"in t||r("config",v);v=t.config;n();function da(a,b){var c=b||document;return c.querySelectorAll?c.querySelectorAll(a):[]}function ea(a,b,c){for(;a;){if(b(a))return a;if(c&&a==c)break;a=a.parentNode}return null}function fa(a,b,c){b=b||document;var d=b.createElement("iframe");d.id=a||"";d.src='javascript:""';d.style.display="none";c&&(d.onload=l(c,null,d));b.body.appendChild(d);return d};function ga(a,b,c){var d=null,e=window.history.state;if(e){var d={},f;for(f in e)d[f]=e[f]}if(b)for(f in d=d||{},b)d[f]=b[f];ha(!0,a,d,c)}function ha(a,b,c,d){if(b||c){b=b||window.location.href;c=c||{};var e=n();r("history-timestamp",e);c["spf-timestamp"]=e;if(a)ia(c,b);else if(a=ja().contentWindow.history.pushState,"function"==typeof a)a.call(window.history,c,"",b);else throw Error("history.pushState is not a function.");r("history-url",b);d&&(d=t["history-callback"])&&d(b,c)}}
		function ka(a){var b=window.location.href;if(t["history-ignore-pop"])r("history-ignore-pop",!1);else if(a.state){a=a.state;var c=a["spf-timestamp"];b==t["history-url"]?(r("history-timestamp",c),ia(a,b)):(a["spf-back"]=c<parseInt(t["history-timestamp"],10),a["spf-current"]=t["history-url"],r("history-timestamp",c),r("history-url",b),(c=t["history-callback"])&&c(b,a))}}
		function ia(a,b){var c=ja().contentWindow.history.replaceState;if("function"==typeof c)c.call(window.history,a,"",b);else throw Error("history.replaceState is not a function");}function ja(){var a=document.getElementById("history-iframe");a||(a=fa("history-iframe"));return a};function w(a,b){if(a.forEach)a.forEach(b,void 0);else for(var c=0,d=a.length;c<d;c++)c in a&&b.call(void 0,a[c],c,a)}function la(a,b){if(a.every)return a.every(b,void 0);for(var c=0,d=a.length;c<d;c++)if(c in a&&!b.call(void 0,a[c],c,a))return!1;return!0}function ma(a,b){if(a.some)return a.some(b,void 0);for(var c=0,d=a.length;c<d;c++)if(c in a&&b.call(void 0,a[c],c,a))return!0;return!1}
		function na(a,b){if(a.filter)return a.filter(b,void 0);var c=[];w(a,function(a,e,f){b.call(void 0,a,e,f)&&c.push(a)});return c}function oa(a,b){if(a.map)return a.map(b,void 0);var c=[];c.length=a.length;w(a,function(a,e,f){c[e]=b.call(void 0,a,e,f)});return c}function x(a){return"[object Array]"==Object.prototype.toString.call(a)?a:[a]};function pa(a){var b=y();a in b&&delete b[a]}function ra(){var a=y(),b;for(b in a)sa(a[b])||delete a[b];a=y();b=parseInt(v["cache-max"],10);b=isNaN(b)?Infinity:b;b=Object.keys(a).length-b;if(!(0>=b))for(var c=0;c<b;c++){var d=Infinity,e,f;for(f in a)a[f].count<d&&(e=f,d=a[f].count);delete a[e]}}function sa(a){if(!(a&&"data"in a))return!1;var b=a.life,b=isNaN(b)?Infinity:b;a=a.time;return n()-a<b}function ta(a){var b=parseInt(t["cache-counter"],10)||0;b++;r("cache-counter",b);a.count=b}
		function y(a){return!a&&"cache-storage"in t?t["cache-storage"]:r("cache-storage",a||{})};function ua(a){return a.classList?a.classList:a.className&&a.className.match(/\S+/g)||[]}function va(a,b){if(b){if(a.classList)return a.classList.contains(b);var c=ua(a);return ma(c,function(a){return a==b})}return!1}function z(a,b){b&&(a.classList?a.classList.add(b):va(a,b)||(a.className+=" "+b))}function A(a,b){if(b)if(a.classList)a.classList.remove(b);else{var c=ua(a),c=na(c,function(a){return a!=b});a.className=c.join(" ")}};function wa(a){var b=document.body;b.dataset?b.dataset.spfName=a:b.setAttribute("data-"+"spfName".replace(/([A-Z])/g,"-$1").toLowerCase(),a)};function B(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c}function xa(a){return"[object String]"==Object.prototype.toString.call(a)}var ya=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^\s+|\s+$/g,"")};function C(a,b){var c=a.split(b),d=1==c.length;return[c[0],d?"":b,d?"":c.slice(1).join(b)]};function za(a){a.data&&xa(a.data)&&0==a.data.lastIndexOf(Aa,0)&&Ba(a.data.substring(Aa.length))}function Ba(a){var b=D[a];b&&(delete D[a],b())}function Ca(a){window.addEventListener?window.addEventListener("message",a,!1):window.attachEvent&&window.attachEvent("onmessage",a)}function Da(a){window.removeEventListener?window.removeEventListener("message",a,!1):window.detachEvent&&window.detachEvent("onmessage",a)}
		var Ea=function(){function a(){b=!1}if(!window.postMessage)return!1;var b=!0;Ca(a);window.postMessage("","*");Da(a);return b}(),Aa="spf:",D={};"async-defers"in t||r("async-defers",D);D=t["async-defers"];Ea&&("async-listener"in t&&Da(t["async-listener"]),Ca(za),r("async-listener",za));function Fa(a,b){a&&b&&(a in E||(E[a]=[]),E[a].push(b))}function Ga(a,b){a in E&&b&&la(E[a],function(a,d,e){return a==b?(e[d]=null,!1):!0})}function Ha(a){a in E&&w(E[a],function(a,c,d){d[c]=null;a&&a()})}var E={};"ps-s"in t||r("ps-s",E);E=t["ps-s"];function F(a,b,c){var d=G[a];return a&&b?(d||(d=G[a]={items:[],j:0,i:0,o:1}),d.items.push({t:b,p:c||0})):d&&d.items.length||0}function H(a,b){var c=G[a];if(c){var d=!!c.j||!!c.i;0<c.o&&(b||!d)&&Ia(a,b)}}function J(a){(a=G[a])&&a.o--}function K(a,b){var c=G[a];c&&(c.o++,H(a,b))}function Ja(a){var b=G[a];b&&(Ka(b),delete G[a])}
		function Ia(a,b){var c=G[a];if(c&&(Ka(c),0<c.o&&c.items.length)){var d=c.items[0];if(d){var e=l(function(a,b){b();a()},null,l(Ia,null,a,b));b?(c.items.shift(),e(d.t)):La(c,d,e)}}}function La(a,b,c){b.p?(c=l(c,null,ba),a.i=setTimeout(c,b.p),b.p=0):(a.items.shift(),c=l(c,null,b.t),(b=(b=v["advanced-task-scheduler"])&&b.addTask)?a.j=b(c):a.i=setTimeout(c,0))}function Ka(a){if(a.j){var b=v["advanced-task-scheduler"];(b=b&&b.cancelTask)&&b(a.j);a.j=0}a.i&&(clearTimeout(a.i),a.i=0)}var G={};function L(a){var b=document.createElement("a");b.href=a;b.href=b.href;a={href:b.href,protocol:b.protocol,host:b.host,hostname:b.hostname,port:b.port,pathname:b.pathname,search:b.search,hash:b.hash,L:b.L,K:b.K};a.origin=a.protocol+"//"+a.host;a.pathname&&"/"==a.pathname[0]||(a.pathname="/"+a.pathname);return a}function M(a,b){var c=L(a);return b?c.href:C(c.href,"#")[0]}
		function Ma(a,b){var c=C(a,"#");a=c[0];w(b,function(b){a=a.replace(new RegExp("([?&])"+b+"(?:=[^&]*)?(?:(?=[&])|$)","g"),function(a,b){return"?"==b?b:""})});B(a,"?")&&(a=a.slice(0,-1));return a+c[1]+c[2]}function Na(a){var b=v["advanced-persistent-parameters"]||"",c=C(a,"#");a=c[0];var d=-1!=a.indexOf("?")?"&":"?";return a+(b?d+b:"")+c[1]+c[2]};function Oa(a,b,c,d){var e=a==N;b=O(a,b);var f=c||"^"+b,k=P(a,f),g;c&&(g=Q(a,c))&&b!=g&&(m(e?"spfjsbeforeunload":"spfcssbeforeunload",{name:c,url:g}),Pa(a,c,g),Fa(k,l(Ra,null,a,c,g)));e=P(a,b);if((e=R[e])&&f!=e){var h=P(a,e);delete S[h];h=P(a,b);delete R[h];(h=P(a,e))&&k&&h in E&&(E[k]=(E[k]||[]).concat(E[h]),delete E[h])}h=P(a,b);R[h]=f;Sa(a,f,b);Fa(k,d);d=l(Ta,null,a);Ua(a,b)?(e&&f!=e&&(a=Va(a,b))&&a.setAttribute("name",c||""),d()):(a=Wa(a,b,d,void 0,void 0,g))&&c&&a.setAttribute("name",c)}
		function Xa(a,b){var c=Q(a,b);Pa(a,b,c);Ra(a,b,c)}function Pa(a,b,c){var d=P(a,b);delete S[d];c&&(c=P(a,c),delete R[c]);a=P(a,b);delete E[a]}function Ra(a,b,c){var d=a==N;c&&(m(d?"spfjsunload":"spfcssunload",{name:b,url:c}),Ya(a,c))}function Ta(a){var b=P(a,""),c;for(c in E)0==c.indexOf(b)&&la(c.substring(b.length).split("|"),l(Za,null,a))&&Ha(c)}
		function Wa(a,b,c,d,e,f){function k(){Ua(a,b,e)&&$a(ab,a,b,e);g&&p&&p.parentNode&&h==document&&p.parentNode.removeChild(p);c&&setTimeout(c,0);return null}var g=a==N;b=O(a,b);$a(bb,a,b,e);var h=d||document,p=h.createElement(g?"script":"link");if(!b)return k();d=cb(b);p.className=P(a,d);"onload"in p?p.onerror=p.onload=k:p.onreadystatechange=function(){/^c|loade/.test(p.readyState)&&k()};d=h.getElementsByTagName("head")[0]||h.body;g?(p.async=!0,p.src=b,d.insertBefore(p,d.firstChild)):(p.rel="stylesheet",
		p.href=b,(f=f?Va(a,f,d):null)?d.insertBefore(p,f):d.appendChild(p));return p}function Ya(a,b){b=O(a,b);var c=Va(a,b,void 0);c&&c.parentNode&&c.parentNode.removeChild(c);c=P(a,b);delete db[c]}function Va(a,b,c){b=cb(b);a="."+P(a,b);return da(a,c)[0]}function eb(a){var b=a==N,c=[];w(da(b?"script[src]":'link[rel~="stylesheet"]'),function(d){var e=b?d.src:d.href,e=O(a,e);if(!Ua(a,e)){$a(ab,a,e);var f=cb(e),f=P(a,f);z(d,f);if(f=d.getAttribute("name")){var k=P(a,e);R[k]=f;Sa(a,f,e)}c.push(d)}})}
		function fb(a,b,c){if(b&&(b=O(a,b),c||!Ua(a,b)))if(c&&a==gb)hb(b);else{var d=cb(b),e=P(a,d),f=P(a,"prefetch"),d=document.getElementById(f);if(!d)d=fa(f,null,function(a){a.title=f;H(f,!0)});else if(!c&&d.contentWindow.document.getElementById(e))return;a=l(ib,null,d,a,b,e,f);d.title?a():F(f,a)}}
		function ib(a,b,c,d,e){var f=b==N,k=b==T;a=a.contentWindow.document;var g=a.getElementById(d);g&&g.parentNode.removeChild(g);f?(g=a.createElement("object"),jb?a.createElement("script").src=c:g.data=c,g.id=d,a.body.appendChild(g)):k?(g=Wa(b,c,null,a,e),g.id=d):(g=a.createElement("img"),jb&&(c=c+"#"+n()),g.src=c,g.id=d,a.body.appendChild(g))}function hb(a){var b=new Image;jb&&(a=a+"#"+n());b.src=a}
		function kb(a,b,c){for(var d=a==N,e=Q(a,c),f=b.replace(/\s/g,""),f=f||"",k=0,g=0,h=f.length;g<h;++g)k=31*k+f.charCodeAt(g),k%=4294967296;f="hash-"+k;Sa(a,c,f);!lb(a,f)&&(b=mb(a,b))&&($a(ab,a,f),b&&!d&&(d=cb(f),d=P(a,d),b.className=d,b.setAttribute("name",c)),(e=e&&e[0])&&Ya(a,e))}
		function mb(a,b){b=ya(b);if(!b)return null;var c=document.getElementsByTagName("head")[0]||document.body,d;a==N?(d=document.createElement("script"),d.text=b,c.appendChild(d),c.removeChild(d)):(d=document.createElement("style"),c.appendChild(d),"styleSheet"in d?d.styleSheet.cssText=b:d.appendChild(document.createTextNode(b)));return d}
		function O(a,b){var c="rsrc-p-"+a;if(b){var d=b.indexOf("//");if(0>d){if(0==b.lastIndexOf("hash-",0))return b;c=t[c]||"";if(xa(c))b=c+b;else for(var e in c)b=b.replace(e,c[e]);a!=gb&&(b=0>b.indexOf("."+a)?b+"."+a:b);b=M(b)}else 0==d&&(b=M(b))}return b}function P(a,b,c){return a+"-"+b+(c?"-"+c:"")}function cb(a){return a?String(a).replace(/[^\w]/g,""):""}function $a(a,b,c,d){b=P(b,c,d);db[b]=a}function Ua(a,b,c){a=P(a,b,c);return db[a]}function lb(a,b){var c=Ua(a,b);return""==b||c==ab}
		function Sa(a,b,c){a=P(a,b);S[a]=c}function Q(a,b){var c=P(a,b);return S[c]}function Za(a,b){var c=Q(a,b);return void 0!=c&&lb(a,c)}var db={},R={},S={},jb=-1!=navigator.userAgent.indexOf(" Trident/"),bb=1,ab=2,T="css",gb="img",N="js";"rsrc-s"in t||r("rsrc-s",db);db=t["rsrc-s"];"rsrc-n"in t||r("rsrc-n",R);R=t["rsrc-n"];"rsrc-u"in t||r("rsrc-u",S);S=t["rsrc-u"];function nb(a){a=x(a);w(a,function(a){fb(gb,a,!0)})};function ob(a,b,c){Oa(N,a,b,c)}function pb(a){Xa(N,a)}function qb(a,b){Wa(N,a,b)}function rb(a){a=x(a);w(a,function(a){fb(N,a)})}function sb(a,b,c){a=x(a);a=na(a,function(a){return!!a});var d=[];w(a,function(a){void 0==Q(N,a)&&d.push(a)});var e=!d.length;if(b){var f=la(a,l(Za,null,N));e&&f?b():(a=P(N,a.sort().join("|")),Fa(a,b))}c&&!e&&c(d)}function tb(a,b){a=x(a);w(a,function(a){if(a){var b=ub[a]||a,b=O(N,b),e=Q(N,a);e&&b!=e&&vb(a)}});sb(a,b,wb)}
		function wb(a){w(a,function(a){function c(){ob(e,a)}var d=U[a],e=ub[a]||a;d?tb(d,c):c()})}function vb(a){a=x(a);w(a,function(a){var c=[],d;for(d in U){var e=U[d],e=x(e);w(e,function(e){e==a&&c.push(d)})}w(c,function(a){vb(a)});pb(a)})}function xb(a,b){kb(N,a,b)}function yb(a){mb(N,a)}var U={};"js-d"in t||r("js-d",U);var U=t["js-d"],ub={};"js-u"in t||r("js-u",ub);ub=t["js-u"];function zb(a,b,c){Oa(T,a,b,c)}function Ab(a,b){Wa(T,a,b)}function Bb(a){a=x(a);w(a,function(a){fb(T,a)})};function Cb(a,b,c){if(b){b=[];var d,e=0;c&&(a+="\r\n");var f=a.indexOf(Db,e);for(-1<f&&(e=f+Db.length);-1<(f=a.indexOf(Eb,e));)d=ya(a.substring(e,f)),e=f+Eb.length,d&&b.push(JSON.parse(d));f=a.indexOf(Fb,e);-1<f&&(d=ya(a.substring(e,f)),e=f+Fb.length,d&&b.push(JSON.parse(d)));d="";a.length>e&&(d=a.substring(e),c&&B(d,"\r\n")&&(d=d.substring(0,d.length-2)));b=Gb(b);return{n:b,c:d}}a=JSON.parse(a);b=Gb(x(a));return{n:b,c:""}}
		function V(a,b,c,d){var e=c&&0==c.type.lastIndexOf("navigate",0),f=c&&c.reverse,k=c&&!!c.position,g=c&&c.f,h=b.name||"",p="process "+M(a),q=!v["experimental-process-async"],u;u=0;b.timing||(b.timing={});b.title&&(document.title=b.title);e&&b.url&&M(b.url)!=M(window.location.href)&&ga(b.url+window.location.hash);b.head&&(u=l(function(a,b){var c=W(a);Hb(c);Ib(c);J(p);Jb(c,function(){b.spfProcessHead=n();K(p,q)})},null,b.head,b.timing),u=F(p,u));b.attr&&(u=l(function(a,b){for(var c in a){var d=document.getElementById(c);
		if(d){var e=a[c],f=void 0;for(f in e){var g=e[f];"class"==f?d.className=g:"style"==f?d.style.cssText=g:(d.setAttribute(f,g),"value"==f&&(d[f]=g))}}}b.spfProcessAttr=n()},null,b.attr,b.timing),u=F(p,u));var I=b.body||{},Tc=u,Qa;for(Qa in I)u=l(function(a,b){var d=document.getElementById(a);if(d){!e||k||g||(r("nav-scroll-position",null),r("nav-scroll-url",null),window.scroll(0,0),g=!0,c&&(c.f=!0));var u=W(b);Ib(u);var I=function(){J(p);Jb(u,function(){K(p,q)})},qa=v["animation-class"];Kb&&va(d,qa)?
		(d=new Lb(d,u.html,qa,h,!!f),J(p),H(d.key,!0),F(d.key,l(Mb,null,d),0),F(d.key,l(Nb,null,d),17),F(d.key,l(Ob,null,d),d.duration),F(d.key,l(function(){I();K(p,q)},null),0),H(d.key)):(qa=v["experimental-html-handler"])?(J(p),qa(u.html,d,function(){I();K(p,q)})):(d.innerHTML=u.html,I())}},null,Qa,I[Qa],b.timing),u=F(p,u);I=u-Tc;b.foot?(u=l(function(a,b,c){c&&(b.spfProcessBody=n());a=W(a);Ib(a);J(p);Jb(a,function(){b.spfProcessFoot=n();K(p,q)})},null,b.foot,b.timing,I),u=F(p,u)):I&&(u=l(function(a){a.spfProcessBody=
		n()},null,b.timing),u=F(p,u));d&&(u=F(p,l(d,null,a,b)));H(p,q)}function Pb(a,b,c,d){c="preprocess "+M(a);var e;b.head&&(e=l(function(a){a=W(a);Hb(a);Qb(a);Rb(a)},null,b.head),F(c,e));var f=b.body||{},k;for(k in f)f[k]&&(e=l(function(a,b){var c=W(b);Qb(c);Rb(c)},null,k,f[k]),F(c,e));b.foot&&(e=l(function(a){a=W(a);Qb(a);Rb(a)},null,b.foot),F(c,e));d&&F(c,l(d,null,a,b));H(c)}
		function Mb(a){z(a.element,a.k);z(a.element,a.u);z(a.element,a.G);z(a.element,a.C);z(a.element,a.D);a.h=document.createElement("div");a.h.className=a.J;var b=a.element,c=a.h;if(c){for(var d;d=b.firstChild;)c.appendChild(d);b.appendChild(c)}a.g=document.createElement("div");a.g.className=a.I;a.g.innerHTML=a.H;a.reverse?(b=a.h,b.parentNode.insertBefore(a.g,b)):(b=a.h,b.parentNode.insertBefore(a.g,b.nextSibling))}function Nb(a){A(a.element,a.C);A(a.element,a.D);z(a.element,a.r);z(a.element,a.s)}
		function Ob(a){a.element.removeChild(a.h);var b=a.g,c,d=b.parentNode;if(d&&11!=d.nodeType)if(b.removeNode)b.removeNode(!1);else{for(;c=b.firstChild;)d.insertBefore(c,b);d.removeChild(b)}A(a.element,a.r);A(a.element,a.s);A(a.element,a.u);A(a.element,a.G);A(a.element,a.k)}function Gb(a){w(x(a),function(a){if(a){a.head&&(a.head=W(a.head));if(a.body)for(var c in a.body)a.body[c]=W(a.body[c]);a.foot&&(a.foot=W(a.foot))}});return a}
		function W(a){var b=new Sb;if(!a)return b;if(!xa(a))return a.scripts&&w(a.scripts,function(a){b.scripts.push({url:a.url||"",text:a.text||"",name:a.name||"",async:a.async||!1})}),a.styles&&w(a.styles,function(a){b.styles.push({url:a.url||"",text:a.text||"",name:a.name||""})}),a.links&&w(a.links,function(a){"spf-preconnect"==a.rel&&b.links.push({url:a.url||"",rel:a.rel||""})}),b.html=a.html||"",b;a=a.replace(Tb,function(a,d,e,f){if("script"==d){d=(d=e.match(Ub))?d[1]:"";var k=e.match(Vb),k=k?k[1]:"",
		g=Wb.test(e);e=Xb.exec(e);return(e=!e||-1!=e[1].indexOf("/javascript")||-1!=e[1].indexOf("/x-javascript")||-1!=e[1].indexOf("/ecmascript"))?(b.scripts.push({url:k,text:f,name:d,async:g}),""):a}return"style"==d&&(d=(d=e.match(Ub))?d[1]:"",e=Xb.exec(e),e=!e||-1!=e[1].indexOf("text/css"))?(b.styles.push({url:"",text:f,name:d}),""):a});a=a.replace(Yb,function(a,d){var e=d.match(Zb),e=e?e[1]:"";if("stylesheet"==e){var e=(e=d.match(Ub))?e[1]:"",f=d.match($b),f=f?f[1]:"";b.styles.push({url:f,text:"",name:e});
		return""}return"spf-preconnect"==e?(f=(f=d.match($b))?f[1]:"",b.links.push({url:f,rel:e}),""):a});b.html=a;return b}function Jb(a,b){if(0>=a.scripts.length)b&&b();else{var c=-1,d=function(){c++;if(c<a.scripts.length){var e=a.scripts[c],f=function(){};e.url?f=e.name?l(ob,null,e.url,e.name):l(qb,null,e.url):e.text&&(f=e.name?l(xb,null,e.text,e.name):l(yb,null,e.text));e.url&&!e.async?f(d):(f(),d())}else b&&b()};d()}}
		function Rb(a){0>=a.scripts.length||(a=oa(a.scripts,function(a){return a.url}),rb(a))}function Ib(a){0>=a.styles.length||w(a.styles,function(a){a.url?a.name?zb(a.url,a.name):Ab(a.url):a.text&&(a.name?kb(T,a.text,a.name):mb(T,a.text))})}function Qb(a){0>=a.styles.length||(a=oa(a.styles,function(a){return a.url}),Bb(a))}function Hb(a){0>=a.links.length||(a=oa(a.links,function(a){return"spf-preconnect"==a.rel?a.url:""}),nb(a))}
		function Lb(a,b,c,d,e){var f=parseInt(v["animation-duration"],10);this.element=a;this.H=b;this.duration=f;this.reverse=e;b=document.body;b=(b.dataset?b.dataset.spfName:b.getAttribute("data-"+"spfName".replace(/([A-Z])/g,"-$1").toLowerCase()))||"";f=parseInt(t.uid,10)||0;f++;this.key=a["spf-key"]||(a["spf-key"]=""+r("uid",f));this.u=b&&c+"-from-"+b;this.G=d&&c+"-to-"+d;this.h=null;this.J=c+"-old";this.g=null;this.I=c+"-new";this.k=c+(e?"-reverse":"-forward");this.C=c+"-start";this.D=this.k+"-start";
		this.r=c+"-end";this.s=this.k+"-end"}function Sb(){this.html="";this.scripts=[];this.styles=[];this.links=[]}
		var Kb=function(){var a=document.createElement("div");return"transition"in a.style?!0:ma(["webkit","Moz","Ms","O","Khtml"],function(b){return b+"Transition"in a.style})}(),Yb=/\x3clink([\s\S]*?)\x3e/ig,Tb=/\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig,Wb=/(?:\s|^)async(?:\s|=|$)/i,$b=/(?:\s|^)href\s*=\s*["']?([^\s"']+)/i,Ub=/(?:\s|^)name\s*=\s*["']?([^\s"']+)/i,Zb=/(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i,Vb=/(?:\s|^)src\s*=\s*["']?([^\s"']+)/i,Xb=/(?:\s|^)type\s*=\s*["']([^"']+)["']/i,Db=
		"[\r\n",Eb=",\r\n",Fb="]\r\n";function ac(a,b,c,d){var e=d||{},f=!1,k=0,g,h=new XMLHttpRequest;h.open(a,b,!0);h.timing={};var p=h.abort;h.abort=function(){clearTimeout(g);h.onreadystatechange=null;p.call(h)};h.onreadystatechange=function(){var a=h.timing;if(h.readyState==bc){a.responseStart=a.responseStart||n();if("json"==h.responseType)f=!1;else if(-1<(h.getResponseHeader("Transfer-Encoding")||"").toLowerCase().indexOf("chunked"))f=!0;else{var a=h.getResponseHeader("X-Firefox-Spdy"),c=window.chrome&&chrome.loadTimes&&chrome.loadTimes(),
		c=c&&c.wasFetchedViaSpdy;f=!(!a&&!c)}e.A&&e.A(h)}else h.readyState==cc?f&&e.l&&(a=h.responseText.substring(k),k=h.responseText.length,e.l(h,a)):h.readyState==dc&&(a.responseEnd=a.responseEnd||n(),window.performance&&window.performance.getEntriesByName&&(h.resourceTiming=window.performance.getEntriesByName(b).pop()),f&&e.l&&h.responseText.length>k&&(a=h.responseText.substring(k),k=h.responseText.length,e.l(h,a)),clearTimeout(g),e.w&&e.w(h))};"responseType"in h&&"json"==e.responseType&&(h.responseType=
		"json");a="POST"==a;if(e.headers)for(var q in e.headers)h.setRequestHeader(q,e.headers[q]),"content-type"==q.toLowerCase()&&(a=!1);a&&h.setRequestHeader("Content-Type","application/x-www-form-urlencoded");0<e.F&&(g=setTimeout(function(){h.abort();e.B&&e.B(h)},e.F));h.timing.fetchStart=n();h.send(c);return h}var bc=2,cc=3,dc=4;function ec(a,b){var c=b||{};c.method=((c.method||"GET")+"").toUpperCase();c.type=c.type||"request";var d=a,e=v["url-identifier"]||"";if(e){var e=e.replace("__type__",c.type||""),f=C(d,"#"),k=C(f[0],"?"),d=k[0],g=k[1],k=k[2],h=f[1],f=f[2];if(0==e.lastIndexOf("?",0))g&&(e=e.replace("?","&")),k+=e;else{if(0==e.lastIndexOf(".",0))if(B(d,"/"))e="index"+e;else{var p=d.lastIndexOf(".");-1<p&&(d=d.substring(0,p))}else B(d,"/")&&0==e.lastIndexOf("/",0)&&(e=e.substring(1));d+=e}d=d+g+k+h+f}e=M(d);d={};d.spfUrl=
		e;d.startTime=n();d.fetchStart=d.startTime;g=fc(a,c.current,null,c.type,!1);g=gc(g,c.current);d.spfPrefetched=!!g&&"prefetch"==g.type;d.spfCached=!!g;if(g){var c=l(hc,null,a,c,d,g.key,g.response),q;q=window._spf_state=window._spf_state||{};e=parseInt(q.uid,10)||0;e++;q=q.uid=e;D[q]=c;Ea?window.postMessage(Aa+q,"*"):window.setTimeout(l(Ba,null,q),0);return null}g={};if(k=v["request-headers"])for(q in k)h=k[q],g[q]=null==h?"":h;if(c.headers)for(q in c.headers)h=c.headers[q],g[q]=null==h?"":h;null!=
		c.b&&(g["X-SPF-Referer"]=c.b);null!=c.current&&(g["X-SPF-Previous"]=c.current);if(q=v["advanced-header-identifier"])g["X-SPF-Request"]=q.replace("__type__",c.type),g.Accept="application/json";q=new ic;k=l(jc,null,a,c,d,q);q={headers:g,F:v["request-timeout"],A:l(kc,null,a,q),l:l(lc,null,a,c,d,q),w:k,B:k};v["advanced-response-type-json"]&&(q.responseType="json");return"POST"==c.method?ac("POST",e,c.q,q):ac("GET",e,null,q)}
		function hc(a,b,c,d,e){var f=!1;c.responseStart=c.responseEnd=n();b.type&&0==b.type.lastIndexOf("navigate",0)&&(c.navigationStart=c.startTime,v["cache-unified"]||(pa(d),f=!0));b.e&&"multipart"==e.type&&w(e.parts,function(d){d.timing||(d.timing={});d.timing.spfCached=!!c.spfCached;d.timing.spfPrefetched=!!c.spfPrefetched;b.e(a,d)});mc(a,b,c,e,f)}function kc(a,b,c){a=-1!=(c.getResponseHeader("X-SPF-Response-Type")||"").toLowerCase().indexOf("multipart");b.v=a}
		function lc(a,b,c,d,e,f,k){if(d.v){f=d.c+f;var g;try{g=Cb(f,!0,k)}catch(h){e.abort();b.d&&b.d(a,h,e);return}b.e&&w(g.n,function(d){d.timing||(d.timing={});d.timing.spfCached=!!c.spfCached;d.timing.spfPrefetched=!!c.spfPrefetched;b.e(a,d)});d.complete=d.complete.concat(g.n);d.c=g.c}}
		function jc(a,b,c,d,e){if(e.timing)for(var f in e.timing)c[f]=e.timing[f];if(e.resourceTiming)if("load"==b.type)for(var k in e.resourceTiming)c[k]=e.resourceTiming[k];else if(window.performance&&window.performance.timing&&(f=window.performance.timing.navigationStart,f+e.resourceTiming.startTime>=c.startTime))for(var g in e.resourceTiming)k=e.resourceTiming[g],void 0!==k&&(B(g,"Start")||B(g,"End")||"startTime"==g)&&(c[g]=f+Math.round(k));"load"!=b.type&&(c.navigationStart=c.startTime);d.complete.length&&
		(d.c=ya(d.c),d.c&&lc(a,b,c,d,e,"",!0));var h;if("json"==e.responseType){if(!e.response){b.d&&b.d(a,Error("JSON response parsing failed"),e);return}h=Gb(x(e.response))}else try{h=Cb(e.responseText).n}catch(p){b.d&&b.d(a,p,e);return}if(b.e&&1<h.length)for(d=d.complete.length;d<h.length;d++)e=h[d],e.timing||(e.timing={}),e.timing.spfCached=!!c.spfCached,e.timing.spfPrefetched=!!c.spfPrefetched,b.e(a,e);if(1<h.length){var q;w(h,function(a){a.cacheType&&(q=a.cacheType)});h={parts:h,type:"multipart"};q&&
		(h.cacheType=q)}else h=1==h.length?h[0]:{};mc(a,b,c,h,!0)}function mc(a,b,c,d,e){if(e&&"POST"!=b.method&&(e=fc(a,b.current,d.cacheType,b.type,!0))){d.cacheKey=e;var f={response:d,type:b.type||""},k=parseInt(v["cache-lifetime"],10),g=parseInt(v["cache-max"],10);0>=k||0>=g||(g=y(),f={data:f,life:k,time:n(),count:0},ta(f),g[e]=f,setTimeout(ra,1E3))}d.timing=c;b.m&&b.m(a,d)}
		function fc(a,b,c,d,e){a=M(a);var f;v["cache-unified"]?f=a:"navigate-back"==d||"navigate-forward"==d?f="history "+a:"navigate"==d?f=(e?"history ":"prefetch ")+a:"prefetch"==d&&(f=e?"prefetch "+a:"");b&&"url"==c?f+=" previous "+b:b&&"path"==c&&(f+=" previous "+L(b).pathname);return f||""}
		function gc(a,b){var c=[];b&&(c.push(a+" previous "+b),c.push(a+" previous "+L(b).pathname));c.push(a);var d=null;ma(c,function(a){var b;a:{b=y();if(a in b){b=b[a];if(sa(b)){ta(b);b=b.data;break a}pa(a)}b=void 0}b&&(d={key:a,response:b.response,type:b.type});return!!b});return d}function ic(){this.v=!1;this.c="";this.complete=[]};function nc(a){return ea(a,function(a){return va(a,v["link-class"])})}function oc(a){return ea(a,function(a){return va(a,v["nolink-class"])})}function pc(a,b){return ea(a,function(a){return a.href&&"img"!=a.tagName.toLowerCase()},b)}function qc(a){if(a.metaKey||a.altKey||a.ctrlKey||a.shiftKey||0<a.button)return null;var b=nc(a.target);return!b||v["nolink-class"]&&oc(a.target)?null:(a=pc(a.target,b))?a.href:null}function rc(a){return L(a).origin!=L(window.location.href).origin?!1:!0}
		function sc(){if(!t["nav-init"])return!1;var a=parseInt(t["nav-counter"],10)||0;a++;var b=parseInt(v["navigate-limit"],10),b=isNaN(b)?Infinity:b;if(a>b)return!1;a=parseInt(t["nav-init-time"],10);a--;a=n()-a;b=parseInt(v["navigate-lifetime"],10);b=isNaN(b)?Infinity:b;return a>b?!1:!0}function tc(a,b){var c=b||window.location.href;if(-1!=a.indexOf("#")){var d=M(a),c=M(c);if(d==c)return!1}return!0}
		function uc(a){if(!a.defaultPrevented){var b=qc(a);b&&(b=Na(b),rc(b)&&sc()&&m("spfclick",{url:b,target:a.target})&&(vc(b,{},new wc),a.preventDefault()))}}function xc(a){var b=qc(a);b&&setTimeout(function(){yc(b)},0)}function zc(){var a;a=t["nav-scroll-position"]||null;var b=t["nav-scroll-url"]||"";a=a&&b==window.location.href?a:null;Ac();a&&window.scroll.apply(null,a)}
		function Bc(a,b){var c=new wc({current:b&&b["spf-current"],history:!0,position:b&&b["spf-position"],b:b&&b["spf-referer"],reverse:!(!b||!b["spf-back"])}),d=v["reload-identifier"];d&&(a=Ma(a,[d]));rc(a)?sc()?m("spfhistory",{url:a,referer:c.b,previous:c.current})&&(c.position&&(r("nav-scroll-position",[window.pageXOffset,window.pageYOffset]),r("nav-scroll-url",window.location.href)),vc(a,{},c)):X(a,Dc):X(a,Cc)}
		function vc(a,b,c){Ec();if(tc(a,c.current))if(Fc(a,c.b,c.current,b)){r("nav-counter",(parseInt(t["nav-counter"],10)||0)+1);Gc(a);var d=M(a),e="preprocess "+M(d),f;for(f in G)e!=f&&0==f.lastIndexOf("preprocess",0)&&Ja(f);d=Hc()[d];r("nav-request",d);r("nav-promote",null);r("nav-promote-time",null);d&&4!=d.readyState?(d="preprocess "+M(a),e="promote "+M(a),r("nav-promote",a),r("nav-promote-time",n()),Ja(d),H(e,!0),c.history||Ic(a,c.b,l(Y,null,b))):(d=l(Y,null,b),e=l(Jc,null,b,c),f=l(Kc,null,b,c),v["advanced-navigate-persist-timing"]||
		Lc(),c.type="navigate",c.history&&(c.type+=c.reverse?"-back":"-forward"),b=ec(a,{method:b.method,headers:b.headers,e:e,d:d,m:f,q:b.postData,type:c.type,current:c.current,b:c.b}),r("nav-request",b),c.history||Ic(a,c.b,d))}else X(a,Mc);else c.history||Ic(a,c.b,l(Y,null,b)),Nc(a,c)}function Nc(a,b){if(b.position)Ac(),window.scroll.apply(null,b.position),b.f=!0;else{var c=C(a,"#");if(c[2]){if(c=document.getElementById(c[2]))Ac(),c.scrollIntoView(),b.f=!0}else b.f||(Ac(),window.scroll(0,0),b.f=!0)}}
		function Ic(a,b,c){try{ga(null,{"spf-position":[window.pageXOffset,window.pageYOffset]}),M(a,!0)!=window.location.href&&ha(!1,a,{"spf-referer":b},void 0)}catch(d){Ec(),c(a,d)}}function Y(a,b,c,d){r("nav-request",null);Oc(b,c,a,void 0,d)&&X(b,Pc,c)}function Jc(a,b,c,d){if(Qc(c,d,a))if(d.reload)X(c,Rc);else if(d.redirect)Sc(a,d.redirect);else try{V(c,d,b,function(){Uc(c,d,a)})}catch(e){Y(a,c,e)}else X(c,Vc)}
		function Kc(a,b,c,d){r("nav-request",null);if(t["nav-promote"]==b.a){var e=d.timing||{};e.navigationStart=t["nav-promote-time"];e.spfPrefetched=!0}var f="multipart"==d.type;if(!f){if(!Wc(c,d,a)){X(c,Xc);return}if(d.reload){X(c,Rc);return}if(d.redirect){Sc(a,d.redirect);return}}try{V(c,f?{}:d,b,function(){var e=d.name||"";f&&w(d.parts,function(a){e=a.name||e});wa(e);Nc(c,b);Yc(c,d,a)})}catch(k){Y(a,c,k)}}function Sc(a,b){try{b+=window.location.hash,ga(b,null,!0)}catch(c){Ec(),Y(a,b,c)}}
		function Ec(){var a=t["nav-request"];a&&(a.abort(),r("nav-request",null))}function Z(a,b){var c;a&&(c=Array.prototype.slice.call(arguments),c[0]=a,c=aa.apply(null,c));return!1!==c}
		function X(a,b,c){c=c?c.message:"";Ec();Gc();var d=b;c&&(d+=" Message: "+c);m("spfreload",{url:a,reason:d});var e=window.location.href;v["experimental-remove-history"]&&e==a&&(r("history-ignore-pop",!0),window.history.back());setTimeout(function(){var c=v["reload-identifier"];if(c){var d={};d[c]=encodeURIComponent(b);var c=a,g=C(c,"#"),c=g[0],h=-1!=c.indexOf("?")?"&":"?",p;for(p in d)c+=h+p,d[p]&&(c+="="+d[p]),h="&";a=c+g[1]+g[2]}window.location.href=a;tc(a,e)||window.location.reload()},0)}
		function Zc(a,b,c){c.a=c.a||a;if(Fc(a,void 0,void 0,b,!0)){var d=l($c,null,!1,b,c),e=l(ad,null,!1,b,c),f=l(bd,null,!1,b,c);c.type="load";ec(a,{method:b.method,headers:b.headers,e:e,d:d,m:f,q:b.postData,type:c.type})}}function yc(a,b){a=Na(a);cd(a,b||{},new wc)}
		function cd(a,b,c){c.a=c.a||a;if(Fc(a,void 0,void 0,b,!0)){var d=l($c,null,!0,b,c),e=l(ad,null,!0,b,c),f=l(bd,null,!0,b,c);c.type="prefetch";b=ec(a,{method:b.method,headers:b.headers,e:e,d:d,m:f,q:b.postData,type:c.type,current:c.current});a=M(a);Hc()[a]=b}}function $c(a,b,c,d,e){a&&dd(d);a&&t["nav-promote"]==c.a?Y(b,d,e):Oc(d,e,b,!0)}
		function ad(a,b,c,d,e){if(Qc(d,e,b,!0)){if(e.reload){if(!a)return;if(t["nav-promote"]==c.a){X(d,Rc);return}}if(e.redirect)ed(a,b,c,e.redirect);else{if(a){var f=l(Jc,null,b,c,d,e),k="promote "+M(c.a);F(k,f);if(t["nav-promote"]==c.a){H(k,!0);return}}(a?Pb:V)(d,e,c,function(){Uc(d,e,b,!0)})}}}
		function bd(a,b,c,d,e){var f="multipart"==e.type;if(!f){if(!Wc(d,e,b,!0)){X(d,Xc);return}if(e.reload){if(!a)return;if(t["nav-promote"]==c.a){X(d,Rc);return}}if(e.redirect){ed(a,b,c,e.redirect);return}}var k="promote "+M(c.a);if(a){dd(d);if(t["nav-promote"]==c.a){F(k,l(Kc,null,b,c,d,e));H(k,!0);return}Ja(k)}k=a?Pb:V;try{k(d,f?{}:e,c,function(){Yc(d,e,b,!0)})}catch(g){$c(a,b,c,d,g)}}function ed(a,b,c,d){a=a?cd:Zc;var e={};w([fd,gd,hd,id,jd,kd],function(a){e[a]=b[a]});a(d,e,c)}
		function Oc(a,b,c,d,e){a={url:a,err:b,xhr:e};(c=Z((c||{})[fd],a))&&!d&&(c=m("spferror",a));return c}function Fc(a,b,c,d,e){a={url:a,referer:b,previous:c};(d=Z((d||{})[gd],a))&&!e&&(d=m("spfrequest",a));return d}function Qc(a,b,c,d){a={url:a,part:b};(c=Z((c||{})[hd],a))&&!d&&(c=m("spfpartprocess",a));return c}function Uc(a,b,c,d){a={url:a,part:b};Z((c||{})[id],a)&&!d&&m("spfpartdone",a)}function Wc(a,b,c,d){a={url:a,response:b};(c=Z((c||{})[jd],a))&&!d&&(c=m("spfprocess",a));return c}
		function Yc(a,b,c,d){a={url:a,response:b};Z((c||{})[kd],a)&&!d&&m("spfdone",a)}function dd(a){a=M(a);var b=Hc(),c=b[a];c&&c.abort();delete b[a]}function Gc(a){var b=Hc();a=a&&M(a);for(var c in b)a!=c&&dd(c)}var Lc,ld=window.performance&&(window.performance.clearResourceTimings||window.performance.webkitClearResourceTimings||window.performance.mozClearResourceTimings||window.performance.msClearResourceTimings||window.performance.oClearResourceTimings);Lc=ld?l(ld,window.performance):ba;
		function Hc(){return"nav-prefetches"in t?t["nav-prefetches"]:r("nav-prefetches",{})}function Ac(){r("nav-scroll-position",null);r("nav-scroll-url",null)}function wc(a){a=a||{};this.current=a.history&&a.current?a.current:window.location.href;this.history=!!a.history;this.a=a.a||"";this.position=a.position||null;this.b=void 0!=a.b?a.b:window.location.href;this.reverse=!!a.reverse;this.f=!!a.f;this.type=a.type||""}
		var fd="onError",gd="onRequest",hd="onPartProcess",id="onPartDone",jd="onProcess",kd="onDone",Dc="1",Mc="2",Vc="3",Xc="4",Rc="5",Cc="9",Pc="10";function md(){eb(N);eb(T);"complete"==document.readyState&&(document.removeEventListener?document.removeEventListener("DOMContentLoaded",md,!1):document.detachEvent&&document.detachEvent("onreadystatechange",md))}document.addEventListener?document.addEventListener("DOMContentLoaded",md,!1):document.attachEvent&&document.attachEvent("onreadystatechange",md);md();
		var nd={init:function(a){var b=!("function"!=typeof window.history.pushState&&!ja().contentWindow.history.pushState);a=a||{};for(var c in ca)v[c]=c in a?a[c]:ca[c];for(c in a)c in ca||(v[c]=a[c]);if(b){c=Oc;if(!t["history-init"]&&window.addEventListener){a=window.location.href;window.addEventListener("popstate",ka,!1);r("history-init",!0);r("history-callback",Bc);r("history-error-callback",c);r("history-listener",ka);r("history-url",a);r("history-timestamp",n());var d={"spf-referer":document.referrer};
		try{ga(a,d)}catch(e){c&&c(a,e)}}!t["nav-init"]&&document.addEventListener&&(r("nav-init",!0),r("nav-init-time",n()),r("nav-counter",0),document.addEventListener("click",uc,!1),r("nav-listener",uc),!v["experimental-prefetch-mousedown"]||"ontouchstart"in window||0<window.navigator.maxTouchPoints||0<window.navigator.msMaxTouchPoints||(document.addEventListener("mousedown",xc,!1),r("nav-mousedown-listener",xc)),document.addEventListener("scroll",zc,!1),r("nav-scroll-listener",zc))}return b},dispose:function(){"undefined"!=
		typeof History&&History.prototype.pushState&&(Ec(),t["nav-init"]&&(document.removeEventListener&&(document.removeEventListener("click",t["nav-listener"],!1),document.removeEventListener("mousedown",t["nav-mousedown-listener"],!1),document.removeEventListener("scroll",t["nav-scroll-listener"],!1)),r("nav-listener",null),r("nav-mousedown-listener",null),r("nav-scroll-listener",null),r("nav-scroll-position",null),r("nav-scroll-url",null),r("nav-init",!1),r("nav-init-time",null),r("nav-counter",null)),
		t["history-init"]&&(window.removeEventListener&&window.removeEventListener("popstate",t["history-listener"],!1),r("history-init",!1),r("history-callback",null),r("history-error-callback",null),r("history-listener",null),r("history-url",null),r("history-timestamp",0)));for(var a in v)delete v[a]},navigate:function(a,b){a&&(a=Na(a),rc(a)?sc()?vc(a,b||{},new wc):X(a,Dc):X(a,Cc))},load:function(a,b){a=Na(a);Zc(a,b||{},new wc)},prefetch:yc,process:function(a,b){function c(a,c,d,e){a==c&&b&&b(e)}var d=
		window.location.href;if("multipart"==a.type){var e=a.parts,f=e.length-1;w(e,function(a,b){V(d,a,null,l(c,null,b,f))})}else V(d,a,null,l(c,null,0,0))}},od={cache:{remove:pa,clear:function(){y({})}},script:{load:ob,get:qb,ready:sb,done:function(a){Sa(N,a,"");Ta(N)},require:tb,declare:function(a,b){if(a){for(var c in a)U[c]=a[c];if(b)for(c in b)ub[c]=b[c]}},path:function(a){r("rsrc-p-"+N,a)},unload:pb,ignore:function(a,b){a=x(a);var c=P(N,a.sort().join("|"));Ga(c,b)},unrequire:vb,prefetch:rb},style:{load:zb,
		get:Ab,unload:function(a){Xa(T,a)},path:function(a){r("rsrc-p-"+T,a)},prefetch:Bb}},pd=this.spf=this.spf||{},qd;for(qd in nd)pd[qd]=nd[qd];for(var rd in od)for(var sd in od[rd])pd[rd]=pd[rd]||{},pd[rd][sd]=od[rd][sd];m("spfready");if(typeof define=='function'&&define.amd)define(spf);else if(typeof exports=='object')for(var f in spf)exports[f]=spf[f];})();
		spf.init();


	/*! jQuery Mobile v1.4.5 
	 * Copyright 2010, 2014 jQuery Foundation, Inc.
	 * jquery.org/license
	================================================== */

		(function(e,t,n){typeof define=="function"&&define.amd?define(["jquery"],function(r){return n(r,e,t),r.mobile}):n(e.jQuery,e,t)})(this,document,function(e,t,n,r){(function(e,t,n,r){function T(e){while(e&&typeof e.originalEvent!="undefined")e=e.originalEvent;return e}function N(t,n){var i=t.type,s,o,a,l,c,h,p,d,v;t=e.Event(t),t.type=n,s=t.originalEvent,o=e.event.props,i.search(/^(mouse|click)/)>-1&&(o=f);if(s)for(p=o.length,l;p;)l=o[--p],t[l]=s[l];i.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1);if(i.search(/^touch/)!==-1){a=T(s),i=a.touches,c=a.changedTouches,h=i&&i.length?i[0]:c&&c.length?c[0]:r;if(h)for(d=0,v=u.length;d<v;d++)l=u[d],t[l]=h[l]}return t}function C(t){var n={},r,s;while(t){r=e.data(t,i);for(s in r)r[s]&&(n[s]=n.hasVirtualBinding=!0);t=t.parentNode}return n}function k(t,n){var r;while(t){r=e.data(t,i);if(r&&(!n||r[n]))return t;t=t.parentNode}return null}function L(){g=!1}function A(){g=!0}function O(){E=0,v.length=0,m=!1,A()}function M(){L()}function _(){D(),c=setTimeout(function(){c=0,O()},e.vmouse.resetTimerDuration)}function D(){c&&(clearTimeout(c),c=0)}function P(t,n,r){var i;if(r&&r[t]||!r&&k(n.target,t))i=N(n,t),e(n.target).trigger(i);return i}function H(t){var n=e.data(t.target,s),r;!m&&(!E||E!==n)&&(r=P("v"+t.type,t),r&&(r.isDefaultPrevented()&&t.preventDefault(),r.isPropagationStopped()&&t.stopPropagation(),r.isImmediatePropagationStopped()&&t.stopImmediatePropagation()))}function B(t){var n=T(t).touches,r,i,o;n&&n.length===1&&(r=t.target,i=C(r),i.hasVirtualBinding&&(E=w++,e.data(r,s,E),D(),M(),d=!1,o=T(t).touches[0],h=o.pageX,p=o.pageY,P("vmouseover",t,i),P("vmousedown",t,i)))}function j(e){if(g)return;d||P("vmousecancel",e,C(e.target)),d=!0,_()}function F(t){if(g)return;var n=T(t).touches[0],r=d,i=e.vmouse.moveDistanceThreshold,s=C(t.target);d=d||Math.abs(n.pageX-h)>i||Math.abs(n.pageY-p)>i,d&&!r&&P("vmousecancel",t,s),P("vmousemove",t,s),_()}function I(e){if(g)return;A();var t=C(e.target),n,r;P("vmouseup",e,t),d||(n=P("vclick",e,t),n&&n.isDefaultPrevented()&&(r=T(e).changedTouches[0],v.push({touchID:E,x:r.clientX,y:r.clientY}),m=!0)),P("vmouseout",e,t),d=!1,_()}function q(t){var n=e.data(t,i),r;if(n)for(r in n)if(n[r])return!0;return!1}function R(){}function U(t){var n=t.substr(1);return{setup:function(){q(this)||e.data(this,i,{});var r=e.data(this,i);r[t]=!0,l[t]=(l[t]||0)+1,l[t]===1&&b.bind(n,H),e(this).bind(n,R),y&&(l.touchstart=(l.touchstart||0)+1,l.touchstart===1&&b.bind("touchstart",B).bind("touchend",I).bind("touchmove",F).bind("scroll",j))},teardown:function(){--l[t],l[t]||b.unbind(n,H),y&&(--l.touchstart,l.touchstart||b.unbind("touchstart",B).unbind("touchmove",F).unbind("touchend",I).unbind("scroll",j));var r=e(this),s=e.data(this,i);s&&(s[t]=!1),r.unbind(n,R),q(this)||r.removeData(i)}}}var i="virtualMouseBindings",s="virtualTouchID",o="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),u="clientX clientY pageX pageY screenX screenY".split(" "),a=e.event.mouseHooks?e.event.mouseHooks.props:[],f=e.event.props.concat(a),l={},c=0,h=0,p=0,d=!1,v=[],m=!1,g=!1,y="addEventListener"in n,b=e(n),w=1,E=0,S,x;e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500};for(x=0;x<o.length;x++)e.event.special[o[x]]=U(o[x]);y&&n.addEventListener("click",function(t){var n=v.length,r=t.target,i,o,u,a,f,l;if(n){i=t.clientX,o=t.clientY,S=e.vmouse.clickDistanceThreshold,u=r;while(u){for(a=0;a<n;a++){f=v[a],l=0;if(u===r&&Math.abs(f.x-i)<S&&Math.abs(f.y-o)<S||e.data(u,s)===f.touchID){t.preventDefault(),t.stopPropagation();return}}u=u.parentNode}}},!0)})(e,t,n),function(e){e.mobile={}}(e),function(e,t){var r={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,r),e.extend(e.mobile.support,r)}(e),function(e,t,r){function l(t,n,i,s){var o=i.type;i.type=n,s?e.event.trigger(i,r,t):e.event.dispatch.call(t,i),i.type=o}var i=e(n),s=e.mobile.support.touch,o="touchmove scroll",u=s?"touchstart":"mousedown",a=s?"touchend":"mouseup",f=s?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)},e.attrFn&&(e.attrFn[n]=!0)}),e.event.special.scrollstart={enabled:!0,setup:function(){function s(e,n){r=n,l(t,r?"scrollstart":"scrollstop",e)}var t=this,n=e(t),r,i;n.bind(o,function(t){if(!e.event.special.scrollstart.enabled)return;r||s(t,!0),clearTimeout(i),i=setTimeout(function(){s(t,!1)},50)})},teardown:function(){e(this).unbind(o)}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),r=!1;n.bind("vmousedown",function(s){function a(){clearTimeout(u)}function f(){a(),n.unbind("vclick",c).unbind("vmouseup",a),i.unbind("vmousecancel",f)}function c(e){f(),!r&&o===e.target?l(t,"tap",e):r&&e.preventDefault()}r=!1;if(s.which&&s.which!==1)return!1;var o=s.target,u;n.bind("vmouseup",a).bind("vclick",c),i.bind("vmousecancel",f),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(r=!0),l(t,"taphold",e.Event("taphold",{target:o}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),i.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,r=t.pageYOffset,i=e.clientX,s=e.clientY;if(e.pageY===0&&Math.floor(s)>Math.floor(e.pageY)||e.pageX===0&&Math.floor(i)>Math.floor(e.pageX))i-=n,s-=r;else if(s<e.pageY-r||i<e.pageX-n)i=e.pageX-n,s=e.pageY-r;return{x:i,y:s}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,r=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[r.x,r.y]}},handleSwipe:function(t,n,r,i){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var s=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return l(r,"swipe",e.Event("swipe",{target:i,swipestart:t,swipestop:n}),!0),l(r,s,e.Event(s,{target:i,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,r=e(n),s={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=s,s.start=function(t){if(e.event.special.swipe.eventInProgress)return;e.event.special.swipe.eventInProgress=!0;var r,o=e.event.special.swipe.start(t),u=t.target,l=!1;s.move=function(t){if(!o||t.isDefaultPrevented())return;r=e.event.special.swipe.stop(t),l||(l=e.event.special.swipe.handleSwipe(o,r,n,u),l&&(e.event.special.swipe.eventInProgress=!1)),Math.abs(o.coords[0]-r.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&t.preventDefault()},s.stop=function(){l=!0,e.event.special.swipe.eventInProgress=!1,i.off(f,s.move),s.move=null},i.on(f,s.move).one(a,s.stop)},r.on(u,s.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,t.length--,t.length===0&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(u,n.start),n.move&&i.off(f,n.move),n.stop&&i.off(a,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this),function(e,n){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})}(e)});


	/*!
	 * imagesLoaded PACKAGED v4.1.1
	 * JavaScript is all like "You images are done yet or what?"
	 * MIT License
	================================================== */

		!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});


	/**
	 * http://animejs.com
	 * JavaScript animation engine
	 * @version v2.0.2
	 * @author Julian Garnier
	 * @copyright ©2017 Julian Garnier
	 * Released under the MIT license
	================================================== */

		var $jscomp$this=this;
		(function(u,r){"function"===typeof define&&define.amd?define([],r):"object"===typeof module&&module.exports?module.exports=r():u.anime=r()})(this,function(){function u(a){if(!g.col(a))try{return document.querySelectorAll(a)}catch(b){}}function r(a){return a.reduce(function(a,c){return a.concat(g.arr(c)?r(c):c)},[])}function v(a){if(g.arr(a))return a;g.str(a)&&(a=u(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function E(a,b){return a.some(function(a){return a===b})}
		function z(a){var b={},c;for(c in a)b[c]=a[c];return b}function F(a,b){var c=z(a),d;for(d in a)c[d]=b.hasOwnProperty(d)?b[d]:a[d];return c}function A(a,b){var c=z(a),d;for(d in b)c[d]=g.und(a[d])?b[d]:a[d];return c}function R(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,h){return b+b+c+c+h+h});var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);a=parseInt(b[1],16);var c=parseInt(b[2],16),b=parseInt(b[3],16);return"rgb("+a+","+c+","+b+")"}function S(a){function b(a,b,c){0>
		c&&(c+=1);1<c&&--c;return c<1/6?a+6*(b-a)*c:.5>c?b:c<2/3?a+(b-a)*(2/3-c)*6:a}var c=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);a=parseInt(c[1])/360;var d=parseInt(c[2])/100,c=parseInt(c[3])/100;if(0==d)d=c=a=c;else{var e=.5>c?c*(1+d):c+d-c*d,k=2*c-e,d=b(k,e,a+1/3),c=b(k,e,a);a=b(k,e,a-1/3)}return"rgb("+255*d+","+255*c+","+255*a+")"}function w(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(a))return a[2]}function T(a){if(-1<a.indexOf("translate"))return"px";
		if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function G(a,b){return g.fnc(a)?a(b.target,b.id,b.total):a}function B(a,b){if(b in a.style)return getComputedStyle(a).getPropertyValue(b.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function H(a,b){if(g.dom(a)&&E(U,b))return"transform";if(g.dom(a)&&(a.getAttribute(b)||g.svg(a)&&a[b]))return"attribute";if(g.dom(a)&&"transform"!==b&&B(a,b))return"css";if(null!=a[b])return"object"}function V(a,b){var c=T(b),c=-1<b.indexOf("scale")?
		1:0+c;a=a.style.transform;if(!a)return c;for(var d=[],e=[],k=[],h=/(\w+)\((.+?)\)/g;d=h.exec(a);)e.push(d[1]),k.push(d[2]);a=k.filter(function(a,c){return e[c]===b});return a.length?a[0]:c}function I(a,b){switch(H(a,b)){case "transform":return V(a,b);case "css":return B(a,b);case "attribute":return a.getAttribute(b)}return a[b]||0}function J(a,b){var c=/^(\*=|\+=|-=)/.exec(a);if(!c)return a;b=parseFloat(b);a=parseFloat(a.replace(c[0],""));switch(c[0][0]){case "+":return b+a;case "-":return b-a;case "*":return b*
		a}}function C(a){return g.obj(a)&&a.hasOwnProperty("totalLength")}function W(a,b){function c(c){c=void 0===c?0:c;return a.el.getPointAtLength(1<=b+c?b+c:0)}var d=c(),e=c(-1),k=c(1);switch(a.property){case "x":return d.x;case "y":return d.y;case "angle":return 180*Math.atan2(k.y-e.y,k.x-e.x)/Math.PI}}function K(a,b){var c=/-?\d*\.?\d+/g;a=C(a)?a.totalLength:a;if(g.col(a))b=g.rgb(a)?a:g.hex(a)?R(a):g.hsl(a)?S(a):void 0;else{var d=w(a);a=d?a.substr(0,a.length-d.length):a;b=b?a+b:a}b+="";return{original:b,
		numbers:b.match(c)?b.match(c).map(Number):[0],strings:b.split(c)}}function X(a,b){return b.reduce(function(b,d,e){return b+a[e-1]+d})}function L(a){return(a?r(g.arr(a)?a.map(v):v(a)):[]).filter(function(a,c,d){return d.indexOf(a)===c})}function Y(a){var b=L(a);return b.map(function(a,d){return{target:a,id:d,total:b.length}})}function Z(a,b){var c=z(b);if(g.arr(a)){var d=a.length;2!==d||g.obj(a[0])?g.fnc(b.duration)||(c.duration=b.duration/d):a={value:a}}return v(a).map(function(a,c){c=c?0:b.delay;
		a=g.obj(a)&&!C(a)?a:{value:a};g.und(a.delay)&&(a.delay=c);return a}).map(function(a){return A(a,c)})}function aa(a,b){var c={},d;for(d in a){var e=G(a[d],b);g.arr(e)&&(e=e.map(function(a){return G(a,b)}),1===e.length&&(e=e[0]));c[d]=e}c.duration=parseFloat(c.duration);c.delay=parseFloat(c.delay);return c}function ba(a){return g.arr(a)?x.apply(this,a):M[a]}function ca(a,b){var c;return a.tweens.map(function(d){d=aa(d,b);var e=d.value,k=I(b.target,a.name),h=c?c.to.original:k,h=g.arr(e)?e[0]:h,n=J(g.arr(e)?
		e[1]:e,h),k=w(n)||w(h)||w(k);d.isPath=C(e);d.from=K(h,k);d.to=K(n,k);d.start=c?c.end:a.offset;d.end=d.start+d.delay+d.duration;d.easing=ba(d.easing);d.elasticity=(1E3-Math.min(Math.max(d.elasticity,1),999))/1E3;g.col(d.from.original)&&(d.round=1);return c=d})}function da(a,b){return r(a.map(function(a){return b.map(function(b){var c=H(a.target,b.name);if(c){var d=ca(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})).filter(function(a){return!g.und(a)})}
		function N(a,b,c){var d="delay"===a?Math.min:Math.max;return b.length?d.apply(Math,b.map(function(b){return b[a]})):c[a]}function ea(a){var b=F(fa,a),c=F(ga,a),d=Y(a.targets),e=[],g=A(b,c),h;for(h in a)g.hasOwnProperty(h)||"targets"===h||e.push({name:h,offset:g.offset,tweens:Z(a[h],c)});a=da(d,e);return A(b,{animatables:d,animations:a,duration:N("duration",a,c),delay:N("delay",a,c)})}function m(a){function b(){return window.Promise&&new Promise(function(a){return P=a})}function c(a){return f.reversed?
		f.duration-a:a}function d(a){for(var b=0,c={},d=f.animations,e={};b<d.length;){var g=d[b],h=g.animatable,n=g.tweens;e.tween=n.filter(function(b){return a<b.end})[0]||n[n.length-1];e.isPath$0=e.tween.isPath;e.round=e.tween.round;e.eased=e.tween.easing(Math.min(Math.max(a-e.tween.start-e.tween.delay,0),e.tween.duration)/e.tween.duration,e.tween.elasticity);n=X(e.tween.to.numbers.map(function(a){return function(b,c){c=a.isPath$0?0:a.tween.from.numbers[c];b=c+a.eased*(b-c);a.isPath$0&&(b=W(a.tween.value,
		b));a.round&&(b=Math.round(b*a.round)/a.round);return b}}(e)),e.tween.to.strings);ha[g.type](h.target,g.property,n,c,h.id);g.currentValue=n;b++;e={isPath$0:e.isPath$0,tween:e.tween,eased:e.eased,round:e.round}}if(c)for(var k in c)D||(D=B(document.body,"transform")?"transform":"-webkit-transform"),f.animatables[k].target.style[D]=c[k].join(" ");f.currentTime=a;f.progress=a/f.duration*100}function e(a){if(f[a])f[a](f)}function g(){f.remaining&&!0!==f.remaining&&f.remaining--}function h(a){var h=f.duration,
		k=f.offset,m=f.delay,O=f.currentTime,p=f.reversed,q=c(a),q=Math.min(Math.max(q,0),h);q>k&&q<h?(d(q),!f.began&&q>=m&&(f.began=!0,e("begin")),e("run")):(q<=k&&0!==O&&(d(0),p&&g()),q>=h&&O!==h&&(d(h),p||g()));a>=h&&(f.remaining?(t=n,"alternate"===f.direction&&(f.reversed=!f.reversed)):(f.pause(),P(),Q=b(),f.completed||(f.completed=!0,e("complete"))),l=0);if(f.children)for(a=f.children,h=0;h<a.length;h++)a[h].seek(q);e("update")}a=void 0===a?{}:a;var n,t,l=0,P=null,Q=b(),f=ea(a);f.reset=function(){var a=
		f.direction,b=f.loop;f.currentTime=0;f.progress=0;f.paused=!0;f.began=!1;f.completed=!1;f.reversed="reverse"===a;f.remaining="alternate"===a&&1===b?2:b};f.tick=function(a){n=a;t||(t=n);h((l+n-t)*m.speed)};f.seek=function(a){h(c(a))};f.pause=function(){var a=p.indexOf(f);-1<a&&p.splice(a,1);f.paused=!0};f.play=function(){f.paused&&(f.paused=!1,t=0,l=f.completed?0:c(f.currentTime),p.push(f),y||ia())};f.reverse=function(){f.reversed=!f.reversed;t=0;l=c(f.currentTime)};f.restart=function(){f.pause();
		f.reset();f.play()};f.finished=Q;f.reset();f.autoplay&&f.play();return f}var fa={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},ga={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},U="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),D,g={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},svg:function(a){return a instanceof
		SVGElement},dom:function(a){return a.nodeType||g.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return g.hex(a)||g.rgb(a)||g.hsl(a)}},x=function(){function a(a,c,d){return(((1-3*d+3*c)*a+(3*d-6*c))*a+3*c)*a}return function(b,c,d,e){if(0<=b&&1>=b&&
		0<=d&&1>=d){var g=new Float32Array(11);if(b!==c||d!==e)for(var h=0;11>h;++h)g[h]=a(.1*h,b,d);return function(h){if(b===c&&d===e)return h;if(0===h)return 0;if(1===h)return 1;for(var k=0,l=1;10!==l&&g[l]<=h;++l)k+=.1;--l;var l=k+(h-g[l])/(g[l+1]-g[l])*.1,n=3*(1-3*d+3*b)*l*l+2*(3*d-6*b)*l+3*b;if(.001<=n){for(k=0;4>k;++k){n=3*(1-3*d+3*b)*l*l+2*(3*d-6*b)*l+3*b;if(0===n)break;var m=a(l,b,d)-h,l=l-m/n}h=l}else if(0===n)h=l;else{var l=k,k=k+.1,f=0;do m=l+(k-l)/2,n=a(m,b,d)-h,0<n?k=m:l=m;while(1e-7<Math.abs(n)&&
		10>++f);h=m}return a(h,c,e)}}}}(),M=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var b="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),c={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],
		[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},d={linear:x(.25,.25,.75,.75)},e={},k;for(k in c)e.type=k,c[e.type].forEach(function(a){return function(c,e){d["ease"+a.type+b[e]]=g.fnc(c)?c:x.apply($jscomp$this,c)}}(e)),e={type:e.type};return d}(),ha={css:function(a,b,c){return a.style[b]=
		c},attribute:function(a,b,c){return a.setAttribute(b,c)},object:function(a,b,c){return a[b]=c},transform:function(a,b,c,d,e){d[e]||(d[e]=[]);d[e].push(b+"("+c+")")}},p=[],y=0,ia=function(){function a(){y=requestAnimationFrame(b)}function b(b){var c=p.length;if(c){for(var e=0;e<c;)p[e]&&p[e].tick(b),e++;a()}else cancelAnimationFrame(y),y=0}return a}();m.version="2.0.1";m.speed=1;m.running=p;m.remove=function(a){a=L(a);for(var b=p.length-1;0<=b;b--)for(var c=p[b],d=c.animations,e=d.length-1;0<=e;e--)E(a,
		d[e].animatable.target)&&(d.splice(e,1),d.length||c.pause())};m.getValue=I;m.path=function(a,b){var c=g.str(a)?u(a)[0]:a,d=b||100;return function(a){return{el:c,property:a,totalLength:c.getTotalLength()*(d/100)}}};m.setDashoffset=function(a){var b=a.getTotalLength();a.setAttribute("stroke-dasharray",b);return b};m.bezier=x;m.easings=M;m.timeline=function(a){var b=m(a);b.duration=0;b.children=[];b.add=function(a){v(a).forEach(function(a){var c=a.offset,d=b.duration;a.autoplay=!1;a.offset=g.und(c)?
		d:J(c,d);a=m(a);a.duration>d&&(b.duration=a.duration);b.children.push(a)});return b};return b};m.random=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};return m});


	/*
	 * jQuery throttle / debounce - v1.1 - 3/7/2010
	 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
	 * 
	 * Copyright (c) 2010 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	================================================== */

		(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);


