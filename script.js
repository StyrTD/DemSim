 //Variablen
 //---------------------------------------------------------------------------------------------------------
 var pop = [
	680000,
	590000,
	510000,
	498000,
	480000,
	490000,
	500000,
	580000,
	620000,
	680000,
	700000,
	720000,
	760000,
	760000,
	760000,
	700000,
	700000,
	700000,
	700000,
	700000,
	850000,
	800000,
	800000,
	600000,
	900000,
	800000,
	950000,
	1230000,
	1100000,
	1000000,
	1080000,
	1000000,
	1010000,
	1090000,
	1010000,
	1280000,
	1510000,
	1810000,
	1970000,
	1850000,
	1610000,
	1400000,
	1300000,
	1250000,
	1110000,
	1100000,
	1170000,
	1000000,
	1020000,
	1170000,
	850000,
	760000,
	840000,
	850000,
	800000,
	760000,
	600000,
	550000,
	400000,
	300000,
	450000,
	500000,
	600000,
	630000,
	700000,
	660000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	500000,
	500000,
	500000,
	500000,
	500000,
	500000,
	300000,
	250000,
	250000,
	200000,
	200000,
	200000,
	200000,
	200000,
	200000,
	100000,
	11000,
	80000,
	50000,
	30000,
	20000,
	20000,
	50000
];
var name = "Gierningen";
var svg = document.getElementById("graph");
var svgNS = svg.namespaceURI;
var startButton = document.getElementById("start");
var imp = {
    "pop": pop,
    "name": name,
    "year": 2014,
    "area": 475442,
    "dieRate": 0,
    "birthRate": 0,
    "html": {
        "svg": svg,
        "svgNS": svgNS
    },
    "lifeExp": "75",
    "totalPop": 0
}
console.log(imp);
//Vorberechnung
//---------------------------------------------------------------------------------------------------------
function rowSum(x, span) { //Summiert Arrays 
    var y = PrepOneDimensionalArray(Math.ceil(x.length / span));
    var xSet = x.length - 1; //Convert to array system
    var index;
    for (var i = 0; i * span < x.length; i++) {
        for (var j = 0; j < span; j++) {
            index = (i * span) + j;
            if (index > xSet) {
                return (y);
            }
            y[i] = y[i] + x[index];
        }
    }
    return (y);
}
function SumTwoDimensionalArray(x) { //Sums two-dimensional arrays
    var y = 0;
    for(var i = 0; i < MeasureTwoDimensionLength(x)[0]; i++){
        for(var j = 0; j < MeasureTwoDimensionLength(x)[1]; j++){
            y = y + x[i][j];
        }
    }
    return(y);
}

function rowMove(x, span, solidLength) { //Moves an array cluster by span
    if (solidLength === true) {
        var y = PrepOneDimensionalArray(x.length);
    } else {
        var y = PrepOneDimensionalArray(x.length + span);
    }
}

function PrepOneDimensionalArray(num) { //Prepares an empty array
    var y = []; //Output
    for (var i = 0; i < num; i++) {
        y[i] = 0;
    }
    return (y);
}

function PrepTwoDimensionalArray(num, col) { //Prepares an empty two-dimensional array
    var y = []; //Output
    for (var i = 0; i < num; i++) {
        y[i] = [];
    }
    for (var i = 0; i < num; i++) {
        for (var j = 0; j < col; j++) {
            y[i][j] = 0;
        }
    }
    return (y);
}

function MaxArrayValue(x, num) { //Detects the object within an array with the highest number
    var max = 0; //Initiate maximum value
    if(num == 2){   //Two-dimensional routine
        for (var i = 0; i < (MeasureTwoDimensionLength(x)[0]); i++) {
        for (var j = 0; j < (MeasureTwoDimensionLength(x)[1]); j++) {
            if (x[i][j] > max) {
                max = x[i][j];
                maxDex = [i, j];
            }
        }
        }
    } else {        //one-dimensional, default.
        var maxDex = 0; //Index and output
        for (var i = 0; i < x.length; i++) {
            if (x[i] > max) {
               max = x[i];
              maxDex = i;
            }
        }
    }
    return (maxDex);
}

function MeasureTwoDimensionLength(x){
    var oneD = 0;
    var twoD = 0;
    //Anti-Zero
    /*
    for(var i = 0; x[i][0] === undefined; i++){
        for (var j = 0; x[i][j] === undefined; j++){
            x[i][j] = 0;
        }
    }
    */
    try{
     for(var i = 0; x[i][0] !== undefined; i++){
            oneD = oneD + 1;
        }
    }
    catch(err){}

     for(var i = 0; x[0][i] !== undefined; i++){
         twoD = twoD + 1;
     }

    out = [oneD, twoD];
    return(out);
}
function PopGenderer(pop) {
    var out = PrepTwoDimensionalArray(pop.length, 2);
    for (var i = 0; i < pop.length; i++) {
        out[i][0] = (pop[i] / 2);
        out[i][1] = (pop[i] / 2);
    }
    return(out);
}

