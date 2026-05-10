const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json());

// ================= [配置项] =================
const MONGO_URI = process.env.MONGO_URI; // 记得替换
const ADMIN_PASSWORD = "123456"; 
const PORT = process.env.PORT || 3000;
// ===========================================

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ 成功连接到 MongoDB'))
    .catch(err => console.error('❌ 数据库连接失败:', err));

const ResultSchema = new mongoose.Schema({
    mp: Number,
    br: Number,
    sc: Number,
    ic: Number,
    personality: String,
    createTime: { type: Date, default: Date.now }
});
const Result = mongoose.model('Result', ResultSchema);

// 路由：接收提交
app.post('/api/submit', async (req, res) => {
    try {
        const newResult = new Result(req.body);
        await newResult.save();
        res.status(200).json({ status: 'success' });
    } catch (e) {
        res.status(500).json({ status: 'error' });
    }
});

// 新增路由：获取特定人格占比
app.get('/api/stats/percentage', async (req, res) => {
    const { personality } = req.query;
    try {
        const totalCount = await Result.countDocuments();
        if (totalCount === 0) return res.json({ percentage: "100", total: 0 });

        const typeCount = await Result.countDocuments({ personality });
        const percentage = ((typeCount / totalCount) * 100).toFixed(1);
        
        res.status(200).json({ percentage, total: totalCount });
    } catch (e) {
        res.status(500).json({ status: 'error' });
    }
});

// 路由：后台统计
app.post('/api/admin/stats', async (req, res) => {
    const { password } = req.body;
    if (password !== ADMIN_PASSWORD) return res.status(403).json({ message: '密码错误' });
    try {
        const allData = await Result.find().sort({ createTime: -1 });
        res.status(200).json(allData);
    } catch (e) {
        res.status(500).json({ message: '查询失败' });
    }
});

module.exports = app;