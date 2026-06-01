# Сайт-визитка амбассадора Магнит

Это статический сайт без React/Vite. Поэтому белой страницы из-за сборки быть не должно: достаточно открыть `index.html` или загрузить файлы на GitHub Pages.

## Как запустить

Просто открой `index.html` в браузере.

## Как выложить на GitHub Pages

1. Создай репозиторий.
2. Загрузи файлы:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. В GitHub открой Settings → Pages.
4. Выбери Branch: `main`, Folder: `/root`.
5. Сохрани.

## Где менять данные

- Telegram: ищи `https://t.me/artem_myv` в `index.html`
- Новости: блок `<section id="news">` в `index.html`
- Тексты: секции `about`, `mission`, `strengths`
- Цвет Магнита: переменная `--red` в `styles.css`

## Что добавлено

- Прелоадер
- Плавные появления блоков при скролле
- 3D tilt карточек
- Magnetic hover на кнопках
- Анимированный кастомный курсор
- Парящие красные сферы
- Анимированные счётчики
- Shine-эффекты и glassmorphism
