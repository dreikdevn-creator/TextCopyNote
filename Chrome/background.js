chrome.commands.onCommand.addListener(async (command) => {
    if (command !== "save-selected-text") {
        return;
    }

    try {
        const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        });

        if (!tab || !tab.id) {
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const text = window.getSelection().toString().trim();

                if (text) {
                    navigator.clipboard.writeText(text);
                }
            }
        });

    } catch (error) {
        console.error(error);
    }
});
