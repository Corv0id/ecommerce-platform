import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from apps.catalog.models import Category, Product, ProductImage, ProductVariant
from faker import Faker

fake = Faker()

def run():
    print("Clearing database...")
    Category.objects.all().delete()
    Product.objects.all().delete()

    print("Creating Categories...")
    # Parent Categories
    cat_men = Category.objects.create(name='Men', slug='men')
    cat_women = Category.objects.create(name='Women', slug='women')

    # Sub-categories
    men_pull = Category.objects.create(name='Pull', slug='men-pull', parent=cat_men)
    men_pantalon = Category.objects.create(name='Pantalon', slug='men-pantalon', parent=cat_men)
    men_montres = Category.objects.create(name='Montres', slug='men-montres', parent=cat_men)
    
    women_robes = Category.objects.create(name='Robes', slug='women-robes', parent=cat_women)
    women_sacs = Category.objects.create(name='Sacs', slug='women-sacs', parent=cat_women)
    women_parfum = Category.objects.create(name='Parfum', slug='women-parfum', parent=cat_women)

    categories_map = {
        'men_pull': men_pull,
        'men_pantalon': men_pantalon,
        'men_montres': men_montres,
        'women_robes': women_robes,
        'women_sacs': women_sacs,
        'women_parfum': women_parfum,
    }

    print("Generating 50+ Premium Products...")
    
    # Pre-defined high-quality unsplash images for different types
    images = {
        'men_pull': ["https://images.unsplash.com/photo-1614031679006-25816da01514?w=800&q=80", "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"],
        'men_pantalon': ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80", "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&q=80"],
        'men_montres': ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80"],
        'women_robes': ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80", "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"],
        'women_sacs': ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"],
        'women_parfum': ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80", "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"]
    }

    product_names = {
        'men_pull': ['Cashmere V-Neck', 'Merino Wool Sweater', 'Chunky Knit Cardigan', 'Turtleneck Pullover', 'Classic Crewneck'],
        'men_pantalon': ['Tailored Wool Trousers', 'Selvedge Denim Jeans', 'Chino Pants', 'Linen Blend Trousers', 'Slim Fit Slacks'],
        'men_montres': ['Automatic Chronograph', 'Diver Pro Watch', 'Minimalist Leather Watch', 'Titanium Aviator', 'Classic Dress Watch'],
        'women_robes': ['Silk Slip Dress', 'Wrap Midi Dress', 'Linen Summer Gown', 'Velvet Evening Dress', 'Pleated Maxi Dress'],
        'women_sacs': ['Leather Tote Bag', 'Crossbody Satchel', 'Mini Bucket Bag', 'Quilted Shoulder Bag', 'Canvas Weekender'],
        'women_parfum': ['Oud Wood Extrait', 'Rose & Amber EDP', 'Citrus Blossom EDT', 'Vanilla Noir', 'Jasmine & Sandalwood']
    }

    total_created = 0

    for cat_key, category in categories_map.items():
        # Create 10 products per category
        for i in range(10):
            base_name = random.choice(product_names[cat_key])
            name = f"{base_name} - Edition {fake.year()}"
            slug = fake.unique.slug()
            price = round(random.uniform(90.00, 1500.00), 2)
            desc = fake.paragraph(nb_sentences=4)

            p = Product.objects.create(
                name=name,
                slug=slug,
                description=desc,
                base_price=price,
                category=category,
                status=Product.Status.PUBLISHED
            )

            # Assign image
            img_url = random.choice(images[cat_key])
            ProductImage.objects.create(product=p, url=img_url, sort_order=0)

            # Add variants based on category
            if 'montres' in cat_key or 'sacs' in cat_key or 'parfum' in cat_key:
                ProductVariant.objects.create(product=p, sku=f"{slug.upper()}-OS", attributes={'size': 'OS'})
            else:
                for size in ['S', 'M', 'L']:
                    ProductVariant.objects.create(product=p, sku=f"{slug.upper()}-{size}", attributes={'size': size})
            
            total_created += 1

    print(f"Success! {total_created} products generated with prices in TND.")

if __name__ == "__main__":
    run()
