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
	var branchPenalty = 0.75;

	document.getElementById("settings").innerHTML = "Branch Pentaly: "+branchPenalty+"</br>";

	//generate the initial generation
	makeInitial(pop);
	makeGen(1, branchPenalty);

	var timer = setInterval(function(){
		makeGen(50, branchPenalty);
	}, 1);
	

	function makeGen(checkin = 100, branchPenalty){

		count++;
		

		two.clear();
		var x_start = 100;
		var y_start = 600;
		trees = [];

		drawTree(two, 100, 350, bestGenes, true);
		var info = "Generation: " + count + "<br/>Best Score: " + highestScore + "<br/>Currently Viewing Generation " + showing;
		document.getElementById("current").innerHTML = info;



		for (var i = population.length - 1; i >= 0; i--) {
			var data = [];
			data['id'] = i;
			data['score'] = 0;
			var treeReturn = drawTree(two, x_start,y_start, population[i], true);
			data['branchSegments'] = treeReturn['branchSegments'];
			data['leaves'] = treeReturn['leaves'];
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
		for (var  x = 0; x <= trees.length * 200;) {
			x++;
			//var line = two.makeLine( x, 0, x, 350);
			var rays = 1;
			//line.stroke = "yellow";
			//check every tree
			for (var i = 0; i < trees.length; i++) {
				//check every leaf
					//console.log(trees[i]);
					trees[i]['leaves'] = trees[i]['leaves'].sort(sortFunction);

					function sortFunction(a, b) {
					    if (a[1] === b[1]) {
					        return 0;
					    }
					    else {
					        return (a[1] < b[1]) ? -1 : 1;
					    }
					}
					
				for (var j = 0; j < trees[i]['leaves'].length; j++) {
					if((x - trees[i]['leaves'][j][0])**2 < 5**2){
						//line.stroke = "green";
						if(rays > 0) {
							trees[i]['score']++;
							rays--;
							//var usedline = two.makeLine( x, trees[i]['leaves'][j][1], x, 350);
							 //usedline.stroke = "red";
							 
						}

					}
				}
			}
		}

		for (var i = 0; i < trees.length; i++) {
			trees[i]['score'] = trees[i]['score'] - (trees[i]['branchSegments']*branchPenalty);
			if(trees[i]['score'] > highestScore){
				highestScore = trees[i]['score'];
				bestGenes = trees[i]['genes'];
			}
		}
		for (var i = 0; i < trees.length; i++) {

			two.makeText(trees[i]['score'] ,trees[i]['origin'][0] ,625, 'bold');
			//two.update();
		}

	}


	 function doMating(){

		var fittest = [];
		var nextGen = [];

		trees.sort(function(a, b) {
		  var keyA = a.score,
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
			var parent1 = fittest[Math.floor(Math.random()*fittest.length)];
			var parent2 = fittest[Math.floor(Math.random()*fittest.length)];
			var child = [];

			for (var j = 0; j < parent1.length; j++) {
				if (Math.random() >= 0.5){
					var chrome = parent1[j];
					child.push(chrome);
				}else{

					var chrome = parent2[j];
					child.push(chrome);
				}

				if(Math.random() < 0.5) {
					child[Math.floor(Math.random()*child.length)] += getRand(0,2);
				} else {
					child[Math.floor(Math.random()*child.length)] -= getRand(0,2);
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
		var genes =[getRand(1,100),getRand(1,100) ,getRand(1,10), getRand(1,10), getRand(90,270), getRand(90,270), getRand(1,50),getRand(1,50)];
		population.push(genes);
	}

 }

	

function getRand(min, max) {
	return Math.floor(Math.random() * max + min);
}
