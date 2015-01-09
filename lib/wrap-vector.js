var _ = require('lodash');

var v = {
	
	set : function( vector /* x, y, z, ... */ ) {
		
		var i = 0;
			il = arguments.length;
			
		while( ++i < il ) {
			vector[i-1] = arguments[i];
		}
		
		return vector;
	},
	
	addOn : function( vector, v2 ) {
		
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
			
			//Set memo
			v.copy( memo, arguments[1] );
			
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
			
			v.copy( vector, memo, dimensions );
		
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
		
		return vector;
		
	},
	
	multiply : function() {
		
		var memo = [];
		
		return function( vector /* v1, v2, v3 ..*/ ) {
					
			var dimensions = arguments[1].length;			
			
			//Set
			v.copy( memo, arguments[1] );
			
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
			
			v.copy( vector, memo, dimensions );
		
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
		
		var i = -1;
			il = vector.length;
			
		while( ++i < il ) {
			vector[i] *= value;
		}
		return vector;
		
	},
	
	addScalar : function( vector, value ) {
		
		var i = -1;
			il = vector.length;
			
		while( ++i < il ) {
			vector[i] += value;
		}
		return vector;
		
	}
	
};

var wrapVector = function( argument ) {
	
	var vector;

	if( _.isArray( argument ) ) {
		
		vector = argument;
		
	} else {
		
		vector = [];
		
		for( var i = 0; i < argument; i++ ) {
			vector[i] = 0;
		}
		
	}

	var instance = {};
	
	_.each( v, function( func, key ) {
		
		instance[key] = function() {
			
			var result = _.partial( func, vector ).apply( null, arguments);
			
			if( result !== vector ) return result;
			
			return instance
		};
		
	});

	Object.defineProperties( instance, {
		"x": {
			enumerable : false,
			get : function() { return vector[0]; },
			set : function(val) { vector[0] = val; }
		},
		"y": {
			enumerable : false,
			get : function() { return vector[1]; },
			set : function(val) { vector[1] = val; }
		},
		"z": {
			enumerable : false,
			get : function() { return vector[2]; },
			set : function(val) { vector[2] = val; }
		},
		"w": {
			enumerable : false,
			get : function() { return vector[3]; },
			set : function(val) { vector[3] = val; }
		}
	});
	
	instance.value = vector;
	return instance;
}

_.extend( wrapVector, v );

module.exports = wrapVector;