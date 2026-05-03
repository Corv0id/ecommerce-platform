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
    men_jackets = Category.objects.create(name='Jackets & Coats', slug='men-jackets', parent=cat_men)
    men_active = Category.objects.create(name='Activewear', slug='men-active', parent=cat_men)
    men_montres = Category.objects.create(name='Watches', slug='men-watches', parent=cat_men)
    men_shoes = Category.objects.create(name='Shoes & Footwear', slug='men-shoes', parent=cat_men)
    men_accessories = Category.objects.create(name='Accessories', slug='men-accessories', parent=cat_men)
    
    women_robes = Category.objects.create(name='Dresses', slug='women-dresses', parent=cat_women)
    women_sacs = Category.objects.create(name='Handbags', slug='women-handbags', parent=cat_women)
    women_coats = Category.objects.create(name='Coats & Jackets', slug='women-coats', parent=cat_women)
    women_shoes = Category.objects.create(name='Shoes & Footwear', slug='women-shoes', parent=cat_women)
    women_jewelry = Category.objects.create(name='Jewelry', slug='women-jewelry', parent=cat_women)
    women_beauty = Category.objects.create(name='Beauty & Fragrance', slug='women-beauty', parent=cat_women)

    print("Generating Premium Products...")
    
    # Highly specific realistic products matching FakestoreAPI exactly
    products_data = [
        # Men - Sweaters & Hoodies
        {
            "cat": men_pull,
            "name": "Navy Merino Wool Sweater",
            "desc": "A timeless classic. This crew neck sweater is knitted in Italy from 100% extra-fine merino wool. Its tailored fit offers a modern silhouette, while the softness of the fiber guarantees exceptional comfort all day long.",
            "price": 185.000,
            "imgs": ["http://localhost:3000/products/sweater_navy.png"]
        },
        {
            "cat": men_pull,
            "name": "Essential Organic Cotton Hoodie",
            "desc": "Designed for everyday comfort and style. This heavy hoodie is made from certified organic cotton. It features a relaxed fit, a spacious kangaroo pocket, and sturdy ribbed trims.",
            "price": 145.000,
            "imgs": ["http://localhost:3000/products/hoodie_black.png"]
        },
        # Men - Pants & Jeans
        {
            "cat": men_pantalon,
            "name": "Slim Raw Selvedge Jeans",
            "desc": "The ultimate denim for purists. These jeans are cut from 13oz Japanese canvas, known for its durability and unique patina over time. Slim fit, contrasting stitching, and copper finishes.",
            "price": 220.000,
            "imgs": ["http://localhost:3000/products/jeans_selvedge.png"]
        },
        {
            "cat": men_pantalon,
            "name": "Tailored Beige Chino Pants",
            "desc": "The perfect alternative to jeans. These stretch cotton twill chinos offer unmatched freedom of movement while maintaining a dressy look. Ideal for the office or the weekend.",
            "price": 160.000,
            "imgs": ["http://localhost:3000/products/chinos_beige.png"]
        },
        # Men - Jackets & Coats
        {
            "cat": men_jackets,
            "name": "Black Leather Biker Jacket",
            "desc": "An iconic piece crafted from premium lambskin leather. Features a classic asymmetrical zip closure, silver-tone hardware, and a tailored slim fit that ages beautifully over time.",
            "price": 550.000,
            "imgs": ["https://images.unsplash.com/photo-1520975954732-57dd22299614?w=800&q=80"]
        },
        # Men - Activewear
        {
            "cat": men_active,
            "name": "Performance Breathable T-Shirt",
            "desc": "Designed for high-intensity training. This T-shirt is made from moisture-wicking recycled polyester with laser-cut ventilation zones to keep you cool and dry.",
            "price": 85.000,
            "imgs": ["https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80"]
        },
        # Men - Watches & Accessories
        {
            "cat": men_montres,
            "name": "Limited Edition Chronograph Watch",
            "desc": "Mechanical elegance on the wrist. Featuring a Swiss automatic movement, a polished 42mm stainless steel case, and a hand-stitched genuine calf leather strap. Water-resistant up to 50 meters.",
            "price": 1250.000,
            "imgs": ["http://localhost:3000/products/watch_luxury.png"]
        },
        {
            "cat": men_accessories,
            "name": "Classic Aviator Sunglasses",
            "desc": "Premium aviator sunglasses with a lightweight gold-tone metal frame and polarized dark green lenses. Offers 100% UV protection with an iconic, universally flattering pilot shape.",
            "price": 180.000,
            "imgs": ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"]
        },
        {
            "cat": men_accessories,
            "name": "Pure Cashmere Winter Scarf",
            "desc": "Woven in Scotland from 100% pure cashmere, this supremely soft scarf provides exceptional warmth without the bulk. Finished with classic fringed ends.",
            "price": 120.000,
            "imgs": ["https://images.unsplash.com/photo-1520903074092-22ed9b27a3c3?w=800&q=80"]
        },
        {
            "cat": men_accessories,
            "name": "Designer Italian Silk Tie",
            "desc": "Add a touch of sophistication to your formal attire. This tie is hand-finished in Italy from heavy silk twill with a refined geometric pattern.",
            "price": 95.000,
            "imgs": ["https://images.unsplash.com/photo-1598460390528-2420eb94c4f5?w=800&q=80"]
        },
        # Men - Shoes
        {
            "cat": men_shoes,
            "name": "Classic White Leather Sneakers",
            "desc": "Minimalist premium white leather sneakers crafted from supple Italian calfskin. Features a durable rubber cupsole and memory foam insole for unparalleled all-day comfort.",
            "price": 195.000,
            "imgs": ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80"]
        },
        {
            "cat": men_shoes,
            "name": "Chelsea Suede Boots",
            "desc": "A refined take on a classic silhouette. These Chelsea boots are made from rich chocolate brown suede with elasticated side panels and a stacked leather heel.",
            "price": 280.000,
            "imgs": ["https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80"]
        },
        # Women - Dresses
        {
            "cat": women_robes,
            "name": "Floral Silk Maxi Dress",
            "desc": "The embodiment of fluidity and femininity. This maxi dress features a delicate exclusive floral motif printed on lightweight crepe de chine silk. Deep V-neck and subtle side slit.",
            "price": 380.000,
            "imgs": ["http://localhost:3000/products/dress_floral.png"]
        },
        {
            "cat": women_robes,
            "name": "Onyx Black Pleated Midi Dress",
            "desc": "The little black dress reinvented. Mid-length cut with fine pleated details that gracefully follow your movements. Wrinkle-resistant fabric ideal for elegant evenings or professional events.",
            "price": 240.000,
            "imgs": ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80"]
        },
        {
            "cat": women_robes,
            "name": "Emerald Green Satin Slip Dress",
            "desc": "A stunning emerald green satin slip dress that drapes beautifully. Features a flattering cowl neckline, adjustable spaghetti straps, and a delicate side slit. Perfect for evening events.",
            "price": 285.000,
            "imgs": ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80"]
        },
        # Women - Handbags
       
        {
            "cat": women_sacs,
            "name": "Quilted Leather Crossbody Bag",
            "desc": "Timeless elegance meets modern design. This quilted black leather crossbody bag features a signature gold-tone chain strap and a secure twist-lock closure. Ideal for day-to-night styling.",
            "price": 520.000,
            "imgs": ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"]
        },
        # Women - Coats & Jackets
        {
            "cat": women_coats,
            "name": "Wool Blend Long Coat",
            "desc": "A sophisticated layer for the colder months. This longline coat is crafted from a warm wool blend with a structured collar and a belted waist for a tailored silhouette.",
            "price": 580.000,
            "imgs": ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"]
        },
        # Women - Shoes
        {
            "cat": women_shoes,
            "name": "High Heel Leather Pumps",
            "desc": "The quintessential pointed-toe pump. Crafted from smooth black nappa leather with an elegant 85mm stiletto heel. A versatile wardrobe staple for the office and beyond.",
            "price": 210.000,
            "imgs": ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80"]
        },
        # Women - Jewelry
        {
            "cat": women_jewelry,
            "name": "Gold Minimalist Hoop Earrings",
            "desc": "Handcrafted in 18k solid yellow gold, these lightweight medium-sized hoops offer a modern and sleek everyday luxury that won't tarnish or irritate sensitive skin.",
            "price": 145.000,
            "imgs": ["https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80"]
        },
        {
            "cat": women_jewelry,
            "name": "Diamond Tennis Bracelet",
            "desc": "Exquisite craftsmanship featuring 2 carats of brilliant-cut lab-grown diamonds set in a secure 14k white gold prong setting. A true statement piece of enduring beauty.",
            "price": 1850.000,
            "imgs": ["https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80"]
        },
        # Women - Beauty
        {
            "cat": women_beauty,
            "name": "Amber & Neroli Eau de Parfum",
            "desc": "A captivating trail that blends the luminous brightness of orange blossom with the sensual warmth of precious amber. Created by master perfumers in Grasse, this fragrance offers exceptional longevity.",
            "price": 195.000,
            "imgs": ["https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"]
        },
        {
            "cat": women_beauty,
            "name": "Classic Velvet Red Lipstick",
            "desc": "A highly pigmented, long-lasting matte red lipstick infused with hydrating oils. Delivers bold color payoff with a comfortable, non-drying velvet finish.",
            "price": 45.000,
            "imgs": ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80"]
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

