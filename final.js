



var input;
var table;
var w;
var h;
var buttons;
var catnames;
catnames= ['AustralianMist', 'AmericanShorthair', 'OjosAzules', 'Ragamuffin', 'MaineCoon', 'Highlander', 'ScottishFold', 'Chantilly', 'SelkirkRex', 'Siberian', 'Bengal', 'Donskoy', 'OrientalShorthair', 'NorwegianForest', 'Somali', 'CaliforniaSpangled', 'JapaneseBobtail', 'EgyptianMau', 'Himalayan', 'Laperm', 'Balinese', 'AmericanBobtail', 'CornishRex', 'Sokoke', 'EuropeanBurmese', 'Peterbald', 'Ragdoll', 'DevonRex', 'HavanaBrown', 'BritishShorthair', 'Serengeti', 'GermanRex', 'Snowshoe', 'Cymric', 'TurkishAngora', 'EuropeanShorthair', 'Chartreux', 'Singapura', 'AmericanWirehair', 'Toyger', 'Tonkinese', 'Manx', 'KurilianBobtail', 'TurkishVan', 'Nebelung', 'Burmese', 'YorkChocolate', 'RussianBlue', 'Abyssinian', 'Korats', 'Tiffanie', 'Birman', 'SiameseTraditional', 'ChineseLiHuaMao', 'OrientalLonghair', 'ExoticShorthair', 'Javanese', 'ColorpointShorthair', 'Savannah', 'PixieBob', 'Chausie', 'BritishLonghair', 'Munchkin', 'Burmilla', 'Ocicat', 'Minskin', 'Persian', 'Sphynx', 'SiameseModern', 'Bombay', 'AmericanCurl']
//catnames = ['Abyssinian','AmericanBobtail','AmericanCurl','AmericanShorthair','AmericanWirehair','AustralianMist','Balinese']

var cats = []
var pics = {}
var detailcat = "None"
var sidebarWidth = new SoftFloat(0,0.2,1.5)
var sidebarTarget
var startingpoint
var canvasHeight
var light
var lightItalic
var regular
var sidebarText
var creditOn = false
var creditcolor = new SoftFloat(240)
var creditheight
var creditbuttoncolor = new SoftFloat(128)



function preload(){
  table = loadJSON("data.json")
  catnames.forEach(function(catname){
  pics[catname] = loadImage("pic/"+catname+".jpg")
  }) 
  bold = loadFont("fonts/Roboto-Bold.ttf")
  medium = loadFont("fonts/Roboto-Medium.ttf")
  light = loadFont("fonts/Roboto-Light.ttf")
  regular = loadFont("fonts/Roboto-Regular.ttf")
  lightItalic = loadFont("fonts/Roboto-Lightitalic.ttf")
  thin = loadFont("fonts/Roboto-Thin.ttf")

}


