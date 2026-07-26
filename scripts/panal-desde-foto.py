"""Genera `public/panal-pared.png`: el racimo hexagonal REAL de la pared de
la entrada del sanatorio, enderezado y con fondo transparente, para usarlo
como imagen de la tapa del tríptico (`app/hoja/page.tsx`).

Por qué así y no dibujado con vectores: se probaron 4 versiones vectoriales
del panal y el stakeholder las rechazó todas. Esta es la instalación real,
no una interpretación.

Qué hace:
 1. RECTIFICA la foto. La pared se fotografió en ángulo; con las 4 esquinas
    del panel oscuro (que en la realidad es un rectángulo) se calcula una
    homografía. Control de que salió bien: en la imagen enderezada los
    hexágonos miden alto/ancho = 1.1547, que es el valor de un hexágono
    regular punta-arriba.
 2. RECORTA cada pieza con su hexágono (constante PIEZAS, en px de la
    imagen enderezada). Los marcos vacíos llevan además el `hueco`, que va
    descentrado porque el aro es una pieza con espesor vista en ángulo.
 3. REEMPLAZA las 3 fotos de la pared (escenas generales del sanatorio)
    por fotos de mamá y bebé, que es de lo que habla el tríptico. Ver la
    constante FOTOS.
 4. CONSERVA las letras en relieve de "COMPROMISO", que están montadas
    sobre la pared dentro del marco: se rescatan por luminancia.

Uso:  python scripts/panal-desde-foto.py
"""

import os

import cv2
import numpy as np

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = os.path.join(RAIZ, "Ejemplos", "WhatsApp Image 2026-07-25 at 14.36.01.jpeg")
DESTINO = os.path.join(RAIZ, "public", "panal-pared.png")

# ── 1. Rectificación ────────────────────────────────────────────────
# esquinas del panel oscuro en la foto original (TL, TR, BR, BL)
QUAD = [(490.0, 296.5), (983.0, 200.0), (983.0, 646.0), (490.0, 649.5)]
PW, PH = 1400, 1050  # tamaño del panel ya enderezado
MX, MY = 60, 40      # margen, para que no se corte la pieza del borde
W, H = PW + 2 * MX, PH + 2 * MY

M = cv2.getPerspectiveTransform(
    np.float32(QUAD),
    np.float32([[MX, MY], [MX + PW, MY], [MX + PW, MY + PH], [MX, MY + PH]]),
)
img = cv2.warpPerspective(cv2.imread(ORIGEN), M, (W, H), flags=cv2.INTER_LANCZOS4)

# ── 2. Las piezas ───────────────────────────────────────────────────
# cx, cy, w en px de la imagen enderezada (w = ancho plano a plano; el alto
# sale solo: w × 1.1547). `hueco` = (cx, cy, w) del vacío de los marcos.
PIEZAS = [
    dict(cx=234, cy=201, w=262, hueco=(232, 208, 224)),   # marco sup-izq
    dict(cx=397, cy=383, w=361),                          # EXCELENCIA
    dict(cx=785, cy=281, w=400, foto="mama"),             # (era enfermera)
    dict(cx=997, cy=102, w=130),                          # azul chico arriba
    dict(cx=1053, cy=241, w=181),                         # greige con isologo
    dict(cx=1223, cy=165, w=115, hueco=(1225, 163, 89)),  # marco chico arr-der
    dict(cx=1311, cy=103, w=145),                         # greige esquina der
    dict(cx=1187, cy=446, w=189),                         # azul mediano der
    dict(cx=1011, cy=583, w=350, hueco=(1015, 585, 286),
         letras=True),                                    # marco COMPROMISO
    dict(cx=561, cy=699, w=345, foto="descanso"),         # (era pediatra)
    dict(cx=277, cy=713, w=227),                          # CALIDAD
    dict(cx=159, cy=580, w=169, hueco=(144, 588, 120)),   # marco chico izq
    dict(cx=653, cy=891, w=256, hueco=(655, 898, 214)),   # marco abajo
    dict(cx=1026, cy=801, w=130),                         # greige chico abajo
    dict(cx=1268, cy=715, w=256, foto="bebe"),            # (era paciente)
]

# Fotos que van adentro de los hexágonos. La pared muestra escenas
# generales del sanatorio (una enfermera, un pediatra, un paciente); el
# tríptico es de Maternidad, así que van mamá y bebé, y en tres ÁNGULOS
# distintos (de pie, acostada, primer plano).
#   cx/cy = centro del recorte (0..1), zoom = 1 es el encuadre completo.
# ⚠️ Son fotos de stock (Pexels, licencia libre) hasta que el sanatorio
#    mande las suyas.
# ⚠️ Se descartó `foto_6849541.jpg` (la vieja tapa) porque el bebé tiene
#    CHUPETE y el tríptico dice "sin chupete ni mamadera".
FOTOS = {
    "mama": dict(src="Ejemplos/lactancia-fotos/cand_7491340.jpg",
                 cx=0.51, cy=0.51, zoom=2.4),    # mamá de pie con el bebé
    "descanso": dict(src="Ejemplos/lactancia-fotos/foto_6392855.jpg",
                     cx=0.44, cy=0.50, zoom=1.1),  # mamá descansando con el bebé
    "bebe": dict(src="Ejemplos/lactancia-fotos/foto_4868548.jpg",
                 cx=0.44, cy=0.62, zoom=2.25),   # el bebé, en brazos
}


