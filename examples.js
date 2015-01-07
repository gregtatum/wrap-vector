var v = require('./Vector');

var v1 = [ 1, 2, 3 ];
var v2 = [ 5, 7, 11 ];

console.log( "v1 + v2" )
console.log( v(3).add(v1, v2).value )

console.log( "v1 + v1 + v1 + v1 + v1" )
console.log( v().add(v1, v1, v1, v1, v1).value )

console.log( "v1 + v1 + v1 + v1 + v1" )
console.log( v().add(v1, v1, v1, v1, v1).value )

console.log( "mutate v1: v1 + v2" );
console.log( v(v1).add(v1, v2).value );

console.log( "mutate v1: v1 + v2" );
console.log( v(v1).add(v1, v2).value );

console.log('------');

v1 = [ 1, 2, 3 ];
v2 = [ 5, 7, 11 ];

console.log( "v1 * v2" )
console.log( v(3).multiply(v1, v2).value )

console.log( "v1 * v1 * v1 * v1 * v1" )
console.log( v().multiply(v1, v1, v1, v1, v1).value )

console.log( "v1 * v1 * v1 * v1 * v1" )
console.log( v().multiply(v1, v1, v1, v1, v1).value )

console.log( "mutate v1: v1 * v2" );
console.log( v(v1).multiply(v1, v2).value );

console.log( "mutate v1: v1 * v2" );
console.log( v(v1).multiply(v1, v2).value );

// var p1 = v(3);
// var p2 = v(3);
//
// p1.add( v2 );
//
// console.log(
//
// 	v( p1 )
// 	.add( v2 )
// 	// .multiplyScalar( 5 )
// 	.value
//
// );
//
//
// console.log(
//
// 	v.dot(
// 		v.set( v1, 1, 2, 3 ),
// 		v2
// 	)
//
// );