/**
 * function linkChildren
 * Recursive function which turns page childrens from strings into objects
 * @param object page the root page
 * @param array pages, the array of pages indexed by page_code
 */
function linkChildren( page, pages ) {
	if ( !_.isUndefined( page ) ) {
		_.each( page.children, function( value, index ) {
			// If the page is still a string
			if ( !_.isObject( value ) ) {
				// Make sure the string links to an index
				if ( !_.isUndefined( pages[value] ) && !_.isEmpty( pages[value] ) ) {
					// Set to object
					page.children[index] = pages[value];
					// Find new child's children
					linkChildren( page.children[index], pages );
				// If it doesn't delete it
				} else {
					page.children.splice( index );
				}
			}
		});
	}

	return page;
}