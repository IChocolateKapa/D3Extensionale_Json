/**
 *  Created by Echo on 2015/9/11.
 */

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
	d3.select(d3.select(this).node().parentNode).style("display", "none");
	
	var thisNode = d3.select(this).node().__data__;

	if(thisNode.qqClock) {
		showChildNodes();
	}else if(thisNode.qq_qunNumber){
		showChildNodes();
	} else {
        setTimeout(function(){
            $(".bgload").hide();
            $(".myload").hide();
            qunInfo = child.qunInfo;
            qunMemberInfo_re = child.allqun;

            initLinks_Nodes("true");
            draw_Render(org_qunid);
        }, 1000)

		
	}
}



function goDetail(){
	var thisNode = d3.select(this).node().__data__;
	if(thisNode.qqClock) {
		window.open("http://www.baidu.com");
	}else if(thisNode.qq_qunNumber){
		window.open("https://www.taobao.com/");
	} else {
		window.open("http://www.163.com/");
	}
	d3.select(d3.select(this).node().parentNode).style("display", "none");
}

