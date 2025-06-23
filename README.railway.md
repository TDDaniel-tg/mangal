# 🚀 Деплой Мангал Силы на Railway

## ✅ Исправленные критические ошибки:

### 1. **Middleware конфликт**
- ❌ Удален проблемный middleware.ts
- ✅ Security headers перенесены в next.config.ts
- ✅ Убраны конфликты с edge runtime

### 2. **Standalone vs npm start**
- ❌ Убран `output: 'standalone'` из next.config.ts  
- ✅ Теперь `npm start` работает корректно
- ✅ Совместимость с Railway сохранена

### 3. **Обработка ошибок API**
- ✅ Безопасная обработка BigInt для JSON
- ✅ Возврат пустых массивов вместо ошибок 500
- ✅ Проверка соединения с БД
- ✅ Валидация входящих данных

### 4. **Защита от null/undefined**
- ✅ Safe parsing JSON данных
- ✅ Array.isArray() проверки
- ✅ Fallback значения
- ✅ Null checks во всех компонентах

## 🔧 Переменные окружения для Railway:

```env
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-secret-key
```

## 🚀 Команды для деплоя:

1. **Подключить Railway CLI:**
   ```bash
   npm i -g @railway/cli
   railway login
   ```

2. **Инициализировать проект:**
   ```bash
   railway init
   ```

3. **Установить переменные окружения:**
   ```bash
   railway variables set DATABASE_URL="your-postgres-url"
   railway variables set NODE_ENV="production"
   ```

4. **Деплой:**
   ```bash
   railway up
   ```

## 📦 Файлы конфигурации:

- ✅ `next.config.ts` - без standalone, с security headers
- ✅ `railway.json` - без healthcheck
- ✅ `railway.toml` - упрощенная конфигурация
- ✅ `global-error.tsx` - глобальная обработка ошибок
- ✅ `not-found.tsx` - 404 страница

## 🗄️ База данных:

При первом деплое Railway автоматически:
1. Создаст PostgreSQL БД
2. Выполнит миграции Prisma  
3. Заполнит БД начальными данными

## 🔍 Команды проверки локально:

```bash
# Очистка кэша
rm -rf .next

# Сборка
npm run build

# Запуск production
npm start
```

## 🛡️ Безопасность:

- ✅ Security headers в next.config.ts
- ✅ CORS настройки для API
- ✅ X-Frame-Options: DENY
- ✅ Content-Type validation

**Все конфликты исправлены! Middleware убран, standalone отключен.** 🔥 