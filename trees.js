
var drawTree = function (two, xorigin,yorigin, genes ) {
	//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
	var segmentCount = 0;
	var leaves = [];

	var gP = [xorigin, yorigin];
	var trunkTop = '';

	makeTrunk(getRand(genes[0],genes[1]));
	for (let i = 0; i < genes[2]; i++) {
		makeLimb(genes[3],genes[6],genes[7],genes[4],genes[5]);
	}
	two.update();

	var data = []; 
	data['leaves'] = leaves;
	data['branchSegments'] = segmentCount;
	return data;

	function makeTrunk(height) {

		var line = two.makeLine( gP[0], gP[1], gP[0],  gP[1] - height);
		line.linewidth = 10;
		line.stroke = "tan";
		gP[1] = gP[1] - height;
		trunkTop = [gP[0], gP[1]];

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

		var circle = two.makeCircle(gP[0], gP[1], 5);
		circle.stroke = "green";
		circle.fill = "green";
		leaves.push([gP[0],gP[1]]);


	}

	function makeLimb(segments,minBranch, maxBranch, minAngle, maxAngle){
		var prevAngle = 0;
		for (let i = 0; i < segments; i++) {
			segmentCount++;
			makeBranch(getRand(minBranch,maxBranch),getRand(minAngle,maxAngle), prevAngle);
		}

		if(gP[1] < yorigin){
			makeLeaf();
		} else {
			segmentCount += 10;
		}
		
		gP[0] = trunkTop[0];
		gP[1] = trunkTop[1];
		

	}

	function getRand(min, max) {
		return Math.floor(Math.random() * max + min);
	}

};