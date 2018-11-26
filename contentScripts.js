function getScroll() {
    if (window.pageYOffset != undefined) {
        return [pageXOffset, pageYOffset];
    } else {
        var sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
    }
}

function scroll(position) {
  scrollTo(0, position);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.setPosition === true) {
    const position = getScroll();
    sendResponse({position: position});
  }

  if (request.goToPosition === true) {
    scroll(request.value);
  }
});
