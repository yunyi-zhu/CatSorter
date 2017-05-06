var input;
var table;
var w;
var h;
var buttons;
var catnames;
catnames= ['AustralianMist', 'AmericanShorthair', 'OjosAzules', 'Ragamuffin', 'MaineCoon', 'Highlander', 'ScottishFold', 'Chantilly', 'SelkirkRex', 'Siberian', 'Bengal', 'Donskoy', 'OrientalShorthair', 'NorwegianForest', 'Somali', 'CaliforniaSpangled', 'JapaneseBobtail', 'EgyptianMau', 'Himalayan', 'Laperm', 'Balinese', 'AmericanBobtail', 'CornishRex', 'Sokoke', 'EuropeanBurmese', 'Peterbald', 'Ragdoll', 'DevonRex', 'HavanaBrown', 'BritishShorthair', 'Serengeti', 'GermanRex', 'Snowshoe', 'Cymric', 'TurkishAngora', 'EuropeanShorthair', 'Chartreux', 'Singapura', 'AmericanWirehair', 'Toyger', 'Tonkinese', 'Manx', 'KurilianBobtail', 'TurkishVan', 'Nebelung', 'Burmese', 'YorkChocolate', 'RussianBlue', 'Abyssinian', 'Korats', 'Tiffanie', 'Birman', 'SiameseTraditional', 'ChineseLiHuaMao', 'OrientalLonghair', 'ExoticShorthair', 'Javanese', 'ColorpointShorthair', 'Savannah', 'Pixie-Bob', 'Chausie', 'BritishLonghair', 'Munchkin', 'Burmilla', 'Ocicat', 'Minskin', 'Persian', 'Sphynx', 'SiameseModern', 'Bombay', 'AmericanCurl']
//catnames = ['Abyssinian','AmericanBobtail','AmericanCurl','AmericanShorthair','AmericanWirehair','AustralianMist','Balinese']

var cats = []
var pics = {}
var detailcat = "None"
var sidebarWidth = new SoftFloat(0,0.2,1.5)
var startingpoint
var canvasHeight


function preload(){
  table = loadJSON("data.json")
  catnames.forEach(function(catname){
    pics[catname] = loadImage("pic/"+catname+".jpg")
  })
 
  
}


function setup() {
  createCanvas(windowWidth,4.75*windowHeight)
  noStroke();
  w = windowWidth/100
  h = windowHeight/100;
  canvasHeight = 4.75*windowHeight
  lato = loadFont("Lato-Regular.ttf")
  input = createInput();
  input.position(80*w,5*h);
  buttons = {"size":[new Button(11*w,5*h,"all"),new Button(5*w,10*h,"small"),new Button(11*w,10*h,"medium"),
  new Button(17*w,10*h,"large")], "hair length": [new Button(11*w,15*h,"all"),new Button(5*w,20*h,"short"),
  new Button(11*w,20*h,"medium"), new Button(17*w,20*h,"long")], "shedding":[new Button(11*w,25*h,"all"),
  new Button(5*w,30*h,"minimal"), new Button(11*w,30*h,"seasonal"), new Button(17*w,30*h,"constant")],"Temperament":
 [new Button(11*w,35*h,"all"), new Button(5*w,40*h,"affectionate"), new Button(11*w,40*h,"active"),
  new Button(17*w,40*h,"intelligent"), new Button(5*w, 45*h, "loyal"), new Button(11*w,45*h,"social"),
  new Button(17*w,45*h,"docile"), new Button(5*w,50*h,"gentle"), new Button(11*w,50*h,"playful"), 
  new Button(17*w,50*h,"sweet"), new Button(5*w,55*h,"strong"), new Button(11*w, 55*h,"outgoing"),
  new Button(17*w,55*h,"independent")]}
  
  sidebarWidth.setTarget(22*w)
  catnames.forEach(function(catname){
  cats.push(new Cat(catname))
  })
  
}

function draw() {
  startingpoint = $(window).scrollTop()
  textFont(lato)
  background(240);
  textSize(16);

  fill(80);
  layout();
  drawCat();
  
}





function layout(){
  if (checkSidebar()){
  sidebarWidth.setTarget(22*w)
    drawSidebar();
    drawButtons();
  }else{
    drawSidebar();
    sidebarWidth.setTarget(0) 
  }
  

 
}

function checkSidebar(){
  console.log(startingpoint)
if (startingpoint !=0)
return false
else
return true
}

function drawSidebar(){
  sidebarWidth.update()
fill(250);
rect(0,0,sidebarWidth.value,height);
fill(50)
text("size",5*w,5*h)
text("hair length",5*w,15*h)
text("shedding",5*w,25*h)
text("temper",5*w,35*h)
}


function drawButtons(){
 for (var category in buttons){
   subButtons = buttons[category]
   subButtons.forEach(function(button){
   button.show()
 })
 };
}

function drawCat(){
 if(detailcat!="None"){
 detailcat.showDetails()
 }else{
   var i=0
 tempcats = sortCat()
 tempcats.forEach(function(cat){
 cat.setXY(i)
 cat.show()
 i++
 })
 var hei = map(floor(tempcats.length/4),0,3,25*h,100*h)+25*h
 var prospectHeight = max([windowHeight,hei])
 console.log(prospectHeight,canvasHeight)
 if (prospectHeight-canvasHeight>25*h||prospectHeight-canvasHeight<-25*h){
   "in the loop"
 canvasHeight = prospectHeight
 resizeCanvas(windowWidth,prospectHeight)
 
 }
 }
}

function sortCat(){
  subcats = cats
  for(var category in buttons){
    catcopy = []
    subButtons = buttons[category]
    subButtons.forEach(function(button){
      if(button.on == true){
      subcats.forEach(function(cat){
        if(category in cat.data){
        if(cat.data[category].indexOf(button.word)>=0 && catcopy.indexOf(cat)<0){
        catcopy.push(cat)
      }
        }
      })
      }
    })
    if(!buttons[category][0].on)
    subcats = catcopy
  }
  return subcats
}


function search(){
var inp = input.value()
}

function mouseClicked(){
 toggleButtons()
   cats.forEach(function(cat){
  if (cat.hovered()){
 if(cat==detailcat)
   detailcat = "None"
  else{
    detailcat = cat
    cat.updateLoc()  
}
  }
  })
}

function mousePressed(){
  cats.forEach(function(cat){
  if (cat.hovered()){
  cat.bound.setTarget(190)
  }
  })
}

function mouseReleased(){
  cats.forEach(function(cat){
  if (cat.hovered()){
  cat.bound.setTarget(220)
  }
  })
}

function mouseMoved(){
  cats.forEach(function(cat){
  if (cat.hovered()){
  cat.expand()
  }
  else{
  cat.normal()
  }
  })

}


function toggleButtons(){
for (var category in buttons){
   subButtons = buttons[category]
   count = 0 
   clicked = false
   allclicked = false
   subButtons.forEach(function(button){
   if (button.word!="all"){
     if (button.hovered())
     {clicked = true
     button.toggle()}
   if (button.on)
     count++
   if (allclicked){
   button.on = false
   }
   }
   else{
   if(button.hovered()){
   button.on = true
   allclicked = true
   }
   }
 })
 if (count==0 && clicked){
   buttons[category][0].on = true
   continue
 }
 else if (count !=0 && clicked ){
   buttons[category][0].on = false
   continue
 }
}}