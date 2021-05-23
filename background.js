let isBlurred = true;

chrome.runtime.onInstalled.addListener( ()=>{
    chrome.storage.sync.set({isBlurred});
    console.log('Default blurred state set to true');
}
);