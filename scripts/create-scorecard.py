#!/usr/bin/env python3
"""Create the print-ready ID Golf Invitational team scorecard."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageChops
from reportlab.lib.colors import Color, HexColor, black, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "id-golf-invitational-scorecard.pdf"
TMP = ROOT / "tmp" / "pdfs" / "scorecard"
IMG = ROOT / "public" / "invitational" / "img"
FONT = ROOT / "public" / "fonts"
SYSTEM_FONT = Path("/System/Library/Fonts/Supplemental")

MM = 72 / 25.4
PAGE_W, PAGE_H = landscape(A4)
HALF_W = PAGE_W / 2

INK = HexColor("#111111")
PAPER = HexColor("#F4F0E9")
PAPER_2 = HexColor("#FBF9F5")
ORANGE = HexColor("#E35B27")
ORANGE_DARK = HexColor("#C84B1D")
MUTED = HexColor("#6E6B66")
GRID = HexColor("#BDB6AC")
SOFT = HexColor("#E7E0D6")
GREEN = HexColor("#294B3A")


HOLES = list(range(1, 19))
PAR = [4, 4, 5, 3, 4, 4, 4, 3, 5, 5, 4, 4, 3, 4, 5, 4, 3, 4]
SI = [5, 13, 9, 11, 1, 15, 3, 7, 17, 12, 16, 2, 18, 4, 8, 14, 10, 6]
TEE_BLACK = [373, 272, 486, 192, 411, 377, 406, 181, 507, 491, 382, 383, 185, 374, 533, 423, 199, 375]
TEE_BLUE = [339, 257, 475, 174, 382, 345, 380, 165, 459, 470, 362, 375, 162, 362, 517, 391, 188, 349]
TEE_WHITE = [328, 257, 464, 161, 370, 333, 336, 159, 421, 461, 345, 365, 138, 327, 483, 368, 174, 335]
TEE_RED = [317, 250, 423, 144, 331, 316, 308, 132, 399, 442, 318, 322, 123, 323, 454, 312, 151, 302]


def register_fonts() -> None:
    # The site fonts are WOFF2 files; ReportLab embeds print-safe system TTF equivalents.
    pdfmetrics.registerFont(TTFont("Inter", str(SYSTEM_FONT / "Arial.ttf")))
    pdfmetrics.registerFont(TTFont("Barlow", str(SYSTEM_FONT / "Arial Narrow.ttf")))
    pdfmetrics.registerFont(TTFont("BarlowBold", str(SYSTEM_FONT / "Arial Narrow Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Bebas", str(SYSTEM_FONT / "Arial Narrow Bold.ttf")))


def sum9(values: list[int], first: bool) -> int:
    return sum(values[:9] if first else values[9:])


def fit_crop_image(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    im = Image.open(path)
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, w, h)
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(ImageReader(im), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")
    c.restoreState()


def trim_logo(path: Path) -> Path:
    TMP.mkdir(parents=True, exist_ok=True)
    out = TMP / f"trim-{path.stem}.png"
    if out.exists() and out.stat().st_mtime >= path.stat().st_mtime:
        return out

    im = Image.open(path).convert("RGBA")
    alpha = im.getchannel("A")
    alpha_bbox = alpha.getbbox()
    if alpha_bbox and alpha.getextrema()[0] < 255:
        bbox = alpha_bbox
    else:
        rgb = im.convert("RGB")
        bg = Image.new("RGB", rgb.size, "white")
        diff = ImageChops.difference(rgb, bg).convert("L").point(lambda p: 255 if p > 20 else 0)
        bbox = diff.getbbox() or (0, 0, im.width, im.height)
    pad = max(4, int(min(im.size) * 0.015))
    left, top, right, bottom = bbox
    bbox = (max(0, left - pad), max(0, top - pad), min(im.width, right + pad), min(im.height, bottom + pad))
    im.crop(bbox).save(out)
    return out


def draw_logo(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float) -> None:
    cropped = trim_logo(path)
    im = Image.open(cropped)
    iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(im), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def draw_tinted_logo(c: canvas.Canvas, path: Path, x: float, y: float, w: float, h: float, rgb: tuple[int, int, int]) -> None:
    """Render a monochrome transparent logo in a print-friendly brand-neutral tint."""
    cropped = trim_logo(path)
    source = Image.open(cropped).convert("RGBA")
    tinted_path = TMP / f"tinted-{path.stem}-{rgb[0]}-{rgb[1]}-{rgb[2]}.png"
    if not tinted_path.exists() or tinted_path.stat().st_mtime < cropped.stat().st_mtime:
        tinted = Image.new("RGBA", source.size, (*rgb, 0))
        tinted.putalpha(source.getchannel("A"))
        tinted.save(tinted_path)
    im = Image.open(tinted_path)
    iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    c.drawImage(ImageReader(im), x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, mask="auto")


def draw_text_logo(c: canvas.Canvas, name: str, x: float, y: float, w: float, h: float, serif: bool = False) -> None:
    font = "Times-Roman" if serif else "BarlowBold"
    max_size = 16
    size = max_size
    while size > 7 and pdfmetrics.stringWidth(name, font, size) > w:
        size -= 0.5
    c.setFillColor(INK)
    c.setFont(font, size)
    c.drawCentredString(x + w / 2, y + h / 2 - size * 0.3, name)


def line(c: canvas.Canvas, x1: float, y1: float, x2: float, y2: float, color=GRID, width=0.6) -> None:
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)


def exterior(c: canvas.Canvas) -> None:
    # Back cover: partner wall.
    c.setFillColor(PAPER)
    c.rect(0, 0, HALF_W, PAGE_H, fill=1, stroke=0)
    margin = 11 * MM
    c.setFillColor(ORANGE)
    c.setFont("BarlowBold", 8)
    c.drawString(margin, PAGE_H - 14 * MM, "ПАРТНЕРЫ ТУРНИРА")
    c.setFillColor(INK)
    heading = "СИЛЬНАЯ ИГРА. СИЛЬНЫЕ ПАРТНЕРЫ."
    heading_size = 23.0
    while pdfmetrics.stringWidth(heading, "Bebas", heading_size) > HALF_W - 2 * margin:
        heading_size -= 0.5
    c.setFont("Bebas", heading_size)
    c.drawString(margin, PAGE_H - 25 * MM, heading)

    partners = [
        ("pestovo-logo.png", "ПЕСТОВО", False),
        ("rngc-logo.png", "RNGC", False),
        (None, "ЦЕНТРСВЕТ", False),
        ("bosco-logo.png", "BOSCO", False),
        ("bonafide-full.png", "BONAFIDE MEDICINE", False),
        ("wintecare.png", "WINTECARE", False),
        (None, "YAMAGUCHI", False),
        ("moskotin-logo.png", "МИХАИЛ МОСКОТИН", False),
        ("squash-moscow.png", "СКВОШ-КЛУБ МОСКВА", False),
        ("nikolai-logo.png", "NIKOLAI YAREC", False),
        (None, "MUME", False),
        ("monomakh-logo.png", "MONOMAKH", False),
        None,
        ("ymel-logo.png", "YMEL GROUP GOLF", False),
    ]

    cols, rows = 3, 5
    grid_x = margin
    grid_y = 29 * MM
    grid_w = HALF_W - 2 * margin
    grid_h = PAGE_H - 62 * MM
    gap = 2.3 * MM
    cell_w = (grid_w - gap * (cols - 1)) / cols
    cell_h = (grid_h - gap * (rows - 1)) / rows

    for idx in range(cols * rows):
        col, row = idx % cols, idx // cols
        x = grid_x + col * (cell_w + gap)
        y = grid_y + (rows - 1 - row) * (cell_h + gap)
        partner = partners[idx] if idx < len(partners) else None
        if not partner:
            continue
        dark = bool(partner and partner[2])
        c.setFillColor(INK if dark else white)
        c.roundRect(x, y, cell_w, cell_h, 4, fill=1, stroke=0)
        filename, name, _ = partner
        logo_y = y + 7.2 * MM
        logo_h = cell_h - 10 * MM
        if filename:
            if name == "RNGC":
                draw_tinted_logo(c, IMG / filename, x + 3 * MM, logo_y, cell_w - 6 * MM, logo_h, (41, 75, 58))
            else:
                draw_logo(c, IMG / filename, x + 3 * MM, logo_y, cell_w - 6 * MM, logo_h)
        else:
            if name == "YAMAGUCHI":
                draw_text_logo(c, name, x + 3 * MM, logo_y, cell_w - 6 * MM, logo_h)
            else:
                draw_text_logo(c, name, x + 3 * MM, logo_y, cell_w - 6 * MM, logo_h, serif=name == "MUME")
        c.setFillColor(white if dark else MUTED)
        c.setFont("Barlow", 5.8)
        c.drawCentredString(x + cell_w / 2, y + 2.4 * MM, name)

    c.setFillColor(MUTED)
    c.setFont("Inter", 6.5)
    c.drawString(margin, 14.5 * MM, "Спасибо партнерам, которые делают этот день возможным.")
    c.setFont("BarlowBold", 7)
    c.drawString(margin, 9.5 * MM, "LIVE.INDOOR-GOLF.RU/T/ID-GOLF-INVITATIONAL-2026")

    # Front cover: deliberately light so every field remains writable with a ballpoint pen.
    c.setFillColor(PAPER_2)
    c.rect(HALF_W, 0, HALF_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.rect(HALF_W, 0, 4 * MM, PAGE_H, fill=1, stroke=0)

    # Subtle golf-ball motif, kept pale enough to write over.
    c.saveState()
    c.setStrokeColor(HexColor("#EFD5C9"))
    c.setLineWidth(0.7)
    motif_x = PAGE_W - 22 * MM
    motif_y = PAGE_H - 29 * MM
    for radius in (7, 12, 17, 22):
        c.circle(motif_x, motif_y, radius * MM, fill=0, stroke=1)
    c.restoreState()

    x = HALF_W + 18 * MM
    right = PAGE_W - 16 * MM
    c.setFillColor(INK)
    c.setFont("Bebas", 50)
    c.drawString(x, PAGE_H - 43 * MM, "ID GOLF")
    invitational = "INVITATIONAL 2026"
    invitational_size = 39.0
    while pdfmetrics.stringWidth(invitational, "Bebas", invitational_size) > right - x:
        invitational_size -= 0.5
    c.setFont("Bebas", invitational_size)
    c.drawString(x, PAGE_H - 59 * MM, invitational)
    c.setFillColor(ORANGE)
    c.setFont("BarlowBold", 17)
    c.drawString(x, PAGE_H - 70 * MM, "PRO-AM SCORECARD")
    line(c, x, PAGE_H - 78 * MM, right, PAGE_H - 78 * MM, GRID, 0.8)

    c.setFillColor(INK)
    c.setFont("BarlowBold", 15)
    c.drawString(x, PAGE_H - 93 * MM, "04 / 09 / 2026")
    c.setFillColor(INK)
    c.setFont("BarlowBold", 16)
    c.drawString(x, PAGE_H - 104 * MM, "ГОЛЬФ- И ЯХТ-КЛУБ «ПЕСТОВО»")
    c.setFillColor(MUTED)
    c.setFont("Inter", 9.5)
    c.drawString(x, PAGE_H - 110 * MM, "Москва")

    # Team information fields on the cover.
    c.setFillColor(white)
    c.setStrokeColor(SOFT)
    c.setLineWidth(0.8)
    c.roundRect(x, 36 * MM, right - x, 42 * MM, 7, fill=1, stroke=1)
    c.setFillColor(ORANGE)
    c.setFont("BarlowBold", 7)
    c.drawString(x + 6 * MM, 69 * MM, "КОМАНДА")
    c.drawString(x + 6 * MM, 52 * MM, "СТАРТОВОЕ ВРЕМЯ")
    c.drawString(x + 44 * MM, 52 * MM, "ЛУНКА")
    line(c, x + 6 * MM, 62 * MM, right - 6 * MM, 62 * MM, GRID, 0.7)
    line(c, x + 6 * MM, 45 * MM, x + 37 * MM, 45 * MM, GRID, 0.7)
    line(c, x + 44 * MM, 45 * MM, right - 6 * MM, 45 * MM, GRID, 0.7)

    draw_logo(c, ROOT / "src" / "assets" / "logo-wordmark.png", x, 14.2 * MM, 46 * MM, 8 * MM)
    c.setFillColor(ORANGE)
    c.setFont("BarlowBold", 7)
    c.drawRightString(right, 20 * MM, "PAR 72  /  18 ЛУНОК")

    # Fold guide is deliberately subtle and non-printing-looking.
    c.setDash(2, 3)
    line(c, HALF_W, 6 * MM, HALF_W, PAGE_H - 6 * MM, Color(0.6, 0.6, 0.6, alpha=0.3), 0.4)
    c.setDash()
    c.showPage()


def field(c: canvas.Canvas, label: str, x: float, y: float, w: float) -> None:
    c.setFillColor(MUTED)
    c.setFont("BarlowBold", 6.2)
    c.drawString(x, y + 2.2 * MM, label)
    line(c, x, y, x + w, y, GRID, 0.6)


def draw_cell_text(c: canvas.Canvas, value: str, x: float, y: float, w: float, h: float, font="BarlowBold", size=6.2, color=INK) -> None:
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawCentredString(x + w / 2, y + h / 2 - size * 0.33, value)


def score_grid(c: canvas.Canvas) -> None:
    c.setFillColor(PAPER_2)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    margin_x = 9 * MM
    top_y = PAGE_H - 12 * MM

    c.setFillColor(ORANGE)
    c.setFont("BarlowBold", 7.5)
    c.drawString(margin_x, top_y, "ID GOLF INVITATIONAL 2026")
    c.setFillColor(INK)
    c.setFont("Bebas", 26)
    c.drawString(margin_x, top_y - 10 * MM, "КОМАНДНАЯ СЧЕТНАЯ КАРТОЧКА")
    c.setFillColor(MUTED)
    c.setFont("Inter", 6.8)
    c.drawRightString(PAGE_W - margin_x, top_y - 8.5 * MM, "4 сентября 2026  |  Пестово  |  Pro-Am")

    fy = PAGE_H - 35 * MM
    field(c, "КОМАНДА", margin_x, fy, 48 * MM)
    field(c, "МАРКЕР", margin_x + 54 * MM, fy, 49 * MM)
    field(c, "СТАРТ", margin_x + 109 * MM, fy, 22 * MM)
    field(c, "ТИ 1 / 10", margin_x + 137 * MM, fy, 21 * MM)

    names_x = margin_x + 166 * MM
    names_w = PAGE_W - margin_x - names_x
    field(c, "ПРИМЕЧАНИЕ СУДЬИ", names_x, fy, names_w)

    # Compact player key, directly above the grid.
    key_y = PAGE_H - 46 * MM
    key_w = (PAGE_W - 2 * margin_x - 6 * MM) / 4
    for i, label in enumerate(["PRO", "ИГРОК 1", "ИГРОК 2", "ИГРОК 3"]):
        x = margin_x + i * (key_w + 2 * MM)
        c.setFillColor(SOFT if i else HexColor("#F2D7CC"))
        c.roundRect(x, key_y, key_w, 7.5 * MM, 3, fill=1, stroke=0)
        c.setFillColor(ORANGE if i == 0 else MUTED)
        c.setFont("BarlowBold", 5.7)
        c.drawString(x + 2 * MM, key_y + 4.5 * MM, label)
        c.setFillColor(INK)
        c.setFont("Inter", 6.3)
        c.drawString(x + 2 * MM, key_y + 1.5 * MM, "________________  HCP ____  ТИ ____")

    table_x = margin_x
    table_y = 23 * MM
    table_w = PAGE_W - 2 * margin_x
    table_h = key_y - table_y - 4 * MM
    # The first column doubles as a handwriting area for each player's name.
    label_w = 40 * MM
    data_w = (table_w - label_w) / 21

    columns = [str(n) for n in range(1, 10)] + ["OUT"] + [str(n) for n in range(10, 19)] + ["IN", "TOT"]

    rows = [
        ("ИМЯ / ЛУНКА", [str(n) for n in range(1, 10)] + ["OUT"] + [str(n) for n in range(10, 19)] + ["IN", "TOT"], "header"),
        ("PAR", [str(v) for v in PAR[:9]] + [str(sum9(PAR, True))] + [str(v) for v in PAR[9:]] + [str(sum9(PAR, False)), str(sum(PAR))], "meta"),
        ("SI", [str(v) for v in SI[:9]] + [""] + [str(v) for v in SI[9:]] + ["", ""], "meta"),
        ("ЧЕРНЫЕ", [str(v) for v in TEE_BLACK[:9]] + [str(sum9(TEE_BLACK, True))] + [str(v) for v in TEE_BLACK[9:]] + [str(sum9(TEE_BLACK, False)), str(sum(TEE_BLACK))], "tee_black"),
        ("СИНИЕ", [str(v) for v in TEE_BLUE[:9]] + [str(sum9(TEE_BLUE, True))] + [str(v) for v in TEE_BLUE[9:]] + [str(sum9(TEE_BLUE, False)), str(sum(TEE_BLUE))], "tee_blue"),
        ("БЕЛЫЕ", [str(v) for v in TEE_WHITE[:9]] + [str(sum9(TEE_WHITE, True))] + [str(v) for v in TEE_WHITE[9:]] + [str(sum9(TEE_WHITE, False)), str(sum(TEE_WHITE))], "tee_white"),
        ("КРАСНЫЕ", [str(v) for v in TEE_RED[:9]] + [str(sum9(TEE_RED, True))] + [str(v) for v in TEE_RED[9:]] + [str(sum9(TEE_RED, False)), str(sum(TEE_RED))], "tee_red"),
        ("PRO", [""] * 21, "pro"),
        ("ИГРОК 1", [""] * 21, "score"),
        ("ИГРОК 2", [""] * 21, "score"),
        ("ИГРОК 3", [""] * 21, "score"),
    ]
    row_h = table_h / len(rows)

    # Table backgrounds.
    for row_idx, (label, values, kind) in enumerate(rows):
        y = table_y + table_h - (row_idx + 1) * row_h
        bg = PAPER_2
        label_bg = SOFT
        label_color = INK
        if kind == "header":
            bg = INK
            label_bg = INK
            label_color = white
        elif kind == "meta":
            bg = HexColor("#F0ECE5")
        elif kind == "tee_black":
            label_bg = INK
            label_color = white
        elif kind == "tee_blue":
            label_bg = HexColor("#235C93")
            label_color = white
        elif kind == "tee_white":
            label_bg = white
        elif kind == "tee_red":
            label_bg = HexColor("#B63E35")
            label_color = white
        elif kind == "pro":
            bg = HexColor("#F9E7DF")
            label_bg = HexColor("#F2C4B1")

        c.setFillColor(bg)
        c.rect(table_x + label_w, y, table_w - label_w, row_h, fill=1, stroke=0)
        c.setFillColor(label_bg)
        c.rect(table_x, y, label_w, row_h, fill=1, stroke=0)

        c.setFillColor(label_color)
        if kind in ("pro", "score"):
            c.setFont("BarlowBold", 5.5)
            c.drawString(table_x + 2 * MM, y + row_h - 3.7 * MM, label)
            line(c, table_x + 2 * MM, y + 3.0 * MM, table_x + label_w - 2 * MM, y + 3.0 * MM, GRID, 0.45)
        else:
            c.setFont("BarlowBold", 6.0 if row_idx < 7 else 6.5)
            c.drawString(table_x + 2 * MM, y + row_h / 2 - 2.0, label)

        for col_idx, value in enumerate(values):
            x = table_x + label_w + col_idx * data_w
            if row_idx == 0:
                size = 8.0
            elif row_idx in (1, 2):
                size = 8.2
            elif row_idx in (3, 4, 5, 6):
                # Tee distances are large enough to read at a glance; four-digit
                # OUT / IN / TOT values stay slightly smaller to fit cleanly.
                size = 6.8 if col_idx in (9, 19, 20) else 7.5
            else:
                size = 7.0
            color = white if kind == "header" else INK
            draw_cell_text(c, value, x, y, data_w, row_h, size=size, color=color)

    # Grid lines and stronger OUT/IN/TOT separators.
    c.setStrokeColor(GRID)
    c.setLineWidth(0.45)
    for r in range(len(rows) + 1):
        yy = table_y + r * row_h
        c.line(table_x, yy, table_x + table_w, yy)
    c.line(table_x, table_y, table_x, table_y + table_h)
    c.line(table_x + label_w, table_y, table_x + label_w, table_y + table_h)
    for col_idx in range(22):
        xx = table_x + label_w + col_idx * data_w
        c.setLineWidth(1.0 if col_idx in (9, 10, 19, 20, 21) else 0.35)
        c.line(xx, table_y, xx, table_y + table_h)

    # Bottom instructions and signatures.
    c.setFillColor(MUTED)
    c.setFont("Inter", 5.8)
    c.drawString(margin_x, 15.5 * MM, "Записывайте фактический счет каждого игрока. На каждой лунке обведите два результата, входящих в командный счет.")
    c.drawString(margin_x, 11.5 * MM, "Проверьте суммы OUT / IN / TOT и подпишите карточку до передачи в судейскую коллегию.")

    # Reserved artwork area for the live-scoring QR code.
    qr_x = 169.5 * MM
    qr_y = 2.5 * MM
    qr_size = 19.5 * MM
    c.saveState()
    c.setFillColor(white)
    c.setStrokeColor(GRID)
    c.setLineWidth(0.7)
    c.setDash(2, 2)
    c.roundRect(qr_x, qr_y, qr_size, qr_size, 3, fill=1, stroke=1)
    c.setDash()
    c.setFillColor(INK)
    c.setFont("BarlowBold", 10)
    c.drawCentredString(qr_x + qr_size / 2, qr_y + 11.0 * MM, "QR")
    c.setFillColor(MUTED)
    c.setFont("BarlowBold", 4.4)
    c.drawCentredString(qr_x + qr_size / 2, qr_y + 6.7 * MM, "ЛАЙВ-СКОРИНГ")
    c.restoreState()

    field(c, "ПОДПИСЬ МАРКЕРА", PAGE_W - margin_x - 92 * MM, 11.5 * MM, 40 * MM)
    field(c, "ПОДПИСЬ КАПИТАНА", PAGE_W - margin_x - 44 * MM, 11.5 * MM, 44 * MM)

    c.setFillColor(ORANGE)
    c.setFont("BarlowBold", 6.5)
    c.drawRightString(PAGE_W - margin_x, 6 * MM, "LIVE.INDOOR-GOLF.RU/T/ID-GOLF-INVITATIONAL-2026")
    c.showPage()


def build() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    TMP.mkdir(parents=True, exist_ok=True)
    register_fonts()
    c = canvas.Canvas(str(OUT), pagesize=landscape(A4), pageCompression=1)
    c.setTitle("Счетная карточка - ID Golf Invitational Pro-Am")
    c.setAuthor("ID Golf - Indoor Golf Moscow")
    c.setSubject("Командная счетная карточка турнира 4 сентября 2026")
    exterior(c)
    score_grid(c)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
