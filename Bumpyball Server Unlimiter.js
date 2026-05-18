// ==UserScript==
// @name         Bumpyball Server Unlimiter
// @namespace    https://github.com/3lectr0Ninja
// @version      1
// @description  Enter all servers
// @author       3lectr0N!nj@
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pucks.io
// @grant        none
// ==/UserScript==
    const originalFetch = window.fetch;
 
    window.fetch = async function (...args) {
        const response = await originalFetch(...args);
        const clonedResponse = response.clone();
            if (args[0].includes("Listing?Game=BumpyBall")) {
                const data = await clonedResponse.json();
                data.forEach(server => {
                    server.MaxPlayers = 999;
                });
                return new Response(JSON.stringify(data), {
                    headers: clonedResponse.headers,
                    status: clonedResponse.status,
                    statusText: clonedResponse.statusText
                });
            }
            if (args[0].includes("/Ping")) {
                const server = await clonedResponse.json();
                server.MaxPlayers = 999;
                server.CurrentPlayers -= 1;
                return new Response(JSON.stringify(server), {
                    headers: clonedResponse.headers,
                    status: clonedResponse.status,
                    statusText: clonedResponse.statusText
                });
            }
        return response;
    };
