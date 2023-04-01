	var count = 0;
	var pop = 11;
	var params = { fullscreen: true };
	var elem = document.body;
	var two = new Two(params).appendTo(elem);
	var highestScore = 0;
	var bestGenes = [];
	var testResults = [];
	var population = [];
	var leaves = [];
	var scores = [];
	var trees = [];
	var showing = 1;
	var branchPenalty = 0.25;

	

	//generate the initial generation
	makeInitial(pop);
	makeGen(1, branchPenalty);

	var timer = setInterval(function(){
		makeGen(1, branchPenalty);
	}, 1);

	function makeGen(checkin = 100, branchPenalty){
		count++;
		two.clear();
		var x_start = 100;
		var y_start = 600;
		trees = [];

		//drawTree(two, 100, 350, bestGenes, true);
		var info = "Generation: " + count + "<br/>Best Score: " + highestScore + "<br/>Currently Viewing Generation " + showing;
		document.getElementById("current").innerHTML = info;
		drawTree(two, 50,900, bestGenes, true);
		for (var i = population.length - 1; i >= 0; i--) {
			let data = [];
			data['id'] = i;
			data['score'] = 0;
			let treeReturn = drawTree(two, x_start,y_start, population[i], true);
			data['branchSegments'] = treeReturn['branchSegments'];
			data['leaves'] = treeReturn['leaves'];
			data['branches'] = treeReturn['branches'];
			data['genes'] = population[i];
			data['origin'] = [x_start , y_start];
			trees.push(data);
			x_start = x_start +100;
		}
		
		//score the trees
		setScores();

		 //create new generation
		population = doMating();
		if (count % checkin === 0 || count === 1){
			two.update();
			showing = count;
		}

		return population;

		///----------------member functions----------------------------/

		function setScores(){

		loopRays:
		for (var  x = 0; x <= trees.length * 200;) {
			x++;
			//var line = two.makeLine( x, 0, x, 600);
			var rays = 2;
			//line.stroke = "yellow";
			//check every tree
			loopTrees:
			for (var i = 0; i < trees.length; i++) {
				//check every leaf
					//sort leaves by Y so we get the highest leaves first
					trees[i]['leaves'] = trees[i]['leaves'].sort(function(a, b) {
					    if (a[1] === b[1]) {
					        return 0;
					    }
					    else {
					        return (a[1] < b[1]) ? -1 : 1;
					    }
					});
					//sort branches left to right by origin
					trees[i]['branches'] = trees[i]['branches'].sort(function(a, b) {
					    if (a[0] === b[0]) {
							return 0;
						}
						else {
							return (a[0] < b[0]) ? -1 : 1;
						}
					});
					//console.log(trees[i]['branches']);
					//throw new Error('test');
				loopLeaves:
				for (var j = 0; j < trees[i]['leaves'].length; j++) {
					//check if ray hits leaf
					if((x - trees[i]['leaves'][j][0])**2 < 5**2){
						//check if the ray hits a branch
						loopBranches:
						for (var k = 0; k < trees[i]['branches'].length; k++) {
							if(x > trees[i]['branches'][k][0][0] && x < trees[i]['branches'][k][1][0]){
								//console.log(trees[i]['branches'][k]);
								if(trees[i]['branches'][k][0][1] < trees[i]['leaves'][j][1] || trees[i]['branches'][k][1][1] < trees[i]['leaves'][j][1]){
									rays--;
									if(rays == 0){
										break loopTrees;
									}
								}
								//throw new Error('here');
							}
						}
						//line.stroke = "green";
						if(rays > 0) {
							trees[i]['score']++;
							rays-=2;
							
						}else{
							break loopTrees;
						}
					}
				}
			}
		}
		//set final score and deduct branch penalty
		for (var i = 0; i < trees.length; i++) {
			trees[i]['score'] = trees[i]['score'];
			if(trees[i]['score'] > highestScore){
				highestScore = trees[i]['score'];
				bestGenes = trees[i]['genes'];
			}
		}
		//draw the scores
		for (var i = 0; i < trees.length; i++) {
			two.makeText(trees[i]['score'] ,trees[i]['origin'][0] ,625, 'bold');
			//two.update();
		}
	}

	 function doMating(){
		let fittest = [];
		let nextGen = [];
		trees.sort(function(a, b) {
		  let keyA = a.score,
			keyB = b.score;
		  // Compare the 2 dates
		  if (keyA < keyB) return 1;
		  if (keyA > keyB) return -1;
		  return 0;
		});
		for (var i = 0; i < trees.length; i++) {
			if(i < (population.length / 2)){
				fittest.push(trees[i]['genes']);
			}
		}
		//console.log(fittest);
		for (var i = 0; i <= pop; i++) {
			let parent1 = fittest[Math.floor(Math.random()*fittest.length)];
			let parent2 = fittest[Math.floor(Math.random()*fittest.length)];
			let child = [];
			for (var j = 0; j < parent1.length; j++) {
				if (Math.random() >= 0.5){
					var chrome = parent1[j];
					child.push(chrome);
				}else{
					var chrome = parent2[j];
					child.push(chrome);
				}
				if(Math.random() < 0.1) {
					child[Math.floor(Math.random()*child.length)] += getRand(0,2);
				}
			}
			nextGen.push(child);
		}
		return nextGen;
	}
}

function makeInitial(count) {
	for (var i = count - 1; i >= 0; i--) {
		//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
		var genes =[getRand(1,10),getRand(1,10) ,getRand(1,10), getRand(1,10), getRand(1,10), getRand(1,10), getRand(1,10),getRand(1,10)];
		population.push(genes);
	}
}

function getRand(min, max) {
	let num = Math.random() * max + min;
	if (num<0){
		num = 0;
	}
	return num;
}
