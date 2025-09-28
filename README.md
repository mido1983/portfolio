# Portfolio (Next.js)

Персональный сайт-портфолио Senior Full-Stack инженера на Next.js 14 с Tailwind CSS и анимациями Framer Motion.

## Скрипты

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Структура

- `src/app` — маршруты (app router), API эндпоинт формы обратной связи.
- `src/components` — переиспользуемые UI-компоненты (hero, проекты, навыки, контактная форма и др.).
- `src/data` — контент в виде TypeScript-объектов.

## Форма контакта

POST-запросы на `/api/contact` проходят валидацию и могут быть интегрированы с внешним почтовым сервисом.

## Резюме

Раздел `/resume` адаптирован для печати/экспорта в PDF через стандартный диалог браузера.
