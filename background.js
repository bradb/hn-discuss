chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "checkHackerNews") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentTab = tabs[0];
      var currentUrl = currentTab.url;

      // Check if the current URL is already a Hacker News discussion page
      if (currentUrl.includes("ycombinator.com/item")) {
        console.log("Already on a Hacker News discussion page.");
        return;
      }

      // Replace the following URL with the endpoint of the API you're using
      var apiUrl = "https://hn.algolia.com/api/v1/search?query=" + encodeURIComponent(currentUrl) + "&restrictSearchableAttributes=url";

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.hits && data.hits.length > 0) {
            var discussionUrl = "https://news.ycombinator.com/item?id=" + data.hits[0].objectID;
            chrome.tabs.create({ url: discussionUrl });
          } else {
            alert("This page hasn't been discussed on Hacker News.");
          }
        })
        .catch(error => console.error('Error:', error));
    });
  }
});

