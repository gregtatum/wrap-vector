var _ = require('./underscore-min');

function each( array, iteratee ) {
	
	// combining rest() and each()
	
	var index = -1,
		length = array.length;

	while (++index < length) {
		if ( iteratee(array[index], index, array) === false ) {
			break;
		}
	}
	
	return array;
}

function restEach( array, iteratee ) {
	
	// combining rest() and each()
	
	var index = 0,
		length = array.length;

	while (++index < length) {
		if ( iteratee(array[index], index) === false ) {
			break;
		}
	}
	
	return array;
}

var combineVectors = (function() {
	
	var memo = [];
	
	return function combineVectors( args, func ) {
		
		var length = args[1].length;
		var vector = args[0];
		
		memo.length = length;
	
		each( result, function ensureResultsBlank( value, i ) {
			result[i] = 0;
		});
		
		//Perform addition
		restEach( args, function performCombineVectors( v2 ) {
			
			var i = 0,
				il = args.length - 1;
			
			while( ++i < length ) {
				args[i]
			}
			each(v2, function() {
				
			});
		});
	}
	
})();


var properties = {
	
	set : function( vector /* x, y, z, ... */ ) {
		
		restEach( arguments, function( arg, i ) {
			vector[i] = arg;
		});
		
		return vector;
	},
	
	x : function( vector, x ) {
		vector[0] = x;
		return vector;
	},
	
	y : function( vector, y ) {
		vector[1] = y;
		return vector;
	},
	
	z : function( vector, z ) {
		vector[2] = z;
		return vector;
	},
	
	w : function( vector, w ) {
		vector[3] = w;
		return vector;
	},
	
	addTo : function( vector, v2 ) {
		
		var i = -1,
			il = v2.length;
			
		while( ++i < il ) {
			vector[i] += v2[i]
		}
		
		return vector;
		
	},
	
	add : function() {
		
		var memo = [];
		
		return function( vector /* v1, v2, v3 ..*/ ) {
					
			var dimensions = arguments[1].length;			
			
			//Set
			properties.copy( memo, arguments[1] );
			
			var vectorIndex = 1,
				dimensionIndex,
				argumentsLength = arguments.length;
			
			//iterate through v1, v2, v3, ...
			while( ++vectorIndex < argumentsLength ) { 
				dimensionIndex = -1;
				while( ++dimensionIndex < dimensions ) {
					memo[dimensionIndex] += arguments[vectorIndex][dimensionIndex];
				}
			}
			
			properties.copy( vector, memo, dimensions );
		
			return vector;
		}
		
	}(),
	
	copy : function( vector, v2, nDimensions ) {
		
		if( !_.isNumber( nDimensions ) ) {
			nDimensions = v2.length;
		}
		
		vector.length = nDimensions;
		
		var i = -1;
		
		while( ++i < nDimensions ) {
			vector[i] = v2[i];
		}
		
	},
	

	
	multiply : function() {
		
		var memo = [];
		
		return function( vector /* v1, v2, v3 ..*/ ) {
					
			var dimensions = arguments[1].length;			
			
			//Set
			properties.copy( memo, arguments[1] );
			
			var vectorIndex = 1,
				dimensionIndex,
				argumentsLength = arguments.length;
			
			//iterate through v1, v2, v3, ...
			while( ++vectorIndex < argumentsLength ) { 
				dimensionIndex = -1;
				while( ++dimensionIndex < dimensions ) {
					memo[dimensionIndex] *= arguments[vectorIndex][dimensionIndex];
				}
			}
			
			properties.copy( vector, memo, dimensions );
		
			return vector;
		}
		
	}(),
	
	dot : function( vector, v2 ) {
		
		var result = 0;
		for( var i=0, il = vector.length; i < il; i++ ) {
			result += vector[i] * v2[i];
		}
		return result;
		
	},
	
	multiplyScalar : function( vector, value ) {
		
		for( var i=0, il = vector.length; i < il; i++ ) {
			vector[i] *= value;
		}
		return vector;
		
	}
	
};

var Vector = function( argument ) {
	
	var vector;
	

	if( _.isArray( argument ) ) {
		
		vector = argument;
		
	} else {
		
		vector = [];
		
		for( var i = 0; i < argument; i++ ) {
			vector[i] = 0;
		}
		
	}
	
	var scope = this;
	
	_.reduce( properties, function( memo, func, key ) {
		
		scope[key] = function() {
			
			var result = _.partial( func, vector ).apply( null, arguments);
			
			if( result !== vector ) return result;
			
			return scope;
		};
		
	}, scope);
	
	scope.value = vector;
	
	return scope;
}

_.extend( Vector, properties );

module.exports = Vector;