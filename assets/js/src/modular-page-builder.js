var $             = require('jquery');
var Builder       = require('models/builder');
var BuilderView   = require('views/builder');
var ModuleFactory = require('utils/module-factory');

// Expose some functionality to global namespace.
window.modularPageBuilder = require('./globals');

$(document).ready(function(){

	ModuleFactory.init();

	// A field for storing the builder data.
	var $field = $( '[name=modular-page-builder-data]' );

	if ( ! $field.length ) {
		return;
	}

	// A container element for displaying the builder.
	var $container      = $( '#modular-page-builder' );
	var allowedModules  = $( '[name=modular-page-builder-allowed-modules]' ).val().split(',');
	var requiredModules = $( '[name=modular-page-builder-required-modules]' ).val().split(',');

	// Strip empty values.
	allowedModules  = allowedModules.filter( function( val ) { return val !== ''; } );
	requiredModules = requiredModules.filter( function( val ) { return val !== ''; } );

	// Create a new instance of Builder model.
	// Pass an array of module names that are allowed for this builder.
	var builder = new Builder({
		allowedModules: allowedModules,
		requiredModules: requiredModules,
	});

	// Set the data using the current field value
	builder.setData( JSON.parse( $field.val() ) );

	// On save, update the field value.
	builder.on( 'save', function( data ) {
		$field.val( JSON.stringify( data ) );
	} );

	// Create builder view.
	var builderView = new BuilderView( { model: builder } );

	// Render builder.
	builderView.render().$el.appendTo( $container );

	// Store a reference on global modularPageBuilder for modification by plugins.
	window.modularPageBuilder.instance.primary = builderView;
});
