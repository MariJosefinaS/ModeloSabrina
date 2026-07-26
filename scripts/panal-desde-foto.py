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
 2. RECORTA cada pieza con su hexágono (`orig` de la constante PIEZAS, en px
    de la imagen enderezada). Los marcos vacíos llevan además el `hueco`,
    que va descentrado porque el aro es una pieza con espesor vista en
    ángulo.
 3. RECOLOCA cada pieza donde diga `dest`. La pared es apaisada (aspecto
    1.34) y el panel de la tapa es angosto y alto (93 × 128 mm libres), así
    que la composición apaisada entraba chica: las fotos se imprimían a
    ~25 mm. Bajando las piezas del borde derecho el racimo pasa a vertical
    (aspecto 0.84) y las fotos suben a ~29-34 mm. `dest` por omisión = `orig`.
 4. REEMPLAZA las 3 fotos de la pared (escenas generales del sanatorio) por
    las que mandó el sanatorio: piel con piel, amamantando y las manos de
    mamá y bebé. Ver la constante FOTOS.
 5. CONSERVA las letras en relieve de "COMPROMISO", que están montadas sobre
    la pared dentro del marco: se rescatan por luminancia.

Los marcos se dibujan AL FINAL: en la pared real los aros van superpuestos
encima de las piezas sólidas, y ese es el efecto que hay que conservar.

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

M = cv2.getPerspectiveTransform(
    np.float32(QUAD),
    np.float32([[MX, MY], [MX + PW, MY], [MX + PW, MY + PH], [MX, MY + PH]]),
)
pared = cv2.warpPerspective(cv2.imread(ORIGEN), M,
                            (PW + 2 * MX, PH + 2 * MY), flags=cv2.INTER_LANCZOS4)

# Un poco de contraste: la foto de celular sale lavada. Va acá, sobre la
# pared sola, para no tocar las fotos de mamá y bebé que se pegan después.
lab = cv2.cvtColor(pared, cv2.COLOR_BGR2LAB)
lab[:, :, 0] = cv2.createCLAHE(clipLimit=1.6, tileGridSize=(8, 8)).apply(lab[:, :, 0])
pared = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)

# ── 2. Las piezas ───────────────────────────────────────────────────
# orig / dest = (cx, cy, w) — w es el ancho plano a plano; el alto sale
# solo: w × 1.1547. `hueco` = el vacío del marco, en coordenadas de `orig`.
PIEZAS = [
    dict(k="marco-si",   orig=(234, 201, 262),  hueco=(232, 208, 224)),
    dict(k="EXCELENCIA", orig=(397, 383, 361)),
    # el hexágono del isologo también era dorado -> azul oscuro, con el
    # mapeo invertido para que el logo siga leyéndose
    dict(k="isologo",    orig=(1053, 241, 181), azular=True, invertir=True),
    dict(k="COMPROMISO", orig=(1011, 583, 350), hueco=(1015, 585, 286), letras=True),
    dict(k="CALIDAD",    orig=(277, 713, 227)),
    dict(k="marco-si2",  orig=(159, 580, 169),  hueco=(144, 588, 120)),
    dict(k="marco-ab",   orig=(653, 891, 256),  hueco=(655, 898, 214)),
    # ── piezas que se BAJAN desde el borde derecho, para que el racimo
    #    deje de ser apaisado y entre más grande en la tapa ──
    # OJO: sólo se mudan piezas LIMPIAS. En la pared varios hexágonos
    # sólidos están tapados en parte por un aro dorado; si se los mueve sin
    # su aro, la franja dorada viaja con ellos y queda como una mancha. Por
    # eso `azul-arr`, `azul-der`, `greige-esq` y `greige-ab` quedaron fuera:
    # los cuatro arrastraban dorado.
    dict(k="marco-sd",   orig=(1223, 165, 115), hueco=(1225, 163, 89),
         dest=(1080, 1200, 115)),
    # ── las 3 fotos: no se cortan de la pared, se rellenan con las del
    #    sanatorio, así que sólo necesitan destino ──
    dict(k="foto-A", dest=(785, 281, 400),  foto="mama-bebe"),
    dict(k="foto-B", dest=(561, 699, 345),  foto="amamantando"),
    dict(k="foto-C", dest=(940, 1000, 400), foto="manito"),
]

# Fotos que van adentro de los hexágonos. La pared muestra escenas
# generales del sanatorio (una enfermera, un pediatra, un paciente); el
# tríptico es de Maternidad, así que van mamá y bebé. Las mandó todas el
# sanatorio (copiadas a `Ejemplos/fotos-tapa/` con nombre claro):
#   mama-bebe   = "…18.22.25" mamá besando al recién nacido, a contraluz
#   amamantando = "…15.27.02 (2)" primer plano del agarre
#   manito      = "…18.22.24" la manito sobre la palma de la mamá
#   manos-alt   = "…18.22.31" el puñito entre las dos manos (alternativa)
#   cx/cy = centro del recorte (0..1), zoom = 1 es el encuadre completo.
FOTOS = {
    "mama-bebe": dict(src="Ejemplos/fotos-tapa/mama-bebe.jpg",
                      cx=0.46, cy=0.34, zoom=1.55),
    "amamantando": dict(src="Ejemplos/fotos-tapa/amamantando.jpg",
                        cx=0.52, cy=0.50, zoom=1.0),
    "manito": dict(src="Ejemplos/fotos-tapa/manito.jpg",
                   cx=0.52, cy=0.60, zoom=1.15),
    "manos-alt": dict(src="Ejemplos/fotos-tapa/manos-alt.jpg",
                      cx=0.55, cy=0.45, zoom=1.1),
}

