function linkChildren( page, pages ) {

	if ( !_.isUndefined( page ) ) {
		_.each( page.children, function( value, index, obj ) {
			console.log( pages );
			console.log( value );
			console.log( pages[value] );
			console.log( '' );
			if ( !_.isUndefined( pages[value] ) ) {
				// If its an object its already been linked
				if ( !_.isObject( page.children[index] ) ) {
					page.children[index] = pages[value];
					page.children[index] = linkChildren(page.children[index], pages );
				}
			} else {
				page.children.splice( index );
			}

		});
	}

	return page;
}