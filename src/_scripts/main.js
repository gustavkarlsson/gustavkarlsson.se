// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');
var Link = require('../_modules/link/link');

$(function() {
  new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt!');
});

// Static members

var header = $("header");
var navLinks = $("nav a[href^=\"#\"]"); // All nav links which href starts with "#"
var namedAnchors = navLinks.map(function () {
	return $($(this).attr("href"));
});

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
		exec: function () {
			var currentElement;

			if (isScrollbarAtTop()) {
				currentElement = namedAnchors[0];
			} else if (isScrollbarAtBottom()) {
				currentElement = namedAnchors[namedAnchors.length - 1];
			} else {
				currentElement = getCenterElement(namedAnchors, header.outerHeight());
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
	};
})();

// Functions

function scrollToAnchor(link, event, offsetElement) {
  var offset;
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

function hidePictureWhenScrolled() {
	var halfPhotoHeight = $("#photo").outerHeight() / 2;
	var photoTop = $("#photo").offset().top;
	var scrollTop = $(window).scrollTop();
	if (header.css("position") === "fixed") {
		scrollTop += header.outerHeight();
	}
	var overScroll = scrollTop - photoTop;

	var transparency = overScroll / halfPhotoHeight;
	var opacity = 1 - transparency;
	if (transparency > 0) {
		transparency = 0;
	} else if (transparency < -1) {
		transparency = -1;
	}
	$("#photo").css({ opacity: opacity });
}

// Binding

$("a[href^=\"#\"]").click(function (event) { // All links which href starts with "#"
	scrollToAnchor($(this), event, header);
});

$(window).scroll(function () {
	setActiveMenuItemPlugin.exec();
	hidePictureWhenScrolled();
});

$(window).resize(function () {
	setActiveMenuItemPlugin.exec();
	hidePictureWhenScrolled();
});

$(document).ready(function () {
	setActiveMenuItemPlugin.exec(); // Execute once
});
