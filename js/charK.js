dataK = [
    {x:200,y:100},
    {x:400,y: 60},
    {x:580,y:150},
    {x:590,y:325},
    {x:550,y:450},
    {x:550,y:450},
    {x:550,y:450},
    {x:575,y:435},
    {x:575,y:435},
    {x:575,y:435},
    {x:590,y:400},
    {x:620,y:350},
    {x:680,y:290},
    {x:718,y:240},
    {x:708,y:200},
    {x:708,y:180},
    {x:710,y:170},
    {x:715,y:165},
    {x:715,y:165},
    {x:715,y:165},
    {x:715,y:165},
    {x:710,y:170},
    {x:708,y:180},
    {x:713,y:200},
    {x:720,y:220},
    {x:740,y:270},
    {x:715,y:320},
    {x:620,y:320},
    {x:520,y:380},
    {x:520,y:380},
    {x:520,y:380},
    {x:640,y:310},
    {x:720,y:400},
    {x:800,y:500},
    {x:850,y:560},
    {x:940,y:580},
    {x:1040,y:545}
  ];

var dataT1 = [
    {x:345.75,y:49},
    {x:289.75,y:94},
    {x:295.75,y:255},
    {x:301.75,y:422},
    {x:242.75,y:459}
  ];


var dataT2 = [
    {x:174.75,y:424},
    {x:273.75,y:376},
    {x:406.75,y:409}
  ];


var dataT3 = [
    {x:715,y:165},
    {x:710,y:170},
    {x:708,y:180},
    {x:713,y:200},
    {x:720,y:220},
    {x:745,y:290},
    {x:700,y:320}
  ];


var dataT4 = [
    {x:490,y:63},
    {x:320,y:153},
    {x:172.75,y:176},
    {x:107.75,y:91},
    {x:80.75,y:110}
]


var dataT5 = [
    {x:264.75,y:65},
    {x:300.75,y:75},
    {x:284.75,y:336},
    {x:339.75,y:366}
]

//==========================================


var picture = {
    height: 500,
    width: 0,
    durationK: 6000,
	  durationT: 8000
  };  

var feather = {
    width: 27,
    thickness: 3,      
    angle: 33,           // degree
    color: '#8F2F34',
    opacity: 1
  };


//--------------------------------------------


  var dataK = scaleDataK ( dataK );
  var KContainer = createSvg ();
  setTimeout( proceedK, 1000);

  var dataT1 = scaleDataT ( dataT1, 0.7, 0.75, 0.17 );
  var dataT2 = scaleDataT ( dataT2, 0.53, 0.68, 0.73 );
  var dataT3 = scaleDataT ( dataT3, 0.95, 1.02, 0.17 );
  var dataT4 = scaleDataT ( dataT4, 0.6, 0.55, 0.14 );
  var dataT5 = scaleDataT ( dataT5, 0.6, 0.51, 0.222 );
  setTimeout( proceedT, picture.durationK + 1300);


//--------------------------------------------

  function proceedK() {
    createLines ( KContainer, dataK );
    animateK ( KContainer );
  };

  function proceedT() {
    feather.color = '#FFFFFF';
    feather.opacity = 0;
    createLines ( KContainer, dataT1 );
    createLines ( KContainer, dataT2 );
    createLines ( KContainer, dataT3 );
    createLines ( KContainer, dataT4 );
    createLines ( KContainer, dataT5 );
    animateT ( KContainer );
  };
//--------------------------------------------



function scaleDataK ( data ) {

  var maxX=0, minX=100000, maxY=0, minY=100000;
  data.forEach(function(d) {
    if(+d.x > maxX) maxX = +d.x;
    if(+d.x < minX) minX = +d.x;
    if(+d.y > maxY) maxY = +d.y;
    if(+d.y < minY) minY = +d.y;
  });

  var comingPicture = {
      height: maxY - minY,
      width: maxX - minX
  }

  var pictureProportion = comingPicture.width / comingPicture.height ;
  picture.width = picture.height * pictureProportion;

  var scale = picture.height / comingPicture.height;

  data.forEach(function(d) {
    d.x = (+d.x - minX) * scale + feather.width;
    d.y = (+d.y - minY) * scale + feather.width;   
  });  

  return data;
}


function scaleDataT ( data, scale, xScale, yScale ) {

  var maxX=0, minX=100000, maxY=0, minY=100000;
  data.forEach(function(d) {
    if(+d.x > maxX) maxX = +d.x;
    if(+d.x < minX) minX = +d.x;
    if(+d.y > maxY) maxY = +d.y;
    if(+d.y < minY) minY = +d.y;
  });

  var comingPicture = {
      height: maxY - minY,
      width: maxX - minX
  }

  var pictureProportion = comingPicture.width / comingPicture.height ;
  picture.width = picture.height * pictureProportion;

  data.forEach(function(d) {
    d.x = (+d.x - minX) * scale + xScale * picture.height + feather.width;
    d.y = (+d.y - minY) * scale + yScale * picture.height + feather.width;   
  });  

  return data;
}



function createSvg () {

  var KContainer = d3.select('.charK')
          .append('svg')
          .attr('height', +picture.height + 2 * feather.width)
          .attr('width', +picture.width + 2 * feather.width)
          .style('opacity', 1);
          // .style('border', '1px solid red');

  return KContainer;
}



function createLines ( KContainer, data ) {

  var traceQuantity = (Math.round( +feather.width / +feather.thickness) + 1) * 2;

  var xOffset = +feather.width * Math.cos ( +feather.angle * Math.PI /180 );
  var yOffset = +feather.width * Math.sin ( +feather.angle * Math.PI /-180 );

  var trace = d3.svg.line()
        .x(function(d){return d.x;})
        .y(function(d){return d.y;})
        .interpolate("basis");

  for(j=0; j<traceQuantity; j++){

    var tempData = [];

    for(i=0; i<data.length; i++){
      tempData[i] = { 
        x:+data[i].x + j * xOffset / traceQuantity, 
        y:+data[i].y + j * yOffset / traceQuantity 
      };      
    }

  var traceGroup = KContainer
            .append('g')
            .append('path')
            .attr("d", trace(tempData))   // binding data to lines
            .attr('fill', 'none')
            .style("stroke", feather.color)
            .style("opacity", feather.opacity)
            .style("stroke-linecap", "round")
            .style("stroke-width", +feather.thickness);
  }
}



function animateK ( KContainer ) {

  var totalLength = KContainer
            .select('g')
            .selectAll('path')
            .node()
            .getTotalLength();

    KContainer
        .selectAll('path')
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
            .duration(+picture.durationK)
            .ease("linear")
            .attr("stroke-dashoffset", 0)
};



function animateT ( KContainer ) {

  var totalLength = KContainer
            .select('g')
            .selectAll('path')
            .node()
            .getTotalLength();

    KContainer
        .selectAll('path')
        .transition()
            .duration(+picture.durationT)
            .style("opacity", 1);
};
