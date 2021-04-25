class MyPromise{


	constructor(cb){
  	this.state = "PENDING";
    this.value = null;
    this.settled = false;
    
    const resolver = (value) => {
    	if(this.settled) 
      	return;
        
    	this.value = value;
      this.state = "FULFILLED";
      this.settled = true;
      
      this.thenFn(this.value);
      this.finallyFn();
    }
    
    const rejector = (value) => {
    	if(this.settled) 
      	return;
        
    	this.value = value;
      this.state = "REJECTED";
      this.settled = true;
      
      this.catchFn(this.value);
      this.finallyFn();
    }
    
    try{
    	cb(resolver, rejector);
    }
    catch(e){
    	rejector(e);
    }    
  }
  
  
  then(thenFn){
  	if(typeof thenFn == "function"){
    		this.thenFn = thenFn;
    }
    return this;
  }
  
  catch(catchFn){
  	if(typeof catchFn == "function"){
    		this.catchFn = catchFn;
    }
    return this;
  }
  
  finally(finallyFn){
  	if(typeof finallyFn == "function"){
    	this.finallyFn = finallyFn;
    }
  }
  
}





