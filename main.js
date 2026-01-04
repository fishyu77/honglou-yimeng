const questions = [
  {
    question: "当你意识到这个世界的规则并不公平时，你通常会？",
    options: [
      { text: "努力适应规则，在规则内做到最好", type: "baochai" },
      { text: "内心抗拒，但表面仍然顺从", type: "daiyu" },
      { text: "厌倦这一切，想逃离这套体系", type: "baoyu" },
      { text: "利用规则，为自己争取最大利益", type: "fengjie" }
    ]
  },
  {
    question: "当你发现，周围的人对你有明确期待时，你更可能？",
    options: [
      { text: "尽量不让任何人失望", type: "baochai" },
      { text: "表面接受，内心却越来越压抑", type: "daiyu" },
      { text: "拒绝被定义，哪怕被认为不合群", type: "baoyu" },
      { text: "将期待转化为可利用的资源", type: "fengjie" }
    ]
  },
  {
    question: "当你感到难过或委屈时，你通常会？",
    options: [
      { text: "自己消化，不轻易示弱", type: "daiyu" },
      { text: "尽量保持体面，不影响大局", type: "baochai" },
      { text: "直接表达不满，哪怕显得叛逆", type: "baoyu" },
      { text: "转化为行动，掌控局面", type: "fengjie" }
    ]
  },
  {
    question: "在关系中，你更害怕的是？",
    options: [
      { text: "被忽视、被取代", type: "daiyu" },
      { text: "不被认可、不够优秀", type: "baochai" },
      { text: "失去自我、被束缚", type: "baoyu" },
      { text: "失去控制权", type: "fengjie" }
    ]
  },
  {
    question: "如果你隐约感觉到结局并不美好，你会？",
    options: [
      { text: "继续投入感情，哪怕注定受伤", type: "daiyu" },
      { text: "选择一条更稳妥的道路", type: "baochai" },
      { text: "宁愿短暂燃烧，也不愿被安排", type: "baoyu" },
      { text: "提前布局，避免成为牺牲品", type: "fengjie" }
    ]
  }
];

const roles = {
  daiyu: {
    name: "林黛玉",
    img: "../../金陵十二钗/image/林黛玉.png",
    desc: `
      <strong>判词：</strong><br>
      情深不寿，慧极必伤。<br>
      你并非脆弱，只是这个世界从不偏爱敏感之人。<br><br>
      <strong>结构：</strong><br>
      在大观园中，你拥有最清醒的感知，却几乎没有安全的位置。
      你被允许感受，却不被允许失控。<br><br>
      <strong>现实映射：</strong><br>
      在现代社会，你往往是那个最先察觉问题的人，
      却也是最容易被忽视、被消耗的人。
      你不是不够坚强，
      而是这个系统更偏爱迟钝而非真诚。
    `
  },
  baochai: {
    name: "薛宝钗",
    img: "../shierchai/薛宝钗.png",
    desc: `
      <strong>判词：</strong><br>
      人皆称你稳妥圆融，却少有人问你是否甘心。<br>
      你的完美，是长期自我克制的结果。<br><br>
      <strong>结构：</strong><br>
      在大观园中，你最适合生存，
      但这种适合，本身就是一种交换。<br><br>
      <strong>现实映射：</strong><br>
      在现代社会，你往往拥有“正确”的履历与选择，
      却习惯把真实欲望放在最后。
      你看起来什么都有，
      却很少被问过：你想要什么？
    `
  },
  baoyu: {
    name: "贾宝玉",
    img: "../../金陵十二钗/image/贾宝玉.png",
    desc: `
      <strong>判词：</strong><br>
      你厌恶功名，却身处其中。<br>
      你想逃离规则，却被规则牢牢包围。<br><br>
      <strong>结构：</strong><br>
      在大观园中，你拥有被保护的特权，
      也因此失去了真正改变命运的能力。<br><br>
      <strong>现实映射：</strong><br>
      在现代社会，你往往对成功叙事保持警惕，
      却又难以彻底脱身。
      你不是不努力，
      而是不愿用灵魂去交换认可。
    `
  },
  fengjie: {
    name: "王熙凤",
    img: "../shierchai/王熙凤.png",
    desc: `
      <strong>判词：</strong><br>
      心狠手稳，最像赢家，<br>
      却往往最早被系统反噬。<br><br>
      <strong>结构：</strong><br>
      在大观园中，你掌控局面，
      却也是替家族承担代价的人。<br><br>
      <strong>现实映射：</strong><br>
      在现代社会，你往往是高效、强势、不可替代的角色，
      但长期站在压力与责任的中心。
      当系统需要牺牲时，
      你往往首当其冲。
    `
  }
};

