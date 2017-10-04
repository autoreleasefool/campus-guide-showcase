let tabIcons = [];

function init() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  const content = document.getElementById("content");

  const headerHeight = header.getBoundingClientRect().bottom - header.getBoundingClientRect().top;
  const footerHeight = footer.getBoundingClientRect().bottom - footer.getBoundingClientRect().top;

  content.style.paddingTop = `${header.getBoundingClientRect().bottom}px`;
  content.style.paddingBottom = `${footerHeight}px`;

  const mainContent = document.getElementById("main-content");
  mainContent.style.height = `${window.innerHeight - (headerHeight + footerHeight)}px`;

  tabIcons = document.querySelectorAll(".tab-icon");
  onResizeHandler();

  window.onscroll = onScrollHandler;
  window.onresize = onResizeHandler;
}

const minScrollOffset = 5;
const opaqueDistanceFromCenter = window.innerHeight * 0.2;
const transparentDistanceFromCenter = window.innerHeight * 0.1;

function onScrollHandler() {
  lastScrollPos = window.scrollY;

  tabIcons.forEach((tabIcon) => {
    const containerRect = tabIcon.parentElement.getBoundingClientRect();
    const outlineElement = document.getElementById(`${tabIcon.id}-outline`);

    const centerLine = window.scrollY + containerRect.top + (containerRect.bottom - containerRect.top) / 2;
    const distanceFromCenter = -((window.scrollY + window.innerHeight / 2) - centerLine);

    if (distanceFromCenter < opaqueDistanceFromCenter) {
      tabIcon.style.opacity = 1;
      outlineElement.style.opacity = 0;
    } else if (distanceFromCenter > opaqueDistanceFromCenter + transparentDistanceFromCenter) {
      tabIcon.style.opacity = 0;
      outlineElement.style.opacity = 1;
    } else {
      const relativeDistance = distanceFromCenter - opaqueDistanceFromCenter;
      const percentage = relativeDistance / transparentDistanceFromCenter;
      tabIcon.style.opacity = 1 - percentage;
      outlineElement.style.opacity = percentage;
    }
  });
}

function onResizeHandler() {
  tabIcons.forEach((tabIcon) => {
    const outlineElement = document.getElementById(`${tabIcon.id}-outline`);
    const coords = getElementCoords(outlineElement);
    const parentRect = outlineElement.parentElement.getBoundingClientRect();
    tabIcon.style.top = `${coords.top}px`;
    tabIcon.style.left = `${coords.left}px`;
    tabIcon.classList.remove("hidden");
  });

  onScrollHandler();
}

function getElementCoords(elem) {
  const root = document.documentElement;
  const body = document.body;
  const sTop = window.pageYOffset || root.scrollTop  || body.scrollTop;
  const sLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft;
  const cTop = root.clientTop  || body.clientTop  || 0;
  const cLeft = root.clientLeft || body.clientLeft || 0;
  const rect = elem.getBoundingClientRect();

  return {
    top: Math.round(rect.top  + sTop  - cTop),
    left: Math.round(rect.left + sLeft - cLeft),
  };
}