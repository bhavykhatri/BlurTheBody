let isBlurred = true;
let blurValue = "5";

chrome.runtime.onInstalled.addListener( ()=>{
    chrome.storage.sync.set({isBlurred});
    chrome.storage.sync.set({blurValue});
}
);