var _ = require('./underscore-min');

var properties = {
	
	set : {
		enumerable: false,
		value: function( x,y,z ) {
			this[0] = x;
			this[1] = y;
			this[2] = z;
		
			return this;
		}
	},
	
	multiplyScalar : {
		enumerable: false,
		value : function( scalar ) {
		
			this[0] *= scalar;
			this[1] *= scalar;
			this[2] *= scalar;
		
			return this;
		}
	},
	
	x : {
		get: function() { return this[0]; },
		set: function(v) { return this[0] = v; }
	},
	
	y : {
		get: function() { return this[1]; },
		set: function(v) { return this[1] = v; }
	},
	
	z : {
		get: function() { return this[2]; },
		set: function(v) { return this[2] = v; }
	},
	
	dot : {
		enumerable: false,
		value: function( v ) {
			var result = 0;
			for( var i=0, il = this.length; i < il; i++ ) {
				result += this[i] * v[i];
			}
			return result;
		}
	},
	
	data : {
		get: function() { return this.slice(); },
		set: function(v) {
			this.length = 0;
			_.extend(this, v);
			return this;
		}
	}
	
};

function generateBlankArray( n ) {
	
	var data = [];
	for( var i=0; i < n; i++ ) {
		data[i] = 0;
	}	
	return data;
}

//Vector( nDimensions ) = [0,0,0,...]
//Vector( nDimensions, ArrayValues ) = ArrayValues 
//Vector( ArrayValues ) = ArrayValues 
//Vector() = []

function Vector() {
	
	var dimensions = 0;
	var data;
	
	if( _.isNumber( arguments[0] ) && arguments[0] >= 0 ) {
		
		data = generateBlankArray( arguments[0] );
		
		if( arguments.length > 1 ) {
			
			if( _.isArray( arguments[1] ) ) {
				_.extend( data, arguments[1] );
			}
		}
		
	} else if ( _.isArray( arguments[0] ) ) {
		
		data = [];
	
		_.extend( data, arguments[0] );
		
	} else {
		
		data = [];
		
	}
	
	Object.defineProperties( data, properties );
	
	return data;
	
}

var v1 = Vector().set(1,2,3);
var v2 = Vector().set(4,-5,6);

console.log(v1.dot(v2));