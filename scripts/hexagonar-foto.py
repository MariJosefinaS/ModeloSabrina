"""Recorta una foto en forma de hexágono con fondo transparente, para el
panal de la tapa del tríptico (`app/hoja/page.tsx`).

Los hexágonos de la pared de la entrada del sanatorio son de LADO PLANO
ARRIBA (puntas a izquierda y derecha), así que ese es el default.

Se recorta acá y no con CSS/SVG para no depender de que el motor de
impresión respete un clip-path.

Uso:
    python scripts/hexagonar-foto.py <destino.png> [cy] [zoom] [cx] [origen.jpg]

    cy   : centro vertical del recorte (0 = arriba, 1 = abajo). Default 0.3
    zoom : 1 = encuadre completo; >1 acerca. Default 1
    cx   : centro horizontal. Default 0.5

Ejemplos:
    python scripts/hexagonar-foto.py public/tapa-hex-1.png 0.28 1.0
    python scripts/hexagonar-foto.py public/tapa-hex-2.png 0.56 2.3 0.52
"""

import sys

from PIL import Image, ImageDraw

DESTINO = sys.argv[1] if len(sys.argv) > 1 else "public/tapa-hex-1.png"
CY = float(sys.argv[2]) if len(sys.argv) > 2 else 0.30
ZOOM = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
CX = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5
ORIGEN = sys.argv[5] if len(sys.argv) > 5 else "public/tapa-mama-bebe.jpg"

# Hexágono de lado plano arriba: alto = ancho × √3/2
W = 760  # se imprime a ~34 mm; sobra para 300+ dpi
H = round(W * 0.8660)
SS = 4  # supersampling, para que los bordes no queden dentados

src = Image.open(ORIGEN).convert("RGB")

# recorte tipo "cover" (llena el hexágono sin deformar), con zoom y centro
sw, sh = src.size
escala = max(W / sw, H / sh) * ZOOM
img = src.resize((round(sw * escala), round(sh * escala)), Image.LANCZOS)
nw, nh = img.size
left = min(max(round(nw * CX - W / 2), 0), nw - W)
top = min(max(round(nh * CY - H / 2), 0), nh - H)
img = img.crop((left, top, left + W, top + H))

# máscara hexagonal (lado plano arriba)
mascara = Image.new("L", (W * SS, H * SS), 0)
ImageDraw.Draw(mascara).polygon(
    [
        (0.25 * W * SS, 0),
        (0.75 * W * SS, 0),
        (1.00 * W * SS, 0.50 * H * SS),
        (0.75 * W * SS, 1.00 * H * SS),
        (0.25 * W * SS, 1.00 * H * SS),
        (0.00 * W * SS, 0.50 * H * SS),
    ],
    fill=255,
)
mascara = mascara.resize((W, H), Image.LANCZOS)

salida = Image.new("RGBA", (W, H), (0, 0, 0, 0))
salida.paste(img, (0, 0), mascara)
salida.save(DESTINO)
print(f"listo {DESTINO} {salida.size} (cy={CY} zoom={ZOOM} cx={CX})")
