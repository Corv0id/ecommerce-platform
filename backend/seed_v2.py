import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from apps.catalog.models import Category, Product, ProductImage, ProductVariant, Wishlist
from apps.accounts.models import Address
from apps.orders.models import Order, OrderLine
from django.contrib.auth import get_user_model

User = get_user_model()

def run():
    print("Clearing database...")
    OrderLine.objects.all().delete()
    Order.objects.all().delete()
    Wishlist.objects.all().delete()
    Address.objects.all().delete()
    User.objects.filter(email='test@example.com').delete()
    Category.objects.all().delete()
    Product.objects.all().delete()

    print("Creating Categories...")
    # Parent Categories
    cat_men = Category.objects.create(name='Men', slug='men')
    cat_women = Category.objects.create(name='Women', slug='women')

    # Sub-categories
    men_pull = Category.objects.create(name='Sweaters & Hoodies', slug='men-sweaters', parent=cat_men)
    men_pantalon = Category.objects.create(name='Pants & Jeans', slug='men-pants', parent=cat_men)
    men_montres = Category.objects.create(name='Watches', slug='men-watches', parent=cat_men)
    
    women_robes = Category.objects.create(name='Dresses', slug='women-dresses', parent=cat_women)
    women_sacs = Category.objects.create(name='Handbags', slug='women-handbags', parent=cat_women)
    women_parfum = Category.objects.create(name='Perfumes', slug='women-perfumes', parent=cat_women)

    print("Generating Premium Products...")
    
    # Highly specific realistic products
    products_data = [
        # Men - Pulls
        {
            "cat": men_pull,
            "name": "Navy Merino Wool Sweater",
            "desc": "A timeless classic. This crew neck sweater is knitted in Italy from 100% extra-fine merino wool. Its tailored fit offers a modern silhouette, while the softness of the fiber guarantees exceptional comfort all day long.",
            "price": 185.000,
            "imgs": ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80", "https://images.unsplash.com/photo-1614031679006-25816da01514?w=800&q=80"]
        },
        {
            "cat": men_pull,
            "name": "Essential Organic Cotton Hoodie",
            "desc": "Designed for everyday comfort and style. This heavy hoodie is made from certified organic cotton. It features a relaxed fit, a spacious kangaroo pocket, and sturdy ribbed trims.",
            "price": 145.000,
            "imgs": ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"]
        },
        # Men - Pantalons
        {
            "cat": men_pantalon,
            "name": "Slim Raw Selvedge Jeans",
            "desc": "The ultimate denim for purists. These jeans are cut from 13oz Japanese canvas, known for its durability and unique patina over time. Slim fit, contrasting stitching, and copper finishes.",
            "price": 220.000,
            "imgs": ["https://images.unsplash.com/photo-1542272201-b1ca555f8505?w=800&q=80", "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80"]
        },
        {
            "cat": men_pantalon,
            "name": "Tailored Beige Chino Pants",
            "desc": "The perfect alternative to jeans. These stretch cotton twill chinos offer unmatched freedom of movement while maintaining a dressy look. Ideal for the office or the weekend.",
            "price": 160.000,
            "imgs": ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80"]
        },
        # Men - Montres
        {
            "cat": men_montres,
            "name": "Limited Edition Chronograph Watch",
            "desc": "Mechanical elegance on the wrist. Featuring a Swiss automatic movement, a polished 42mm stainless steel case, and a hand-stitched genuine calf leather strap. Water-resistant up to 50 meters.",
            "price": 1250.000,
            "imgs": ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80"]
        },
        # Women - Robes
        {
            "cat": women_robes,
            "name": "Floral Silk Maxi Dress",
            "desc": "The embodiment of fluidity and femininity. This maxi dress features a delicate exclusive floral motif printed on lightweight crepe de chine silk. Deep V-neck and subtle side slit.",
            "price": 380.000,
            "imgs": ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80", "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"]
        },
        {
            "cat": women_robes,
            "name": "Onyx Black Pleated Midi Dress",
            "desc": "The little black dress reinvented. Mid-length cut with fine pleated details that gracefully follow your movements. Wrinkle-resistant fabric ideal for elegant evenings or professional events.",
            "price": 240.000,
            "imgs": ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"]
        },
        # Women - Sacs
        {
            "cat": women_sacs,
            "name": "Full Grain Leather Tote Bag",
            "desc": "Designed to accompany your everyday life with sophistication. This large tote bag can hold a 15-inch laptop and all your essentials. Suede-lined interior with a detachable zippered pouch.",
            "price": 450.000,
            "imgs": ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80", "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"]
        },
        # Women - Parfums
        {
            "cat": women_parfum,
            "name": "Amber & Neroli Eau de Parfum",
            "desc": "A captivating trail that blends the luminous brightness of orange blossom with the sensual warmth of precious amber. Created by master perfumers in Grasse, this fragrance offers exceptional longevity.",
            "price": 195.000,
            "imgs": ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80", "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80"]
        }
    ]

    import string
    
    def generate_slug(name):
        slug = name.lower().replace(" ", "-").replace("&", "et").replace("à", "a").replace("é", "e")
        valid_chars = "-%s%s" % (string.ascii_letters, string.digits)
        return ''.join(c for c in slug if c in valid_chars) + f"-{random.randint(100,999)}"

    for data in products_data:
        p = Product.objects.create(
            name=data["name"],
            slug=generate_slug(data["name"]),
            description=data["desc"],
            base_price=data["price"],
            category=data["cat"],
            status=Product.Status.PUBLISHED
        )

        # Assign images
        for idx, img_url in enumerate(data["imgs"]):
            ProductImage.objects.create(product=p, url=img_url, sort_order=idx, is_primary=(idx == 0))

        # Add variants
        if 'montres' in data["cat"].slug or 'sacs' in data["cat"].slug or 'parfums' in data["cat"].slug:
            ProductVariant.objects.create(product=p, sku=f"{p.slug.upper()}-OS", attributes={'size': 'Taille Unique'})
        else:
            for size in ['S', 'M', 'L']:
                ProductVariant.objects.create(product=p, sku=f"{p.slug.upper()}-{size}", attributes={'size': size})

    print("Creating Test User: test@example.com / Test1234*")
    test_user = User.objects.create_user(
        email='test@example.com',
        password='Test1234*',
        first_name='Amine',
        last_name='Ben Ali'
    )

    print("Adding Addresses...")
    Address.objects.create(
        user=test_user, line1='Avenue Habib Bourguiba', city='Tunis', postal_code='1000', country='Tunisie', is_default=True
    )

    print("Adding Wishlist & Orders...")
    all_products = list(Product.objects.all())
    if len(all_products) >= 3:
        Wishlist.objects.create(user=test_user, product=all_products[0])
        Wishlist.objects.create(user=test_user, product=all_products[2])

        order1 = Order.objects.create(user=test_user, total_amount=all_products[0].base_price, status='DELIVERED')
        OrderLine.objects.create(order=order1, variant=all_products[0].variants.first(), quantity=1, unit_price=all_products[0].base_price, line_total=all_products[0].base_price)

    print("Seeding complete.")

if __name__ == "__main__":
    run()

