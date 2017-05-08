function Button(inX,inY,word){
  this.x = inX
  this.y = inY
  if (word == "all")
  this.on = true
  else
  this.on = false
  this.word = word
  
  
  this.show = function(){
    if(this.on){
      fill(128)
    rect(this.x-2.5*w,this.y-0.8*w,5*w,2*w)
    fill(255)
    textAlign(CENTER,CENTER)
    text(this.word,this.x,this.y);
    }
    else{
    fill(225)
    rect(this.x-2.5*w,this.y-0.8*w,5*w,2*w)
    fill(80)
    textAlign(CENTER,CENTER)
    text(this.word,this.x,this.y);
    }
  }

  
  this.hovered = function(){
    if(mouseX-this.x<2.5*w && mouseX-this.x>-2.5*w && mouseY-this.y<1.2*w && mouseY-this.y>-0.8*w)
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