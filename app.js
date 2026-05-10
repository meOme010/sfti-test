const API_URL = "/api";

// 完整 15 道反诈题目
const questions = [
    {
        title: "1. 收到自称“公检法”电话，说你涉嫌洗钱并要求将资金转入“安全账户”：",
        options: [
            { text: "火速转账以证清白", scores: { mp: -20, br: -20, sc: -10, ic: -10 } },
            { text: "挂断电话，拨打110核实", scores: { mp: 20, br: 20, sc: 10, ic: 10 } }
        ]
    },
    {
        title: "2. 网上认识的“完美对象”带你投资，声称有漏洞稳赚不赔：",
        options: [
            { text: "既然是爱人介绍，试着投一笔", scores: { mp: -15, br: -10, sc: -25, ic: -15 } },
            { text: "醒醒！带你稳赚不赔的都是诈骗", scores: { mp: 15, br: 10, sc: 25, ic: 15 } }
        ]
    },
    {
        title: "3. 收到短信称你的快递受损，扫描二维码可获得双倍赔偿：",
        options: [
            { text: "正好有个快递没到，扫码领钱", scores: { mp: -10, br: -20, sc: -15, ic: -15 } },
            { text: "联系官方快递客服或在平台核实", scores: { mp: 10, br: 20, sc: 15, ic: 10 } }
        ]
    },
    {
        title: "4. 短信称你被抽中为《中国好声音》二等奖，需先交纳个人所得税：",
        options: [
            { text: "运气真好，赶紧交钱领奖", scores: { mp: -25, br: -15, sc: -10, ic: -20 } },
            { text: "这种十几年前的套路直接删除", scores: { mp: 25, br: 15, sc: 10, ic: 20 } }
        ]
    },
    {
        title: "5. 陌生人加你好友，邀请你进入“刷单返利”群，首单赚了5元：",
        options: [
            { text: "感觉可行，加大投入赚大钱", scores: { mp: -15, br: -25, sc: -20, ic: -20 } },
            { text: "小利诱惑必有后手，果断退群", scores: { mp: 15, br: 25, sc: 20, ic: 15 } }
        ]
    },
    {
        title: "6. 急需用钱，有人推荐“无抵押、秒到账”贷款，但需预付手续费：",
        options: [
            { text: "急用钱，先付几百手续费试试", scores: { mp: -10, br: -20, sc: -15, ic: -25 } },
            { text: "放款前先要钱的都是诈骗", scores: { mp: 10, br: 20, sc: 15, ic: 20 } }
        ]
    },
    {
        title: "7. 老师/领导突然在社交软件加你，让你代为转账给其亲戚：",
        options: [
            { text: "怕得罪人，按指示转账", scores: { mp: -20, br: -15, sc: -15, ic: -10 } },
            { text: "拨打电话或当面找本人确认", scores: { mp: 20, br: 15, sc: 15, ic: 10 } }
        ]
    },
    {
        title: "8. 手机弹出提示：“您的手机存在病毒，点击一键清理”：",
        options: [
            { text: "担心泄密，赶紧点击清理", scores: { mp: -10, br: -10, sc: -15, ic: -20 } },
            { text: "乱弹窗的往往才是病毒插件", scores: { mp: 10, br: 10, sc: 15, ic: 15 } }
        ]
    },
    {
        title: "9. 接到自称社保局电话，称你社保卡在异地违规使用：",
        options: [
            { text: "提供验证码协助解封", scores: { mp: -20, br: -25, sc: -10, ic: -15 } },
            { text: "去当地社保中心窗口询问", scores: { mp: 20, br: 25, sc: 10, ic: 10 } }
        ]
    },
    {
        title: "10. 网络游戏刷喇叭：“低价出售游戏币，加群了解”：",
        options: [
            { text: "贪便宜，去群里看看", scores: { mp: -15, br: -10, sc: -20, ic: -15 } },
            { text: "只在官方交易平台操作", scores: { mp: 15, br: 10, sc: 20, ic: 15 } }
        ]
    },
    {
        title: "11. 突然收到好友视频聊天请求，对方不说话只招手，随后借钱：",
        options: [
            { text: "看到了脸，确认是本人就转了", scores: { mp: -25, br: -15, sc: -25, ic: -10 } },
            { text: "AI换脸横行，必须电话核实", scores: { mp: 25, br: 15, sc: 25, ic: 10 } }
        ]
    },
    {
        title: "12. 网上看到“内部消息”称某虚拟币即将大涨，要求下载APP购买：",
        options: [
            { text: "搏一搏，单车变摩托", scores: { mp: -10, br: -20, sc: -20, ic: -25 } },
            { text: "不买任何来源不明的理财产品", scores: { mp: 10, br: 20, sc: 20, ic: 20 } }
        ]
    },
    {
        title: "13. 刷视频刷到“免费领皮肤”，输入手机号和验证码即可：",
        options: [
            { text: "不要钱，试试又不亏", scores: { mp: -15, br: -20, sc: -10, ic: -15 } },
            { text: "验证码等同于钱包钥匙，绝不给", scores: { mp: 15, br: 25, sc: 15, ic: 15 } }
        ]
    },
    {
        title: "14. 收到积分到期清零提醒，链接进入的网站要求填银行卡号：",
        options: [
            { text: "怕积分作废，赶紧填写", scores: { mp: -15, br: -20, sc: -15, ic: -15 } },
            { text: "域名不对，显然是钓鱼网站", scores: { mp: 15, br: 20, sc: 15, ic: 10 } }
        ]
    },
    {
        title: "15. 手机收到银行发来的信息，称需进行“实名认证升级”：",
        options: [
            { text: "点开链接，按要求操作", scores: { mp: -20, br: -25, sc: -15, ic: -15 } },
            { text: "银行不会要求在短信链接里输密码", scores: { mp: 20, br: 25, sc: 20, ic: 15 } }
        ]
    }
];

