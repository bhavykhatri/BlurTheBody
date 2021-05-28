function init(){
    let blurSwitchEle = document.querySelector("#blur-switch");
    let blurRangeEle = document.querySelector("#range-slider");
    
    if(blurSwitchEle){
        chrome.storage.sync.get("isBlurred" , ({isBlurred})=>{
            if(isBlurred){
                blurSwitchEle.checked = true;
                blurRangeEle.disabled = false;
            }
            else{
                blurRangeEle.disabled = true;
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
        toggleBlurSliderState();
    }
    else{
        setIsBlurredState(false);
        isBlurred = "false";
        toggleBlurSliderState();
    }

    chrome.tabs.query({}, function(tabs) {
        for(var i=0; i<tabs.length; i++){
            chrome.tabs.sendMessage(tabs[i].id, {blurred: isBlurred}, function(response) {
                ;
              });
        }
      });
}

function setIsBlurredState(blurred){
    chrome.storage.sync.set({'isBlurred':blurred});
}

function toggleBlurSliderState(){
    let blurRangeEle = document.querySelector("#range-slider");

    if(blurRangeEle.disabled){
        blurRangeEle.disabled = false;
    }
    else{
        blurRangeEle.disabled = true;
    }
}

init();