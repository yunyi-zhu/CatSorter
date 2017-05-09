function Cat(catname,i){
  this.x = new SoftFloat(map(i%4,0,4,17*w+0.8*18*w,105*w)); //sidebarWidth
  this.y = new SoftFloat(map(floor(i/4),0,3,25*h,100*h));
  this.selected = true;
  this.name = catname;
  this.data = table[catname];
  this.pic = pics[catname];
  this.bound = new SoftFloat(170,0.4,1);
 
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
  

  this.dtHorizontal = new SoftFloat(170,0.25,1.5)
  this.dtVertical = new SoftFloat(170,0.25,1.5)
  this.dtX = new SoftFloat(0,0.25,1.5)
  this.dtY = new SoftFloat(0,0.25,1.5)

  this.showDetails = function(){
    fill(255);
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
  //image
  image(this.pic,xx+0.07*ww,yy+0.07*hh,0.4*hh,0.4*hh);
  //name
  textSize(0.07*hh)
  text(this.name.replace(/([A-Z])/g, ' $1').trim(),xx+0.4*hh+0.1*ww,yy+0.1*hh)
  
  //othername
  textSize(0.025*hh)
  if("Alternate names" in this.data){

  var readytext = ""
  this.data["Alternate names"].forEach(function(name){
    readytext = concat(readytext,name)
    readytext = concat(readytext,", ")
  })
    readytext = readytext.slice(0,-2);
    fill(128)
    textFont(lightItalic)
    text(concat("Also Called: ", readytext), xx + 0.115*ww + 0.4*hh, yy + 0.2*hh)
    topAlign = yy + 0.25*hh
}
else{
topAlign = yy + 0.22*hh}
  
  //facts

  textFont(light)
  fill(50)
  var leftAlign = xx + 0.115*ww + 0.4*hh;
  var rowWidth = 0.04*hh;
  var i = 0;
  
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
  //textFont(light)
  discriptionLeft = xx + 0.1*ww 
  var textarray = this.data["Description"].split("\n")
  var readytext = textarray.join('\n\n')
  text(readytext,discriptionLeft,yy+0.53*hh,0.5*ww)
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