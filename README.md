# wrap-vector

This is me thinking with some code on how to interact with bare vector structures with a cross-module manner, but with the ease I've come to be used to with frameworks like three.js. It won't be as fast as some other libraries, but it's more comfortable for what I'm used to.

### Design philosophy

I didn't want to mutate any native array structures but provide both a functional interface and an object oriented chaining interface for an array structure. I used a jQuery-like metaphor of wrapping a DOM element in a jQuery object/selector. In the end the data is stored in an array and always accessible.

### Usage

	var target = []
	var v1 = [1,2,3]
	var v2 = [4,5,6]
	
	v().add( v1, v2 )
	// Returns the new array [5,7,9]
	
	v(target).add( v1, v2 )
	// Sets the target to [5,7,9]
	
	//Wrap an array
	var position = v(v1)
	
	var result = position
		.addOn( v2 )
		.multiplyScalar( 10 )
		.value
		
	// Mutates v1 to [50,70,90] and returns the original array
	
	console.log( result === v1 );
	// true
	
	//Everything can be used functionally as well
	v.add(target, [1,2,3], [4,5,6]);
	
	//The properties automatically update the underlying array
	position.x = 5;
	position.y = 10;
	position.z = 15;
	
	console.log( position.value )
	//[5,10,15]

### Caveats

I haven't done any benchmarking for speeds yet. So far I haven't done anything with this other than make some tests pass. I'd also like to factor out any dependencies like lodash. There are a lot more useful methods to add to the wrapper. I'd also like to make it so that you can pass a wrapped value to any function and it'll sort itself out. Currently it has to be an unwrapped array. The tests passed in node, Chrome, Safari, and Firefox on my Mac.
