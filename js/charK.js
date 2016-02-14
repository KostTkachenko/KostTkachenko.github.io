
data1 = [
    {"x":"200","y":"100"},
    {"x":"400","y": "60"},
    {"x":"580","y":"150"},
    {"x":"590","y":"325"},
    {"x":"550","y":"450"},
    {"x":"550","y":"450"},
    {"x":"550","y":"450"},
    {"x":"575","y":"435"},
    {"x":"575","y":"435"},
    {"x":"575","y":"435"},
    {"x":"590","y":"400"},
    {"x":"620","y":"350"},
    {"x":"680","y":"290"},
    {"x":"718","y":"240"},
    {"x":"708","y":"200"},
    {"x":"708","y":"180"},
    {"x":"710","y":"170"},
    {"x":"715","y":"165"},
    {"x":"715","y":"165"},
    {"x":"715","y":"165"},
    {"x":"715","y":"165"},
    {"x":"710","y":"170"},
    {"x":"708","y":"180"},
    {"x":"713","y":"200"},
    {"x":"720","y":"220"},
    {"x":"740","y":"270"},
    {"x":"715","y":"320"},
    {"x":"620","y":"320"},
    {"x":"520","y":"380"},
    {"x":"520","y":"380"},
    {"x":"520","y":"380"},
    {"x":"640","y":"310"},
    {"x":"720","y":"400"},
    {"x":"800","y":"500"},
    {"x":"850","y":"560"},
    {"x":"940","y":"580"},
    {"x":"1040","y":"545"}
]

var picture = {

      height: 500,
      width: 0,
      duration: 9000

  };  



var feather = {

    width: 30,
    thickness: 1,      // min = 0.1
    angle: 33           // degree

  };



// d3.json ( "./data/coordinates1.json", function ( error, json ) {

//   if ( error ) return console.warn ( error );  
  // var data = scaleData ( json );
  var data = scaleData ( data1 );

  var KContainer = createSvg ();
  createLines ( KContainer, data );
  animate ( KContainer );
  // showDots ( KContainer, data );

// });



// function scaleData ( json ) {
function scaleData ( json ) {

  var data = json;
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



function createSvg () {

  var KContainer = d3.select('.charK')
          .append('svg')
          .attr('height', +picture.height + 2 * feather.width)
          .attr('width', +picture.width + 2 * feather.width)
          // .attr('class', 'pictureSvg')
          // .style('background', '#212121')
          .style('opacity', 1)
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
            .style("stroke", "#8F2F34")
            .style("stroke-linecap", "round")
            .style("stroke-width", +feather.thickness);
  }
}



function animate ( KContainer ) {

  var totalLength = KContainer
            .select('g')
            .selectAll('path')
            .node()
            .getTotalLength();

  // (function repeat() {

    KContainer
        .selectAll('path')
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
            .duration(+picture.duration)
            .ease("linear")
            .attr("stroke-dashoffset", 0)
        // .transition()
        //     .duration(2000)
        //     .style("stroke", "#8F2F34")
        // .transition()
        //     .duration(+picture.duration/2)
        //     .style("stroke", "black")
        // .transition()
        //     .duration(1200)
        //     .style("stroke", "#212121")
        // .transition()
        //     .duration(2000)
        // .transition()
        //     .duration(0)
        //     .style("stroke", "#8F2F34")
        //         .each("end", repeat);
  // })();

};



function showDots ( KContainer , data ) {

  KContainer.selectAll('circle')
      .data(data)
      .enter()
      .append('circle') 
            .attr('cx', function(d){return d.x})
            .attr('cy', function(d){return d.y})
            .attr('r', 2)
            .style('fill', 'red');

}