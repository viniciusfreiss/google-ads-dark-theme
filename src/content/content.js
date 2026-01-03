const THEME_CLASS = 'gads-dark-theme';

function applyTheme() {
  chrome.storage.local.get(['enabled'], (result) => {
    const isEnabled = result.enabled === undefined ? true : result.enabled;
    if (isEnabled) {
      document.documentElement.classList.add(THEME_CLASS);
    } else {
      document.documentElement.classList.remove(THEME_CLASS);
    }
  });
}

applyTheme();

const observer = new MutationObserver(applyTheme);
observer.observe(document.documentElement, { attributes: true, childList: true, subtree: false });

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'toggleTheme') applyTheme();
});