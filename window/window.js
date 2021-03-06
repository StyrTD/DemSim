winIni = {
    "constHeight"   : window.innerHeight,
    "constWidth"    : window.innerWidth,
    "mouseRelation" : [1, 1]
}
//Building Functions
//---------------------------------------------------------------
function createNavBar(imp){
    var win           = callWin();                          //Define Win
    var nav           = document.createElement("div");
        nav.id        = "windowNav";
        //Title
        var title           = document.createElement("h1");
            title.id        = "windowNavTitle";
            title.innerHTML = imp.dlg.title;
                var ver     = document.createElement("sub");
                    ver.setAttribute("class", "ver");
                    ver.innerHTML   =   imp.ver;
                    title.appendChild(ver);
            nav.appendChild(title);
        //Menu
        var menu            = document.createElement("div");
            menu.id         = "menuBarContainer";
            menu.style.left = win.width - 55;
            menu.style.top  = 5;
            menu.setAttribute("class", "WindowResizeSensitive");
                var bar1    = document.createElement("div");
                    bar1.setAttribute("class", "menuBar1");
                var bar2    = document.createElement("div");
                    bar2.setAttribute("class", "menuBar2");
                var bar3    = document.createElement("div");
                    bar3.setAttribute("class", "menuBar3");
            menu.appendChild(bar1);
            menu.appendChild(bar2);
            menu.appendChild(bar3);
            menu.setAttribute("onclick", "slideMenuBar(this)");
            menu.setAttribute("ontouch", "slideMenuBar(this)"); //Mobile support
            nav.appendChild(menu);
    document.body.appendChild(nav);
    document.body.setAttribute("onresize", "resizeEvent(imp)");

}

function createFootBar(imp){
    var foot          = document.createElement("div");
        foot.id        = "windowFoot";
        var footer           = document.createElement("sub");
            footer.id        = "windowFooter";
            footer.innerHTML = "<a href='LICENSE'>© Till Diegeler 2017 - 2018</a>";
            foot.appendChild(footer);
    document.body.appendChild(foot);
}
function createWindow(imp, parent){
    if(parent === undefined){var parent = document;}    //Undefined Ini
    imp.setAttribute("class", "window");
    imp.style.zIndex = "1";
    //Clicking Bar
        imp.style.backgroundColor = "#fff";
        imp.setAttribute("onclick", "windowHover(this)");
        var bar = document.createElement("div");
        bar.setAttribute("class", "windowTitle");
        bar.id = imp.id + "_title";
        bar.style.zIndex = "1";
        if(imp.title === undefined){
            bar.innerHTML = imp.id;
        } else {
            bar.innerHTML = imp.title;
        }
        bar.draggable = true;
        bar.setAttribute("ondragstart", "WindowDragStart(this)");
        bar.setAttribute("ondrag", "WindowDrag(event, " + imp.id + ")");
        bar.setAttribute("ontouchmove", "WindowDrag(event, " + imp.id + ")");   //Mobile support
        bar.setAttribute("ondragend", "WindowDragEnd(event, " + imp.id + ")");
        bar.setAttribute("ontouchend", "WindowDragEnd(event, " + imp.id + ")"); //Mobile support
        imp.appendChild(bar);
    //Inner Box
    var box = document.createElement("div");
        box.setAttribute("class", "windowBox");
        box.id = imp.id + "_box";
        box.style.zIndex = "0";
        imp.appendChild(box);
    parent.appendChild(imp);
}

// Event handlers
// ---------------------------------------------------------------------------------
function WindowDragStart(imp){
        imp = imp.parentElement;    //Face parent div
        console.log(imp.style.zIndex);
        //Transparent all other windows
        for (var i = 0; i < document.getElementsByClassName("window").length; i++){
            document.getElementsByClassName("window")[i].style.opacity = 0.5;
            imp.style.opacity = 1;
        }
        //Get all zIndexes and set the hovered to highest
        for (var i = 0; i < document.getElementsByClassName("window").length; i++){
            console.log("if " + document.getElementsByClassName("window")[i].style.zIndex + " >= " + imp.style.zIndex);
            if(parseInt(document.getElementsByClassName("window")[i].style.zIndex) >= parseInt(imp.style.zIndex)){
                imp.style.zIndex = parseInt(document.getElementsByClassName("window")[i].style.zIndex) + 1;
            }
        }

        var transX = imp.style.transform.match(/translateX\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);         //Get x-value of transform()
        var transY = imp.style.transform.match(/translateY\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);         //Get y-value of transform()
        transX = transX[1].substr(0, transX[1].length - transX[2].length).trim(); //value - px
        transY = transY[1].substr(0, transY[1].length - transY[2].length).trim(); //value - px
        //Set relative mouse position
        try{        //Opera, Chrome, IE
            var mouseX = window.event.clientX;
            var mouseY = window.event.clientY;
        }
        catch(err){//Firefox
            var mouseX = mouseEvent.clientX;
            var mouseY = mouseEvent.clientY;
        }
        winIni.mouseRelation[0] = mouseX - transX; //Relative x Position of mouse
        winIni.mouseRelation[1] = mouseY - transY; //Relative x Position of mouse
    } 
