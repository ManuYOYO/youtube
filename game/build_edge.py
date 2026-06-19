import json, re

# Lire le bundle JS
with open('/home/user/youtube/game/bundle.js', 'r', encoding='utf-8') as f:
    bundle_js = f.read()

# Créer le HTML complet
html = f"""<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Le Parcours de Swann 🌟</title>
  <style>
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      background: #0a0a1a;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      overflow: hidden;
      font-family: monospace;
    }}
    #game-container {{
      position: relative;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
    }}
    canvas {{
      display: block;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      max-width: 100vw;
      max-height: 100vh;
    }}
    #loading {{
      color: #FF6B9D;
      font-size: 18px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }}
    #controls-hint {{
      color: #444466;
      font-size: 11px;
      margin-top: 8px;
      text-align: center;
    }}
  </style>
</head>
<body>
  <div id="loading">
    <div>LE PARCOURS DE SWANN</div>
    <div style="font-size:12px;margin-top:8px;color:#666699">Chargement...</div>
  </div>
  <div id="game-container"></div>
  <div id="controls-hint">
    ⬅⬆➡ Déplacer &nbsp;|&nbsp; Z Moustache &nbsp;|&nbsp; X Réflexion Éclair &nbsp;|&nbsp; P Pause
  </div>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
  <script>
window.addEventListener('load', function() {{
  document.getElementById('loading').style.display = 'none';
}});
{bundle_js}
  </script>
</body>
</html>"""

# JSON-encode pour l'intégrer dans TypeScript
html_json = json.dumps(html)

# Créer le fichier Edge Function TypeScript
edge_ts = f"""import {{ serve }} from "https://deno.land/std@0.168.0/http/server.ts";

const HTML = {html_json};

serve((req: Request) => {{
  const url = new URL(req.url);
  
  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html" || url.pathname === "")) {{
    return new Response(HTML, {{
      headers: {{
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
        "X-Frame-Options": "ALLOWALL",
      }},
    }});
  }}
  
  return new Response("Not found", {{ status: 404 }});
}});
"""

with open('/home/user/youtube/game/edge_function.ts', 'w', encoding='utf-8') as f:
    f.write(edge_ts)

print(f"HTML size: {len(html):,} bytes")
print(f"Edge function size: {len(edge_ts):,} bytes")
print("Done!")
