console.log("extnesion content script starts");

function init(){
    chrome.storage.sync.get("isBlurred" , ({isBlurred})=>{
        if(isBlurred){
            blurTheBody();
        }
    });

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
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