function setup() {
  // frameRate(125)
  createCanvas(windowWidth,4.75*windowHeight)
  noStroke();
  w = windowWidth/100
  h = windowHeight/100;
  canvasHeight = 4.75*windowHeight
  sidebarTarget = 20*w
  
  input = createInput();
  input.position(80*w,4*h);

  var startHeight = 24*h
  var buttonFullLength = 16*w
  var gapWidth = 0.3*w
  var startWidth = 2*w
  buttons = {
  "size":[new Button(startWidth,startHeight+5*h,buttonFullLength-gapWidth,"all"),new Button(startWidth,startHeight+8*h,buttonFullLength/3-gapWidth,"small"),new Button(startWidth+buttonFullLength/3,startHeight+8*h,buttonFullLength/3-gapWidth,"medium"),new Button(startWidth+2*buttonFullLength/3,startHeight+8*h,buttonFullLength/3-gapWidth,"large")],
  "hair length": [new Button(startWidth,startHeight+14*h,buttonFullLength-gapWidth,"all"),new Button(startWidth,startHeight+17*h,buttonFullLength/3-gapWidth,"short"),new Button(startWidth+buttonFullLength/3,startHeight+17*h,buttonFullLength/3-gapWidth,"medium"),new Button(startWidth+2*buttonFullLength/3,startHeight+17*h,buttonFullLength/3-gapWidth,"long")],
  "shedding": [new Button(startWidth,startHeight+23*h,buttonFullLength-gapWidth,"all"),new Button(startWidth,startHeight+26*h,buttonFullLength/3-gapWidth,"minimal"),new Button(startWidth+buttonFullLength/3,startHeight+26*h,buttonFullLength/3-gapWidth,"seasonal"),new Button(startWidth+2*buttonFullLength/3,startHeight+26*h,buttonFullLength/3-gapWidth,"constant")],
  "Temperament": [new Button(startWidth,startHeight+32*h,buttonFullLength-gapWidth,"all"),new Button(startWidth,startHeight+35*h,buttonFullLength/2-gapWidth,"affectionate"),new Button(startWidth+buttonFullLength/2,startHeight+35*h,buttonFullLength/2-gapWidth,"active"),
  new Button(startWidth,startHeight+38*h,buttonFullLength/2-gapWidth,"intelligent"),new Button(startWidth+buttonFullLength/2,startHeight+38*h,buttonFullLength/2-gapWidth,"loyal"),
  new Button(startWidth,startHeight+41*h,buttonFullLength/2-gapWidth,"social"),new Button(startWidth+buttonFullLength/2,startHeight+41*h,buttonFullLength/2-gapWidth,"docile"),
  new Button(startWidth,startHeight+44*h,buttonFullLength/2-gapWidth,"gentle"),new Button(startWidth+buttonFullLength/2,startHeight+44*h,buttonFullLength/2-gapWidth,"playful"),
  new Button(startWidth,startHeight+47*h,buttonFullLength/2-gapWidth,"sweet"),new Button(startWidth+buttonFullLength/2,startHeight+47*h,buttonFullLength/2-gapWidth,"strong"),
  new Button(startWidth,startHeight+50*h,buttonFullLength/2-gapWidth,"outgoing"),new Button(startWidth+buttonFullLength/2,startHeight+50*h,buttonFullLength/2-gapWidth,"independent")
  ]
}

sidebarText = [["Size: ",startWidth,startHeight+5*h],["Hair Length: ",startWidth,startHeight+14*h],["Shedding: ",startWidth,startHeight+23*h],["Temper: ",startWidth,startHeight+32*h]]

  sidebarWidth.setTarget(sidebarTarget)
  for (var i=0;i<catnames.length;i++){
  catname = catnames[i];
  cats.push(new Cat(catname,i))
  }

  
}

function draw() {
  startingpoint = $(window).scrollTop()
  textFont(light)
  background(240);
  textSize(2*h);

  fill(80);
  layout();
  drawCat();

}





function layout(){
  if (checkSidebar()){
  sidebarWidth.setTarget(sidebarTarget)
    drawSidebar();
    drawButtons();
  }else{
    drawSidebar();
    sidebarWidth.setTarget(0) 
  }
}

function checkSidebar(){
if (startingpoint !=0)
return false
else
return true
}

function drawSidebar(){
sidebarWidth.update()
fill(250);
rect(0,0,sidebarWidth.value,height);
if(sidebarWidth.value==sidebarTarget){
writeSidebarText()
drawHeadline()
}


}

function writeSidebarText(){
fill(30)
textFont(regular)
textAlign(LEFT,BOTTOM)
textSize(1.55*h)
sidebarText.forEach(function(textInfo){
  text(textInfo[0],textInfo[1],textInfo[2]-0.1*h)
})
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
 input.position(111*w,2*h);
 }else{
  input.position(82.3*w,4*h);

  // Search Bar text
  textFont(light)
  textSize(1.7*h)
  fill(50)
  textAlign(RIGHT,TOP)
  readytext = "Search Cat Name "
  text(readytext,82*w,4*h)


 var i=0
 tempcats = sortCat()
 tempcats.forEach(function(cat){
 cat.setXY(i)
 cat.show()
 i++
  })

 drawCredit(tempcats.length-1)

 // This resizeCanvas function is too slow. How to fix this?
 
 //var hei = map(floor(tempcats.length/4),0,3,25*h,100*h)+25*h
 //var prospectHeight = max([windowHeight,hei])
 //if (prospectHeight-canvasHeight>25*h||prospectHeight-canvasHeight<-25*h){
 //  "in the loop"
 //canvasHeight = prospectHeight
 //resizeCanvas(windowWidth,prospectHeight)
 
 //}
 }
}

