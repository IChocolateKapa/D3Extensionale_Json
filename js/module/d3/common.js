/**
 *  Created by Echo on 2015/9/11.
 */

//drag pin
var node_drag = d3.behavior.drag()
	.origin(function(d) { return d; })
	.on("dragstart", dragstart)
	.on("drag", dragmove)
	.on("dragend", dragend);

function dragstart(d) {
	d.fixed = false;
	d3.event.sourceEvent.stopPropagation();
	d3.select(this).classed("dragging", true);
	force.start();
}

function dragmove(d) {
	d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}

function dragend(d) {
	d3.select(this).classed("dragging", false);
	d.fixed = true; //拖动完成后是否定在完成地点
	force.resume();
}


var zoom = d3.behavior.zoom()
	//.scaleExtent([1, 10])
	.on("zoom", zoomed);

function zoomed() {
	container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}



function tick() {//打点更新坐标
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

    //更新连接线上文字的位置
    line_text.attr("x",function(d){
        return (d.source.x + d.target.x) / 2  ;
    })
        .attr("transform",  function(){
//		return "rotate(45deg)";
            return "rotate(" + Math.PI + ")";
        });
    line_text.attr("y",function(d){
        return (d.source.y + d.target.y) / 2 ;
    })
        .attr("transform",  function(){
//		return "rotate(45deg)";
            return "rotate(" + Math.PI + ")";
        });

}


function getCXY(d){
	var cxy;
	if(d.qqClock) {
		cxy = 4;
	} else if(d.qunNumber) {
		cxy = 6;
	} else {
		cxy = 4;
	}
	return cxy;
}

function getCR(d){
	var cr;
	if(d.qqClock) {
		cr = 22;
	} else if(d.qunNumber) {
		cr = 30;
	} else {
		cr = 13;
	}
	return cr;
}

function getCColor(d) {
	var cc;
	if(d.qqClock) {
		cc = "lightblue";
	} else if(d.qunNumber) {
		cc = "pink";
	} else {
		cc = "#d3a4ff";
	}
	return cc;
}

function getHoverCXY(d){
	var cxy;
	if(d.qqClock) {
		cxy = 6;
	} else if(d.qunNumber) {
		cxy = 9;
	} else {
		cxy = 6;
	}
	return cxy;
}

function getHoverCR(d){
	var cr;
	if(d.qqClock) {
		cr = 30;
	} else if(d.qunNumber) {
		cr = 40;
	} else {
		cr = 30;
	}
	return cr;
}


function mouseover() {
    d3.select(this).select("circle")
			          .transition()
			          .duration(300)
			          .attr("cx", function(d){
			            	return "-" + getHoverCXY(d) + "px";
			            })  
			            .attr("cy", function(d){
			            	return "-" + getHoverCXY(d) + "px";
			            })
			            .attr("r", function(d){
			            	return getHoverCR(d) + "px";
			            })
			            .attr("fill", function(d) {
			            	return "url(#hs)";
			            });

} 


function mouseout() {  
	d3.select(this).select("circle")
		        	.transition()
		            .duration(900)  
		            .attr("cx", function(d){
		            	return "-" + getCXY(d) + "px";
		            })  
		            .attr("cy", function(d){
		            	return "-" + getCXY(d) + "px";
		            })
		            .attr("r", function(d){
		            	return getCR(d) + "px";
		            })
		            .attr("fill", function(d) {
		            	if(d.qqClock)  {
		            		return "url(#self)";
		            	} else if(d.qunNumber){
		            		return "url(#qungr)";
		            	} else {
		            		return "url(#qqgr)";
		            	}
		            });
}  





function showChildNodes(){
	
	dCurrentNode = d3.select(this).select("circle");
	dCurrent = d3.select(this).node().__data__;
	
	if (toggle == 0) {
		if(dCurrent.qqClock){
	    	node.selectAll('circle').style("opacity", function (o) {
	    		if(o.qqClock) {
	    			return 1;
	    		} else if(o.qunNumber) {
	    			return 1;
	    		} else{
	    			return 0;
	    		}
	        });
	    	node.selectAll("text").style("opacity", function(d){
				if(d.qqClock)  {
	        		return 1;
	        	} else if(d.qunNumber){
	        		return 1;
	        	} else {
	        		return 0;
	        	}
			})
	    } else {
	    	//其余的就显示相邻节点
	    	 node.selectAll('circle').style("opacity", function (o) {
	             return neighboring(dCurrent, o) | neighboring(o, dCurrent) ? 1 : 0;
	         });
	    	 node.selectAll('text').style("opacity", function (o) {
	    		 return neighboring(dCurrent, o) | neighboring(o, dCurrent) ? 1 : 0;
	    	 });
	    }
		var relativeQun = new Array();
		link.style("opacity", function (o) {
	    	if(o.target.qqAccount == dCurrent.qqAccount && o.source.qunNumber != dCurrent.qq_qunNumber) {
	    		console.log(o);
	    		relativeQun.push(o);
	    	}
	    });
	    link.style("opacity", function (o) {
	    	if(o.source.qqClock) {
	    		if(o.target.qunNumber == dCurrent.qq_qunNumber){
    				return 1;
    			} else{
    				for(var j = 0; j < relativeQun.length; j++){
    					if(o.target.qunNumber == relativeQun[j].source.qunNumber) {
    						return 1;
    					}
    				}
    			}
    	    	
	    	}
	    	return dCurrent.index==o.source.index | dCurrent.index==o.target.index ? 1 : 0;
	    });
	    
		$("#showAll").val("全部展开");
		toggle = 1;
		
    } else {
    	
	node.selectAll('circle').style("opacity", 1);
	link.style("opacity", 1);
        
        $("#showAll").val("收起叶子节点");
        toggle = 0;
    }
}







function neighboring(a, b) {
    return linkedByIndex[a.index + "," + b.index];
}


function connectedNodes() {
    
    if (toggle == 0) {
        d = d3.select(this).node().__data__;
        
        node.selectAll('circle').style("opacity", function (o) {
            return neighboring(d, o) | neighboring(o, d) ? 1 : 0;
        });
        
        link.style("opacity", function (o) {
            return d.index==o.source.index | d.index==o.target.index ? 1 : 0;
        });
        
        toggle = 1;
        
    } else {
        node.selectAll('circle').style("opacity", 1);
        link.style("opacity", 1);
        toggle = 0;
    }

}
