document.getElementById('check').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: "checkHackerNews" });
});

