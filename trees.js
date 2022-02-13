
var drawTree = function (two, xorigin,yorigin, genes, display) {
	//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
	var segmentCount = 0;
	var leaves = [];
	var branches = [];
	var prevAngle = 0;

	var gP = [xorigin, yorigin];
	var trunkTop = '';

	makeTrunk(getRand(genes[0],genes[1]));
	for (let i = 0; i < genes[2]; i++) {
		makeLimb(genes[3],genes[6],genes[7],genes[4],genes[5]);
	}

	var data = []; 
	data['leaves'] = leaves;
	data['branches'] = branches;
	data['branchSegments'] = segmentCount;

	if(display == false){
		
	}
	return data;

	function makeTrunk(height) {

		var line = two.makeLine( gP[0], gP[1], gP[0],  gP[1] - height);
		line.linewidth = 10;
		line.stroke = "tan";
		gP[1] = gP[1] - height;
		trunkTop = [gP[0], gP[1]];

	}

	function makeBranch(len, angle, prevAngle) {
		x = Math.floor(gP[0] + len * Math.cos(angle));
		y = Math.floor(gP[1] + len * Math.sin(angle));

		var line = two.makeLine( gP[0], gP[1], x,  y);
		var circle = two.makeCircle(x, y, 2.5);
		circle.stroke = "tan";
		circle.fill = "tan";
		line.linewidth = 5;
		line.stroke = "tan";
		var branch = [[gP[0],gP[1]],[x,y]];
		gP[0] = x;
		gP[1] = y;		

		branches.push(branch);

		prevAngle = angle;
	}

	function makeLeaf(){

		var circle = two.makeCircle(gP[0], gP[1], 5);
		circle.stroke = "green";
		circle.fill = "green";
		leaves.push([gP[0],gP[1]]);


	}

	function makeLimb(segments,minBranch, maxBranch, baseAngle, randMax, leafSize){
		for (let i = 0; i < segments; i++) {
			segmentCount++;
			var angle = baseAngle + prevAngle / getRand(0, randMax); 
			makeBranch(minBranch, angle, prevAngle);
			prevAngle = angle;
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