function Cat(catname){
  this.x = new SoftFloat(0);
  this.y = new SoftFloat(0);
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
    rect(this.x.value,this.y.value,30,30)
    text(this.name.replace(/([A-Z])/g, ' $1').trim(),this.x.value,this.y.value+0.46*this.bound.value+19)
    image(this.pic,this.x.value-0.5*this.bound.value,this.y.value-0.5*this.bound.value,this.bound.value,this.bound.value)
  };
  
  this.setXY = function(pos){
    var targetX = map(pos%4,0,4,17*w+0.8*sidebarWidth.value,105*w)
    var targetY = map(floor(pos/4),0,3,25*h,100*h)
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
  this.detailFrame()
  }
  
  this.detailFrame = function(){
  var tpw=20 //tempwidth
  this.dtHorizontal.setTarget(windowWidth-sidebarWidth.value-2*tpw)
  this.dtVertical.setTarget(100*h-2*tpw)
  this.dtX.setTarget(sidebarWidth.value+tpw)
  this.dtY.setTarget(startingpoint+tpw)
  console.log(this.dtX.value,this.dtY.value,this.dtHorizontal.value,this.dtVertical.value)
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