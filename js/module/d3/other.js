/**
 * Created by Echo on 2015/9/11.
 */


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


