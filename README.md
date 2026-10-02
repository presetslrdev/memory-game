# neural.memory — Memory Game

Классическая игра «найди пару», только оформленная как экран обучения нейросети. Учебный проект [RS School](https://github.com/rolling-scopes-school/tasks/tree/master/tasks/memory-game).

**Играть:** https://presetslrdev.github.io/memory-game/

## Как играть

На поле 16 закрытых карточек — 8 пар с IT-иконками. Открываешь две карточки: если картинки одинаковые, они остаются открытыми, если нет — через секунду закрываются. Задача — найти все пары за как можно меньшее число ходов.

Лучшие 10 результатов сохраняются в браузере, их можно посмотреть по кнопке **benchmark**. Кнопка **new run** начинает игру заново.

## Как запустить у себя

Нужен [Node.js](https://nodejs.org/) 18 или новее.

```bash
git clone https://github.com/presetslrdev/memory-game.git
cd memory-game
git checkout memory-game
npm start
```