function PopAger(pop, age) { //Requires two-dimensional array!
    var length1 = MeasureTwoDimensionLength(pop)[0];
    var length2 = MeasureTwoDimensionLength(pop)[1];
    var out = PrepTwoDimensionalArray(length1, length2);
    for(i = 0; i < length1; i++){
        for(j = 0; j < length2; j++){
            if((i + 1) >= (length1 - age)){
                    out[length1-1][j] = out[length1-1][j] + pop[i][j];
            } else {
            out[i+age][j] = pop[i][j];
            }
        }
    }
    return(out);
}

function BirthRateSlideWatch(imp) { //Requires two-dimensional array!
    var range = document.getElementById("BirthRateRange");
    var rangeIntro = document.getElementById("BirthRateRangeIntro");
    imp.birthRate = range.value;
    rangeIntro.innerHTML = ("Geburtenrate: " + imp.birthRate);
    return(imp);
}

function DieRateSlideWatch(imp) { //Requires two-dimensional array!
    var range = document.getElementById("DieRateRange");
    var rangeIntro = document.getElementById("DieRateRangeIntro");
    imp.dieRate = range.value;
    rangeIntro.innerHTML = ("Sterberate: " + imp.dieRate);
    return(imp);
}

function FormatNum(x) {
    var x = String(x).split("");
    for (var i = 1; i < (x.length+1); i++){
        if(i % 3 == 0){
            x[x.length - (i+1)] = x[x.length - (i+1)] + ".";
        }
    }
    x = x.join("");
    return(x);
}

