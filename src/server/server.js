const mySql = require('mysql2/promise');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const {v4: uuid} = require('uuid');
const serverUtils = require('../utils/severUtils');
const {connect} = require("react-redux");
const url = require("url");


const app = express();
const corsOption = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

const directoryPath = path.join(__dirname, 'uploads');


const createConnection = () => {
    return mySql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Dmb2010goreliy',
        database: 'oksana_dance',
        namedPlaceholders: true,
    })
}

function filterImg  (req, file, cb) {
    if(file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"||
        file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }

}

const store = multer.diskStorage({})

const upload = multer({storage: store, fileFilter: filterImg});
const uploadVideoUrl = multer();
const parseMultiPart = multer();

app.use(cors(corsOption));
app.use(express.json());
app.use('/static', express.static('uploads'))



//----авторизация
app.post('/auth', async (req, res) => {
    const {login, mail, pass} = req.body;
    try {
        const connection = await createConnection();
        const [adminData] = await connection.execute('SELECT * FROM `user` WHERE `login` = ? AND `mail` = ? AND `pass` = ?', [login, mail, pass]);
        if (adminData.length > 0) {
            const key = req.get('user-agent');
            const createJWT = uuid();
            await connection.execute('INSERT INTO status_auth (current_jwt) VALUES (?)', [createJWT]);
            const [jwtData] = await connection.execute('SELECT current_jwt FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
            const jwtValue = jwtData[0]['current_jwt'];
            const token = jwt.sign(jwtValue, key);
            res.status(200).json(token);
            return;
        }
        res.status(400).json('нет доступа');
    } catch (e) {
        res.status(400).json('что-то пошло не так. Попробуйте воспользоватся позже');
    }
});


//----проверка на администратора
app.post('/verificationJWT', async (req, res) => {
    const currentJWT = req.body;
    const key = req.get('user-agent');
    let decoded = null;
    try {
        decoded = jwt.verify(currentJWT.jwt, key);
    }catch (e) {
        decoded = e.message;
    }
    if (decoded === 'invalid signature') {
        res.status(400).json('токен не прошел проверку');
        return;
    }

    try {
      const connection = await createConnection();
      const [currentTokenData] = await connection.execute('SELECT `current_jwt` FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
      const currentToken = currentTokenData[0]['current_jwt'];
      if (currentToken !== decoded) {
          res.status(400).json('проверка не пройдена');
          return;
      }
      res.status(200).json('все ок');
    } catch (e) {
        res.status(400).json('что-то погло не так. Попробуйте повторить операцию позже');
    }
})


//----------------------------СТАРАЯ загрузка файлов--------------------------------

// app.post('/addPhoto', upload.single('photo'), async (req, res) => {
//     try {
//         const fileUpload = req.file;
//         const test = req.body;
//         res.status(200).json(`файл ${fileUpload.filename} успешно загружен`);
//     }catch (e) {
//         res.status(400).json('вы пытаетесь загрузить файл с неизвесным форматом');
//     }
// })

//-------------------------СТАРАЯ отправка файлов с сервера-----------------------------

// app.get('/fileList', (req, res) => {
//     fs.readdir(directoryPath, (error, files) => {
//         if (error) {
//             res.status(400).json(error);
//             return;
//         }
//         const filesName = files.filter(ele => {
//             const curPath = path.join(directoryPath, ele);
//             const stats = fs.lstatSync(curPath);
//             return !stats.isDirectory();
//         })
//         const fullPathFile = filesName.map(ele => `http://localhost:3001/static/${ele}`);
//
//         res.json(fullPathFile);
//     })
// });


//---------новый запрос на сохранение/выгрузку фото---------------------------

//----запрос на получение фото
app.get('/photoList', async (req, res,) => {
    let page = 0;
    const {pageQ} = req.query;
    if (pageQ) {
        page = pageQ;
    }
    try{
       const connection = await createConnection();
       const [photoData] = await connection.execute(`SELECT * FROM \`photo_gallery\` ORDER BY \`id\` DESC LIMIT 25 OFFSET ${page}`);
       let [quantityPhoto] = await connection.execute('SELECT COUNT(id) FROM `photo_gallery`');
       quantityPhoto = quantityPhoto.reduce((acc, ele) => acc = ele['COUNT(id)'], 0);
       res.status(200).json({photoData, counter: quantityPhoto, path: 'http://localhost:3001/static/'});
    } catch (e) {
       res.status(400).json('что-то пошло не так. Попробуйте повторить операцию еще раз чуть позже');
    }
})

//---запрос на сограниение фото

app.post('/addPhoto', upload.single('photo'), async (req, res, next) => {
    let {jwt:token, nameImg} = req.body;
    nameImg = nameImg.trim() === '' ? 'no-name' : nameImg.trim();
    const key = req.get('user-agent');
    const {file} = req;
    try {
        let currentToken, connection, decodedToken;
        try {
            decodedToken = jwt.verify(token, key);
        }catch (e) {
            throw new Error('токен не прошел проверку');
        }
        if (!file) {
            throw new Error ('файл который вы загружаете не поддерживается');
        }
        try {
            connection = await createConnection();
            [currentToken] = await connection.execute('SELECT current_jwt FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
            currentToken = currentToken.reduce((acc, ele) => acc = ele['current_jwt'], '');
        } catch (e) {
            throw new Error ('что-то пошло не так попробуйте повторить операцию позже');
        }

        if (currentToken !== decodedToken) {
            throw new Error ('устаревший токен');
        }
        const fileName = Date.now() + path.extname(file.originalname);
        const newPath = path.join(directoryPath, fileName);
        fs.renameSync(file.path, newPath);
        try {
            await connection.execute('INSERT INTO photo_gallery (user_id, url_photo, name_photo) VALUES (?, ?, ?)', [1, fileName, nameImg]);
        } catch (e) {
            fs.rmSync(newPath);
            throw new Error('что-то пошло не так повторите операцию позже');
        }
        res.status(200).json('фото было добавлено');
    }catch (e) {
        if (file) {
            fs.rmSync(file.path);
        }
        res.status(400).json(e.message);
    }
})

//---удаление фото

app.post('/deletePhoto', async (req, res, next) => {
    const {jwt: token, id} = req.body;
    const key = req.get('user-agent');
    let decoded, connection, currentToken, photoData;
    try {
        try {
            decoded = jwt.verify(token, key);
        }catch (e) {
            throw new Error ('токен не прошол верефикацию');
        }
        try {
            connection = await createConnection();
            [currentToken] = await connection.execute('SELECT current_jwt FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
            [photoData] = await connection.execute('SELECT url_photo FROM `photo_gallery` WHERE `id` = ?', [id]);
            currentToken = currentToken.reduce((acc, ele) => acc = ele['current_jwt'], '');
        } catch (e) {
            throw new Error ('что-то пошло не так. Повторите операцию позже');
        }
        if (currentToken !== decoded) {
            throw new Error ('устаревший токен');
        }
        if (photoData.length === 0) {
            throw new Error ('удаляемый файл не найден');
        }
        photoData = photoData.reduce((acc, ele) => acc = ele['url_photo'], '');
        try {
            await connection.execute('DELETE FROM `photo_gallery` WHERE `id` = ? ', [id]);
        }catch (e) {
            throw new Error ('что-то пошло не так. Повторите операцию позже');
        }
        fs.rmSync(path.join(directoryPath + '/' + photoData));
        res.status(200).json('фото было удалено');
    }catch (e) {
       res.status(400).json(e.message);
    }
})

//-----фильтр для фото

app.get('/searchPhoto', async (req, res) => {
    let query = req.query;
    let page = 0;
    if (query.pageQ) {
        page = query.pageQ;
        const updateQueryArr = Object.entries(query).slice(0, - 1);
        query = Object.fromEntries(updateQueryArr);
    }
    const arrQuery = Object.keys(query);
    let sqlRequest = 'SELECT * FROM `photo_gallery`';
    let sqlRequestCounetId = 'SELECT COUNT(id) AS counter FROM `photo_gallery`'
    let queryString = arrQuery.reduce((acc, key) => {

        if (key === 'date_upload_video_end' || key === 'pageQ') return acc;
        if (key !== 'date_upload_video') {
            acc.push(`${key} = ?`);
        } else {
            acc.push(`DATE(\`${key}\`) BETWEEN ? AND ?`);
        }
        return acc;
    }, []);
    if (queryString.length) {
        queryString = queryString.join(' AND ');
        sqlRequest = `${sqlRequest} WHERE ${queryString}`;
        sqlRequestCounetId = `${sqlRequestCounetId} WHERE ${queryString}`;
    }
    try {
        const connection = await createConnection();
        const [photoData] = await connection.execute(`${sqlRequest} LIMIT 25 OFFSET ${page}`, Object.values(query));
        let [counter] = await connection.execute(`${sqlRequestCounetId}`, Object.values(query));
        counter = counter.reduce((acc, ele) => acc = ele.counter, 0);
        res.status(200).json({photoData, counter, path: 'http://localhost:3001/static/'});
    }catch (e) {
        res.status(400).json('что-то пошло не так. Попробуйте повторить операцию позже');
    }
})

//-------------------------------запрос на видео-----------------------------------------

//----получить все видео
app.get('/getVideoUrl', async (req, res) => {
    try {
        const connection = await createConnection();
        const [videoDate] = await connection.execute(`SELECT * FROM \`you_tube_url\` ORDER BY \`id\` DESC LIMIT 7`);
        let [quantityUrl] = await connection.execute('SELECT COUNT(id) FROM `you_tube_url`');
        quantityUrl = quantityUrl.reduce((acc, ele) => acc = ele['COUNT(id)'], 0);
        res.status(200).json({videoDate, counter: quantityUrl});
    } catch (e) {
        res.status(400).json('что-то пошло не так. Попробуйте повторить операцию еще раз чуть позже');
    }
})

//----добавить видео
app.post('/addVideo', uploadVideoUrl.any(), async (req, res) => {
    let name = 'no-name'
    const {jwt: token, danceStyle, videoUrl, nameVideo, typeVideo} = req.body;
    if (nameVideo) {
        name = nameVideo;
    }
    const key = req.get('user-agent');
    let decodedToken = '';
    try {
        decodedToken = jwt.verify(token, key);
    }catch (e) {
        decodedToken = e.message;
    }
    if (decodedToken === 'invalid signature') {
        res.status(400).json('токен не прошел проверку');
        return;
    }
    try {
        const connection = await createConnection();
        let [currentToken] = await connection.execute('SELECT current_jwt FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
        currentToken = currentToken.reduce((acc, ele) => acc = ele['current_jwt'], '');
        if (decodedToken !== currentToken) {
            res.status(400).json('устаревший токен');
            return;
        }
        const [checkUrl] = await connection.execute('SELECT upload_video_date FROM `you_tube_url` WHERE `url_video` = ?', [videoUrl]);
        if (checkUrl.length > 0) {
            res.status(400).json(`видео уже есть на канале! Загружено ${checkUrl[0]['upload_video_date']}`);
            return;
        }
        await connection.execute('INSERT INTO you_tube_url (user_id, url_video, genre_video, type_video_player, name_video) VALUES (?, ?, ?, ?, ?)', [1, videoUrl, danceStyle, typeVideo, name]);
        res.status(200).json('видео было добавлено');
    } catch (e) {
        res.status(400).json('чтото пошло не так. Попробуйте повторить операцию чуть позже');
    }
});


//----удалить видео
app.post('/deleteMovie', async (req, res) => {
    const {id, jwt: token} = req.body;
    const key = req.get('user-agent');
    let decoded = '';
    try {
        decoded = jwt.verify(token, key);
    }catch (e) {
        decoded = e.message;
    }
    if (decoded === 'invalid signature') {
        res.status(400).json('токен не прошел проверку');
        return;
    }
    try {
        const connection = await createConnection();
        let [currentToken] = await connection.execute('SELECT current_jwt FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
        currentToken = currentToken.reduce((acc, ele) => acc = ele['current_jwt'] ,'');
        if (currentToken !== decoded) {
            res.status(400).json('устаревший токен');
            return;
        }
        const [isDownloadVideo] = await connection.execute('SELECT * FROM `you_tube_url` WHERE `id` = ?', [id]);
        if (isDownloadVideo.length > 0) {
            await connection.execute('DELETE FROM `you_tube_url` WHERE `id` = ? ', [id]);
            res.status(200).json('видео было удалено');
            return;
        }
        res.status(400).json('видео которое удаляете нет в базе');
    } catch(e) {
        res.status(400).json('что-то пошло не так попробуйте повторить операцию позже');
    }
})


//----фильтр для видео
app.get('/searchMovie', async (req, res) => {
    let querySearch = req.query;
    const map = {
        nameVideo: 'name_video',
        typeVideo: 'type_video_player',
        categoryVideo: 'genre_video',
        dateVideoStart: 'upload_video_date',
    };

    let videoDate, quantityUrl;
    let query = 'SELECT * FROM `you_tube_url`';
    let queryQuantityRecords = 'SELECT COUNT(id) AS `count` FROM `you_tube_url`';
    let page = 0;

    if (querySearch.pageQ) {
        page = querySearch.pageQ;
        const newQuerySearch = Object.entries(querySearch).slice(0, -1);
        querySearch = Object.fromEntries(newQuerySearch);
    }

    const [where, inputValue] = Object.entries(querySearch).reduce((acc, [key, value]) => {
        if (value !== 'all') {
            acc[1].push(value);
        }
        if (value === 'all' || key === 'dateVideoEnd') return acc;
        const fieldName = map[key];
        if (key === 'dateVideoStart') {
            acc[0].push(`DATE(\`${fieldName}\`) BETWEEN ? AND ?`);
        } else {
            acc[0].push(`\`${fieldName}\` = ?`);
        }
        return acc;
    }, [[], []]);

    if (where.length) {
        query = `${query} WHERE ${where.join(' AND ')} ORDER BY id DESC LIMIT 5 OFFSET ${page}`;
        queryQuantityRecords = `${queryQuantityRecords} WHERE ${where.join(' AND ')}`;
    } else {
        query = `${query} ORDER BY id DESC LIMIT 5 OFFSET ${page}`;
    }
    try {
        const connection = await createConnection();
        [videoDate] = await connection.execute(query, inputValue);
        [quantityUrl] = await connection.execute(queryQuantityRecords, inputValue);
        quantityUrl = quantityUrl.reduce((acc, ele) => acc = ele.count, 0);
        res.status(200).json({videoDate, counter: quantityUrl});
    } catch (e) {
        console.log(e.message);
        res.status(400).json('что-то пошло не так. Попробуйте повторить операцию позже');
    }
})

app.get('/getToDo', async(req, res) => {
    const {dateToDo} = req.query;
    try {
        const connection = await createConnection();
        const [todoData] = await connection.execute('SELECT * FROM `to_do_calendar` WHERE DATE(`date_to_do`) = ? ORDER BY `date_to_do` ASC', [dateToDo]);
        res.status(200).json(todoData);
    } catch (e) {
        res.status(400).json('что-то пошло не так повторите операцию позже');
    }
})

app.post('/createTD', parseMultiPart.any() ,async(req, res, next) => {
    const jwtKey = req.get('user-agent');
    const formData = req.body;
    let decoded, currentToken, connection, allToDoCurrentDate, isAvailableDate;
    try {
        try {
            console.log(formData.token)
            decoded = jwt.verify(formData.token, jwtKey);
        } catch (e) {
            throw new Error('токен не прошел проверку');
        }
        try {
            connection = await createConnection();
            [currentToken] = await connection.execute('SELECT `current_jwt` FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
            currentToken = currentToken.reduce((acc, ele) => acc = ele['current_jwt'], '');
            [isAvailableDate] = await connection.execute('SELECT id FROM `to_do_calendar` WHERE `date_to_do` = ?', [`${formData.date} ${formData.time}`]);
        } catch (e) {
            throw new Error('что-то пошло не так. Повторите операцию позже');
        }
        if (decoded !== currentToken) {
            throw new Error('токен устарел');
        }
        if (isAvailableDate.length > 0) {
            throw new Error ('дата уже занята');
        }
        try {
            await connection.execute('INSERT INTO `to_do_calendar` (user_id, title_to_do, text_to_do, date_to_do) VALUES (?, ?, ?, ?)', [1, formData.title, formData.description, `${formData.date} ${formData.time}`]);
            [allToDoCurrentDate] = await connection.execute('SELECT * FROM `to_do_calendar` WHERE DATE(`date_to_do`) = ?', [formData.date]);
        } catch (e) {
            throw new Error('что-то пошло не так. Попробуйте повторить операцию позже');
        }
        res.status(200).json({status: 'запись успешно добавлена', toDoData: allToDoCurrentDate});
    } catch (e) {
        res.status(400).json(e.message);
    }
})

app.get('/deleteTD', async (req, res,next) => {
    const {id, token, date} = req.query;
    const key = req.get('user-agent');
    let connection, decoded, modified, currentToken;
    try {
        try {
            decoded = jwt.verify(token, key);
        }catch (e) {
            throw new Error('токен не прошел проверку');
        }
        try {
            connection = await createConnection();
            [currentToken] = await connection.execute('SELECT `current_jwt` AS `currentJWT` FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
        }catch (e) {
            throw new Error('чтото пошло не так повторите оперцию позже');
        }
        currentToken = currentToken.reduce((acc, ele) => acc = ele.currentJWT, '');
        if (currentToken !== decoded) {
            throw new Error('устаревший токен');
        }
        try {
            await connection.execute('DELETE FROM `to_do_calendar` WHERE `id` = ?', [id]);
        } catch (e) {
            throw new Error('запись которую Вы пытаетесь удалить не существует');
        }
        try {
            [modified] = await connection.execute('SELECT * FROM `to_do_calendar` WHERE DATE(`date_to_do`) = ? ORDER BY `date_to_do` ASC', [date]);
        } catch(e) {
            throw new Error('что-то пошло не так. Повторите операцию позже');
        }
        res.status(200).json({message: 'запись в календаре удалина', data: modified});
    }  catch (e) {
        res.status(400).json(e.message);
    }
})

app.post('/updateTD', parseMultiPart.any(), async (req, res) => {
    const formData = req.body;
    const key = req.get('user-agent');
    const {id} = req.query;
    let decoded, correctToDo, connection, currectToken;
    try{
        try{
            decoded = jwt.verify(formData.token, key);
        } catch(e) {
            throw new Error('токен не прошел проверку');
        }
        try {
            connection = await createConnection();
            [currectToken] = await connection.execute('SELECT `current_jwt` AS `currentJWT` FROM `status_auth` ORDER BY `id` DESC LIMIT 1');
        }catch (e) {
            throw new Error('что-то пошло не так. Повторите операцию позже');
        }
        currectToken = currectToken.reduce((acc, ele) => acc = ele.currentJWT, '');
        if (currectToken !== decoded) throw new Error('устаревший токен');
        try{
            await connection.execute('UPDATE `to_do_calendar` SET `title_to_do` = ?, `text_to_do` = ?, `date_to_do` = ? WHERE `id` = ?', [formData.title, formData.description, `${formData.date} ${formData.time}`, id]);
        } catch(e) {
            throw new Error('не смог обновить данные');
        }
        try {
            [correctToDo] = await connection.execute('SELECT * FROM `to_do_calendar` WHERE DATE(date_to_do) = ?', [formData.date]);
        } catch(e) {
            throw new Error('что-то пошло не так. Повторите оперцию позже');
        }
        res.status(200).json({message: 'запись успешно изменена', data: correctToDo});
    } catch (e) {
        res.status(400).json(e.message);
    }
})





app.listen(3001, console.log('sever is work port 3001'));

