const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('카페 메뉴 서버 정상 작동!');
});

app.get('/menus', (req, res) => {
    const menus = [
        { id: 1, name: '아메리카노', price: 3000 },
        { id: 2, name: '카페라떼', price: 4000 },
        { id: 3, name: '카푸치노', price: 4500 }
    ];

    res.json(menus);
});

app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
