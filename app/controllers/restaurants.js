import Ember from 'ember';

const CUISINE_OPTIONS = [
	{ name: 'african', title: 'African' },
	{ name: 'american', title: 'American' },
	{ name: 'barbecue', title: 'Barbecue' },
	{ name: 'cafe', title: 'Cafe' },
	{ name: 'chinese', title: 'Chinese' },
	{ name: 'czech/slovak', title: 'Czech / Slovak' },
	{ name: 'french', title: 'French' },
	{ name: 'german', title: 'German' },
	{ name: 'indian', title: 'Indian' },
	{ name: 'japanese', title: 'Japanese' },
	{ name: 'mexican', title: 'Mexican' },
	{ name: 'pizza', title: 'Pizza' },
	{ name: 'thai', title: 'Thai' },
	{ name: 'vegetarian', title: 'Vegetarian' }
];

export default Ember.Controller.extend({

	isMenuOpened: false,

	dropdownRatingOpen: false,

	dropdownPriceOpen: false,

	CUISINE_OPTIONS: CUISINE_OPTIONS,

	sortedOptions: [],

	myPrice: 0,

	myMinPrice: 0,

	myRating: 0,

	myMinRating: 0,

	currentPage: 1,

	paginationSize: 3,

	countPages: Ember.computed('paginationSize', 'showingRestaurants',
		function(){
		let numPags = this.showingRestaurants / this.paginationSize;
		const resto = this.showingRestaurants % this.paginationSize;
		if ( resto !== 0 ) {
			numPags = Math.floor(this.showingRestaurants / this.paginationSize) + 1;
		}
		return numPags;
	}),

	isLastPage: Ember.computed(	'currentPage', 'countPages', function(){
		if ( this.get('currentPage') === this.get('countPages') ) {
			return true;
		}
		return false;
	}),

	isFirstPage: Ember.computed( 'currentPage', function(){
		if ( this.get('currentPage') === 1 ) {
			return true;
		}
		return false;
	}),

	getPage: Ember.computed( 'currentPage', 'paginationSize', 'filteredRestaurants',
		function(){
			let page = [];
			const totalElements = this.get('filteredRestaurants');
			let toElement = this.get('currentPage') * this.get('paginationSize');
			let fromElement = toElement - this.get('paginationSize');
			if ( toElement > totalElements.length ) {
				toElement = totalElements.length;
			}
			for ( let index = fromElement; index < toElement; index++ ) {
				page.push(totalElements[index]);
			}
		return page;
	}),

	showingRestaurants: 0,

	moreThanOnePage: Ember.computed('showingRestaurants', 'paginationSize',
		function(){
		if ( this.showingRestaurants > this.paginationSize ) {
			return true;
		}
		return false;
	}),

	totalRestaurants: 0,

	porcentaje: Ember.computed('showingRestaurants', 'totalRestaurants',
		function(){
		const currentPercentaje = (this.showingRestaurants * 100) / this.totalRestaurants;
		return currentPercentaje;
	}),

	filteredRestaurants: function() {
		const numberOfRestaurants = this.get('model').length;
		this.set('totalRestaurants', numberOfRestaurants);
		this.set('showingRestaurants', numberOfRestaurants);
  		return this.get('model').sortBy('rating:asc');
	}.property('model.@each'),

	onResultsChanged: Ember.observer('showingRestaurants',
		function() {
	    	this.set('currentPage', 1);
		}),

	onFilterChanged: Ember.observer('myRating', 'myMinRating', 'myPrice',
		'selectedCuisins', 'sortedOptions', function() {
	    	let filtered = this.get('model');

	    	if ( this.get('selectedCuisins') && this.get('selectedCuisins').length > 0 ) {
    			let value = this.get('selectedCuisins');
    			let filteredTotalCuisins = [];
				for ( let i = 0; i < value.length; i++ ) {
					//console.log("observer: "+value[i].name);
		    		//filtered = filtered.filterBy('cuisine', value[i].name);
	    			let filteredCuisins = filtered.filterBy('cuisine', value[i].name);

	    			for ( let j = 0; j < filteredCuisins.length; j++ ) {
	    				filteredTotalCuisins.push(filteredCuisins[j]);
	    			}
				}
				filtered = filteredTotalCuisins;
	    	}

	    	if ( this.myRating !== 0  || this.myMinRating !== 0 ) {
    			let filteredTotalRating = [];
				for ( let i = this.myMinRating; i <= this.myRating; i++ ) {
	    			let filteredRating = filtered.filterBy('rating', i);

	    			for ( let j = 0; j < filteredRating.length; j++ ) {
	    				filteredTotalRating.push(filteredRating[j]);
	    			}
				}
				filtered = filteredTotalRating;
	    	}

	    	if ( this.myPrice !== 0 ) {
    			let filteredTotalPrice = [];
				for ( let i = 1; i <= this.myPrice; i++ ) {
	    			let filteredPrice = filtered.filterBy('price', i);

	    			for ( let j = 0; j < filteredPrice.length; j++ ) {
	    				filteredTotalPrice.push(filteredPrice[j]);
	    			}
				}
				filtered = filteredTotalPrice;
	    	}
	    	for ( let i = 0; i < this.sortedOptions.length; i++ ) {
	    		filtered.sortBy(this.sortedOptions[i]);
			}

	    	this.set('showingRestaurants', filtered.length);
	    	this.set('filteredRestaurants', filtered);
		}),

	actions: {

	    updateRating(params) {
	    	if ( this.get('myMinRating') > params.rating ) {
		    	this.set('myMinRating', params.rating);
	    	}
	    	this.set('myRating', params.rating);
		},

	    updateMinRating(params) {
	    	if ( this.get('myRating') < params.rating ) {
		    	this.set('myRating', params.rating);
	    	}
	    	this.set('myMinRating', params.rating);
		},

	    clearRating() {
	    	this.set('myRating', 0);
	    	this.set('myMinRating', 0);
//			this.toggleProperty('dropdownRatingOpen');
		},

	    updatePrice(params) {
	    	if ( this.get('myMinPrice') > params.rating ) {
		    	this.set('myMinPrice', params.rating);
	    	}
	    	this.set('myPrice', params.rating);
		},

	    updateMinPrice(params) {
	    	if ( this.get('myPrice') < params.rating ) {
		    	this.set('myPrice', params.rating);
	    	}
	    	this.set('myMinPrice', params.rating);
		},

	    sorted(param) {
	    	console.log(param);
	    	let sortedby = this.get('sortedOptions');
	    	sortedby.push(param);
			this.set('sortedOptions', sortedby);
		},

	    clearPrice() {
	    	this.set('myPrice', 0);
//			this.toggleProperty('dropdownPriceOpen');
		},

	    goFirst() {
	    	this.set('currentPage', 1);
		},

	    goNext() {
	    	if ( this.get('currentPage') !== this.get('countPages') ) {
		    	this.set('currentPage', (this.get('currentPage') + 1));
		    }
		},

	    goPrevious() {
	    	if ( this.get('currentPage') !== 1 ) {
		    	this.set('currentPage', (this.get('currentPage') - 1));
		    }
		},

	    goLast() {
	    	this.set('currentPage', this.get('countPages'));
		},

		toggleMenu(){
			this.toggleProperty('isMenuOpened');
		},

	    toggleRatingDropdown() {
	        this.toggleProperty('dropdownRatingOpen');
    	},

	    togglePriceDropdown() {
	        this.toggleProperty('dropdownPriceOpen');
    	}

	}

});
