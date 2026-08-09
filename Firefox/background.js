browser.commands.onCommand.addListener(async (command) => {
    if (command !== "save-selected-text") {
        return;
    }

    const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tabs.length) {
        return;
    }

    const tabId = tabs[0].id;

    try {
        await browser.tabs.executeScript(tabId, {
            code: `
                (() => {
                    const text = window.getSelection().toString().trim();

                    if (!text) {
                        return;
                    }

                    const textarea = document.createElement("textarea");

                    textarea.value = text;

                    textarea.style.position = "fixed";
                    textarea.style.left = "-9999px";
                    textarea.style.top = "0";

                    document.body.appendChild(textarea);

                    textarea.focus();
                    textarea.select();

                    document.execCommand("copy");

                    textarea.remove();
                })();
            `
        });

    } catch (error) {
        console.error(error);
    }
});
