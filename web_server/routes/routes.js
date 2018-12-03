// test 가능하게 해보기
const sorting = require('../util/sorting');
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const DEF_DELAY = 1000;

router.use((req, res, next) => {
    next();
});

/* GET users listing. */
router.get('/userlist', async (req, res) => {
    User.findall({})
        .then(data => {
            data = sorting(data);
            res.send(data);
        });
});

/* POST Data to DataBase */

/* ipfs_hash 는 block에서 읽어오기
   block에서 읽어온 데이터들을 db에 저장하기
   listener가 event listen 하고 ipfs_hash 값을 return 받음
   게시글작성 저장 부분
   사용자에 관한 정보를 ipfs에 같이 쓰는 것이 올바른 듯
 */
// Listener가 저장한 정보를 읽어서 return
router.get('/create', async (req, res) => {
    await sleep(1000);
    User.findall({})
        .then(data => {
            data = sorting(data);
            res.send(data);
        });
});

/* GET Users data from db */
// 특정 유저에 대한 post_nums return // nickname
router.get('/userid/:userId', async (req, res) => {
    let name = req.body.userId;
    let data = User.findbyName(name);
    res.send(data);
});

// Search system // post
router.post('/search', (req, res) => {
    console.log(req.body);
    let content = req.body.content;
    let age = content.age;
    let sex = content.sex;
    let height_min = content.height_min;
    let height_max = content.height_max;
    let weight_min = content.weight_min;
    let weight_max = content.weight_max;

    User.findbyCategory({
        age: age,
        sex: sex,
        height_min: height_min,
        height_max: height_max,
        weight_min: weight_min,
        weight_max: weight_max
    })
        .then((data) => {
            if (data) {
                data = sorting(data)
            }
            ;
            console.log(data);
            res.json(data);
        });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
}

module.exports = router;