# Cada pieza se mete un poco hacia adentro de su contorno: si no, entra la
# pared / la sombra y se ve un borde gris raro. Las fotos llenan el
# hexágono exacto, así que casi no necesitan margen.
DENTRO = {"solido": 6, "foto": 2, "marco": 3}

K = 1.1547


def hexpts(cx, cy, w, dx=0.0, dy=0.0):
    """Hexágono punta-arriba centrado en (cx, cy)."""
    h = w * K
    return np.int32(np.round([
        (cx + dx, cy + dy - h / 2), (cx + dx + w / 2, cy + dy - h / 4),
        (cx + dx + w / 2, cy + dy + h / 4), (cx + dx, cy + dy + h / 2),
        (cx + dx - w / 2, cy + dy + h / 4), (cx + dx - w / 2, cy + dy - h / 4),
    ]))


# Los aros de la pared son dorados. El stakeholder los quiere AZUL OSCURO,
# así que se recolorean con un duotono: se conserva el degradé metálico del
# aro (su luminancia) y se lo mapea entre estos dos azules. Las letras de
# COMPROMISO quedan fuera del recoloreo: en azul sobre la tapa azul no se
# leerían.
AZUL_SOMBRA = np.float32((60, 32, 6))     # BGR de #06203C
AZUL_LUZ = np.float32((216, 151, 74))     # BGR de #4A97D8


def azular(patch, mask, salvar=None, invertir=False):
    """Duotono azul sobre los píxeles de `mask`, salvo los de `salvar`.

    `invertir` da vuelta el mapeo (lo claro se va a oscuro). Hace falta en la
    pieza del isologo: ahí el fondo es claro y el logo oscuro, así que sin
    invertir quedaría un hexágono celeste, no azul oscuro.
    """
    zona = mask > 0 if salvar is None else (mask > 0) & (salvar == 0)
    if not zona.any():
        return patch
    L = cv2.cvtColor(patch, cv2.COLOR_BGR2LAB)[:, :, 0].astype(np.float32)
    lo, hi = np.percentile(L[zona], [3, 97])
    t = np.clip((L - lo) / max(hi - lo, 1e-3), 0, 1)
    if invertir:
        t = 1 - t
    t = t[..., None]
    patch = patch.copy()
    patch[zona] = (AZUL_SOMBRA + (AZUL_LUZ - AZUL_SOMBRA) * t)[zona].astype(np.uint8)
    return patch


def tipo_de(p):
    if "foto" in p:
        return "foto"
    return "marco" if "hueco" in p else "solido"


def inset(w, d):
    """Achica un hexágono d px hacia adentro (la apotema es w/2)."""
    return w - 2 * d


# ── 3. Lienzo de salida, según dónde caen las piezas ────────────────
for p in PIEZAS:
    if "orig" in p:          # las fotos no se cortan de la pared: sólo tienen dest
        p.setdefault("dest", p["orig"])
    p["tipo"] = tipo_de(p)

pts = np.vstack([hexpts(*p["dest"]) for p in PIEZAS])
OX, OY = 8 - pts[:, 0].min(), 8 - pts[:, 1].min()
OW = int(pts[:, 0].max() + OX + 8)
OH = int(pts[:, 1].max() + OY + 8)
salida = np.zeros((OH, OW, 3), np.uint8)
alpha = np.zeros((OH, OW), np.uint8)


def pegar(patch, mascara, dest):
    """Compone `patch` sobre la salida usando `mascara` (0..255)."""
    cx, cy, w = dest
    h = w * K
    x0 = int(round(cx + OX - w / 2))
    y0 = int(round(cy + OY - h / 2))
    ph, pw = patch.shape[:2]
    x1, y1 = min(x0 + pw, OW), min(y0 + ph, OH)
    x0c, y0c = max(x0, 0), max(y0, 0)
    if x1 <= x0c or y1 <= y0c:
        return
    sub = patch[y0c - y0:y1 - y0, x0c - x0:x1 - x0]
    m = mascara[y0c - y0:y1 - y0, x0c - x0:x1 - x0]
    hay = m > 0
    salida[y0c:y1, x0c:x1][hay] = sub[hay]
    np.maximum(alpha[y0c:y1, x0c:x1], m, out=alpha[y0c:y1, x0c:x1])


