// Plugins

var setActiveMenuItemPlugin = (function () {
	var lastVisitedId;

	function isScrollbarAtTop() {
		return $(window).scrollTop() <= 0;
	}

	function isScrollbarAtBottom() {
		var totalHeight = $("body").height();
		var windowHeight = $(window).height();
		var windowTop = $(window).scrollTop();
		return windowTop + windowHeight >= totalHeight;
	}

	function getCenterElement(elements, offset) {
		// Find vertical center position of window
		var windowTop = $(window).scrollTop() + offset;
		var windowHeight = $(window).height() - offset;
		var windowCenter = windowTop + (windowHeight / 2);

		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var elementHeight = element.outerHeight();
			var elementTop = element.offset().top;
			var elementBottom = elementTop + elementHeight;
			if (elementTop <= windowCenter && windowCenter <= elementBottom) {
				return element;
			}
		}

		return null;
	}

	return {
		exec: function (sections) {
			var currentElement;

			if (isScrollbarAtTop()) {
				currentElement = sections[0];
			} else if (isScrollbarAtBottom()) {
				currentElement = sections[sections.length - 1];
			} else {
				currentElement = getCenterElement(sections, header.outerHeight());
			}

			var currentId = currentElement && currentElement.length ? currentElement[0].id : "";

			// Check if current ID has changed
			if (lastVisitedId !== currentId) {
				// Update last ID
				lastVisitedId = currentId;
				// Set/remove active class
				navLinks.removeClass('active');
				navLinks.filter('[href=#' + currentId + ']').addClass('active');
			}
		}
	}
})();

var cvHandler = (function () {
	var status = "fixed";

	function setFixed() {
		status = "fixed";
	}

	function animateHeight(height) {
		cvWrapper.stop().animate({
			height: height
		}, setFixed);
	}

	function show(cvWrapper, cvContent) {
		animateHeight(cvContent.outerHeight());
		status = "showing";
	}

	function hide(cvWrapper) {
		animateHeight(0);
		status = "hiding";
	}

	return {
		toggle: function (cvWrapper, cvContent) {
			if (status === "showing" || (status === "fixed" && cvWrapper.height() > 0)) {
				hide(cvWrapper);
			} else {
				show(cvWrapper, cvContent);
			}
		},
		updateSize: function (cvWrapper, cvContent) {
			if (status === "showing" || (status === "fixed" && cvWrapper.height() > 0)) {
				cvWrapper.height(cvContent.outerHeight());
			} else {
				cvWrapper.height(0);
			}
		}
	}
})();

// Functions

function scrollToAnchor(link, event, offsetElement) {
	if (offsetElement.css('position') === 'fixed') {
		offset = offsetElement.outerHeight();
	} else {
		offset = 0;
	}
	var anchor = link.attr('href');
	var offsetTop = $(anchor).offset().top - offset + 1;
	$('html, body').stop().animate({
		scrollTop: offsetTop
	}, 300);

	if (history.pushState) {
		// Prevents flicker
		history.pushState(null, null, anchor);
	} else {
		// Fallback for some browsers (causes minor flicker)
		location.hash = anchor;
	}

	// Prevent default behavior to enable scrolling
	event.preventDefault();
}

// Static members

var header = $("header");
var navLinks = header.find("nav a");
var namedAnchors = navLinks.map(function () {
	var anchor = $($(this).attr("href"));
	if (anchor.length === 1 && anchor.selector.charAt(0) === "#") {
		return anchor;
	}
});
var cvWrapper = $("#cv-wrapper");
var cvContent = $("#cv-content");
var cvToggle = $("#cv-arrow");

// Binding

navLinks.click(function (event) {
	scrollToAnchor($(this), event, header);
});

cvToggle.click(function (event) {
	cvHandler.toggle(cvWrapper, cvContent);
});

$(window).scroll(function () {
	setActiveMenuItemPlugin.exec(namedAnchors);
});

$(window).resize(function () {
	setActiveMenuItemPlugin.exec(namedAnchors);
	cvHandler.updateSize(cvWrapper, cvContent);
});

$(document).ready(function () {
	setActiveMenuItemPlugin.exec(namedAnchors); // Execute once
});

// Initialization