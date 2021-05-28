function init(){
    chrome.storage.sync.get("isBlurred" , ({isBlurred})=>{
        if(isBlurred){
            chrome.storage.sync.get("blurValue", (blurValue)=>{
                blurTheBody(blurValue.blurValue);
            });
        }
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.blurred === "true"){
            chrome.storage.sync.get("blurValue", (blurValue)=>{
                blurTheBody(blurValue.blurValue);
            });
          }
          else{
              reset();
          }
            
        }
    );

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.blurValue !== undefined){
                chrome.storage.sync.get("blurValue", (blurValue)=>{
                    blurTheBody(blurValue.blurValue);
                });
            }
        }
    );
      

}

function blurTheBody(val){
    document.body.style.filter = "blur(" + val+"px)";
}

function reset(){
    document.body.style.filter = "none";
}

init();
