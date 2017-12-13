function createWindow(imp, parent){
    //Undefined Ini
    if(parent === undefined){var parent = document;}
    //imp.setAttribute("draggable", "true");
    imp.setAttribute("class", "window");
    parent.appendChild(imp);
    var bar = document.createElement("div");
        bar.setAttribute("class", "windowTitle");
        bar.id = imp.id + "_title";
        bar.innerHTML = imp.id;
        bar.draggable = true;
        bar.setAttribute("ondrag", "WindowDrag(event, " + imp.id + ")");
        bar.setAttribute("ondragend", "WindowDragEnd(event, " + imp.id + ")");
        imp.appendChild(bar);
}
function WindowDrag(ev, imp){
    ev.preventDefault();
    var obj = document.getElementById(imp.id);
    obj.style.zIndex = 9000;
    obj.style.backgroundColor = "#fff";
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
    obj.style.zIndex = 9000;
    obj.style.backgroundColor = "#fff";
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