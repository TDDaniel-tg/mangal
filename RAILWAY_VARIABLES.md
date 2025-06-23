# 🚀 Переменные окружения для Railway - Мангал Силы

## 🔧 ОБЯЗАТЕЛЬНЫЕ переменные для Railway:

### 1. **База данных (PostgreSQL)**
```bash
# Railway автоматически создаст PostgreSQL и предоставит URL
DATABASE_URL=${{Postgres.DATABASE_URL}}
```
☝️ Railway автоматически подставит эту переменную после создания PostgreSQL сервиса

### 2. **Окружение**
```bash
NODE_ENV=production
```

### 3. **Next.js конфигурация**
```bash
# Замените на ваш реальный домен Railway
NEXTAUTH_URL=${{https://mangal.up.railway.app/}}
```
☝️ Railway автоматически подставит ваш домен

### 4. **Секретный ключ**
```bash
# Сгенерируйте случайный ключ
NEXTAUTH_SECRET=bxmfyrlsnftroibhfndobzcvrtbkslas
```

## 🎯 ПОШАГОВАЯ НАСТРОЙКА В RAILWAY:

### Шаг 1: Подключение проекта
1. Зайдите на https://railway.app
2. Нажмите **"New Project"**
3. Выберите **"Deploy from GitHub repo"**
4. Выберите ваш репозиторий с проектом

### Шаг 2: Добавление PostgreSQL
1. В проекте нажмите **"+ Add Service"**
2. Выберите **"Database"** → **"PostgreSQL"**
3. Railway автоматически создаст базу и настроит `DATABASE_URL`

### Шаг 3: Настройка переменных окружения
В разделе **Variables** добавьте:

```env
NODE_ENV=production
NEXTAUTH_SECRET=SuperSecretKey12345678901234567890
```

### Шаг 4: Автоматические переменные (не трогать)
Railway сам создаст:
- `DATABASE_URL` - подключение к PostgreSQL
- `RAILWAY_PUBLIC_DOMAIN` - ваш домен приложения

## 🔐 Генерация NEXTAUTH_SECRET:

Выполните в терминале для генерации случайного ключа:
```bash
# Вариант 1 (если есть openssl)
openssl rand -base64 32

# Вариант 2 (если есть node)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Вариант 3 (простой способ)
# Используйте любую строку длиной 32+ символов
```

## 🎮 ИНТЕРФЕЙС RAILWAY - Что делать:

### В разделе **"Variables"**:
```
NODE_ENV              = production
NEXTAUTH_SECRET       = ваш-сгенерированный-ключ
```

### В разделе **"Settings"**:
- **Build Command**: `npm run build`  
- **Start Command**: `npm start`
- **Root Directory**: `/` (корень)

## 🗄️ Автоматическая настройка БД:

Railway автоматически выполнит при деплое:
1. `npm install` - установка зависимостей
2. `npx prisma generate` - генерация Prisma клиента  
3. `npx prisma db push` - создание таблиц
4. `npm run build` - сборка Next.js
5. `npm start` - запуск production сервера

## ✅ Проверка работы:

После деплоя проверьте:
- ✅ Главная страница загружается
- ✅ API работает: `https://ваш-домен.railway.app/api/products`
- ✅ Админ панель: `https://ваш-домен.railway.app/admin`
- ✅ Нет ошибок в логах Railway

## 🚨 Возможные проблемы:

### Если база данных не работает:
```bash
# Выполнить в Railway CLI или в логах должно быть:
npx prisma db push
npm run db:seed
```

### Если изображения не загружаются:
- Railway не поддерживает загрузку файлов в filesystem
- Нужно подключить внешний сервис (Cloudinary, AWS S3)

## 🎉 Готово!

После настройки всех переменных Railway автоматически:
- 🚀 Развернет приложение
- 🗄️ Настроит PostgreSQL базу данных  
- 🌐 Предоставит публичный URL
- 📊 Покажет логи и метрики

**Ваш сайт будет доступен по адресу: `https://ваш-проект.railway.app`** 🔥

---
*Все переменные настроены правильно для production! 🚀* 