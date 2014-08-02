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
	var fixed = "fixed";
	var opening = "opening";
	var closing = "closing";

	var status = fixed;

	function animateHeight(element, height) {
		element.stop().animate({
			height: height
		}, function () {
			status = fixed;
			setActiveMenuItemPlugin.exec(namedAnchors);
		});
	}

	function setHeight(element, height) {
		element.stop().height(height);
	}

	function open(animate) {
		if (animate === true) {
			animateHeight(cvWrapper, cvContent.outerHeight());
		} else {
			setHeight(cvWrapper, cvContent.outerHeight());
		}
		status = opening;
	}

	function close(animate) {
		if (animate === true) {
			animateHeight(cvWrapper, 0);
		} else {
			setHeight(cvWrapper, 0);
		}
		status = closing;
	}

	return {
		toggle: function () {
			if (status === opening || (status === fixed && cvWrapper.height() > 0)) {
				close(true);
			} else {
				open(true);
			}
		},
		updateSize: function () {
			if (status === opening || (status === fixed && cvWrapper.height() > 0)) {
				open(false);
			} else {
				close(false);
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

// Binding

navLinks.click(function (event) {
	scrollToAnchor($(this), event, header);
});

$("#cv-arrow").click(function (event) {
	cvHandler.toggle();
});

$(window).scroll(function () {
	setActiveMenuItemPlugin.exec(namedAnchors);
});

$(window).resize(function () {
	setActiveMenuItemPlugin.exec(namedAnchors);
	cvHandler.updateSize();
});

$(document).ready(function () {
	setActiveMenuItemPlugin.exec(namedAnchors); // Execute once
});

// Initialization