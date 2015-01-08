var v = require("../Vector");

describe("wrapped-vector", function() {
	
	beforeEach(function() {
		
		this.target = [0, 0, 0];
		this.primesA = [2, 3, 5];
		this.primesB = [7, 11, 13];
		
		this.$target = v( this.target );
		this.$primesA = v( this.primesA );
		this.$primesB = v( this.primesB );
		
	});
	
	describe("wrapping", function() {
		
		it("creates n length vectors filled with 0s when called with a number", function() {
		
			var v0 = v(0);
			var v1 = v(1);
			var v2 = v(2);
			var v5 = v(5);
		
			expect( v0.value ).toEqual( [] );
			expect( v1.value ).toEqual( [0] );
			expect( v2.value ).toEqual( [0,0] );
			expect( v5.value ).toEqual( [0,0,0,0,0] );
		
		});
	
		it("creates an empty vector when called with no argument", function() {
		
			var vEmpty = v();
			expect( vEmpty.value ).toEqual( [] );
		
		});
	
		it("sets the .value to the passed array", function() {
		
			var v1 = v( this.primesA );
		
			expect( v1.value ).toEqual( [2, 3, 5] );
		
		});
		
	});
	
	describe("add", function() {
		
		it("can add two vectors and set to a target", function(){
		
			var target = [0, 1, 2];
			var $target = v( target );
		
			$target.add( this.primesA, this.primesB );
		
			expect( $target.value ).toBe( target );
			expect( $target.value ).toEqual( [9, 14, 18] );
			expect( this.primesA ).toEqual( [2, 3, 5] );
			expect( this.primesB ).toEqual( [7, 11, 13] );
		
		});
	
		it("can add n vectors and set to a target", function(){
		
			var primesC = [17, 19, 23];
			var target = [0, 1, 2];
			var $target = v( target );
		
		
			$target.add( this.primesA, this.primesB, primesC );
		
			expect( $target.value ).toBe( target );
			expect( $target.value ).toEqual( [26, 33, 41] );
			expect( this.primesA ).toEqual( [2, 3, 5] );
			expect( this.primesB ).toEqual( [7, 11, 13] );
			expect( primesC ).toEqual( [17, 19, 23] );
		
		});
	
		it("sets the target dimensions to the dimensions of the first passed vector", function() {
		
			var target1 = [0, 1];
			var target1Wrapped = v( target1 );
		
			var target2 = [0, 1];
			var target2Wrapped = v( target2 );
		
			var threeDimensionsArray = this.primesA;
			var fourDimensionsArray = [7, 11, 13, 17];
		
			target1Wrapped.add( threeDimensionsArray, fourDimensionsArray );
			target2Wrapped.add( fourDimensionsArray, threeDimensionsArray );
		
			expect( target1Wrapped.value.length ).toEqual( 3 );
			expect( target2Wrapped.value.length ).toEqual( 4 );
		
		});
	
		it("correctly mutates a self referential target during addition only after the operation", function() {
			
			this.$target.add( this.$target.value, this.primesA );
			
			expect( this.$target.value ).toEqual( [2, 3, 5] );
			
			this.$target.add( this.$target.value, this.primesA );
			
			expect( this.$target.value ).toEqual( [4, 6, 10] );
			
			this.$target.add( this.$target.value, this.primesA, this.primesA );
			
			expect( this.$target.value ).toEqual( [8, 12, 20] );
			
			
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.add( this.primesB ) ).toBe( this.$primesA );
		});
		
	});
	
	describe("multiply", function() {
		
		it("can multiply two vectors and set to a target", function(){
		
			var target = [0, 1, 2];
			var $target = v( target );
		
			$target.multiply( this.primesA, this.primesB );
		
			expect( $target.value ).toBe( target );
			expect( $target.value ).toEqual( [14, 33, 65] );
			expect( this.primesA ).toEqual( [2, 3, 5] );
			expect( this.primesB ).toEqual( [7, 11, 13] );
		
		});
	
		it("can multiply n vectors and set to a target", function(){
		
			var primesC = [17, 19, 23];
			var target = [0, 1, 2];
			var $target = v( target );
		
		
			$target.multiply( this.primesA, this.primesB, primesC );
		
			expect( $target.value ).toBe( target );
			expect( $target.value ).toEqual( [238, 627, 1495] );
			expect( this.primesA ).toEqual( [2, 3, 5] );
			expect( this.primesB ).toEqual( [7, 11, 13] );
			expect( primesC ).toEqual( [17, 19, 23] );
		
		});
	
		it("sets the target dimensions to the dimensions of the first passed vector", function() {
		
			var target1 = [0, 1];
			var target1Wrapped = v( target1 );
		
			var target2 = [0, 1];
			var target2Wrapped = v( target2 );
		
			var threeDimensionsArray = this.primesA;
			var fourDimensionsArray = [7, 11, 13, 17];
		
			target1Wrapped.multiply( threeDimensionsArray, fourDimensionsArray );
			target2Wrapped.multiply( fourDimensionsArray, threeDimensionsArray );
		
			expect( target1Wrapped.value.length ).toEqual( 3 );
			expect( target2Wrapped.value.length ).toEqual( 4 );
		
		});
	
		it("correctly mutates a self referential target during multiplication only after the operation", function() {
			
			var target = [1,1,1];
			var $target = v(target);
			
			$target.multiply( $target.value, this.primesA );
			
			expect( $target.value ).toEqual( [2, 3, 5] );
			
			$target.multiply( $target.value, this.primesA );
			
			expect( $target.value ).toEqual( [4, 9, 25] );
			
			$target.multiply( $target.value, this.primesA, this.primesA );
			
			expect( $target.value ).toEqual( [16, 81, 625] );
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.multiply( this.primesB ) ).toBe( this.$primesA );
		});
		
	});
	
	describe("defineProperties", function() {
		
		beforeEach(function() {
			this.v4 = [2, 3, 5, 7];
			this.v4Wrapped = v( this.v4 );
		});
		
		describe("get", function() {
			
			it("should get the x component", function() {
				expect( this.v4Wrapped.x ).toBe( this.v4[0] );
				expect( this.v4Wrapped.x ).toBe( 2 );
			});

			it("should get the y component", function() {
				expect( this.v4Wrapped.y ).toBe( this.v4[1] );
				expect( this.v4Wrapped.y ).toBe( 3 );
			});

			it("should get the z component", function() {
				expect( this.v4Wrapped.z ).toBe( this.v4[2] );
				expect( this.v4Wrapped.z ).toBe( 5 );
			});

			it("should get the w component", function() {
				expect( this.v4Wrapped.w ).toBe( this.v4[3] );
				expect( this.v4Wrapped.w ).toBe( 7 );
			});
			
		});		
		
		describe("set", function() {
			
			it("should get the x component", function() {
				this.v4Wrapped.x = 11;
				expect( this.v4Wrapped.x ).toBe( this.v4[0] );
				expect( this.v4Wrapped.x ).toBe( 11 );
			});

			it("should get the y component", function() {
				this.v4Wrapped.y = 11;
				expect( this.v4Wrapped.y ).toBe( this.v4[1] );
				expect( this.v4Wrapped.y ).toBe( 11 );
			});

			it("should get the z component", function() {
				this.v4Wrapped.z = 11;
				expect( this.v4Wrapped.z ).toBe( this.v4[2] );
				expect( this.v4Wrapped.z ).toBe( 11 );
			});

			it("should get the w component", function() {
				this.v4Wrapped.w = 11;
				expect( this.v4Wrapped.w ).toBe( this.v4[3] );
				expect( this.v4Wrapped.w ).toBe( 11 );
			});
			
		});		
		
	});
	
	describe("addOn", function() {
		
		it("adds on a vector to the wrapped value", function() {
			
			this.$primesA.addOn( this.primesB );
			expect( this.primesA ).toEqual( [9, 14, 18] );
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.addOn( this.primesB ) ).toBe( this.$primesA );
		});
		
	});
	
	describe("set", function() {
		
		it("sets the current wrapped value", function() {
			
			this.$primesA.set( 1, 2, 3 );
			expect( this.primesA ).toEqual( [1, 2, 3] );
			
		});
		
		it("sets only the values passed", function() {
			
			this.$primesA.set( 1, 2 );
			expect( this.primesA ).toEqual( [1, 2, 5] );
			
		});
		
		it("grows an array if the set arguments have more dimensions", function() {
			
			this.$primesA.set( 1, 2, 3, 4, 5 );
			expect( this.primesA ).toEqual( [1, 2, 3, 4, 5] );
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.set( this.primesB ) ).toBe( this.$primesA );
		});
		
		
	});
	
	describe("copy", function() {
		
		it("should copy an array", function() {
			
			this.$target.copy( this.primesA );
			expect( this.target ).toEqual( [2, 3, 5] );
			
		});
		
		it("should correct size the new copied array", function() {

			this.$target.copy( [2, 3] );
			expect( this.target ).toEqual( [2, 3] );

			this.$target.copy( [2, 3, 4, 5] );
			expect( this.target ).toEqual( [2, 3, 4, 5] );
			
		});
		
		it("copies only the specified n dimensions", function() {

			this.$target.copy( this.primesA, 2 );
			expect( this.target ).toEqual( [2, 3] );

			this.$target.copy( this.primesA, 4 );
			expect( this.target ).toEqual( [2, 3, 5, undefined] );
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.copy( this.primesB ) ).toBe( this.$primesA );
		});
		
		
	});
	
	describe("dot", function() {
		
		it("performs a dot product", function() {
			
			expect( this.$primesA.dot( this.primesB ) ).toEqual( 112 );
			
		});
		
	});
	
	describe("addScalar", function() {
		
		it("adds a number to each component", function() {
			
			expect( this.$primesA.addScalar( 5 ).value ).toEqual( [7, 8, 10] );
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.addScalar( this.primesB ) ).toBe( this.$primesA );
		});
		
	});
	
	describe("multiplyScalar", function() {
		
		it("multiply a number to each component", function() {
			
			expect( this.$primesA.multiplyScalar( 5 ).value ).toEqual( [10, 15, 25] );
			
		});
		
		it("returns wrap", function() {
			expect( this.$primesA.multiplyScalar( this.primesB ) ).toBe( this.$primesA );
		});
		
	});
	
	
	
	
});