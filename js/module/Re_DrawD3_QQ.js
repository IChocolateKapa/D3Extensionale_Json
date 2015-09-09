var link;

var node;

var force;

var linkedByIndex = {};

var dCurrent;

var dCurrentNode;

var toggle = 0;

var nodes = {};

var links = new Array();

var himSelf;
var mylinks = new Array();
var hisqun;

var qunInfo;
var qunMemberInfo_re;
var qunMemberInfo;

var org_qunid;

var line_text;

var outer, svg;
var container;



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


function initLinks_Nodes(flag){

	//初始化nodes
	var mylinks = new Array();
	
	var links_pre = new Array();
	
	if(flag == "true"){
		links_pre = links;
	} else{
		//初始化这个人和他所在的群之间信息
		for(var i = 0; i < hisqun.length; i++){
			
			var nodeSingle = {
					source : himSelf.qqAccount,
					sourceqqAge : himSelf.qqAge,
					sourceqqName : himSelf.qqName,
					sourceqqNickName : himSelf.qqNickName,
					soueceqqSex : himSelf.qqSex,
					target : hisqun[i].qunNumber,
					targetqunNickName : hisqun[i].qunNickName,
					targetqunCreateTime : hisqun[i].qunCreateTime,
					targetqunDescription : hisqun[i].qunDescription,
					targetqunTotalMember : hisqun[i].qunTotalMember
			};
			
			mylinks.push(nodeSingle);
			
		}
		
		
		
			
		mylinks.forEach(function(linkd) { 
	 	  
			 linkd.source = nodes[linkd.source] ||
						 (nodes[linkd.source] = {qqAccount: linkd.source, 
												 qqAge : linkd.sourceqqAge,
												 qqNickName : linkd.sourceqqNickName,
												 qqName : linkd.sourceqqName,
												 qqSex : linkd.soueceqqSex,
												 qqClock : true});
			 
			 	
		 	  
			 linkd.target = nodes[linkd.target] || 
			 			(nodes[linkd.target] = {qunNumber: linkd.target, 
							 					qunNickName : linkd.targetqunNickName,
							 					qunCreateTime : linkd.targetqunCreateTime,
							 					qunDescription : linkd.targetqunDescription,
							 					qunTotalMember : linkd.targetqunTotalMember});
	 	});
		
		
		
		var links_qun_q = new Array();
		
		for(var i = 0; i < hisqun.length; i++) {//qunMemberInfo
			
			if(qunMemberInfo[i]){
				
				for(var j = 0; j < qunMemberInfo[i].length; j++) {
					var nodeSingle = {
							source : hisqun[i].qunNumber,
							sourcequnNickName : hisqun[i].qunNickName,
							sourcequnCreateTime : hisqun[i].qunCreateTime,
							sourcequnDescription : hisqun[i].qunDescription,
							sourcequnTotalMember : hisqun[i].qunTotalMember,
							target : qunMemberInfo[i][j].qqAccount,
							targetqqAge : qunMemberInfo[i][j].qqAge,
							targetqqNickName : qunMemberInfo[i][j].qqNickName,
							targetqqName : qunMemberInfo[i][j].qqName,
							targetqqSex : qunMemberInfo[i][j].qqSex,
							targetqunNumber : hisqun[i].qunNumber
					};
					
					links_qun_q.push(nodeSingle);
				}
			}
			
		}
		
		
		links_qun_q.forEach(function(linkd) {  
		 	  
			 linkd.source = nodes[linkd.source] ||
						 (nodes[linkd.source] = {qunNumber: linkd.source, 
							 					 qunNickName : linkd.sourcequnNickName,
							 					 qunCreateTime : linkd.sourcequnCreateTime,
							 					 qunDescription : linkd.sourcequnDescription,
							 					 qunTotalMember : linkd.sourcequnTotalMember});
		 	  
			 linkd.target = nodes[linkd.target] || 
			 			(nodes[linkd.target] = { qqAccount: linkd.target, 
												 qqAge : linkd.targetqqAge,
												 qqName : linkd.targetqqName,
												 qqNickName : linkd.targetqqNickName,
												 qqSex : linkd.targetqqSex,
												 qq_qunNumber : linkd.targetqunNumber});
		 	});
		
		
		
		links_pre = mylinks.concat(links_qun_q);
	}
	
	
	
	
	var my_link = new Array();
	
	if(qunMemberInfo_re){
	
		for(var i = 0; i < qunMemberInfo_re.length; i++) {
			
			if(qunMemberInfo_re[i].qqAccount != himSelf.qqAccount){
				
				var nodeSingle = {
						source : qunInfo.qunNumber,
						sourcequnNickName : qunInfo.qunNickName,
						sourcequnCreateTime : qunInfo.qunCreateTime,
						sourcequnDescription : qunInfo.qunDescription,
						sourcequnTotalMember : qunInfo.qunTotalMember,
						target : qunMemberInfo_re[i].qqAccount,
						targetqqAge : qunMemberInfo_re[i].qqAge,
						targetqqNickName : qunMemberInfo_re[i].qqNickName,
						targetqqName : qunMemberInfo_re[i].qqName,
						targetqqSex : qunMemberInfo_re[i].qqSex,
						targetqunNumber : qunInfo.qunNumber
				};
				
				my_link.push(nodeSingle);
			}
		}
	
	
		my_link.forEach(function(linkd) {  
		 	 if(linkd.target != himSelf.qqAccount){
		 		 
				 linkd.source = nodes[linkd.source] ||
							 (nodes[linkd.source] = {qunNumber: linkd.source, 
								 					 qunNickName : linkd.sourcequnNickName,
								 					 qunCreateTime : linkd.sourcequnCreateTime,
								 					 qunDescription : linkd.sourcequnDescription,
								 					 qunTotalMember : linkd.sourcequnTotalMember});
			 	  
				 linkd.target = nodes[linkd.target] || 
				 			(nodes[linkd.target] = { qqAccount: linkd.target, 
													 qqAge : linkd.targetqqAge,
													 qqName : linkd.targetqqName,
													 qqNickName : linkd.targetqqNickName,
													 qqSex : linkd.targetqqSex,
													 qq_qunNumber : linkd.targetqunNumber});
		 	 }
	   });
		
		
	}
	
	links = my_link.concat(links_pre);
	
}



