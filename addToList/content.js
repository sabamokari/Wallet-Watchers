chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getItemId") {
    const link = document.activeElement;
    if (link && link.hasAttribute("link-identifier")) {
      const itemId = link.getAttribute("link-identifier");
      // Send itemId to background script
      chrome.runtime.sendMessage({ action: "sendItemId", itemId: itemId });
      console.log("Sent " + itemId + " to background script");
    }
  }
});

//   fetch('http://127.0.0.1:8000/receive_item_id', { // Your local server's API endpoint
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({itemId: itemId})
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
// }

// Example: fetch('YOUR_SERVER_ENDPOINT', { method: 'POST', body: JSON.stringify({ itemId }), headers: { 'Content-Type': 'application/json' } });
//   window.postMessage(
//     {
//       type: "FROM_EXTENSION", // A custom type to identify the message source
//       itemId: itemId,
//     },
//     "http://127.0.0.1:8000/"
//   );
