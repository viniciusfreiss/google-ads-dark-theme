document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    const statusText = document.getElementById('statusText');

    chrome.storage.local.get(['enabled'], (result) => {
        const isEnabled = result.enabled === undefined ? true : result.enabled;
        toggle.checked = isEnabled;
        updateUI(isEnabled);
    });

    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        updateUI(isEnabled);

        chrome.storage.local.set({ enabled: isEnabled });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes("ads.google.com")) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'toggleTheme',
                    enabled: isEnabled
                });
            }
        });
    });

    function updateUI(enabled) {
        statusText.textContent = enabled ? 'MODO DARK ATIVO' : 'MODO DARK DESATIVADO';
        statusText.style.color = enabled ? '#70b5f9' : '#888';
    }
});