function drawD3QQ (result, orgqunid){
	
	
	
	org_qunid = orgqunid;
	
	hisqun = result.qunRes;
	himSelf = result.self;
	qunMemberInfo = result.allqun;
	
	initLinks_Nodes("false");
	draw_Render(orgqunid);

}
//D3绘图结束


function draw_Render(orgqunid){
	
	var width = 1132;
    var height = 800;
    var linkdistance = 150;
    var chargeNum = -3000;
//    var linkdistance = 50;
//    var chargeNum = -60000;
    var gravity = 0.4;

    
    force =   d3.layout.force()           		//创建基于物理模拟的位置连接
			    .nodes(d3.values(nodes))  		//获得或设置布局中的节点（node）阵列组。
			    .links(links)            		//获得或设置布局中节点间的连接（Link）阵列组。
			    .size([width, height])   		//获取或设置布局的 宽 和 高 的大小.
			    .linkStrength(1)
			    .linkDistance(linkdistance)    //获取或设置节点间的连接线距离
			    .charge(chargeNum)             //获取或设置节点的电荷数.(电荷数决定结点是互相排斥还是吸引, 正数吸引，负数排斥)
			    .gravity(gravity)
				.theta(1)
				.alpha(1)
			    .on("tick", tick)             //监听布局位置的变化
			    .start();

    
	 // init svg
	svg = d3.select("#d3part")
			  .append("svg:svg")
			    .attr("width", width)
			    .attr("height", height)
			    .call(zoom);
	
	/*var rect = svg.append("rect")
		        .attr("width", width)
		        .attr("height", height)
		        .style("fill", "none")
		        ;*/
			    
	container = svg.append("g")
				   .style("pointer-events", "all");



	link = container.append("g")
					.attr("class", "links")
					.selectAll(".link")
					.data(force.links())  
					.enter()
					.append("line")  
					.attr("class", "link");
					


								
	link.style("stroke",function(d, i){//  设置线的颜色
			return "lightgrey";
			//return colors(i);    
		})	
		.style("stroke-width",function(d,i){//设置线的宽度    
			d.weight*10;    
		})
		.style("opacity", function(d) {
			return 1;
			/*if(d.source.qqClock){
				return 1;
			} else if(d.source.qunNumber) {
				return 0;
			} else {
				return 1;
			}*/
			
		}); 

	line_text =  container.append("g")
					.attr("class", "linetexts")
					.selectAll(".linetext")
					.data(force.links())
					.enter()
					.append("text")
					.style("font-size",  "8px")
					.attr("class","linetext")
					.text(function(d){
						if(d.source.qqClock){
							return "所在QQ群";
						} else if(d.source.qunNumber) {
							return "包含成员";
						} else {
							return "什么鬼？";
						}
					});


	//(4)为链接添加节点  
	node = container.append("g")
    			.attr("class", "nodes")
    			.selectAll(".node")  
				.data(force.nodes())  
				.enter()
				.append("g")  
				.attr("class", "node") 
				.attr('cursor','pointer')
	            //.on('click', connectedNodes)
	            //.on('click', showChildNodes)
	            .on('click', getMoreChildren)
	            .on("mouseover", mouseover)  
	            .on("mouseout", mouseout)
	            .on('dblclick', goDetail)
				.call(node_drag);
	
	
	
	node.append("circle") 
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
        })
        .style("opacity", function(d) {
        	return 1;
        	/*if(d.qqClock)  {
        		return 1;
        	} else if(d.qunNumber){
        		return 1;
        	} else {
        		return 0;
        	}*/
        });  
	
	
	//设置提示  
	node.append("text")  
		.text(function(d) { 
			if(d.qunNumber) {
				return d.qunNickName;
			} else {
				return d.qqName;
			}
		})
		.attr("x", "15px")
		.attr("y", "15px")
		.style("font-size",  "8px")
		.style("fill",  "grey")
		.style("font-family",  "微软雅黑")
		.style("opacity", function(d){
			return 1;
			/*if(d.qqClock)  {
        		return 1;
        	} else if(d.qunNumber){
        		return 1;
        	} else {
        		return 0;
        	}*/
		});
	
	
	
	//设置提示  
	node.append("svg:title")  
		.text(function(d) { 
			if(d.qunNumber) {
				var title =   "群号： " + d.qunNumber
							+ "      群名称： " + d.qunNickName
							+ "      群成员数量： " + d.qunTotalMember
							+ "      建群时间： " + d.qunCreateTime
							+ "      群描述： " + d.qunDescription; 
				return title;
			} else {
				
				var title = "QQ号： " + d.qqAccount
							+ "      姓名： " + d.qqName
							+ "      昵称： " + d.qqNickName
							+ "      性别： " + d.qqSex
							+ "      年龄： " + d.qqAge;
				return title;
			}
		});


	//设置矩形提示框 rect
	var node_g = node.append("g");
	
	var node_rect = node_g.append("svg:rect")
		.attr("x", "1px")
		.attr("y", "10px")
		.attr("width", "80px")
		.attr("height", "60px")
		.style("fill", "white")