function WindowDrag(ev, imp){
    //Get Object
    var obj = document.getElementById(imp.id);
        var transX = imp.style.transform.match(/translateX\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);         //Get x-value of transform()
        var transY = imp.style.transform.match(/translateY\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);         //Get y-value of transform()
    //Routine if ungiven
    if(transX === null){
        var transX = ["0px", "0px", "px"];
    }
    if(transY === null){
        var transY = ["0px", "0px", "px"];
    }

    transX = transX[1].substr(0, transX[1].length - transX[2].length).trim(); //value - px
    transY = transY[1].substr(0, transY[1].length - transY[2].length).trim(); //value - px

    var pos = obj.getBoundingClientRect();
        //Set relative mouse position
        try{        //Opera, Chrome, IE
            var mouseX = window.event.clientX;
            var mouseY = window.event.clientY;
        }
        catch(err){//Firefox
            var mouseX = mouseEvent.clientX;
            var mouseY = mouseEvent.clientY;
        }
    var posX = pos.left - transX; //Original x Position
    var posY = pos.top - transY; //Original y Position
    var moveX = Math.round((mouseX - posX - winIni.mouseRelation[0]));
    var moveY = Math.round((mouseY - posY - winIni.mouseRelation[1]));
    var translateX = "translateX(" + moveX + "px ) ";
    var translateY = "translateY(" + moveY + "px)";
    imp.style.transform = translateX + translateY;
}
function WindowDragEnd(ev, imp){
    ev.preventDefault();
    var obj = document.getElementById(imp.id);
        //De-Transparent all other windows
        for (var i = 0; i < document.getElementsByClassName("window").length; i++){
            document.getElementsByClassName("window")[i].style.opacity = 1;
        }
    var transX = imp.parentElement.style.transform.match(/translateX\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);
    var transY = imp.parentElement.style.transform.match(/translateY\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);
    if(transX === null){
        var transX = ["0px", "0px", "px"];
    }
    if(transY === null){
        var transY = ["0px", "0px", "px"];
    }
    transX = transX[1].substr(0, transX[1].length - transX[2].length).trim();
    transY = transY[1].substr(0, transY[1].length - transY[2].length).trim();
    var pos = obj.getBoundingClientRect();
        //Set relative mouse position
        try{        //Opera, Chrome, IE
            var mouseX = window.event.clientX;
            var mouseY = window.event.clientY;
        }
        catch(err){//Firefox
            var mouseX = mouseEvent.clientX;
            var mouseY = mouseEvent.clientY;
        }
    var posX = pos.left - transX;
    var posY = pos.top - transY;
    var moveX = Math.round((mouseX - posX - winIni.mouseRelation[0]));
    var moveY = Math.round((mouseY - posY - winIni.mouseRelation[1]));
    var translateX = "translateX(" + parseInt(moveX - winIni.mouseRelation[0]) + "px ) ";
    var translateY = "translateY(" + parseInt(moveY - winIni.mouseRelation[1]) + "px)";
    winIni.mouseRelation = [1, 1];
    imp.style.transform = translateX + translateY;
}

console.log(winIni.mouseRelation);
function callWin(){
    win = {
      "height"    : window.innerHeight,
      "width"     : window.innerWidth,
      "ini"       : {
            "constHeight": winIni.constHeight,
            "constWidth": winIni.constWidth
      }
    }
    winIni = {
        "constHeight"   : window.innerHeight,
        "constWidth"    : window.innerWidth,
        "mouseRelation" : [1, 1]
    }
    return(win);
}
function resizeEvent(imp){
    var win             = callWin();
    for (var i = 0; i < document.getElementsByClassName("WindowResizeSensitive").length; i++){
        console.log(win.width);
        document.getElementsByClassName("WindowResizeSensitive")[i].style.left = document.getElementsByClassName("WindowResizeSensitive")[i].style.left.substr(0, (document.getElementsByClassName("WindowResizeSensitive")[i].style.left.length - 2)) - win.ini.constWidth + win.width;
    }
    console.log(win);
}

function slideMenuBar(imp){
    imp.classList.toggle("change");
}
function windowHover(imp){
    for (var i = 0; i < document.getElementsByClassName("window").length; i++){
        document.getElementsByClassName("window")[i].style.zIndex = 0;
    }
        imp.style.zIndex = 1;
}

