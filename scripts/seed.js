const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('🌱 Начинаем заполнение базы данных...')

    // Создаем категории
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'mangaly' },
        update: {},
        create: {
          name: 'Мангалы',
          slug: 'mangaly',
          description: 'Различные виды мангалов для приготовления шашлыка',
          image: '/images/categories/mangaly.jpg'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'grili' },
        update: {},
        create: {
          name: 'Грили',
          slug: 'grili',
          description: 'Профессиональные грили для барбекю',
          image: '/images/categories/grili.jpg'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'aksessuary' },
        update: {},
        create: {
          name: 'Аксессуары',
          slug: 'aksessuary',
          description: 'Аксессуары для мангалов и грилей',
          image: '/images/categories/aksessuary.jpg'
        }
      })
    ])

    console.log('✅ Категории созданы:', categories.length)

    // Создаем тестовые товары
    const products = await Promise.all([
      prisma.product.upsert({
        where: { slug: 'mangal-klassik' },
        update: {},
        create: {
          title: 'Мангал Классик',
          slug: 'mangal-klassik',
          description: 'Классический стальной мангал для дачи',
          images: JSON.stringify(['/images/products/mangal-klassik-1.jpg', '/images/products/mangal-klassik-2.jpg']),
          price: 350000, // 3500 рублей в копейках
          oldPrice: 400000, // 4000 рублей в копейках
          badge: 'hit',
          specifications: JSON.stringify({
            material: 'Сталь 3мм',
            size: '60x30x15 см',
            weight: '8 кг',
            warranty: '1 год'
          }),
          inStock: true,
          featured: true,
          categoryId: categories[0].id
        }
      }),
      prisma.product.upsert({
        where: { slug: 'gril-professional' },
        update: {},
        create: {
          title: 'Гриль Профессиональный',
          slug: 'gril-professional',
          description: 'Профессиональный угольный гриль для ресторанов',
          images: JSON.stringify(['/images/products/gril-professional-1.jpg']),
          price: 1200000, // 12000 рублей в копейках
          badge: 'new',
          specifications: JSON.stringify({
            material: 'Нержавеющая сталь',
            size: '80x50x30 см',
            weight: '25 кг',
            warranty: '2 года'
          }),
          inStock: true,
          featured: false,
          categoryId: categories[1].id
        }
      })
    ])

    console.log('✅ Товары созданы:', products.length)

    // Создаем тестовые заявки
    const leads = await Promise.all([
      prisma.lead.create({
        data: {
          name: 'Иван Петров',
          phone: '+7 (123) 456-78-90',
          email: 'ivan@example.com',
          message: 'Интересует мангал для дачи на 6-8 человек',
          source: 'homepage',
          status: 'NEW'
        }
      }),
      prisma.lead.create({
        data: {
          name: 'Мария Сидорова',
          phone: '+7 (987) 654-32-10',
          email: 'maria@example.com',
          message: 'Нужен совет по выбору гриля для ресторана',
          source: 'catalog',
          productId: products[1].id,
          status: 'CONTACTED'
        }
      })
    ])

    console.log('✅ Заявки созданы:', leads.length)

    // Создаем тестовый заказ
    const order = await prisma.order.create({
      data: {
        orderNumber: 'ORD-00001',
        customerName: 'Алексей Смирнов',
        customerPhone: '+7 (555) 123-45-67',
        customerEmail: 'alex@example.com',
        customerAddress: 'г. Москва, ул. Примерная, д. 123',
        totalAmount: 700000, // 7000 рублей в копейках
        status: 'PENDING',
        notes: 'Доставка в выходные дни',
        items: {
          create: [
            {
              productId: products[0].id,
              quantity: 2,
              price: 350000
            }
          ]
        }
      }
    })

    console.log('✅ Заказ создан:', order.orderNumber)

    console.log('🎉 Заполнение базы данных завершено успешно!')

  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 