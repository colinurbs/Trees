 
function run() {
var population = [];

function makeInitial(count) {

	for (var i = count - 1; i >= 0; i--) {
 	//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
 	var genes =[getRand(1,100),getRand(1,100) ,getRand(1,10), getRand(1,10), getRand(90,270), getRand(90,270), getRand(1,50),getRand(1,50)];
 	population.push(genes);
 }

}
makeInitial(6);
var x = 100 ;
var y = 350;

for (var i = population.length - 1; i >= 0; i--) {
	drawTree(x,y, population[i]);
	x = x +200;
}

function getRand(min, max) {
	return Math.floor(Math.random() * max + min);
}



}



