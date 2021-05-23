function init(){
    let blurSwitchEle = document.querySelector("#blur-switch");
    
    if(blurSwitchEle){
        chrome.storage.sync.get("isBlurred" , ({isBlurred})=>{
            if(isBlurred){
                blurSwitchEle.checked = true;
            }
        });
    }

    blurSwitchEle.addEventListener("click", switchClickHandler);
}

function switchClickHandler(event){
    var blurEle = event.target;
    var isBlurred = "";

    if(blurEle.checked){
        setIsBlurredState(true);
        isBlurred = "true";
    }
    else{
        setIsBlurredState(false);
        isBlurred = "false";
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {blurred: isBlurred}, function(response) {
          ;
        });
      });
}

function setIsBlurredState(blurred){
    chrome.storage.sync.set({'isBlurred':blurred});
}

init();