const societyMap = {
  daiyu: {
    title: "你对世界的感受力，超出了它的承受范围",
    intro: "如果你活在今天，你的问题从来不是情绪，而是你看得太早、太清楚。",
    points: [
      "你能迅速察觉关系中的不平等",
      "你意识到规则，却被要求假装不懂",
      "你对真实高度敏感，因此被视为脆弱"
    ],
    end: "你不是不适合这个世界，<br>只是它无法消化你这样的清醒。"
  },
  baochai: {
    title: "你是被系统偏爱的那一类人",
    intro: "如果你活在今天，你很可能是“别人眼中的正确答案”。稳妥、得体、值得信赖。",
    points: [
      "你知道什么时候该说什么话",
      "你能在复杂系统中长期生存",
      "你很少失控，但也很少被真正看见"
    ],
    end: "这个世界喜欢你，<br>但你未必真的属于自己。"
  },
  baoyu: {
    title: "你拒绝把人生交给一套评分系统",
    intro: "如果你活在今天，你会被反复提醒要更现实一些。",
    points: [
      "你不认同竞争，却被迫参与其中",
      "你更关心人本身，而不是结果",
      "你抗拒被定义，因此被视为不成熟"
    ],
    end: "你不是没有能力，<br>你只是拒绝用它去证明什么。"
  },
  fengjie: {
    title: "你是这个系统的操盘者",
    intro: "如果你活在今天，你会是效率极高、情绪收敛、能扛事的人。",
    points: [
      "你习惯掌控局面，而不是暴露软弱",
      "你精通规则，也被规则反噬",
      "你赢得位置，却失去喘息"
    ],
    end: "你支撑着一切运转，<br>却很少有人问你累不累。"
  }
};

let current = 0;
let scores = { fengjie: 0, daiyu: 0, baochai: 0, baoyu: 0 };

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function startTest() {
  current = 0;
  scores = { fengjie: 0, daiyu: 0, baochai: 0, baoyu: 0 };
  showPage("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.question;
  document.getElementById("progress").innerText =
    `第 ${current + 1} / ${questions.length} 题`;

  const options = document.getElementById("options");
  options.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;
    btn.onclick = () => selectOption(opt.type);
    options.appendChild(btn);
  });
}

function selectOption(type) {
  if (scores[type] !== undefined) {
    scores[type]++;
  }

  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let maxRole = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  const roleData = roles[maxRole];

  // 页面展示
  document.getElementById("roleName").innerText = roleData.name;
  document.getElementById("roleDesc").innerHTML = roleData.desc;
  
  const img = document.getElementById("roleImg");
  img.src = roleData.img;
  img.style.display = "block";

  showPage("result");
  
  // Save currentType for next steps
  window.currentType = maxRole;
}

function restart() {
  location.reload();
}

function goNext() {
  showPage("society");
  renderSociety(window.currentType);
}

function renderSociety(type) {
  const data = societyMap[type];
  if (!data) return;

  document.getElementById("societyTitle").innerText = data.title;
  document.getElementById("societyIntro").innerText = data.intro;

  const list = document.getElementById("societyPoints");
  list.innerHTML = "";

  data.points.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
  
  if (data.end) {
      const endP = document.createElement("p");
      endP.className = "society-end";
      endP.innerHTML = data.end;
      list.appendChild(endP);
  }
}

function goEnding() {
  showPage("ending");
}

function staySilent() {
  const endingPage = document.getElementById('ending');
  
  // 替换内容为沉默文案
  endingPage.innerHTML = `
    <div class="ending-silence-container">
      <p class="ending-silence">
        ...<br><br>
        有些人选择醒来，<br>
        有些人选择留在梦里。
      </p>
    </div>
  `;
  
  // 触发背景变暗
  // 使用 setTimeout 确保 DOM 更新后再添加 class，以触发 transition
  setTimeout(() => {
        endingPage.classList.add("dark");
        // 点击任意处返回主页
        endingPage.style.cursor = "pointer";
        endingPage.addEventListener("click", () => {
            window.location.href = "../home.html";
        });
    }, 100);
}
