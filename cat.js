function Cat(catname,i){
  this.x = new SoftFloat(map(i%4,0,4,17*w+0.8*18*w,105*w)); //sidebarWidth
  this.y = new SoftFloat(map(floor(i/4),0,3,25*h,100*h));
  this.selected = true;
  this.name = catname;
  this.data = table[catname];
  this.pic = pics[catname];
  this.bound = new SoftFloat(170,0.4,1);
  this.colornum = new SoftFloat(255)

 
  this.show = function(){
    this.x.update();
    this.y.update();
    this.bound.update();
    fill(50);
    textAlign(CENTER,CENTER)
    textSize(2*h)
    text(this.name.replace(/([A-Z])/g, ' $1').trim(),this.x.value,this.y.value+0.46*this.bound.value+19)
    image(this.pic,this.x.value-0.5*this.bound.value,this.y.value-0.5*this.bound.value,this.bound.value,this.bound.value)
  };
  
  this.setXY = function(pos){
    var targetX = map(pos%4,0,4,17*w+0.8*18*w,105*w)//sidebarWidth
    var targetY = map(floor(pos/4),0,3,20*h,95*h)
    this.x.setTarget(targetX)
    this.y.setTarget(targetY)
}
 
  this.hovered = function(){
  if(mouseX - this.x.value<0.5*this.bound.value && mouseX - this.x.value>-0.5*this.bound.value && mouseY - this.y.value <0.5*this.bound.value &&mouseY - this.y.value >-0.5*this.bound.value)
    return true
  else
    return false
  }
  







// DETAIL CAT INFO LISTED HERE


  this.dtHorizontal = new SoftFloat(170,0.25,1.5)
  this.dtVertical = new SoftFloat(170,0.25,1.5)
  this.dtX = new SoftFloat(0,0.25,1.5)
  this.dtY = new SoftFloat(0,0.25,1.5)

  this.showDetails = function(){
  this.detailFrame();
  this.detailContent();
  }
  
  
  this.detailContent = function(){
  fill(50)
  textAlign(LEFT,TOP)
  var ww = this.dtHorizontal.value;
  var hh = this.dtVertical.value;
  var xx = this.dtX.value;
  var yy = this.dtY.value
  var tpw=20 
  var leftAlign = xx+0.12*ww+0.4*hh
  //image
  image(this.pic,xx+0.07*ww,yy+0.07*hh,0.4*hh,0.4*hh);
  //cat name
  //be aware that ww and hh are real width and heights, not percentage
  textFont(light)
  textSize(0.06*hh)
  text(this.name.replace(/([A-Z])/g, ' $1').trim(),leftAlign,yy+0.1*hh)
  
  //othername
  textSize(0.022*hh)
  textFont(lightItalic)
  if("Alternate names" in this.data){
  var readytext = ""
  this.data["Alternate names"].forEach(function(name){
    readytext = concat(readytext,name)
    readytext = concat(readytext,", ")
  })
    readytext = readytext.slice(0,-2);
    fill(90)
    text(concat("Also Called: ", readytext),leftAlign, yy + 0.19*hh)
}
else{
text("Facts: ",leftAlign,yy+0.19*hh,0.8*ww)
}
  
  //facts

  textFont(bold)
  fill(50)
  var rowWidth = 0.03*hh;
  var i = 0;
  var topAlign = yy+0.22*hh
  
  if ("size" in this.data){
  var readytext = this.data['size'].join(" / ")
  text(readytext,leftAlign,topAlign+i*rowWidth)
  i++
  }
 
  if ("weight" in this.data){
  var readytext = this.data['weight'].join(" to ") 
  text(concat(readytext," lb"),leftAlign,topAlign+i*rowWidth) 
  i++
  }
  
  if ("hair length" in this.data){
  var readytext = this.data['hair length'].join(" / ")
  text(concat(readytext," hair" ),leftAlign,topAlign+i*rowWidth) 
  i++
  }
  
  if ("shedding" in this.data){
  var readytext = this.data['shedding'].join(" / ")
  text(concat(readytext," shedding"),leftAlign,topAlign+i*rowWidth) 
  i++
  }
  
  if ("grooming" in this.data){
  var readytext = this.data['grooming'].join(" / ")
  text(concat(readytext," grooming"),leftAlign,topAlign+i*rowWidth) 
  i++
  }
  
  // discriptions
  textFont(regular)
  descriptionLeft = leftAlign
  descriptionTop = topAlign+(i+1)*rowWidth
  descriptionY = descriptionTop
  gapWidth = 0.007*hh
  linecount=0
  var textarray = this.data["Description"].split("\n")
  textarray.forEach(function(description){
    text(description,descriptionLeft,descriptionY,0.40*ww)
    if (ww>1.3*hh)
    descriptionY += ceil(textWidth(description)/(0.39*ww))*rowWidth+gapWidth
    else
    descriptionY += ceil(textWidth(description)/(0.37*ww))*rowWidth+gapWidth
  })


  //history
  textFont(light)
  historyLeft = leftAlign
  historyTop = descriptionY+0.01*hh
  historyY = historyTop
  gapWidth = 0.007*hh
  linecount=0
  var textarray = this.data["History"].split("\n")
  textarray.forEach(function(history){
    text(history,historyLeft,historyY,0.40*ww)
        if (ww>1.3*hh)
    historyY += ceil(textWidth(history)/(0.39*ww))*rowWidth+gapWidth
    else
    historyY += ceil(textWidth(history)/(0.37*ww))*rowWidth+gapWidth
  })

  // text(this.data["History"],historyLeft,historyY,0.40*ww)
  fill(128)
  textFont(lightItalic)
  textSize(0.02*hh)
  text("Show Details",leftAlign,historyY+gapWidth)





  // Characteristics

// if (mouseX>xx+0.07*ww && mouseX<xx+0.07*ww+0.4*hh && mouseY> yy+0.07*hh && mouseY<yy+0.07*hh+0.4*hh){
if(mouseX>leftAlign && mouseX<leftAlign+0.15*hh && mouseY> historyY+gapWidth && mouseY<historyY+gapWidth+rowWidth){
  this.colornum.setTarget(128)

}
else{
this.colornum.setTarget(255)

}


  this.colornum.update()


  textFont(light)
  textSize(0.019*hh)
  textAlign(CENTER,TOP)
  wordsTop = yy + 0.51*hh
  rightAlign = xx+0.07*ww+0.20*hh

  fill(this.colornum.value)
  text("Temperament",rightAlign,yy+0.48*hh)
  Y = wordsTop
  ranked = this.data['Temperament']
  ranked.sort(function(a,b){
    return b.length-a.length
  })

// if (ranked.length>6){
  for (var i=1;i<ranked.length;i+=2){
    text(concat(concat(ranked[i-1]," "),ranked[i]),rightAlign,Y)
    Y+= rowWidth
  }
// }else{
//   ranked.forEach(function(temperament){
//     text(temperament,rightAlign,Y)
//     Y+= rowWidth

//   })
// }


//hometown

  textFont(light)
  rowWidth = 0.026*hh


  text("Comes from",rightAlign,Y+0.02*hh)

  text(this.data["origin"][0].replace(","," and "),rightAlign,Y+0.02*hh+rowWidth)


  text("Recognized by",rightAlign,Y+0.08*hh+gapWidth) 

  text(this.data['Recognized by'].join("\n"),rightAlign,Y+0.08*hh+gapWidth+rowWidth)



  }
  







  
  this.detailFrame = function(){
  var tpw=20 //tempwidth
  this.dtHorizontal.setTarget(windowWidth-sidebarWidth.value-2*tpw)
  this.dtVertical.setTarget(100*h-2*tpw)
  this.dtX.setTarget(sidebarWidth.value+tpw)
  this.dtY.setTarget(startingpoint+tpw)
  
  this.dtHorizontal.update()
  this.dtVertical.update()
  this.dtX.update()
  this.dtY.update()
  fill(255)
  rect(this.dtX.value,this.dtY.value,this.dtHorizontal.value,this.dtVertical.value)  
}
  
  this.updateLoc = function(){
  this.dtX.set(this.x.value-0.5*this.bound.value)
  this.dtY.set(this.y.value-0.5*this.bound.value)
  this.dtHorizontal.set(this.bound.value)
  this.dtVertical.set(this.bound.value)
  }
  
  this.expand = function(){
    this.bound.setTarget(220);
  }
  
  this.normal = function(){
  this.bound.setTarget(170)
  }
  
  
}