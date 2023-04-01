var drawTree = function (two, xorigin,yorigin, genes, display) {
	//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
	var segmentCount = 0;
	var leaves = [];
	var branches = [];
	var prevAngle = 0;

	var gP = [xorigin, yorigin];
	var trunkTop = '';
	console.log(genes);
	
	const group = two.makeGroup();

	var height = genes[1];
	const trunk = two.makeLine( gP[0], gP[1], gP[0],  gP[1] - 10);
	trunk.linewidth = 10;
	trunk.stroke = "tan";
	gP[1] = gP[1] - height;
	trunkTop = [gP[0], gP[1]];

	// Set the branching angle and reduction factor
	const branchAngle = Math.PI / genes[3];
	const branchLengthFactor = genes[4];

	group.add(trunk);
	

	if(genes[5] > 1) {
		
		drawBranches(gP[0], gP[1], genes[0],genes[1],genes[2]);
	}

	var data = []; 
	data['leaves'] = leaves;
	data['branches'] = branches;
	data['branchSegments'] = segmentCount;

	return data;

	
	
	// Create a function to draw the branches recursively
	function drawBranches(startX, startY, length, angle, depth) {

		const endX = startX + length * Math.sin(angle);
  		const endY = startY - length * Math.cos(angle);

  		if (endY < 250 ){
  			depth = 0;
  		}
	  if (depth === 0) {
	  	makeLeaf();
	    return;
	  }

	  	

	 	

	  // Create a new Two.js line object and add it to the parent group
	 	
	 	if(endY < startY) {
		  	const branch = two.makeLine(startX, startY, endX, endY);
		  	branch.stroke = "green";
		  	let branch_data = [startX, startY, endX, endY];
			branches.push(branch_data);
		  	group.add(branch);

		  	gP[0] = endX;
		  	gP[1] = endY;

		  // Recursively draw two more branches at a reduced length and with a slightly different angle
		  	drawBranches(endX,endY, length * branchLengthFactor, angle + branchAngle, depth - 1);
	  		drawBranches(endX,endY, length * branchLengthFactor, angle - branchAngle, depth - 1);
  		}
	}

	function makeLeaf(){
		var circle = two.makeCircle(gP[0], gP[1], 2);
		circle.stroke = "green";
		circle.fill = "green";
		leaves.push([gP[0],gP[1]]);
	}


};