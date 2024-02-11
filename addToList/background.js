chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addToWishlist",
    title: "Add to List",
    contexts: ["link"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToWishlist") {
    chrome.tabs.sendMessage(tab.id, { action: "getItemId" });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendItemId") {
    fetch("http://127.0.0.1:8000/receive_item_id/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: message.itemId }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Item ID sent successfully", data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
