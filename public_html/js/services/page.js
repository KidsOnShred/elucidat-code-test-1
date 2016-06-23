/* Page Service
 * Handles management of pages
 *
 * @module ApiService
 */
elucidatApp.service( 'PageService', function( $q, ApiService ) {

    /*
    * function get_pages
    * Gets all the pages
    */
    this.get_pages = function() {
		var deferred = $q.defer( );

        ApiService.rest_request( '/api/pages', { }, 'get' )

        // Successful promise resolve
        .then( function( data ) {
            deferred.resolve( 'test1' );
        })

        // Promise failed
        .catch( function( ) {
            deferred.reject( data );
        });

        return deferred.promise;
    };

});