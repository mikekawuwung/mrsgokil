$(function() {
	$(".testimonials-slider").slick({
		infinite: !0,
		variableWidth: !0,
		responsive: [{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth: !1
			}
		}]
	}), $(".projects-slider-i").slick({
		infinite: !0,
		variableWidth: !0,
		responsive: [{
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				variableWidth: !1
			}
		}]
	}), $(".main-menu li a").on("click", function() {
		$(".main-menu li.active").removeClass("active"), $(this).closest("li").addClass("active")
	}), $(".mobile-menu-trigger").on("click", function() {
		$(".mobile-menu-holder").slideToggle(400)
	})
});