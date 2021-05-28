function init(){
    let blurSwitchEle = document.querySelector("#blur-switch");
    let blurRangeEle = document.querySelector("#range-slider");
    
    if(blurSwitchEle){
        chrome.storage.sync.get("isBlurred" , ({isBlurred})=>{
            if(isBlurred){
                blurSwitchEle.checked = true;
                blurRangeEle.disabled = false;
                chrome.storage.sync.get("blurValue", (blurValue)=>{
                    blurRangeEle.value = blurValue.blurValue;
                });
            }
            else{
                blurRangeEle.disabled = true;
            }
        });
    }

    blurSwitchEle.addEventListener("click", switchClickHandler);
    blurRangeEle.addEventListener("input", blurSliderInputChangeHandler);
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

function blurSliderInputChangeHandler(event){
    var rangeEle = event.target;

    if(!rangeEle.disabled){
        setBlurVaueState(rangeEle.value);
    }

    chrome.tabs.query({}, function(tabs) {
        for(var i=0; i<tabs.length; i++){
            console.log("message pop script");
            chrome.tabs.sendMessage(tabs[i].id, {blurValue: rangeEle.value}, function(response) {
                console.log("message pop script 2");;
              });
        }
      });
}

function setIsBlurredState(blurred){
    chrome.storage.sync.set({'isBlurred':blurred});
}

function setBlurVaueState(value){
    chrome.storage.sync.set({'blurValue':value});
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