function drawCredit(len){
  textFont(lightItalic)
  textSize(1.7*h)
  textAlign(RIGHT,BOTTOM)
  fill(creditbuttoncolor.value)
  catY = map(floor(len/4),0,3,20*h,95*h)
  var Y = max(windowHeight-5*h,catY+17*h)
  text("Credits",94*w,Y)
  creditheight = Y

    textSize(1.6*h)
    creditcolor.update()
    creditbuttoncolor.update()
    fill(creditcolor.value)
    var readytext = "Data Source\nWolfram Alpha API\nSite Name\nJames Grady\nPicture Source\nvetstreet.com\ncat-breeds-encyclopedia.com\ncattime.com\npets4homes.com\nomlet.co.uk\npetguide.com\nburmilla.us\ncatbreedselector.com\npetpaw.com.au\nmy-pet-shop-ds.wikia.com\npurina.com\npurrfectcatbreeds.com\ngccfcats.org\ncat-breed-info.com\nlocalkittensforsale.com"
    textAlign(RIGHT,TOP)
    text(readytext,94*w,Y+h)

  

}


function drawHeadline(){
  textFont(bold)
  fill(255,144,7)
  textSize(3*h)
  textAlign(LEFT,BOTTOM)
  text("Cat",2*w,10*h)
  fill(90)
  text("ology",2*w+4.6*h,10*h)

  textFont(light)
  textSize(1.45*h)
  fill(50)
  readytext = "Catology is what anyone who owns a cat is doomed to practice for the rest of their pet's natrual life. Little do most cat owners realize that they are being pulled into this dangerous cult of cats."
  text(readytext,2.1*w,13*h,15*w)

}

function sortCat(){
  subcats = search();
  for(var category in buttons){
    if (category!="Temperament"){
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
  }else{
    subButtons = buttons[category].slice(1)
    subButtons.forEach(function(button){
      if(button.on){
        catcopy = []
        subcats.forEach(function(cat){
          if(cat.data[category].indexOf(button.word)>=0)
            catcopy.push(cat)
        })
        subcats=catcopy
      }
    })
  }
  }



  return subcats
}

function subsequence(long,short){
  var index = long.indexOf(short[0])
  if (short.length==0)
    return true
  if (index!=-1){
    return subsequence(long.slice(index),short.slice(1))
  }else{
  return false
  }
}

function search(){
var inp = input.value().split(' ').join('').toLowerCase()
if(inp != ""){
  output = []
  cats.forEach(function(cat){
    if(subsequence(cat.name.toLowerCase(),inp)){
      output.push(cat)
    }else if ("Alternate names" in cat.data){
      names = cat.data["Alternate names"].join(" ").toLowerCase()
      if (subsequence(names,inp)){
        output.push(cat)
      }

    }
  })
  return output

}
return cats
}

function mouseClicked(){
 toggleButtons()
 toggleCat()
 toggleCredit()
}

function toggleCredit(){

  if (mouseX<94*w && mouseX>90*w && mouseY<creditheight && mouseY >creditheight-2*h){
    if (creditOn){
      creditOn = false
      creditcolor.setTarget(240)
    }

    else{
      creditOn = true
      creditcolor.setTarget(128)
    }

  }



}



function toggleCat(){
 if (detailcat!="None"){
 detailcat = "None"
 }else{
  tempcats.every(function(cat,index){
  if (cat.hovered()){
    cat.updateLoc()
    detailcat = cat
    return false
  }else{
  return true}
  })
 }
}


function mouseMoved(){
  cats.every(function(cat,index){
  if (cat.hovered()){
  cat.expand()
  return true
  }
  else{
  cat.normal()
  return true
  }
  })

  if (mouseX<94*w && mouseX>90*w && mouseY<creditheight && mouseY >creditheight-2*h){

    creditbuttoncolor.setTarget(50)
  }else{
    creditbuttoncolor.setTarget(128)
  }

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


//Obsolete

//function mousePressed(){
//  if (detailCat=="None"){
//  cats.every(function(cat,index){
//  if (cat.hovered()){
//  cat.bound.setTarget(10)
//  return true
//  }
//  else
//  return false
//  })
//  }
//}

//function mouseReleased(){
//  if (detailCat=="None"){
//  cats.every(function(cat,index){
//  if (cat.hovered()){
//  cat.bound.setTarget(220)
//  return true
//  }
//  else
//  return false
//  })
//  }
//}