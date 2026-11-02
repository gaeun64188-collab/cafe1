const express = require('express');
const app = express();
const db = require('./db');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 메인 페이지 - 메뉴 조회
app.get('/', async (req, res) => {
    try {
        const [menus] = await db.query('SELECT * FROM menus ORDER BY id DESC');
        res.render('index', { menus });
    } catch (err) {
        console.error(err);
        res.status(500).send('메뉴 조회 실패');
    }
});

// 메뉴 등록 페이지
app.get('/create', (req, res) => {
    res.render('create');
});

// 메뉴 등록 처리
app.post('/create', async (req, res) => {
    try {
        const { name, price, description } = req.body;

        await db.query(
            'INSERT INTO menus (name, price, description) VALUES (?, ?, ?)',
            [name, Number(price), description]
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('메뉴 등록 실패');
    }
});

// 메뉴 수정 페이지
app.get('/edit/:id', async (req, res) => {
    try {
        const [menus] = await db.query(
            'SELECT * FROM menus WHERE id = ?',
            [req.params.id]
        );

        if (menus.length === 0) {
            return res.status(404).send('메뉴가 없습니다.');
        }

        res.render('edit', { menu: menus[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('메뉴 조회 실패');
    }
});

// 메뉴 수정 처리
app.post('/edit/:id', async (req, res) => {
    try {
        const { name, price, description } = req.body;

        await db.query(
            'UPDATE menus SET name = ?, price = ?, description = ? WHERE id = ?',
            [name, Number(price), description, req.params.id]
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('메뉴 수정 실패');
    }
});

// 메뉴 삭제
app.post('/delete/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM menus WHERE id = ?',
            [req.params.id]
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('메뉴 삭제 실패');
    }
});

app.listen(3000, () => {
    console.log('카페 메뉴 서버 실행!');
    console.log('http://localhost:3000');
});
