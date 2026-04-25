import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from apps.catalog.models import Category, Product, ProductImage, ProductVariant

# Clear existing
Category.objects.all().delete()
Product.objects.all().delete()

# Categories
cat_men = Category.objects.create(name='Men', slug='men')
cat_women = Category.objects.create(name='Women', slug='women')
cat_acc = Category.objects.create(name='Accessories', slug='accessories')

products_data = [
    # MEN
    {
        "name": "Classic Oxford Shirt", "slug": "classic-oxford-shirt", "cat": cat_men, "price": 125.00,
        "desc": "A timeless wardrobe essential, expertly tailored from breathable, premium Italian cotton. Features a perfect collar roll and Mother of Pearl buttons.",
        "image": "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&q=80", "sku_prefix": "SHIRT-OX"
    },
    {
        "name": "Cashmere Blend Overcoat", "slug": "cashmere-blend-overcoat", "cat": cat_men, "price": 850.00,
        "desc": "Crafted from a luxurious wool and cashmere blend. Designed for a sleek, modern silhouette that layers perfectly over both suits and casual knitwear.",
        "image": "https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80", "sku_prefix": "COAT-CASH"
    },
    {
        "name": "Tailored Wool Trousers", "slug": "tailored-wool-trousers", "cat": cat_men, "price": 240.00,
        "desc": "Mid-weight virgin wool trousers with a subtle taper. Features side adjusters for a flawless fit without the need for a belt.",
        "image": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", "sku_prefix": "PANT-WOOL"
    },
    {
        "name": "Merino Crewneck Sweater", "slug": "merino-crewneck-sweater-men", "cat": cat_men, "price": 165.00,
        "desc": "Ultra-fine Merino wool crewneck. Naturally temperature-regulating and incredibly soft against the skin. A versatile layering piece.",
        "image": "https://images.unsplash.com/photo-1614031679006-25816da01514?w=800&q=80", "sku_prefix": "KNT-MER"
    },
    {
        "name": "Selvedge Denim Jeans", "slug": "selvedge-denim-jeans", "cat": cat_men, "price": 195.00,
        "desc": "Woven on vintage shuttle looms in Japan, these 13oz selvedge jeans offer a clean, slim-straight fit that molds to your body over time.",
        "image": "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80", "sku_prefix": "DNM-SLV"
    },

    # WOMEN
    {
        "name": "Silk Slip Dress", "slug": "silk-slip-dress", "cat": cat_women, "price": 320.00,
        "desc": "Elegance simplified. Cut on the bias from 100% heavy silk charmeuse, this dress drapes beautifully for an effortlessly glamorous look.",
        "image": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80", "sku_prefix": "DRS-SLK"
    },
    {
        "name": "Oversized Cashmere Turtleneck", "slug": "oversized-cashmere-turtleneck", "cat": cat_women, "price": 450.00,
        "desc": "The ultimate luxury knit. Spun from Grade-A Mongolian cashmere with an enveloping, relaxed fit and dropped shoulders.",
        "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80", "sku_prefix": "KNT-CASH"
    },
    {
        "name": "Double-Breasted Wool Blazer", "slug": "double-breasted-wool-blazer", "cat": cat_women, "price": 580.00,
        "desc": "A masterclass in modern tailoring. Featuring sharp padded shoulders, peaked lapels, and luxurious horn buttons.",
        "image": "https://images.unsplash.com/photo-1591369822096-11115560126a?w=800&q=80", "sku_prefix": "BLZ-DBL"
    },
    {
        "name": "Pleated Midi Skirt", "slug": "pleated-midi-skirt", "cat": cat_women, "price": 210.00,
        "desc": "Knife-pleated midi skirt that creates beautiful movement with every step. Sits high on the waist with a hidden zip closure.",
        "image": "https://images.unsplash.com/photo-1583496924845-a7738b556f08?w=800&q=80", "sku_prefix": "SKT-PLT"
    },
    {
        "name": "Linen Wrap Blouse", "slug": "linen-wrap-blouse", "cat": cat_women, "price": 145.00,
        "desc": "Breathable European linen crafted into a chic, adjustable wrap silhouette. Perfect for warm-weather sophistication.",
        "image": "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=80", "sku_prefix": "TOP-LNN"
    },

    # ACCESSORIES
    {
        "name": "Minimalist Leather Tote", "slug": "minimalist-leather-tote", "cat": cat_acc, "price": 380.00,
        "desc": "Handcrafted by artisans using full-grain Italian calf leather. Spacious enough for a 15-inch laptop, finished with microsuede lining.",
        "image": "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80", "sku_prefix": "BAG-TOTE"
    },
    {
        "name": "Automatic Chronograph Watch", "slug": "automatic-chronograph-watch", "cat": cat_acc, "price": 1250.00,
        "desc": "Swiss-made automatic movement housed in surgical-grade stainless steel. Sapphire crystal face and a genuine alligator leather strap.",
        "image": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", "sku_prefix": "WTC-CHR"
    },
    {
        "name": "Acetate Sunglasses", "slug": "acetate-sunglasses", "cat": cat_acc, "price": 185.00,
        "desc": "Vintage-inspired frames crafted from durable, hand-polished Italian acetate. Equipped with polarized CR-39 lenses offering 100% UV protection.",
        "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80", "sku_prefix": "SUN-ACT"
    },
    {
        "name": "Leather Cardholder", "slug": "leather-cardholder", "cat": cat_acc, "price": 75.00,
        "desc": "Slim profile cardholder with four card slots and a central compartment. Features hand-painted edges and understated blind embossing.",
        "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80", "sku_prefix": "WLT-CRD"
    },
    {
        "name": "Cashmere Scarf", "slug": "cashmere-scarf", "cat": cat_acc, "price": 150.00,
        "desc": "Woven in Scotland from premium cashmere yarn. Incredibly soft, warm, and finished with classic fringed ends.",
        "image": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80", "sku_prefix": "ACC-SCF"
    }
]

for data in products_data:
    p = Product.objects.create(
        name=data["name"],
        slug=data["slug"],
        description=data["desc"],
        base_price=data["price"],
        category=data["cat"]
    )
    ProductImage.objects.create(product=p, url=data["image"], sort_order=0)
    
    # Add a couple of sizes/variants
    if data["cat"] == cat_acc:
        ProductVariant.objects.create(product=p, sku=f'{data["sku_prefix"]}-OS', attributes={'size': 'OS'})
    else:
        ProductVariant.objects.create(product=p, sku=f'{data["sku_prefix"]}-S', attributes={'size': 'S'})
        ProductVariant.objects.create(product=p, sku=f'{data["sku_prefix"]}-M', attributes={'size': 'M'})
        ProductVariant.objects.create(product=p, sku=f'{data["sku_prefix"]}-L', attributes={'size': 'L'})

print(f"Database seeded successfully with {len(products_data)} premium products!")
