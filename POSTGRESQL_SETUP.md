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







size-2x3.jpg
size-3x4.jpg
size-4x5.jpg
no-canopy.jpg
light-canopy.jpg
capital-canopy.jpg
style-minimal.jpg
style-classic.jpg
style-premium.jpg
result-main.jpg
result-fallback.jpg
kitchen-1.jpg
kitchen-2.jpg
complex-1.jpg
complex-2.jpg
mangal-1.jpg
mangal-2.jpg
with-canopy.jpg
with-gazebo.jpg
project-1.jpg
project-2.jpg
project-3.jpg
project-fallback.jpg