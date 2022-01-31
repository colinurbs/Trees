	var count = 0;
	var pop = 6;
	var params = { fullscreen: true };
	var elem = document.body;
	var two = new Two(params).appendTo(elem);
	

	var population = [];
	var leaves = [];
	var scores = [];
	var trees = [];

	//generate the initial generation
	 makeInitial(pop);

	 //initial tree position
	

	var test = two.makeCircle(50, 50, 50);
	 

	makeGen();

	var intervalID = setInterval(makeGen, 500);
	var playing = true;
	 


		document.body.onkeyup = function(e){
			if(e.keyCode == 32){

				if(playing== true){
					clearInterval(intervalID);
					playing = false;
				}else {
					//var intervalID = setInterval(makeGen, 500);
					playing = true;
				}

			}
		}


	function makeGen(){
		count++;
		
		var x_start = 100;
		var y_start = 350;
		trees = [];

		two.clear();
		two.makeText("Generations " +count ,50,400, 'bold');
		two.update();
		for (var i = population.length - 1; i >= 0; i--) {
			var data = [];
			data['id'] = i;
			data['score'] = 0;
			data['leaves'] = drawTree(two, x_start,y_start, population[i]);
			data['genes'] = population[i];
			data['origin'] = [x_start , y_start];
			trees.push(data);
			x_start = x_start +200;
		}
		
		//score the trees
		setScores();

		 //create new generation
		population = doMating();

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
			//console.log(trees[i]['score']);
			if(i < 5){
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

					var chrome = parent1[j] - getRand(0,5);
					child.push(chrome);
				}else{

					var chrome = parent2[j] + getRand(0,5);
					child.push(chrome);
				}

			}

			nextGen.push(child);


		}

		return nextGen;


	 }

	 //build out the trees


	 function makeInitial(count) {

		for (var i = count - 1; i >= 0; i--) {
			//trunkMin, trunkMax, limbCount, limbSegments, limbAngleMin, limbAngleMax, limbLenMin, limbLenMax
			var genes =[getRand(1,100),getRand(1,100) ,getRand(1,10), getRand(1,10), getRand(90,270), getRand(90,270), getRand(1,50),getRand(1,50)];
			population.push(genes);
		}

	 }

	 function setScores(){

		for  (var  x = 0; x <= trees.length * 200;) {

			x += 5;
			var line = two.makeLine( x, 0, x, 350);
			line.stroke = "yellow";
			//check every tree
			for (var i = 0; i < trees.length; i++) {
				
					
				//check every leaf
				for (var j = 0; j < trees[i]['leaves'].length; j++) {
					if((x - trees[i]['leaves'][j][0])**2 < 15**2){
						line.stroke = "green";
						trees[i]['score']++;
					}
				}
			}
			line.linewidth = 1;
			two.update();	
		}
		for (var i = 0; i < trees.length; i++) {

			two.makeText(trees[i]['score'] ,trees[i]['origin'][0] ,375, 'bold');
			two.update();
		}

	}

	function getRand(min, max) {
		return Math.floor(Math.random() * max + min);
	}
