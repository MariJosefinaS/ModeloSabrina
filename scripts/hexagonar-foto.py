"""Recorta la foto de tapa en forma de hexágono (punta arriba) con fondo
transparente, para el panal de la tapa del tríptico (`app/hoja/page.tsx`).

Se hace acá y no con CSS/SVG para que el recorte no dependa de que el motor
de impresión respete un clip-path.

Uso:
    python scripts/hexagonar-foto.py [origen.jpg] [destino.png]

Por defecto: public/tapa-mama-bebe.jpg -> public/tapa-hex.png
"""

import sys

from PIL import Image, ImageDraw

ORIGEN = sys.argv[1] if len(sys.argv) > 1 else "public/tapa-mama-bebe.jpg"
DESTINO = sys.argv[2] if len(sys.argv) > 2 else "public/tapa-hex.png"

W = 660  # el hexágono se imprime a 22 mm: 660 px sobran para 300+ dpi
H = round(W * 1.1547)  # proporción del hexágono regular punta-arriba
SS = 4  # supersampling, para que los bordes no queden dentados
ENCUADRE = 0.28  # 0 = pegado arriba, 1 = pegado abajo

src = Image.open(ORIGEN).convert("RGB")

# recorte tipo "cover": llena el hexágono sin deformar la foto
sw, sh = src.size
escala = max(W / sw, H / sh)
img = src.resize((round(sw * escala), round(sh * escala)), Image.LANCZOS)
nw, nh = img.size
left = (nw - W) // 2
top = round((nh - H) * ENCUADRE)
img = img.crop((left, top, left + W, top + H))

# máscara hexagonal
mascara = Image.new("L", (W * SS, H * SS), 0)
ImageDraw.Draw(mascara).polygon(
    [
        (0.50 * W * SS, 0),
        (1.00 * W * SS, 0.25 * H * SS),
        (1.00 * W * SS, 0.75 * H * SS),
        (0.50 * W * SS, 1.00 * H * SS),
        (0.00 * W * SS, 0.75 * H * SS),
        (0.00 * W * SS, 0.25 * H * SS),
    ],
    fill=255,
)
mascara = mascara.resize((W, H), Image.LANCZOS)

salida = Image.new("RGBA", (W, H), (0, 0, 0, 0))
salida.paste(img, (0, 0), mascara)
salida.save(DESTINO)
print(f"listo {DESTINO} {salida.size}")