def recorte_pared(p):
    """Corta la pieza de la pared enderezada y la escala a su destino.

    OJO: `pared` lleva el margen (MX, MY) alrededor del panel, así que las
    coordenadas de PIEZAS —que son del panel— hay que correrlas.
    """
    ocx, ocy, ow = p["orig"]
    d = DENTRO[p["tipo"]]
    letras = None
    lienzo = np.zeros(pared.shape[:2], np.uint8)
    cv2.fillConvexPoly(lienzo, hexpts(ocx, ocy, inset(ow, d), MX, MY), 255)
    if "hueco" in p:
        # el hueco se agranda: así se come el canto interno oscuro del aro
        vacio = np.zeros_like(lienzo)
        cv2.fillConvexPoly(vacio, hexpts(p["hueco"][0], p["hueco"][1],
                                         inset(p["hueco"][2], -d), MX, MY), 255)
        if p.get("letras"):
            # Las letras en relieve están montadas sobre la pared DENTRO del
            # marco, así que hay que rescatarlas o el hueco se las lleva.
            #
            # No alcanza con la luminancia: dentro del marco COMPROMISO hay
            # un REFLEJO claro azulado arriba a la izquierda que también es
            # brillante y quedaba como un borrón. Se lo descarta acotando el
            # rescate a la FRANJA horizontal donde está la palabra (`banda`,
            # en fracción del alto del hueco). Probé además filtrar por color
            # (b* de Lab, las letras son doradas) pero eso se come el cuerpo
            # de las letras, que es casi blanco: con la franja alcanza.
            L = cv2.cvtColor(pared, cv2.COLOR_BGR2LAB)[:, :, 0]
            adentro = cv2.erode(vacio, np.ones((9, 9), np.uint8))
            hy0, hy1 = p.get("banda", (0.41, 0.62))
            hh = p["hueco"][2] * K
            franja = np.zeros_like(adentro)
            cy_h = p["hueco"][1] + MY
            franja[int(cy_h - hh / 2 + hh * hy0):int(cy_h - hh / 2 + hh * hy1)] = 255
            letras = ((L > np.median(L[adentro > 0]) + 16)
                      & (adentro > 0) & (franja > 0))
            letras = cv2.morphologyEx(letras.astype(np.uint8) * 255,
                                      cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
            n, lbl, st, _ = cv2.connectedComponentsWithStats(letras, 8)
            for i in range(1, n):
                if st[i, cv2.CC_STAT_AREA] < 60:
                    letras[lbl == i] = 0
            vacio = cv2.subtract(vacio, letras)
        lienzo = cv2.subtract(lienzo, vacio)

    ow_h = ow * K
    x0, y0 = int(round(ocx + MX - ow / 2)), int(round(ocy + MY - ow_h / 2))
    aw, ah = int(round(ow)), int(round(ow_h))
    patch = pared[y0:y0 + ah, x0:x0 + aw]
    m = lienzo[y0:y0 + ah, x0:x0 + aw]
    salvar = (letras[y0:y0 + ah, x0:x0 + aw] if letras is not None
              else np.zeros_like(m))

    if p["tipo"] == "marco" or p.get("azular"):
        patch = azular(patch, m, salvar, p.get("invertir", False))

    esc = p["dest"][2] / ow
    if abs(esc - 1) > 1e-3:
        nw, nh = int(round(aw * esc)), int(round(ah * esc))
        patch = cv2.resize(patch, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
        m = cv2.resize(m, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    return patch, m


def recorte_foto(p):
    """Rellena el hexágono de destino con la foto, a resolución plena."""
    cfg = FOTOS[p["foto"]]
    src = cv2.imread(os.path.join(RAIZ, cfg["src"].replace("/", os.sep)))
    if src is None:
        raise SystemExit(f"no encuentro {cfg['src']}")
    _, _, w = p["dest"]
    aw, ah = int(round(w)), int(round(w * K))
    sh, sw = src.shape[:2]
    esc = max(aw / sw, ah / sh) * cfg["zoom"]
    rz = cv2.resize(src, (round(sw * esc), round(sh * esc)),
                    interpolation=cv2.INTER_AREA)
    rh, rw = rz.shape[:2]
    x = min(max(round(rw * cfg["cx"] - aw / 2), 0), rw - aw)
    y = min(max(round(rh * cfg["cy"] - ah / 2), 0), rh - ah)
    patch = rz[y:y + ah, x:x + aw]
    m = np.zeros((ah, aw), np.uint8)
    cv2.fillConvexPoly(m, hexpts(aw / 2, ah / 2, inset(w, DENTRO["foto"])), 255)
    return patch, m


# ── 4. Se compone: primero sólidos y fotos, los marcos al final ─────
for p in sorted(PIEZAS, key=lambda q: q["tipo"] == "marco"):
    patch, m = recorte_foto(p) if p["tipo"] == "foto" else recorte_pared(p)
    pegar(patch, cv2.GaussianBlur(m, (0, 0), 0.9), p["dest"])

png = np.dstack([salida, alpha])
ys, xs = np.where(alpha > 8)
png = png[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
cv2.imwrite(DESTINO, png, [cv2.IMWRITE_PNG_COMPRESSION, 9])
print(f"listo {DESTINO} {png.shape[1]}x{png.shape[0]} "
      f"(aspecto {png.shape[1] / png.shape[0]:.2f})")
