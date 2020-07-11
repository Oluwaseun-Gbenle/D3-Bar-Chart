d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',function(error,data){
   if (error) throw error;
 var dataset =  data.data;
 const w = 1000;
 const h = 700; 
 const padding = 60;
 const year = dataset.map(d => new Date (d[0]));
 const yearScale = d3.scaleTime()
 .domain([d3.min(year),d3.max(year)]) 
 .range([padding,w - padding]);
          
  const valueScale = d3.scaleLinear()
 .domain([0, d3.max(dataset,(d) => d[1])]) 
 .range([h - padding, padding]);
  
   const title =  d3.select("#container")
  .append("id","title")
  .text(data.source_name)
  .style("font-size","30px")
  .style("font-family","Arial")
   .style("text-align","center");
   
  
  const tooltip = d3.select("#tooltip")
    .style("opacity","0.9")
    .style("width", "120px")
    .style("height", "50px")
    .style("background-color", "#b9b8b8")
    .style("position", "absolute")
    .style("padding-top", "10px")
    .style("z-index", "10")
    .style("border", "1px solid #aaa")
    .style("font-size","15px")
    .style("line-height","22px")
    .style("color","#0f0f0f")
    .style("text-align","center")
    .style("visibility","hidden")
    .style("border-radius","5px");
  
  const svg = 
  d3.select("#container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);
  
  svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("class","bar")
  .attr("x",(d, i) => yearScale(year[i]))
  .attr("y",(d, i) => valueScale(d[1]))
  .attr("width", 3)
  .attr("height",(d)=> h - valueScale(d[1])-padding)
  .attr("fill","#0c92e5")
  .on("mouseover",(d, i)=>{
     tooltip.html(year[i].getFullYear() +" " + (['January','February','March','April','May','June','July','August','September','October','November','December'])[year[i].getMonth()] + "<br>" + "$" + dataset[i][1] + " billion");
    tooltip.style("visibility","visible");
  })
  
  .on("mousemove", (d, i) =>{
    tooltip.style("top",(d3.event.pageY)+"px")
    .style("left",(d3.event.pageX)+"px");
  })
     
  .on("mouseout",(d, i)=>{
    tooltip.style("visibility","hidden");
  });
  
  const yearAxis = d3.axisBottom(yearScale);
  const valueAxis = d3.axisLeft(valueScale);
  svg.append("g")
  .attr('id', 'x-axis')
  .attr("transform","translate(0,"+ (h -padding) + ")")
  .call(yearAxis);
  
  svg.append("g")
  .attr('id', 'y-axis')
  .attr("transform","translate("+ (padding) + ",0)")
  .call(valueAxis);
  
   
  
 });