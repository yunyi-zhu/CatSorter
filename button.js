function Button(inX,inY,inWidth,word){
  this.x = inX
  this.y = inY
  if (word == "all")
  this.on = true
  else
  this.on = false
  this.word = word
  this.w = inWidth
  this.h = 2.5*h
  
  
  this.show = function(){
    sidebarWidth.update()
    textSize(1.5*h)
    textFont(regular)
    textAlign(CENTER,BOTTOM)
    if(sidebarWidth.value==sidebarTarget){
    if(this.on){
    fill(128)
    rect(this.x,this.y,this.w,this.h)
    fill(255)
    text(this.word[0].toUpperCase()+this.word.slice(1),this.x+this.w/2,this.y+this.h-0.35*h);
    }
    else{
    fill(225)
    rect(this.x,this.y,this.w,this.h)
    fill(30)
    text(this.word[0].toUpperCase()+this.word.slice(1),this.x+this.w/2,this.y+this.h-0.35*h);
    }}
}
  
  this.hovered = function(){
    if(mouseX>this.x && mouseX<this.x+this.w && mouseY>this.y && mouseY<this.y+this.h)
  return true
  else
  return false
  }

  
  this.toggle = function(){
  if (this.on){
    this.on = false
  }else{
    this.on = true
  }
  }
}