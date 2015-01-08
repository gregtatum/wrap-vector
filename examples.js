var v = require('./Vector');

v(3);

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

console.log( "mutate v1: v1 * v2" );

var v0 = v(3);
v1 = [ 1, 2, 3 ];
v2 = [ 5, 7, 11 ];

console.log( "v0 value" );
console.log( v0.value );


v0.x = 5;
v0.y = 1;
v0.z = 10;

console.log( "v0 value after property modification" );
console.log( v0.value );

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