let currentIndex = 0;
let userScores = { mp: 50, br: 50, sc: 50, ic: 50 };

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function startQuiz() {
    currentIndex = 0;
    userScores = { mp: 50, br: 50, sc: 50, ic: 50 };
    showPage('pageQuiz');
    renderQuestion();
}

function renderQuestion() {
    const q = questions[currentIndex];
    document.getElementById('questionText').innerText = q.title;
    document.getElementById('progress').style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
    const optionsHtml = q.options.map((opt, i) => `
        <div class="option-item" onclick="nextQuestion(${i})">${opt.text}</div>
    `).join('');
    document.getElementById('optionsArea').innerHTML = optionsHtml;
}

async function nextQuestion(optionIndex) {
    const selectedScores = questions[currentIndex].options[optionIndex].scores;
    for (let key in selectedScores) {
        userScores[key] = Math.min(100, Math.max(0, userScores[key] + selectedScores[key]));
    }
    currentIndex++;
    if (currentIndex < questions.length) renderQuestion();
    else await submitAndShowResult();
}

async function submitAndShowResult() {
    // 1. 判定人格
    let personality = "稳健防御者";
    if (userScores.mp < 45) personality = "纯种小韭菜";
    else if (userScores.mp > 75 && userScores.sc > 75) personality = "反诈特种兵";
    else if (userScores.ic < 40) personality = "冲动型选手";

    let statsHtml = `<p style="color: #768390;">正在同步全网数据...</p>`;

    // 2. 更新基础界面
    document.getElementById('resName').innerText = `鉴定完毕：${personality}`;
    document.getElementById('resDesc').innerHTML = statsHtml;
    showPage('pageResult');

    try {
        // 3. 提交并获取占比
        await fetch(`${API_URL}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...userScores, personality })
        });

        const res = await fetch(`${API_URL}/stats/percentage?personality=${encodeURIComponent(personality)}`);
        const data = await res.json();

        // 4. 渲染详细结果
        statsHtml = `
            <div style="background: #1c2128; border: 1px solid #30363d; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid var(--primary);">
                全网已有 <b>${data.percentage}%</b> 的人与你同属一类。<br>
                你是第 <b>${data.total}</b> 位参与鉴定的特工。
            </div>
            您的四维最终得分：<br>
            🧠 心理门槛 (MP): <b>${userScores.mp}</b><br>
            🛡️ 行为耐受 (BR): <b>${userScores.br}</b><br>
            🔍 骗子认知 (SC): <b>${userScores.sc}</b><br>
            ⚡ 冲动控制 (IC): <b>${userScores.ic}</b>
        `;
    } catch (e) {
        statsHtml = `<p style="color: var(--danger);">云端数据同步失败，仅显示本地评分。</p>`;
    }
    document.getElementById('resDesc').innerHTML = statsHtml;
}

// 后台管理弹窗逻辑
document.getElementById('adminLock').onclick = () => {
    document.getElementById('modalOverlay').style.display = 'flex';
};

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

document.getElementById('confirmAdmin').onclick = async () => {
    const password = document.getElementById('adminPwdInput').value;
    try {
        const res = await fetch(`${API_URL}/admin/stats`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        
        if (!res.ok) throw new Error("密码错误或无权访问");
        
        const data = await res.json();
        const listHtml = data.length > 0 ? data.map(item => `
            <div class="stat-card">
                <b>${item.personality}</b> <br>
                <small>提交时间：${new Date(item.createTime).toLocaleString()}</small><br>
                得分详情：MP:${item.mp} BR:${item.br} SC:${item.sc} IC:${item.ic}
            </div>
        `).join('') : "<p style='text-align:center'>暂无提交数据</p>";
        
        document.getElementById('adminList').innerHTML = listHtml;
        closeModal();
        showPage('pageAdmin');
    } catch (e) {
        alert(e.message);
    }
};