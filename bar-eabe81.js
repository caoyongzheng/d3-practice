webpackJsonp([1],{138:function(t,a,e){var n=e(11);document.title="柱状图";var r=document.createElement("style");r.innerHTML="\n  svg {margin: 100px auto; display: block;}\n  .bar {fill: steelblue;}\n  .bar:hover {fill: brown;}\n",document.body.appendChild(r);var l=n.select("body").append("svg");l.attr("width",600).attr("height",400);var o={top:20,right:20,bottom:20,left:20},i=l.attr("width")-o.left-o.right,d=l.attr("height")-o.top-o.bottom,u=l.append("g").attr("transform","translate("+o.left+","+o.top+")"),p=[{key:1,value:5},{key:2,value:4},{key:3,value:7},{key:4,value:2},{key:5,value:4},{key:6,value:8},{key:7,value:3},{key:8,value:6}],s=n.scaleBand().range([0,i]).domain(p.map(function(t){return t.key})).padding(.1),c=n.scaleLinear().domain([0,8]).range([d,0]);u.append("g").attr("transform","translate(0, "+d+")").call(n.axisBottom(s)),u.append("g").attr("transform","translate(0, 0)").call(n.axisLeft(c)),u.append("g").selectAll(".bar").data(p).enter().append("rect").attr("class","bar").attr("x",function(t){return s(t.key)}).attr("width",s.bandwidth()).attr("y",function(t){return c(t.value)}).attr("height",function(t){return d-c(t.value)})}},[138]);