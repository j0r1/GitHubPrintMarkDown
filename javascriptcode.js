javascript:void(
(function() {
    if (document.location.host != "github.com")
    {
        alert("Only works on GitHub");
        return;
    }

    var articles = document.getElementsByTagName("article");
    if (articles.length == 0)
    {
        alert("Couldn't find 'article' tag on the page. Is this a rendered markdown document?");
        return;
    }
    var a = articles[0];

    var newDiv = document.createElement("div");
    var children = [ ];

    console.log("Getting children");
    for (var i = 0 ; i < document.body.children.length ; i++) {
        children[i] = document.body.children[i];
    }

    document.body.appendChild(newDiv);
    console.log("Moving children to new div");
    for (var i = 0 ; i < children.length ; i++) {
        newDiv.appendChild(children[i]);
    }
    
    var origParent = a.parentElement;

    document.body.appendChild(a);
    newDiv.style.display = "none";

    window.print();

    console.log("Restoring original layout");
    origParent.appendChild(a);

    for (var i = 0 ; i < children.length ; i++) {
        document.body.appendChild(children[i]);
    }

    document.body.removeChild(newDiv);
})()
)
