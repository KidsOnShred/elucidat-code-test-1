<!doctype html>
<html class="no-js" lang="" ng-app="elucidatApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- Place favicon.ico in the root directory -->

        <script src="js/vendor/modernizr-2.8.3.min.js"></script>
        <!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		<link rel="stylesheet" href="css/main.css">

    </head>
    <body ng-controller="PagesController" class="ng-cloak">

        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <header>
        	<div class="container">
            	<h1>Page Manager</h1>
            </div>
        </header>

        <div class="container">
        	<div class="row">
        		<div id="pages" class="col-md-8">
        			<h2>Hierarchy</h2>
				</div>
				<div class="col-md-4">
					<h2>Search</h2>
					<div class="search">
						<input type="text" ng-model="query" ng-change="search()" placeholder="Page name" ng-model-options="{ updateOn: 'default blur', debounce: { 'default': 500, 'blur': 0 } }">
					</div>
				</div>
			</div>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
		<!-- Latest compiled and minified Bootstrap -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
		<!-- AngularJS -->
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js"></script>
		<!-- D3 is a brilliant library for data visualisations -->
		<script src="http://d3js.org/d3.v3.min.js"></script>
		<!-- Now over to you - have fun! -->
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
