# Million Items Selector

Fullstack-приложение для выбора, фильтрации и сортировки элементов из списка на 1 000 000 записей.

Полное описание требований находится в [TEST_ASSIGNMENT.md](./TEST_ASSIGNMENT.md).

## Запуск через Docker

В корне проекта выполните:

```bash
docker compose up --build
```

После запуска доступны:

- фронтенд — http://localhost:8080
- API — http://localhost:3001

Для запуска в фоновом режиме:

```bash
docker compose up --build -d
```

### Остановка

```bash
docker compose down
```