function runSVG(imp) { //Grafische Initialisierung
    //Processing absolute height
    var ridge = imp.html.svg.getElementById("ridge");                         //Detect Ridge ID
    console.log(imp.html.svg.style.width);
    var y1 = parseInt(ridge.getAttributeNS(null, "y1"));                 //Y1 Coordinate
    var y2 = parseInt(ridge.getAttributeNS(null, "y2"));                 //Y2 Coordinate
    var yLength = Math.abs(y2 - y1);                                     //Y1-Y2 distance
                                                                         //MaxArray
    var max1 = MaxArrayValue(imp.pop, 2)[0];
    var max2 = MaxArrayValue(imp.pop, 2)[1];
    var max = imp.pop[max1][max2];
    
        
    var rowSpan = yLength / MeasureTwoDimensionLength(imp.pop)[0];       //Average distance between two Y coordinates of dots
    var colSpan = 100 / max;                                             //Column factor


    //DRAW
    var xSet = MeasureTwoDimensionLength(imp.pop)[0] - 1;                //Convert to array system

    //MALE GRAPH
        //Check if Graph exists
        var checkDemoGraphM = imp.html.svg.getElementById("DemoGraphM");

        if (checkDemoGraphM === null) {
            var line = document.createElementNS(imp.html.svgNS, 'path');     //Create new if inexistent
        } else {
            var line = imp.html.svg.getElementById("DemoGraphM");             //Else: Overwrite.
        }

    
    var d = 'M' + 100 + ' ' + 300 + '  L' + 100 + ' ' + 300 + ' ';      //Starting point: Move to (100|300) and begin to draw a line there.
    for (var i = 0; i <= xSet; i++) {
        d = d + "L" + (100 - imp.pop[i][0] * colSpan) + " " + ((xSet - i+1) * rowSpan + ' ');    //(100 - pop * colSpan | height * rowSpan)
    }
    d = d + 'L 100 0 Z';                                                //EOL
    line.setAttribute('d', d);                                          //Path
    line.setAttribute('id', 'DemoGraphM');                              //ID
    line.setAttribute('stroke', '#95B3D7');                             //Color
    line.setAttribute('stroke-width', '2px');                           //Width
    line.setAttribute('fill', '#B5D3F7');                               //Filling
    if (checkDemoGraphM === null) {                                     //Check if new graph
        svg.appendChild(line);
        console.log("New male graph created.");
    }
    //FEMALE GRAPH
        //Check if Graph exists
        var checkDemoGraphF = imp.html.svg.getElementById("DemoGraphF");
    
            if (checkDemoGraphF === null) {
                var line = document.createElementNS(imp.html.svgNS, 'path'); //Create new if inexistent
            } else {
                var line = imp.html.svg.getElementById("DemoGraphF");        //Else: Overwrite.
            }
    var d = 'M' + 100 + ' ' + 300 + '  L' + 100 + ' ' + 300 + ' ';      //Starting point: Move to (100|300) and begin to draw a line there. 
    for (var i = 0; i <= xSet; i++) {
        d = d + "L" + (100 + imp.pop[i][1] * colSpan) + " " + ((xSet - i+1) * rowSpan + ' ');    //(100 + pop * colSpan | height * rowSpan)
    }
    d = d + 'L 100 0 Z';                                                //EOL
    line.setAttribute('d', d);                                          //Path
    line.setAttribute('id', 'DemoGraphF');                              //ID
    line.setAttribute('stroke', '#cc0066');                             //Color
    line.setAttribute('stroke-width', '2px');                           //Width
    line.setAttribute('fill', '#ff99cc');                               //Filling
    if (checkDemoGraphF === null) {                                     //Check if new graph
        svg.appendChild(line);
        console.log("New female graph created.");
    }
    //BODY
        //Visible ridge
            //Check if Graph exists
            var checkVisRidge = imp.html.svg.getElementById("VisRidge");
        
                if (checkVisRidge === null) {
                    var line = document.createElementNS(imp.html.svgNS, 'line'); //Create new if inexistent
                } else {
                    var line = imp.html.svg.getElementById("VisRidge");          //Else: Overwrite.
                }
                line.setAttribute('x1', 100);
                line.setAttribute('x2', 100);
                line.setAttribute('y1', 0);
                line.setAttribute('y2', 300);
                line.setAttribute('id', 'VisRidge');
                line.setAttribute('stroke', '#333');
                line.setAttribute('stroke-width', '2px');
                if (checkVisRidge === null) {                              //Check if new graph
                    svg.appendChild(line);
                    console.log("New ridge created.");
                }
}
function DieSim(imp, round) {
    //Old value: 1.0825
    const DeathConst = 1.100694; //b ^ 120 = 100000
        for(var i = 0; i < 100; i++){
            imp.pop[i][0] = Math.round(imp.pop[i][0] * (1 - ((imp.dieRate ) * Math.pow((DeathConst) , i)/100000)));
            imp.pop[i][1] = Math.round(imp.pop[i][1] * (1 - ((imp.dieRate * Math.pow((DeathConst) , i)/100000))));
            if (imp.pop[i][0] < 0){
                imp.pop [i][0] = 0;
            }
            if (imp.pop[i][1] < 0){
                imp.pop [i][1] = 0;
            }
        }
    imp.pop[100][0] = Math.round(imp.pop[100][0] * (1 - (imp.dieRate * Math.pow((DeathConst) , 106)/100000)));
    imp.pop[100][1] = Math.round(imp.pop[100][1] * (1 - (imp.dieRate * Math.pow((DeathConst) , 106)/100000)));
    if (imp.pop[100][0] < 0){
        imp.pop [100][0] = 0;
    }
    if (imp.pop[100][1] < 0){
        imp.pop [100][1] = 0;
    }
    return(imp.pop);
}
function BirthSim(imp, round){
    var mothers = 0;
    for (var i = 20; i < 42; i++) {
        mothers += imp.pop[i][1];
    }
    imp.pop[0][0] += Math.floor(mothers * 1.05 * imp.birthRate / (44));
    imp.pop[0][1] += Math.floor(mothers * (1/1.05) * imp.birthRate / (44));
    console.log(imp);
    return(imp.pop);
}
function runInterface(imp) {
    runSVG(imp);
    console.log(imp);
    //Define Elements
    var intYear     = document.getElementById("interfaceYear");
    var intTotalPop = document.getElementById("interfaceTotalPop"); 

    //Changes
    intYear.innerHTML       = imp.year;
    intTotalPop.innerHTML   = FormatNum(imp.totalPop);

}
function startSim(imp) {
    console.log("%cDemSim has been started.", "background: #44f; color: #fff; padding: 3px; border-radius: 5px;");
    //Fetch Input Values
    imp.name        = document.getElementsByName("name")[0].value;      //Name
    imp.area        = document.getElementsByName("area")[0].value;      //Area
    imp.birthRate   = document.getElementsByName("birthRate")[0].value; //Birth Rate
    imp.dieRate     = document.getElementsByName("dieRate")[0].value;   //Die Rate
    imp.lifeExp     = document.getElementsByName("lifeExp")[0].value;   //Life Expectancy
    //Delete old field
    var input = document.getElementById("input");
    input.parentNode.removeChild(input);
    //Build Interface
    var interface = document.createElement("div");
    interface.id = "interface";
    createWindow(interface, document.body);
    //Build GraphWindow
    var graphWindow = document.createElement("div");
        graphWindow.id = "graphWindow";
        createWindow(graphWindow, document.body);
        var graph = document.getElementById("graph");
        graph.parentNode.removeChild(graph);
        document.getElementById("graphWindow").appendChild(graph);
    //Name Display
    var interfaceName = document.createElement("h2");
    interfaceName.id = "interfaceName";
    interfaceName.innerHTML = imp.name;
    interface.appendChild(interfaceName);
    //Year Display
    var interfaceYear = document.createElement("h5");
    interfaceYear.id = "interfaceYear";
    interfaceYear.innerHTML = imp.year;
    interface.appendChild(interfaceYear);
    //Population Display
    var interfaceTotalPop = document.createElement("h3");
    interfaceTotalPop.id = "interfaceTotalPop";
    interfaceTotalPop.innerHTML = FormatNum(imp.totalPop);
    interface.appendChild(interfaceTotalPop);
    //Range bars
    var rangeBar = document.createElement("div");
        rangeBar.id = "rangeBar";
        interface.appendChild(rangeBar);
        //Birth rate
        var BirthRateRangeIntro            = document.createElement("p");
            BirthRateRangeIntro.id         = "BirthRateRangeIntro";
            BirthRateRangeIntro.innerHTML  = "Geburtenrate: " + imp.birthRate;
            rangeBar.appendChild(BirthRateRangeIntro);
        var BirthRateRange      = document.createElement("input");
            BirthRateRange.id   = "BirthRateRange";
            BirthRateRange.setAttribute("class", "shortRange");
            BirthRateRange.setAttribute("type", "range");
            BirthRateRange.setAttribute("max", "11");
            BirthRateRange.setAttribute("min", "0");
            BirthRateRange.setAttribute("step", "0.05");
            BirthRateRange.setAttribute("oninput", "BirthRateSlideWatch(imp)");
            rangeBar.appendChild(BirthRateRange);
        //Birth rate
        var DieRateRangeIntro            = document.createElement("p");
            DieRateRangeIntro.id         = "DieRateRangeIntro";
            DieRateRangeIntro.innerHTML  = "Sterberate: " + imp.birthRate;
            rangeBar.appendChild(DieRateRangeIntro);
        var DieRateRange      = document.createElement("input");
            DieRateRange.id   = "DieRateRange";
            DieRateRange.setAttribute("class", "shortRange");
            DieRateRange.setAttribute("type", "range");
            DieRateRange.setAttribute("max", "11");
            DieRateRange.setAttribute("min", "0");
            DieRateRange.setAttribute("step", "0.05");
            DieRateRange.setAttribute("oninput", "DieRateSlideWatch(imp)");
            rangeBar.appendChild(DieRateRange);
    //Button bar
    var buttonBar = document.createElement("div");
        buttonBar.id = "buttonBar";
        interface.appendChild(buttonBar);
        //1 year
        var Year1Button = document.createElement("button");
            Year1Button.id = "Year1Button";
            Year1Button.setAttribute("class", "YearButton");
            Year1Button.setAttribute("onclick", "YearSim(imp, 1)");
            Year1Button.innerHTML = "1 Jahr";
        buttonBar.appendChild(Year1Button);
        //5 year
        var Year5Button = document.createElement("button");
            Year5Button.id = "Year5Button";
            Year5Button.setAttribute("class", "YearButton");
            Year5Button.setAttribute("onclick", "YearSim(imp, 5)");
            Year5Button.innerHTML = "5 Jahre";
        buttonBar.appendChild(Year5Button);
        //10 year
        var Year10Button = document.createElement("button");
            Year10Button.id = "Year10Button";
            Year10Button.setAttribute("class", "YearButton");
            Year10Button.setAttribute("onclick", "YearSim(imp, 10)");
            Year10Button.innerHTML = "10 Jahre";
        buttonBar.appendChild(Year10Button);
    //Exec Graph
    runSVG(imp);
}

function YearSim(imp, round){
    console.log("Rounds:" + round);
    imp.year = imp.year + round;
    for(var i = 0; i < round; i++){
    imp.pop = PopAger(imp.pop, 1);
    imp.totalPop = SumTwoDimensionalArray(imp.pop);
    imp.pop = DieSim(imp, round);
    imp.pop = BirthSim(imp, round);
    }
    console.log("Die done.");
    runInterface(imp);
}

//-----------------------------------------------------------------------------------------------------------------------------------------
//VarCheck
    //Check Pop
    if (imp.pop[0][0] === undefined) {
        imp.pop =  PopGenderer(imp.pop),
        imp.totalPop = SumTwoDimensionalArray(imp.pop);
    }
//Build
var graph = document.createElement("graph");
graph.id = "graph";
graph.height = 300;
graph.width = 200;
document.body.appendChild(graph);
//-----------------------------------------------------------------------------------------------------------------------------------------
startButton.addEventListener("click", null, startSim);