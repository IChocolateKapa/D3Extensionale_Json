/**
 * Created by Echo on 2015/8/30.
 */

require.config({
    paths: {
        "jquery": "../lib/jquery-2.1.3.min",
        "d3": "../lib/d3.min"
    }
})

require(['jquery', 'd3'], function($, d3){

    //test turns out good
    var svg = d3.select("body").append("svg");
    svg.append("rect");
})


