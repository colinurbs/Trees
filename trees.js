
var drawTree = function (xorigin,yorigin, genes ) {
	//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
	console.log(genes);

	var params = { fullscreen: true };
	var elem = document.body;
	var two = new Two(params).appendTo(elem);

	var gP = [xorigin, yorigin];
	var trunkTop = '';

	makeTrunk(getRand(genes[0],genes[1]));
	for (let i = 0; i < genes[2]; i++) {
		makeLimb(genes[3],genes[6],genes[7],genes[4],genes[5]);
	}

	function makeTrunk(height) {

		var line = two.makeLine( gP[0], gP[1], gP[0],  gP[1] - height);
		line.linewidth = 10;
		line.stroke = "tan";
		gP[1] = gP[1] - height;
		trunkTop = [gP[0], gP[1]];

		two.update();

	}

	function makeBranch(len, angle, prevAngle) {
		x = gP[0] + len * Math.cos(angle);
        y = gP[1] + len * Math.sin(angle);

		var line = two.makeLine( gP[0], gP[1], x,  y);
		line.linewidth = 5;
		line.stroke = "tan";
		gP[0] = x;
		gP[1] = y;		

		prevAngle = angle;
	}

	function makeLeaf(){

		var circle = two.makeCircle(gP[0], gP[1], 15);
		circle.stroke = "green";
		circle.fill = "green";
	}

	function makeLimb(segments,minBranch, maxBranch, minAngle, maxAngle){
		var prevAngle = 0;
		for (let i = 0; i < segments; i++) {
  			makeBranch(getRand(minBranch,maxBranch),getRand(minAngle,maxAngle), prevAngle);
		}
		console.log(y);

		if(gP[1] < yorigin){
			makeLeaf();
		}
		
		gP[0] = trunkTop[0];
		gP[1] = trunkTop[1];
		two.update();
	}

	function getRand(min, max) {
  		return Math.floor(Math.random() * max + min);
	}

};