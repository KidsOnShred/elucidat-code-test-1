/* ApiService Service
 * Handles data requests and responses for any requests to the api
 *
 * @module $http
 * @module $q
 */
elucidatApp.service( 'ApiService', function( $http, $q ) {

  /*
  * function rest_request
  * Handles any HTTP requests to the API

  * @param string endpoint: The request URL
  * @param object data: Any data that needs to be passed through
  * @param string method: CRUD type
  * @returns promise
  */
  this.rest_request = function( endpoint, data, method ) {
        // Store our deferred state to push asynchronous
        // requests when they're ready
        var deferred = $q.defer( );

        var req = {
          method: method,
          url: endpoint,
          data: data,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }

        // perform the request call
        $http( req ).success( function( data ) {

           // Resolve our promise if success
            deferred.resolve( data );

        }).error( function( ) {
          // Reject our promise
            deferred.reject( data );
        });

        // Let the controller know that the request is
        // pending and will be fulfilled shortly
        return deferred.promise;

	};

});