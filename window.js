function createNavBar(imp){
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
            nav.appendChild(menu);
    document.body.appendChild(nav);

}
function slideMenuBar(imp){
    imp.classList.toggle("change");
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
    //Clicking Bar
        imp.style.backgroundColor = "#fff";
        var bar = document.createElement("div");
        bar.setAttribute("class", "windowTitle");
        bar.id = imp.id + "_title";
        bar.style.zIndex = "1";
        bar.innerHTML = imp.id;
        bar.draggable = true;
        bar.setAttribute("ondrag", "WindowDrag(event, " + imp.id + ")");
        bar.setAttribute("ondragend", "WindowDragEnd(event, " + imp.id + ")");
        imp.appendChild(bar);
    //Inner Box
    var box = document.createElement("div");
        box.setAttribute("class", "windowBox");
        box.id = imp.id + "_box";
        box.style.zIndex = "0";
        imp.appendChild(box);
    parent.appendChild(imp);
}
function WindowDrag(ev, imp){
    ev.preventDefault();
    var obj = document.getElementById(imp.id);
    if(imp === undefined){
        obj.setAttribute("zIndex", obj.style.zIndex);
    }
    obj.style.zIndex = 9000;
    var transX = imp.style.transform.match(/translateX\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);
    var transY = imp.style.transform.match(/translateY\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);
    if(transX === null){
        var transX = ["0px", "0px", "px"];
    }
    if(transY === null){
        var transY = ["0px", "0px", "px"];
    }
    transX = transX[1].substr(0, transX[1].length - transX[2].length).trim();
    transY = transY[1].substr(0, transY[1].length - transY[2].length).trim();
    var pos = obj.getBoundingClientRect();
    var mouseX = window.event.clientX;
    var mouseY = window.event.clientY;
    var posX = pos.left + (pos.right - pos.left) / 2 - transX;
    var posY = pos.top - transY;
    var moveX = Math.round((mouseX - posX));
    var moveY = Math.round((mouseY - posY));
    var translateX = "translateX(" + moveX + "px ) ";
    var translateY = "translateY(" + moveY + "px)";
    imp.style.transform = translateX + translateY;
}
function WindowDragEnd(ev, imp){
    ev.preventDefault();
    var obj = document.getElementById(imp.id);
    console.log(obj.zIndex);
    obj.style.zIndex = parseInt(obj.getAttribute("zIndex")) + 1;
    obj.removeAttribute("zIndex");
    var transX = imp.style.transform.match(/translateX\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);
    var transY = imp.style.transform.match(/translateY\(([0-9]+(px|em|%|ex|ch|rem|vh|vw|vmin|vmax|mm|cm|in|pt|pc))\)/);
    if(transX === null){
        var transX = ["0px", "0px", "px"];
    }
    if(transY === null){
        var transY = ["0px", "0px", "px"];
    }
    transX = transX[1].substr(0, transX[1].length - transX[2].length).trim();
    transY = transY[1].substr(0, transY[1].length - transY[2].length).trim();
    var pos = obj.getBoundingClientRect();
    var mouseX = window.event.clientX;
    var mouseY = window.event.clientY;
    var posX = pos.left + (pos.right - pos.left) / 2 - transX;
    var posY = pos.top - transY;
    console.log(mouseX);
    console.log(posX + "-" + transX);
    var moveX = Math.round(mouseX - (posX - transX));
    var moveY = Math.round(mouseY - (posY - transY));
    var translateX = "translateX(" + moveX + "px ) ";
    var translateY = "translateY(" + moveY + "px)";
    imp.style.transform = translateX + translateY;
}