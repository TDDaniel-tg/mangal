# Настройка PostgreSQL для проекта Мангал Силы

## Установка PostgreSQL

### Windows
1. Скачайте PostgreSQL с официального сайта: https://www.postgresql.org/download/windows/
2. Установите PostgreSQL следуя инструкциям установщика
3. Запомните пароль для пользователя `postgres`

### macOS
```bash
# Установка через Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Создание базы данных

1. Подключитесь к PostgreSQL как суперпользователь:
```bash
# Windows/Linux
psql -U postgres

# macOS (если установлен через Homebrew)
psql postgres
```

2. Создайте базу данных для проекта:
```sql
CREATE DATABASE mangal_db;
CREATE USER mangal_user WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE mangal_db TO mangal_user;
\q
```

## Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# Database
DATABASE_URL="postgresql://mangal_user:your_password_here@localhost:5432/mangal_db?schema=public"

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# File Upload
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880

# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-admin-password-here
```

## Настройка Prisma

1. Установите зависимости:
```bash
npm install
```

2. Сгенерируйте Prisma Client:
```bash
npx prisma generate
```

3. Примените миграции:
```bash
npx prisma migrate deploy
```

4. (Опционально) Заполните базу тестовыми данными:
```bash
npx prisma db seed
```

## Запуск проекта

```bash
npm run dev
```

Админ-панель будет доступна по адресу: http://localhost:3000/admin

## Полезные команды Prisma

- Просмотр базы данных: `npx prisma studio`
- Создание новой миграции: `npx prisma migrate dev`
- Сброс базы данных: `npx prisma migrate reset`
- Синхронизация схемы: `npx prisma db push`

## Решение проблем

### Ошибка подключения к базе данных
1. Убедитесь, что PostgreSQL запущен
2. Проверьте правильность DATABASE_URL в файле .env
3. Убедитесь, что пользователь и база данных созданы правильно

### Ошибки миграций
1. Попробуйте сбросить и применить миграции заново:
```bash
npx prisma migrate reset
npx prisma migrate deploy
```

### Ошибки в админ-панели
1. Убедитесь, что все API маршруты работают
2. Проверьте консоль браузера на наличие ошибок JavaScript
3. Проверьте логи сервера в терминале 







📁 /public/configurator/
├── size-2x3.jpg          # Компактная 2.5×1.5м
├── size-3x4.jpg          # Стандартная 3.5×2.5м  
├── size-4x5.jpg          # Просторная 5×3.5м
├── no-canopy.jpg         # Без навеса
├── light-canopy.jpg      # Легкий навес
├── capital-canopy.jpg    # Капитальная беседка
├── style-minimal.jpg     # Минимализм
├── style-classic.jpg     # Классический
├── style-premium.jpg     # Премиум
├── result-main.jpg       # Главное фото результата
├── kitchen-1.jpg         # Мангальная кухня
├── kitchen-2.jpg         # Мангальная кухня 2
├── mangal-1.jpg          # Простая мангальная зона
├── mangal-2.jpg          # Простая мангальная зона 2
├── complex-1.jpg         # Комплексное решение
├── complex-2.jpg         # Комплексное решение 2
├── with-canopy.jpg       # С навесом
└── with-gazebo.jpg       # С беседкой

📁 /public/portfolio/
├── project-1.jpg         # Семейная кухня
├── project-2.jpg         # Минималистичная зона
└── project-3.jpg         # Премиум комплекс