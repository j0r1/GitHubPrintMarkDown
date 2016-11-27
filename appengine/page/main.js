function main()
{
    // Cannot get the github url directly (cross origin issues), so the
    // python code in the appengine project retrieves it and forwards
    // the result
    var url = "/javascriptcode.js";

    if (document.location.hostname == "localhost") // for debugging purposes
        url = "https://raw.githubusercontent.com/j0r1/GitHubPrintMarkDown/master/javascriptcode.js";
    
    var responseFunction = function(data)
    {
        console.log(data);
        $("#bookmarkletcode").html(data);

        var javascriptPrefix = "javascript:";
        if (data.substr(0, javascriptPrefix.length) == javascriptPrefix)
            data = data.substr(javascriptPrefix.length);

        var elem = $("#bookmarklet");
        elem.attr("href", "javascript:" + encodeURIComponent(data));

        $("#loadingdiv").hide();
        $("#bookmarkletdiv").show();
    };

    $.get(url, responseFunction);
}

