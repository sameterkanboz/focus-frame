/* eslint-disable no-undef */

const tabBorderStates = new Map();

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.action.setBadgeText({
        text: "Off",
        tabId: tab.id,
      });
      chrome.action.setBadgeBackgroundColor({
        color: "#555",
        tabId: tab.id,
      });
      tabBorderStates.set(tab.id, false);
    });
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabBorderStates.delete(tabId);
});

chrome.action.onClicked.addListener((tab) => {
  const currentState = tabBorderStates.get(tab.id) || false;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleBorderStyles,
    args: [currentState],
  });

  tabBorderStates.set(tab.id, !currentState);

  chrome.action.setBadgeText({
    text: !currentState ? "Off" : "On",
    tabId: tab.id,
  });

  chrome.action.setBadgeBackgroundColor({
    color: !currentState ? "#555" : "#FF5722",
    tabId: tab.id,
  });
});

function toggleBorderStyles(bordersAdded) {
  const elements = document.querySelectorAll(
    "header, nav, section, article, aside, footer, div, span, li, ul, ol"
  );
  const typographyElements = document.querySelectorAll(
    "h1, h2, h3, h4, h5, h6, p"
  );
  typographyElements.forEach((element) => {
    element.style.outline = bordersAdded ? "1px dashed blue" : "none";
  });
  elements.forEach((element) => {
    element.style.outline = bordersAdded ? "1px solid #FF5722" : "none";
  });
}
