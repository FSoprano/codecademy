const _ = {
  
    clamp(c,l,u) {
      
      if (c > u) {
        return u;
      } else if (c < l) {
        return l;
      } else {
        return c;
      }
      
    }
    
  };




// Do not write or modify code below this line.
module.exports = _;