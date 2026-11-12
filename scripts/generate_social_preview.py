import hashlib
import json
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "cronograma.json"
OUTPUT = ROOT / "assets" / "img" / "cronograma-social.png"
INDEX = ROOT / "index.html"
SOCIAL_IMAGE_URL = "https://dacorrientes.com.ar/assets/img/cronograma-social.png"
LOGO = ROOT / "image" / "logo.png"
MONTHS = (
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
)


def load_font(size):
    for path in (
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
    ):
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def find_active_schedules(data, today):
    schedules = []
    schedule_types = dict.fromkeys(
        schedule["tipo"]
        for month_data in data
        for schedule in month_data["cronogramas"]
    )
    for schedule_type in schedule_types:
        for month_data in data:
            schedule = next(
                (
                    item
                    for item in month_data["cronogramas"]
                    if item["tipo"] == schedule_type and item.get("activo")
                ),
                None,
            )
            if schedule is None:
                continue
            last_payment = max(
                date(int(month_data["anio"]), int(month_data["mes"]), int(item["fecha"]))
                for item in schedule["dias"]
            )
            if last_payment >= today:
                schedules.append((month_data, schedule))
                break
    return schedules


def format_full_date(year, month, day):
    payment_date = date(int(year), int(month), int(day))
    weekdays = (
        "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo",
    )
    return (
        f"{weekdays[payment_date.weekday()].capitalize()} "
        f"{payment_date.day} de {MONTHS[payment_date.month - 1]} de {payment_date.year}"
    )


def update_social_image_url(version):
    content = INDEX.read_text(encoding="utf-8")
    marker = '<meta property="og:image" content="'
    start = content.index(marker) + len(marker)
    end = content.index('"', start)
    image_url = content[start:end].split("?", 1)[0]
    if image_url != SOCIAL_IMAGE_URL:
        raise ValueError(f"Unexpected social image URL: {image_url}")

    versioned_url = f"{SOCIAL_IMAGE_URL}?v={version}"
    updated_content = content[:start] + versioned_url + content[end:]
    if updated_content != content:
        INDEX.write_text(updated_content, encoding="utf-8")


def main():
    with SOURCE.open(encoding="utf-8") as file:
        data = json.load(file)

    today = date.today()
    schedules = find_active_schedules(data, today)
    width, height = 1200, 630
    image = Image.new("RGB", (width, height), "#f4f8f5")
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, width, 126), fill="#198754")
    logo = Image.open(LOGO).convert("RGBA")
    logo.thumbnail((78, 78), Image.Resampling.LANCZOS)
    image.paste(logo, (48, 24), logo)
    draw.text((144, 27), "CRONOGRAMA DE PAGOS", font=load_font(38), fill="white")
    draw.text(
        (146, 80),
        "DOCENTES DE CORRIENTES",
        font=load_font(19),
        fill="#e1f3e7",
    )

    if schedules:
        month_data = schedules[0][0]
        month_name = MONTHS[int(month_data["mes"]) - 1].capitalize()
        period = f"{month_name} {month_data['anio']}"
    else:
        period = "Fechas actualizadas en la web"

    draw.text((width - 52, 51), period, font=load_font(25), fill="white", anchor="ra")

    if not schedules:
        draw.text(
            (52, 220),
            "Consultá el cronograma vigente en dacorrientes.com.ar",
            font=load_font(26),
            fill="#34443a",
        )
    else:
        gap = 18
        card_width = (width - 2 * 52 - gap * (len(schedules) - 1)) // len(schedules)
        card_top, card_bottom = 145, 572
        for index, (month_data, schedule) in enumerate(schedules):
            left = 52 + index * (card_width + gap)
            right = left + card_width
            draw.rounded_rectangle(
                (left, card_top, right, card_bottom),
                radius=14,
                fill="white",
                outline="#d9e6dc",
                width=2,
            )
            title = schedule["titulo"]
            title_font = load_font(19 if len(title) > 24 else 22)
            draw.text((left + 18, card_top + 20), title, font=title_font, fill="#198754")
            draw.line(
                (left + 18, card_top + 62, right - 18, card_top + 62),
                fill="#d9e6dc",
                width=2,
            )
            row_top = card_top + 72
            row_height = 70
            for row_index, item in enumerate(schedule["dias"]):
                y = row_top + row_index * row_height
                if y + row_height > card_bottom - 4:
                    break
                if row_index % 2 == 0:
                    draw.rounded_rectangle(
                        (left + 12, y, right - 12, y + row_height - 4),
                        radius=7,
                        fill="#f3f8f4",
                    )
                draw.text(
                    (left + 22, y + 6),
                    item["dia"],
                    font=load_font(17),
                    fill="#34443a",
                )
                draw.text(
                    (left + 112, y + 6),
                    f"DNI {item['dni']}",
                    font=load_font(17),
                    fill="#34443a",
                )
                payment_date = format_full_date(
                    month_data["anio"], month_data["mes"], item["fecha"]
                )
                draw.text(
                    (left + 22, y + 28),
                    f"Pago: {payment_date}",
                    font=load_font(13),
                    fill="#212529",
                )
                atm_date = str(item.get("fecha_cajeros", "")).strip()
                if atm_date:
                    full_atm_date = format_full_date(
                        month_data["anio"], month_data["mes"], atm_date
                    )
                    draw.text(
                        (left + 22, y + 48),
                        f"Cajeros: {full_atm_date}",
                        font=load_font(12),
                        fill="#6c757d",
                    )

    draw.text(
        (52, 584),
        "Más información en dacorrientes.com.ar",
        font=load_font(18),
        fill="#59675d",
    )
    image.save(OUTPUT, format="PNG", optimize=True)
    version = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()[:12]
    update_social_image_url(version)
    print(f"Imagen generada: {OUTPUT}")


if __name__ == "__main__":
    main()
