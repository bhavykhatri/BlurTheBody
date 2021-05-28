let isBlurred = true;

chrome.runtime.onInstalled.addListener( ()=>{
    chrome.storage.sync.set({isBlurred});
}
);