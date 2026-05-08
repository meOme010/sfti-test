const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); // 允许前端跨域访问
app.use(express.json());

// ================= [配置项] =================
// 请将下方的字符串替换为你 MongoDB Atlas 的连接字符串
const MONGO_URI = "mongodb://helolo:715g8NKumWKdB7mF@ac-ts22gan-shard-00-00.f3t8dy2.mongodb.net:27017,ac-ts22gan-shard-00-01.f3t8dy2.mongodb.net:27017,ac-ts22gan-shard-00-02.f3t8dy2.mongodb.net:27017/sfti_db?ssl=true&replicaSet=atlas-9zldtr-shard-0&authSource=admin&appName=Cluster0";
const ADMIN_PASSWORD = "SECRET_PASSWORD_888"; // 你设定的后台查看密码
const PORT = process.env.PORT || 3000;
// ===========================================

// 数据库连接
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ 成功连接到 MongoDB 数据库'))
    .catch(err => console.error('❌ 数据库连接失败:', err));

// 定义存储模型
const ResultSchema = new mongoose.Schema({
    mp: Number,
    br: Number,
    sc: Number,
    ic: Number,
    personality: String,
    createTime: { type: Date, default: Date.now }
});
const Result = mongoose.model('Result', ResultSchema);

// 路由：接收用户提交的数据
app.post('/api/submit', async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.status(200).json({ status: 'success', message: '结果已存入云端' });
    } catch (e) {
        res.status(500).json({ status: 'error', message: '存储失败' });
    }
});

// 路由：获取统计数据（带后端密码校验）
app.post('/api/admin/stats', async (req, res) => {
    const { password } = req.body;
    if (password !== ADMIN_PASSWORD) {
        return res.status(403).json({ status: 'error', message: '权限验证失败：密码错误' });
    }
    try {
        const allData = await Result.find().sort({ createTime: -1 });
        res.status(200).json(allData);
    } catch (e) {
        res.status(500).json({ status: 'error', message: '查询数据库失败' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 后端服务器已启动: http://localhost:${PORT}`);
});