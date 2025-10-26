// Made by isa x letth
// cok ovulen undici gelistirilmeye acık halledersiniz
import WebSocket from "ws";
import chokidar from "chokidar";
import { request as undiciRequest } from "undici";

const heisenberg = ""; //token gir
const walter = ""; //sunucu id
const gustavo = 2;

let jesse = "";
let skyler = null;
let hank = null;
let marie = null;
const tuco = new Map();
function salamanca(code) {
    const combo = JSON.stringify({ code });
    for (let i = 0; i < gustavo; i++) {
        undiciRequest(
            `https://canary.discord.com/api/v9/guilds/${heisenberg}/vanity-url`,
            {
                method: "PATCH",
                headers: {
                    "authorization": walter,
                    "x-discord-mfa-authorization": jesse,
                    "user-agent": "letthcan",
                    "x-super-properties": "eyJicm93c2VyIjoiQ2hyb21lIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiQ2hyb21lIiwiY2xpZW50X2J1bWxkX251bWJlciI6MzU1NjI0fQ==",
                    "content-type": "application/json",
                },
                body: combo,
            }
        ).then(async ({ body, context }) => {
            try {
                context?.socket?.setNoDelay?.(true);
                const badger = await body.text();
                console.log(`[${i}]`, badger);
            } catch {}
        }).catch(() => {});
    }
}
function albuquerque() {
    marie = new WebSocket("wss://gateway-us-east1-b.discord.gg");
    marie.on("open", () => {
        marie.send(JSON.stringify({
            op: 2,
            d: { token: walter, intents: 1, properties: { $os: "linux", $browser: "", $device: "" } }
        }));
        console.log("gustavo is ready");
    });
    marie.on("message", (data) => {
        try {
            const flynn = JSON.parse(data);
            if (flynn.s) skyler = flynn.s;

            if (flynn.op === 10) {
                const interval = flynn.d.heartbeat_interval * 0.60;
                if (hank) clearInterval(hank);
                hank = setInterval(() => {
                    if (marie.readyState === WebSocket.OPEN) {
                        marie.send(JSON.stringify({ op: 1, d: skyler }));
                    }
                }, interval);
            }
            if (flynn.op === 0) {
                if (flynn.t === "READY") {
                    flynn.d.guilds.forEach(g => {
                        if (g.vanity_url_code) {
                            tuco.set(g.id, g.vanity_url_code);
                            console.log(`${g.id} -> ${g.vanity_url_code}`);
                        }
                    });
                }
                if (flynn.t === "GUILD_UPDATE") {
                    const brock = tuco.get(flynn.d.id);
                    const gomez = flynn.d.vanity_url_code;
                    if (brock && brock !== gomez) {
                        salamanca(brock);
                        console.log(`TUCO SALAMANCA SHOT ${flynn.d.id}: ${brock} -> ${gomez || "NULL"}`);
                    }
                    if (gomez) tuco.set(flynn.d.id, gomez);
                    else tuco.delete(flynn.d.id);
                }
                if (flynn.t === "GUILD_DELETE") {
                    const huell = tuco.get(flynn.d.id);
                    if (huell) {
                        console.log(`DELETED ${flynn.d.id}: ${huell}`);
                        tuco.delete(flynn.d.id);
                    }
                }
            }
        } catch {}
    });
    marie.on("close", () => {
        if (hank) clearInterval(hank);
        setTimeout(albuquerque, 0);
    });
    marie.on("error", () => marie.close());
}
function krazy8() {
    const watcher = chokidar.watch("./mfa.txt", {
        persistent: true,
        ignoreInitial: false,
        awaitWriteFinish: {
            stabilityThreshold: 50,
            pollInterval: 25
        },
        usePolling: false,
        atomic: true
    });
    watcher.on("add", (path) => {
        import("fs").then(fs => {
            jesse = fs.readFileSync(path, "utf8").trim();
            console.log("heisenberg is dead");
        }).catch(() => {});
    });
    watcher.on("change", (path) => {
        import("fs").then(fs => {
            jesse = fs.readFileSync(path, "utf8").trim();
            console.log("jesse pinkman up");
        }).catch(() => {});
    });
    watcher.on("error", () => {});
    albuquerque();
}
krazy8();