def hexpts(cx, cy, w):
    """Hexágono punta-arriba centrado en (cx, cy) — ya con el margen."""
    h = w * 1.1547
    cx, cy = cx + MX, cy + MY
    return np.int32([
        (cx, cy - h / 2), (cx + w / 2, cy - h / 4), (cx + w / 2, cy + h / 4),
        (cx, cy + h / 2), (cx - w / 2, cy + h / 4), (cx - w / 2, cy - h / 4),
    ])


def vacia():
    return np.zeros((H, W), np.uint8)


# ── 3. Fotos nuevas adentro de sus hexágonos ────────────────────────
for p in PIEZAS:
    if "foto" not in p:
        continue
    cfg = FOTOS[p["foto"]]
    src = cv2.imread(os.path.join(RAIZ, cfg["src"].replace("/", os.sep)))
    if src is None:
        raise SystemExit(f"no encuentro {cfg['src']}")
    aw, ah = int(round(p["w"])), int(round(p["w"] * 1.1547))
    sh, sw = src.shape[:2]
    esc = max(aw / sw, ah / sh) * cfg["zoom"]
    rz = cv2.resize(src, (round(sw * esc), round(sh * esc)), interpolation=cv2.INTER_AREA)
    rh, rw = rz.shape[:2]
    x = min(max(round(rw * cfg["cx"] - aw / 2), 0), rw - aw)
    y = min(max(round(rh * cfg["cy"] - ah / 2), 0), rh - ah)
    rec = rz[y:y + ah, x:x + aw]
    # se pega sólo dentro del hexágono, sobre la foto de la pared
    hx = vacia()
    cv2.fillConvexPoly(hx, hexpts(p["cx"], p["cy"], p["w"]), 255)
    px, py = int(p["cx"] + MX - p["w"] / 2), int(p["cy"] + MY - p["w"] * 1.1547 / 2)
    reg = hx[py:py + ah, px:px + aw] > 0
    img[py:py + ah, px:px + aw][reg] = rec[reg]

# ── 4. Máscara ──────────────────────────────────────────────────────
# Cada pieza se mete un poco hacia adentro de su contorno: si no, entra
# la pared / la sombra y se ve un borde gris raro. Las fotos nuevas
# llenan el hexágono exacto, así que casi no necesitan margen.
DENTRO = {"solido": 6, "foto": 2, "marco": 3}


def inset(w, d):
    """Achica un hexágono d px hacia adentro (la apotema es w/2)."""
    return w - 2 * d


solidos, todos, huecos = vacia(), vacia(), vacia()
for p in PIEZAS:
    tipo = "marco" if "hueco" in p else ("foto" if "foto" in p else "solido")
    d = DENTRO[tipo]
    cv2.fillConvexPoly(todos, hexpts(p["cx"], p["cy"], inset(p["w"], d)), 255)
    if "hueco" in p:
        # el hueco se agranda: así se come el canto interno oscuro del aro
        cv2.fillConvexPoly(huecos, hexpts(p["hueco"][0], p["hueco"][1],
                                          inset(p["hueco"][2], -d)), 255)
    else:
        cv2.fillConvexPoly(solidos, hexpts(p["cx"], p["cy"], inset(p["w"], d)), 255)

# un hueco sólo vacía donde no hay otra pieza sólida detrás
mask = cv2.subtract(todos, cv2.bitwise_and(huecos, cv2.bitwise_not(solidos)))

# las letras en relieve dentro del marco COMPROMISO (mucho más claras que
# la pared que tienen atrás)
L = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)[:, :, 0]
for p in PIEZAS:
    if not p.get("letras"):
        continue
    hueco = vacia()
    cv2.fillConvexPoly(hueco, hexpts(*p["hueco"]), 255)
    hueco = cv2.erode(hueco, np.ones((9, 9), np.uint8))
    letras = ((L > np.median(L[hueco > 0]) + 16) & (hueco > 0)).astype(np.uint8) * 255
    letras = cv2.morphologyEx(letras, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    n, lbl, st, _ = cv2.connectedComponentsWithStats(letras, 8)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] < 60:
            letras[lbl == i] = 0
    mask = cv2.bitwise_or(mask, letras)

alpha = cv2.GaussianBlur(mask, (0, 0), 0.9)

# ── 5. Un poco de contraste (la foto de celular sale lavada) ────────
lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
lab[:, :, 0] = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8)).apply(lab[:, :, 0])
img = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)

salida = np.dstack([img, alpha])
ys, xs = np.where(alpha > 8)
salida = salida[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
cv2.imwrite(DESTINO, salida, [cv2.IMWRITE_PNG_COMPRESSION, 9])
print(f"listo {DESTINO} {salida.shape[1]}x{salida.shape[0]}")
