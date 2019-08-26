const sampleMean = (numberOfTrials) => {
	const heads = 1;
	const tails = 0;
	let result = [];
	let counter = 0;
	do {
		let num = Math.round(Math.random());
		num === heads ? result.push(heads) : result.push(tails);
		counter += 1;
	}while(counter <= numberOfTrials);
	
	const sum = arr => arr.reduce((a,b) => a + b, 0);
	const mean = sum(result)/result.length;
	// sampleMean === 0.500 ? console.log(`sample mean \u03BC  = ${sampleMean} for sample size n = ${numberOfTrials}`): '';

	if(true){
		return [mean,numberOfTrials];
	}
}

let data;

const Data = (upperlimit)=>{
    let testValues = [];
    let num = 1;
    while(num < upperlimit){
	    testValues.push(num);
	    num += 1;
    }
    data = testValues.map(val => sampleMean(val));	
}

const chart = (data)=>{
  let margin = {top: 10, right: 30, bottom: 50, left: 60},
      width = 360 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

// append the svg object to the chart id in the page
  let svg = d3.select("#chart")
      .attr("class","chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("background-color","#ebebeb")
      .append("g")
      .attr("transform",
          `translate( ${margin.left} , ${margin.top} )`);

  // x axis
  let x = d3.scaleLinear()
      .domain([0, d3.max(data, d=>{return d[1]})])
      .range([ 0, width ]);

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add Y axis
  let y = d3.scaleLinear()
      .domain([0, d3.max(data, d=>{return 1})])
      .range([ height, 0 ]);
    
  svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#004C49")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
      .x(function(d) { return x(d[1]) })
      .y(function(d) { return y(d[0]) })
        )

  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 25) + ")")
      .style("text-anchor", "middle")
      .text('Population size');

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(`Population mean \u03BC `)	
}
const mapper = (value,inc) =>{
  let increment = 0;
  const incrementor = (incrementBy)=>{increment+= incrementBy; return increment;}
  setInterval(()=>{if(increment < value){Data(incrementor(inc));chart(data)};}, 100);
}
mapper(10,10)

const submit = document.getElementById('submit');
const submit2 = document.getElementById('submit2');
const submit3 = document.getElementById('submit3');
const mychart = document.getElementById('chart');
const myinput = document.getElementById('input');

submit.addEventListener('click',event=>{
  if(mychart.innerHTML.length > 2){
    mychart.innerHTML = '';
  }
  let value = myinput.value;
  mapper(value,10);
  event.preventDefault();
});
submit2.addEventListener('click', event=>{
  if(mychart.innerHTML.length > 2){
    mychart.innerHTML = '';
  }
  let value = myinput.value;
  Data(value);
  chart(data);
  event.preventDefault();
});
submit3.addEventListener('click',event=>{
  if(mychart.innerHTML.length > 2){
    mychart.innerHTML = '';
  }
  let myvalue = myinput.value;
  let increment = 0;
  const incrementor = (incrementBy)=>{increment+= incrementBy; return increment;}
  setInterval(()=>{
    if(increment < myvalue){
      if(mychart.innerHTML.length > 2){
        mychart.innerHTML = '';
      }
      Data(incrementor(10));
      chart(data);
    };
  }, 100);
  event.preventDefault();
});

