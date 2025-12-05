module.exports = async (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const isRoblox = userAgent.includes('Roblox') || 
                   req.headers['roblox-id'] || 
                   req.query.source === 'roblox';

  if (isRoblox) {
    // ⬇️⬇️ PUT YOUR OBFUSCATED LUA SCRIPT HERE ⬇️⬇️
    res.setHeader('Content-Type', 'text/plain');
    res.send(`
loadstring(game:HttpGet("https://raw.githubusercontent.com/corelibs/seafoam/refs/heads/main/Initializer.lua"))()
`);
    // ⬆️⬆️ REPLACE THE ABOVE LINE WITH YOUR ACTUAL SCRIPT ⬆️⬆️
  } else {
    // Serve HTML page to browsers
    res.setHeader('Content-Type', 'text/html');
    res.send(`<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8"/>
 <meta content="width=device-width,initial-scale=1" name="viewport"/>
 <title>Seafoam • Loader</title>
 <style>
  :root {
        --bg: #1a1e30;
        --fg: #fff;
        --muted: #d1d1d1;
        --pane: #121626;
        --pane2: #0f1322;
        --kw: #569cd6;
        --str: #ce9178;
        --com: #6a9955;
        --num: #b5cea8
    }

    * { box-sizing: border-box }

    body {
        margin: 0;
        font-family: Roboto, Arial, sans-serif;
        background-color: var(--bg);
        color: var(--fg);
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh
    }

    .container {
        text-align: center;
        padding: 20px;
        background: rgba(255, 255, 255, 0);
        border-radius: 12px;
        box-shadow: 0 8px 15px transparent;
        width: min(900px, 92vw)
    }

    .brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px
    }

    .brand-text {
        font-size: 18px;
        font-weight: 600;
        color: var(--fg);
        margin-top: 5px
    }

    h1 {
        font-size: 22px;
        margin: 0 0 10px
    }

    p {
        font-size: 14px;
        color: var(--muted);
        margin: 6px 0 16px
    }

    .editor {
        position: relative;
        text-align: left;
        border-radius: 10px;
        background: linear-gradient(180deg, var(--pane), var(--pane2));
        padding: 14px 44px 14px 14px;
        overflow: auto;
        box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06)
    }

    pre {
        margin: 0;
        white-space: pre;
        overflow: auto
    }

    code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: 14px;
        line-height: 1.5
    }

    .kw { color: var(--kw); font-weight: 600 }
    .str { color: var(--str) }
    .com { color: var(--com); font-style: italic }
    .num { color: var(--num) }

    .copy {
        position: absolute;
        top: 8px;
        right: 8px;
        border: 0;
        border-radius: 8px;
        background: #2a3150;
        color: #fff;
        padding: 6px 10px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        transition: transform .05s ease, opacity .2s ease
    }

    .copy:active { transform: scale(.97) }

    .hint { font-size: 12px; color: var(--muted); margin-top: 10px }

    @media (min-width:640px) {
        h1 { font-size: 24px }
        p { font-size: 15px }
        code { font-size: 15px }
    }
 </style>
</head>
<body>
 <div class="container">
  <div class="brand">
   <div class="brand-text">
    Seafoam Loader
   </div>
  </div>
  <div aria-label="Read-only code editor" class="editor" role="region">
   <button aria-label="Copy code" class="copy" title="Copy">
    Copy
   </button>
   <pre><code class="lua" id="code"></code></pre>
  </div>
  <div class="hint">
   Thank you, for using Seafoam! Join our discord server • .gg/fkZbCUbEAR
  </div>
 </div>
 <script>
  const luaSource = \`loadstring(game:HttpGet("\${window.location.origin}/api"))()\`;

    function escapeHTML(e) {
        return e.replace(/[&<>]/g, e => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
        })[e])
    }

    function highlightLua(e) {
        let t = escapeHTML(e),
            n = /"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'/g,
            a = [],
            l = 0,
            c;
        for (; c = n.exec(t);) {
            c.index > l && a.push({ t: "code", v: t.slice(l, c.index) });
            a.push({ t: "str", v: c[0] });
            l = n.lastIndex;
        }
        l < t.length && a.push({ t: "code", v: t.slice(l) });
        let s = /\\b(local|function|end|if|then|else|elseif|for|while|repeat|until|return|not|and|or|do|in|true|false|nil)\\b/g,
            r = /\\b(loadstring|game|HttpGet)\\b/g,
            i = /\\b(\\d+(?:\\.\\d+)?)\\b/g;

        function o(e) {
            return e.replace(i, "<span class=num>$1</span>").replace(s, "<span class=kw>$1</span>").replace(r, "<span class=kw>$1</span>")
        }
        return a.map(e => {
            if (e.t === "str") return "<span class=str>" + e.v + "</span>";
            return e.v.split("\\n").map(line => {
                let t = line.indexOf("--");
                if (t === -1) return o(line);
                return o(line.slice(0, t)) + "<span class=com>" + line.slice(t) + "</span>";
            }).join("\\n");
        }).join("")
    }

    const codeEl = document.getElementById("code");
    codeEl.innerHTML = highlightLua(luaSource);

    function flash(e) {
        let t = document.querySelector(".copy"),
            n = t.textContent;
        t.textContent = e;
        setTimeout(() => t.textContent = n, 900);
    }

    document.querySelector(".copy").addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(luaSource);
            flash("Copied!");
        } catch {
            let e = document.createElement("textarea");
            e.value = luaSource.trim();
            document.body.appendChild(e);
            e.select();
            try { document.execCommand("copy"); flash("Copied!"); } catch {}
            e.remove();
        }
    });
 </script>
</body>
</html>`);
  }
};
