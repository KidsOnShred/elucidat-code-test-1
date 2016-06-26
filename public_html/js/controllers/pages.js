// Define the `PhoneListController` controller on the `phonecatApp` module
elucidatApp.controller('PagesController', function ($scope, ApiService) {

    $scope.filterRules = [];


    // Start
    getAllPages();


    /**
     * $scope function serach
     * Builds the filter and gets new pages
     *
     */
     $scope.search = function() {
     	// Only one rule at a time for the moment...
     	$scope.filterRules = [];

     	if ( !_.isEmpty( $scope.query ) ) {

	     	$scope.filterRules.push({
		    	attribute: 'name',
		    	operand: 'contains',
		    	value: $scope.query
		    });
	     }

	    removeHierarchy();

	    getPage();
     };

    /**
     * function getPages
     * Get all the pages with out a filter for creating the linked list
     *
     */
    function getAllPages() {

	    // Get filtered pages
	    ApiService.rest_request( '/api/pages', { }, 'post' )

	        // Successful promise resolve
	        .then( function( data ) {

	            $scope.pages =  _.indexBy( data, 'page_code' );

	            getPage();

	        });

	}

	/**
     * function getPage
     * Get the root page
     *
     */
    function getPage() {

	    // Get filtered pages
	    ApiService.rest_request( '/api/pages', { filter: $scope.filterRules }, 'post' )

	        // Successful promise resolve
	        .then( function( data ) {

	            if ( !_.isEmpty( data ) ) {
	            	$scope.page = linkChildren( data[0], $scope.pages );

					drawHierarchy();
				}

	        });

	}

	/**
     * function drawHierarchy
     * Display the page hierarchy using d3 JS
     *
     */
	function drawHierarchy() {
		// Give the root node
		var root = $scope.page;
			 
        var width = $('#pages').width(),
			height = 800;

		var i = 0,
			duration = 750,
			rectW = 80,
			rectH = 80,
			layoutX = width / 2,
			layoutY = 20;

		// Set the tree size
		var tree = d3.layout.tree().nodeSize([20, 40]);
			
		var diagonal = d3.svg.diagonal()
			.projection(function(d) {
				return [d.x + rectW / 2, d.y + rectH / 2];
			});

		var svg = d3.select("#pages").append("svg").attr("width", width).attr("height", height)
			 .call(zm = d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", redraw)).append("g")
			  .attr("transform", "translate(" + 350 + "," + 20 + ")");

			//necessary so that zoom knows where to zoom and unzoom from
			zm.translate([350, 20]);

			root.x0 = 0;
			root.y0 = layoutY;

			function collapse(d) {
			  if (d.children) {
			    d._children = d.children;
			    d._children.forEach(collapse);
			    d.children = null;
			  }
			}

			// root.children.forEach(collapse);
			update(root);

			function update(source) {
			  // Compute the new tree layout.
			  var nodes = tree.nodes(root).reverse(),
			    links = tree.links(nodes);
			  // Normalize for fixed-depth.
			  nodes.forEach(function(d) {
			    d.y = d.depth * ( rectH + 20 ) ;
			  });

			  // Update the nodes…
			  var node = svg.selectAll("g.node")
			    .data(nodes, function(d) {
			      return d.id || (d.id = ++i);
			    });

			  // Enter any new nodes at the parent's previous position.
			  var nodeEnter = node.enter().append("g")
			    .attr("class", "node")
			    .attr("transform", function(d) {
			      return "translate(" + source.x0 + "," + source.y0 + ")";
			    })
			    .on("click", click);

			  nodeEnter.append("rect")
			    .attr("width", rectW)
			    .attr("height", rectH)
			    .attr("rx", 3)
			    .attr("ry", 3)
			    .attr("stroke", "#9e9e9e")
			    .attr("stroke-width", 1)
			    .style("fill", function(d) {
			      return d._children ? "#2196f3" : "#fff";
			    });

			  nodeEnter.append("text")
			    .attr("x", rectW / 2)
			    .attr("y", rectH - 14 )
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			      return d.name;
			    });

			  // Transition nodes to their new position.
			  var nodeUpdate = node.transition()
			    .duration(duration)
			    .attr("transform", function(d) {
			      return "translate(" + d.x + "," + d.y + ")";
			    });

			  nodeUpdate.select("rect")
			    .attr("width", rectW)
			    .attr("height", rectH)
			    .attr("stroke", "#9e9e9e")
			    .attr("stroke-width", 1)
			    .style("fill", function(d) {
			      return d._children ? "#2196f3" : "#fff";
			    });

			  nodeUpdate.select("text")
			    .style("fill-opacity", 1);

			  // Transition exiting nodes to the parent's new position.
			  var nodeExit = node.exit().transition()
			    .duration(duration)
			    .attr("transform", function(d) {
			      return "translate(" + source.x + "," + source.y + ")";
			    })
			    .remove();

			  nodeExit.select("rect")
			    .attr("width", rectW)
			    .attr("height", rectH)
			    //.attr("width", bbox.getBBox().width)""
			    //.attr("height", bbox.getBBox().height)
			    .attr("stroke", "#9e9e9e")
			    .attr("stroke-width", 1);

			  nodeExit.select("text");

			  // Update the links…
			  var link = svg.selectAll("path.link")
			    .data(links, function(d) {
			      return d.target.id;
			    });

			  // Enter any new links at the parent's previous position.
			  link.enter().insert("path", "g")
			    .attr("class", "link")
			    .attr("x", rectW / 2)
			    .attr("y", rectH / 2)
			    .attr("d", function(d) {
			      var o = {
			        x: source.x0,
			        y: source.y0
			      };
			      return diagonal({
			        source: o,
			        target: o
			      });
			    });

			  // Transition links to their new position.
			  link.transition()
			    .duration(duration)
			    .attr("d", diagonal);

			  // Transition exiting nodes to the parent's new position.
			  link.exit().transition()
			    .duration(duration)
			    .attr("d", function(d) {
			      var o = {
			        x: source.x,
			        y: source.y
			      };
			      return diagonal({
			        source: o,
			        target: o
			      });
			    })
			    .remove();

			  // Stash the old positions for transition.
			  nodes.forEach(function(d) {
			    d.x0 = d.x;
			    d.y0 = d.y;
			  });
			}

			// Toggle children on click.
			function click(d) {
			  if (d.children) {
			    d._children = d.children;
			    d.children = null;
			  } else {
			    d.children = d._children;
			    d._children = null;
			  }
			  update(d);
			}

			//Redraw for zoom
		function redraw() {
		  svg.attr("transform",
		    "translate(" + d3.event.translate + ")" +
		    " scale(" + d3.event.scale + ")");
		}
	}

	/**
     * function removeHierarchy
     * Removes the hierarchy object
     *
     */
	function removeHierarchy() {
		$('svg').remove();
	}
			
});