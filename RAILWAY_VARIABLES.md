# Railway Environment Variables Setup

## Переменные для добавления в Railway

Для деплоя приложения "Мангал Силы" на Railway необходимо добавить следующие переменные окружения:

### 1. DATABASE_URL
```bash
# Замените на ваш реальный MySQL connection string
DATABASE_URL=mysql://username:password@host.psdb.cloud/database?sslaccept=strict
```

### 2. NODE_ENV
```bash
NODE_ENV=production
```

### 3. NEXTAUTH_SECRET
```bash
# Сгенерируйте случайный ключ
NEXTAUTH_SECRET=your-secret-key-here
```

## Как добавить переменные в Railway

1. Откройте ваш проект в Railway Dashboard
2. Перейдите в раздел "Variables"
3. Добавьте каждую переменную нажав "New Variable"
4. Введите имя переменной и её значение
5. Нажмите "Add"

## Пример настройки переменных

```env
NODE_ENV=production
NEXTAUTH_SECRET=SuperSecretKey12345678901234567890
DATABASE_URL=mysql://username:password@host.psdb.cloud/database?sslaccept=strict
```

## Важные заметки

- ⚠️ **НИКОГДА не коммитьте реальные секретные ключи в Git!**
- 🔒 Используйте сильные, уникальные пароли
- 🔄 Регулярно обновляйте секретные ключи
- 📝 Храните резервные копии важных ключей в безопасном месте

## Проверка деплоя

После добавления всех переменных:

1. Railway автоматически перезапустит приложение
2. Проверьте логи на наличие ошибок
3. Убедитесь, что база данных подключается корректно
4. Протестируйте основные функции сайта

## Troubleshooting

### Ошибка подключения к базе данных
- Проверьте правильность DATABASE_URL
- Убедитесь, что база данных доступна
- Проверьте права доступа пользователя БД

### Ошибки аутентификации
- Убедитесь, что NEXTAUTH_SECRET установлен
- Проверьте, что NEXTAUTH_URL не установлен (Railway устанавливает автоматически)

### Общие ошибки
- Проверьте логи в Railway Dashboard
- Убедитесь, что все обязательные переменные установлены
- Проверьте синтаксис переменных окружения

## Дополнительные переменные (опционально)

При необходимости можно добавить:

```bash
# Для email уведомлений
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password

# Для файлового хранилища
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=your-bucket

# Для аналитики
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
```

## Безопасность

1. **Ротация ключей**: Регулярно обновляйте секретные ключи
2. **Минимальные права**: Предоставляйте только необходимые разрешения
3. **Мониторинг**: Следите за логами на предмет подозрительной активности
4. **Резервное копирование**: Сохраняйте копии важных конфигураций

## Контакты

При возникновении проблем с деплоем обращайтесь к документации Railway или создавайте issue в репозитории проекта. 