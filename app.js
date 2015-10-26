/*
Backbone.js structures for loading and populating products in the chic and classique collection
*/
(function(){

	// Set up the module to contain the app
	window.App = {
		Models : {},
		Views : {},
		Collections : {},
		Routers : {}
	};


	window.mcTemplate = function(id) {
		return _.template( $('#' + id).html() );
	};

	// global event listener
	window.vent = _.extend({}, Backbone.Events);


	// Create the model for an individual product
	App.Models.Product = Backbone.Model.extend({
		defaults : {
			prodName : "",
			collection : "none",
			category : "",
			details : "No data",
			img1 : "",
			linkMacy : "#",
			linKohls : "#",
			linkSears : "#",
			linkKays : "#",
			id : "",
			url : ""
		},

		initialize : function() {
			this.set('id', this.get('img1'));	// give each model a unique id based on the image name

			var mUrl = '!products/' + this.get('img1');

			this.set('url', mUrl);
		}
	});


	// Create the detail view for an individual product
	App.Views.Product = Backbone.View.extend({
		
		model : App.Models.Product,	// the model for this view is an individual product
		
		className : "productThumb",	// apply the thumbnail class to this 

		thumbTemplate : mcTemplate('thumbTemplate'),

		template : mcTemplate('detailsTemplate'),

		eventlistener : vent,

		events : {
			"click" : "showDetails"
		},

		render : function() {
			
			//console.log(this.model.get('url'));
			mcProductRouter.navigate(this.model.get('url'));

			$("#stuff").html( this.template(this.model.toJSON()) ).fadeIn();

		    $('#bigImage').wrap('<span style="display:inline-block"></span>').css('display', 'block').parent().zoom();

			$("#detailContainer").show();

			var url = location.href;
			var bigImageUrl = $("#bigImage").attr('src');


			bigImageUrl = url.substring(0, url.indexOf('.com')+4) + '&media=' + url.substring(0, url.indexOf('.com')+4) + '/' + bigImageUrl + '&description="' + this.model.get('details') + '"';
			bigImageUrl = bigImageUrl.replace(/\//g, '%2F').replace(/\:/g, '%3A');

			var pageURL = window.location.href.replace(/\//g, '%2F').replace(/\:/g, '%3A').replace(/\#/g, '%23');
			var twitterURL = "https://twitter.com/share?url=" + pageURL;	// create the twitter url based on the current product image
		
			$("#emailShare").attr('href', "mailto:?subject=I wanted you to see this site&amp;body=Check out this product " + window.location.href);
			$("#pinterestShare").attr('href', 'http://pinterest.com/pin/create/button/?url=' + bigImageUrl);
			$("#twitterShare").attr('href', twitterURL);

			return this;
		},

		renderThumb : function() {
			this.$el.html( this.thumbTemplate(this.model.toJSON()) );

			this.$el.fadeIn("slow");

			return this;
		},

		renderSearch : function() {
			this.$el.html(  );
		},

		showDetails : function() {
			this.render();
		}
	});


	// The View to display the list of products in the array
	App.Views.ProductList = Backbone.View.extend({		

		el : $('#productGallery'),	// the root element for the list of products

		initialize : function() {
			this.eventlistener.on('route:!products', this.getProduct, this);
			this.eventlistener.on('route:!search', this.findProduct, this);
		},

		eventlistener : vent,

		filteredList : null,

		events : {
			'route:!products' : 'getProduct',
			'route:!search' : 'findProduct'
		},

		getProduct : function(prodId) {
			var singleProduct = this.collection.get(prodId);	// pull the product by id from the list of products

			if(singleProduct === undefined) {
				return;	// if we got a bogus id then we dont have model. Excape the function!!
			}

			var productView = new App.Views.Product({ model : singleProduct });	 // create a view for the model

			productView.showDetails();

			productView.$el.parents('#leftFloat').click();	
		},

		findProduct : function(queryString) {
			var masterList = this;

			if( (queryString === "") && ($('#scrollbar3').data('page') === "searchPage") ) { // only clear the list if we're on the search page (HACK!!!!!)
				this.filteredList = null;

				masterList.$el.children().remove();
			} 
			else {
				this.filteredList = null;

				this.filteredList = _.filter(this.collection.models, function(mdl) {

					var modelInfo = mdl.get('prodName');

					modelInfo = mdl.get('id').toLowerCase() + ' ' + modelInfo.toLowerCase();

					return modelInfo.indexOf(queryString.toLowerCase()) !== -1;
				});

				if(this.filteredList.length > 0) {
					$(".visuallyCentered").remove();
					masterList.$el.children().remove();

					_.each(this.filteredList, function(product) {
						var productView = new App.Views.Product({ model : product });

						masterList.$el.append(productView.renderThumb().el);
					});	

					$('#scrollbar3').tinyscrollbar_update();			
				}
				else {
					window.location = "404.html";
				}
			}
		},

		render : function(type){		// render the entire list of items in the collection
			
			var masterList = this;

			if((masterList.filteredList != null) && (masterList.filteredList.length > 0)) {
				return; // dont duplicate the list on page loads
			}

			if(type === null || type === undefined) { // if we're not filtering then render the entire collection
				this.collection.each(function(product) {
					
					var productView = new App.Views.Product({ model : product });	// loop through the collection
																					// and create and render the view for the model (thumbnails)
					this.$el.append(productView.renderThumb().el);		// append the thumbnail to the 'productGallery' element

				}, this);				
			}
			else {

				this.filteredList = _.filter(this.collection.models, function(mdl) {					
					return mdl.get('collection') === type;	// pull out all the models that match the type
				});

				_.each(this.filteredList, function(product) {
					var productView = new App.Views.Product({ model : product });

					masterList.$el.append(productView.renderThumb().el);
				});
			}

			return this;
		}
	});


	App.Collections.ProductCollection = Backbone.Collection.extend({
		model : App.Models.Product,

		initialize : function(){
			this.url = '/!products';
		}
	});

	App.Routers = Backbone.Router.extend({

		routes : {
			'' : 'index',
			'!product' : 'loadPage',
			'!products/:id' : 'showProduct', // show the product based on the passed id
			'!search/:query' : 'searchProduct'
		},

		index : function() {
			return;
		},

		loadPage : function(){
			window.location = window.location.href.substring(0, window.location.href.indexOf('#'));
		},
		
		showProduct : function(prodId) {
			$('.classiqueCollection').click(); // will trigger the page to display depending on what is visible
			$('.chicCollection').click();

			vent.trigger("route:!products", prodId);			
		},

		searchProduct : function(queryString) {
			vent.trigger("route:!search", queryString);
		}
	});

})(); // Execute this when the page loads


// Load up the application 
// Start up the application
if(window.App !== undefined)	// prevent from trying to load the application on pages that don't need it
{
	window.mcProductCollection = new App.Collections.ProductCollection(productList, false);	// create this 

	window.mcProductGallery = new App.Views.ProductList({ collection : mcProductCollection });

	window.mcProductRouter = new App.Routers;

	Backbone.history.start();
}



