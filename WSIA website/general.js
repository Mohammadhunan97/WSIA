// Position left and right borders around active navbar item
function positionActiveBorder() {
	$("#active").each(function () {
		$(this).has("ul").addClass('active-drop');		
		$(this).not(':has(ul)').prev('li').addClass('before-active');
		$(this).not(':has(ul)').next('li').addClass('after-active');
	});
}
// Position subnavbar function
function positionSubnavbar() {
	// Calculate height of navbar
	var navHeight = $("#navbar").height();
	// Make top margin of content equal to navbar height
	$("#subnavbar").css('margin-top', navHeight + 'px');
}
// Position content function
function positionContent() {
	// Calculate height of navbar
	var navHeight = $("#navbar").height();
	// Make top margin of content equal to navbar height
	$("#content").css('margin-top', navHeight + 2 + 'px'); // + 2px until I implement border-box in navbar
}
// Main function
$(document).ready(function() {
	// Position left and right borders around active navbar item
	positionActiveBorder();
	// Position subnavbar
	positionSubnavbar();
	// Position content
	positionContent();
	// On resize...
	$(window).resize(function() {
		// Exclude scrollbars from width
		excludeScrollbarsFromWidth();
		// Reposition content
		positionContent();
	});
});
/* Fixed header anchor fix (by Ian Clark) */
(function(document, history, location) {
	var HISTORY_SUPPORT = !!(history && history.pushState);
	var anchorScrolls = {
		ANCHOR_REGEX: /^#[^ ]+$/,
		OFFSET_HEIGHT_PX: 70,
		/**
		 * Establish events, and fix initial scroll position if a hash is provided.
		 */
		init: function() {
			this.scrollToCurrent();
			$(window).on('hashchange', $.proxy(this, 'scrollToCurrent'));
			$('body').on('click', 'a', $.proxy(this, 'delegateAnchors'));
		},
		/**
		 * Return the offset amount to deduct from the normal scroll position.
		 * Modify as appropriate to allow for dynamic calculations
		 */
		getFixedOffset: function() {
			return this.OFFSET_HEIGHT_PX;
		},
		/**
		 * If the provided href is an anchor which resolves to an element on the
		 * page, scroll to it.
		 * @param  {String} href
		 * @return {Boolean} - Was the href an anchor.
		 */
		scrollIfAnchor: function(href, pushToHistory) {
			var match, anchorOffset;
			if(!this.ANCHOR_REGEX.test(href)) {
				return false;
			}
			match = document.getElementById(href.slice(1));
			if(match) {
				anchorOffset = $(match).offset().top - this.getFixedOffset();
				$('html, body').animate({ scrollTop: anchorOffset});
				// Add the state to history as-per normal anchor links
				if(HISTORY_SUPPORT && pushToHistory) {
					history.pushState({}, document.title, location.pathname + href);
				}
			}
			return !!match;
		},
		/**
		 * Attempt to scroll to the current location's hash.
		 */
		scrollToCurrent: function(e) { 
			if(this.scrollIfAnchor(window.location.hash) && e) {
				e.preventDefault();
			}
		},
		/**
		 * If the click event's target was an anchor, fix the scroll position.
		 */
		delegateAnchors: function(e) {
			var elem = e.target;

			if(this.scrollIfAnchor(elem.getAttribute('href'), true)) {
				e.preventDefault();
			}
		}
	};
	$(document).ready($.proxy(anchorScrolls, 'init'));
})(window.document, window.history, window.location);