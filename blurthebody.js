console.log("content script ssent");

function init(){
    chrome.storage.sync.get("isBlurred" , ({isBlurred})=>{
        if(isBlurred){
            blurTheBody();
        }
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.blurred === "true"){
            blurTheBody();
          }
          else{
              reset();
          }
            
        }
      );
      

}

function blurTheBody(){
    document.body.style.filter = "blur(8px)";
}

function reset(){
    document.body.style.filter = "none";
}

init();
