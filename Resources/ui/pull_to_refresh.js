PullToRefresh = function(tableView, beginLoading) {
    var border = Ti.UI.createView({
        backgroundColor:"#576c89",
        height:2,
        bottom:0
    });

    var tableHeader = Ti.UI.createView({
        backgroundColor:"#e2e7ed",
        width:320,
        height:60
    });

    tableHeader.add(border);

    var arrow = Ti.UI.createView({
        backgroundImage:"/images/blueArrow.png",
        width:23,
        height:60,
        bottom:10,
        left:20
    });

    var statusLabel = Ti.UI.createLabel({
        text:"Pull down to refresh...",
        left:55,
        width:200,
        bottom:30,
        height:"auto",
        color:"#576c89",
        textAlign:"center",
        font:{fontSize:13,fontWeight:"bold"},
        shadowColor:"#999",
        shadowOffset:{x:0,y:1}
    });

    var lastUpdatedLabel = Ti.UI.createLabel({
        text:"Last Updated: " + Date.today().toString("M/d/yy"),
        left:55,
        width:200,
        bottom:15,
        height:"auto",
        color:"#576c89",
        textAlign:"center",
        font:{fontSize:12},
        shadowColor:"#999",
        shadowOffset:{x:0,y:1}
    });

    var actInd = Titanium.UI.createActivityIndicator({
        style:Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        left:20,
        bottom:13,
        width:30,
        height:30
    });

    tableHeader.add(arrow);
    tableHeader.add(statusLabel);
    tableHeader.add(lastUpdatedLabel);
    tableHeader.add(actInd);

    tableView.headerPullView = tableHeader;

    var loading = false;
    var pulling = false;

    tableView.endLoading = function() {
        lastUpdatedLabel.text = "Last Updated: " + Date.today().toString("M/d/yy");
        statusLabel.text = "Pull down to update...";
        actInd.hide();
        arrow.show();
        loading = false;
				tableView.setContentInsets({top:0}, {animated:true});
        //tableView.scrollToTop(0);
    };

    tableView.beginLoading = function() {
				tableView.setContentInsets({top:65}, {animated:true});
        //tableView.scrollToTop(-65);
        loading = true;
        pulling = false;
        arrow.hide();
        actInd.show();
        statusLabel.text = "Updating...";
        arrow.transform = Ti.UI.create2DMatrix();
        if (beginLoading) {
            beginLoading(tableView.endLoading);
        } else {
            tableView.endLoading();
        }
    };

    tableView.addEventListener('scroll', function(e) {
        if (e.source === tableView) {
            var offset = e.contentOffset.y;
            //Ti.API.info("scroll y offset = "+offset + " dragging = "+e.dragging + " loading="+loading);
            if (!loading) {
							var t;
                if (!pulling && offset <= -65.0) {
                    pulling = true;
                    t = Ti.UI.create2DMatrix();
                    t = t.rotate(-180);
                    arrow.animate({transform:t,duration:50});
                    statusLabel.text = "Release to update...";
                }
                else if (pulling && offset > -65.0 && offset < 0) {
                    pulling = false;
                    t = Ti.UI.create2DMatrix();
                    arrow.animate({transform:t,duration:50});
                    statusLabel.text = "Pull down to update...";
                }
            }
            if (loading) {
                //tableView.setContentInsets({top:65}, {animated:false});
                tableView.scrollToTop(-65, {animated:true});
            }
        }
    });

    tableView.addEventListener('scrollEnd', function(e) {
        if (e.source === tableView) {
            var offset = e.contentOffset.y;
            //Ti.API.info("!scrollEnd y offset = "+offset);
            if (pulling && !loading && offset <= -65.0) {
                tableView.beginLoading();
            }
        }
    });
};