//		.style("opacity", "0")
		.style("display", "none")
		.style("stroke-width", "1px")
		.style("stroke", "lightgrey");
	
	node_g.append("text")
		.text("扩展")
		.attr("x", "1px")
		.attr("y", "30px")
	    .on("click", expand)
		.style("font-size",  "16px")
		.style("fill",  "blue")
		.style("font-family",  "微软雅黑")
		.style("display", "none");
//		.style("opacity", 0);
	
	
	node_g.append("text")
		.text("详细")
		.attr("x", "1px")
		.attr("y", "60px")
		.on("click", goDetail)
		.style("font-size",  "16px")
		.style("fill",  "blue")
		.style("font-family",  "微软雅黑")
		.style("display", "none");
	
	

	var node_len = 0;
	for(var nod in nodes){
		node_len++;
	}
	
    for (i = 0; i < node_len; i++) {
        linkedByIndex[i + "," + i] = 1;
    };
    
    var qqself_index = 0;
    links.forEach(function (d) {
    	if(d.source.qqClock){
    		qqself_index = d.source.index;
    	}
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });
    links.forEach(function (d) {
    	linkedByIndex[qqself_index + "," + d.target.index] = 1;
    });
    
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

function showAllNets() {
	if($("#showAll").val() == "全部展开") {
		node.selectAll('circle').style("opacity", 1);
		link.style("opacity", 1);
		node.selectAll("text").style("opacity", 1);
	     $("#showAll").val("收起叶子节点");
	     
	} else {
		node.selectAll('circle').style("opacity", function (o) {
    		if(o.qqClock) {
    			return 1;
    		} else if(o.qunNumber) {
    			return 1;
    		} else{
    			return 0;
    		}
        });
        link.style("opacity", function(d) {
			if(d.source.qqClock){
				return 1;
			} else if(d.source.qunNumber) {
				return 0;
			} else {
				return 1;
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
        $("#showAll").val("全部展开");
	}
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


function getMoreChildren(){
	
	d3.select(this)
	  .select("rect")
	  .transition()
	  .duration(100) 
	  .style("display","block");
	
	
	d3.select(d3.select(this)
				.select("g")
				.node()
				.children[1])
	  .style("display","block");
	
	d3.select(d3.select(this)
			.select("g")
			.node()
			.children[2])
		.style("display","block");

}

//点击节点，显示出rect,点击rect上的扩展时进行对选中节点的再次扩展，即查询此qq群的成员
function expand(){
	$(".bgload").show(500);
	$(".myload").show(500);
	//隐藏掉rect, text的panel
	d3.select(d3.select(this).node().parentNode).style("display", "none")
	
	
	var thisNode = d3.select(this).node().__data__;
	if(thisNode.qqClock) {
		showChildNodes();
	}else if(thisNode.qq_qunNumber){
		showChildNodes();
	} else {
		$.ajax({
			url: "/D3Extensionable/getMoreChildren.do",
			type: "post",
			data: {"qunid": thisNode.qunNumber},
			dataType: "json",
			success: function(data){
				
				$(".bgload").hide(500);
				$(".myload").hide(500);
				
				$("#d3part").empty();
				
				qunInfo = data.qunInfo;
				qunMemberInfo_re = data.allqun;
				
				
				initLinks_Nodes("true");
				
				draw_Render(org_qunid);
				
			},
			error: function(){
				alert("Error while gettime more children!");
			}
		})
		
	}
}



function goDetail(){
	var thisNode = d3.select(this).node().__data__;
	if(thisNode.qqClock) {
		window.open("goQQDetail.do?qqid=" + thisNode.qqAccount  + "&qunid=" + orgqunid);
	}else if(thisNode.qq_qunNumber){
		window.open("goQQDetail.do?qqid=" + thisNode.qqAccount + "&qunid=" + thisNode.qq_qunNumber);
	} else {
		window.open("goQunDetail.do?qunid=" + thisNode.qunNumber);
	}
	d3.select(d3.select(this).node().parentNode).style("display", "none");
}
