// 食谱数据
const recipes = [
    {
        id: 1,
        name: "红烧肉",
        image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "色香味俱全的经典家常菜，口感软糯，肥而不腻。",
        category: "dinner",
        ingredients: [
            "五花肉 500克",
            "葱 2根",
            "姜 3片",
            "蒜 3瓣",
            "干辣椒 2个",
            "八角 2个",
            "桂皮 1小块",
            "冰糖 30克",
            "酱油 2勺",
            "料酒 1勺",
            "食盐 适量"
        ],
        steps: [
            "将五花肉切成4厘米见方的大块，用开水焯一下，去除血水和杂质。",
            "锅中放少量油，倒入冰糖小火炒至融化呈琥珀色。",
            "放入焯过水的五花肉，翻炒至肉块均匀裹上糖色。",
            "加入葱、姜、蒜、八角、桂皮和干辣椒，继续翻炒出香味。",
            "倒入料酒，加入酱油和适量清水（没过肉块）。",
            "大火烧开后转小火，盖上锅盖炖煮1小时左右至肉烂。",
            "最后开大火收汁，加盐调味即可。"
        ]
    },
    {
        id: 2,
        name: "宫保鸡丁",
        image: "https://images.unsplash.com/photo-1568996121090-971a7b682fab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "经典川菜，鸡肉鲜嫩，花生酥脆，辣味适中，口感丰富。",
        category: "dinner",
        ingredients: [
            "鸡胸肉 300克",
            "花生米 50克",
            "干红辣椒 8个",
            "花椒 1小勺",
            "葱 2根",
            "姜 3片",
            "蒜 3瓣",
            "生抽 1勺",
            "醋 1勺",
            "白糖 1小勺",
            "淀粉 2勺",
            "食盐 适量",
            "食用油 适量"
        ],
        steps: [
            "鸡胸肉切成1.5厘米见方的小丁，用少量盐、生抽和淀粉腌制10分钟。",
            "花生米提前用油炸熟或烤熟，备用。",
            "干红辣椒剪成小段，去籽。",
            "葱姜蒜切末，备用。",
            "碗中调制酱汁：混合生抽、醋、白糖、水淀粉，搅拌均匀。",
            "热锅凉油，放入花椒和干辣椒小火炒香。",
            "倒入腌制好的鸡丁，大火快速翻炒至变色。",
            "加入葱姜蒜末继续翻炒，注入调好的酱汁。",
            "汁液浓稠后加入花生米，迅速翻炒均匀即可出锅。"
        ]
    },
    {
        id: 3,
        name: "麻婆豆腐",
        image: "https://images.unsplash.com/photo-1574484184081-afea8a62f9c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "川菜经典，麻辣鲜香，豆腐嫩滑，肉末鲜香，是下饭的绝佳选择。",
        category: "dinner",
        ingredients: [
            "嫩豆腐 1盒",
            "猪肉末 100克",
            "郫县豆瓣酱 1勺",
            "花椒粉 1小勺",
            "辣椒粉 1小勺",
            "蒜末 2勺",
            "姜末 1勺",
            "葱花 适量",
            "生抽 1勺",
            "料酒 1小勺",
            "淀粉 1勺",
            "清水 100毫升",
            "食用油 适量"
        ],
        steps: [
            "豆腐切成2厘米见方的小块，放入热水中浸泡3分钟，捞出沥干水分。",
            "锅中放油，油热后放入肉末翻炒至变色。",
            "加入蒜末、姜末和豆瓣酱，小火炒出香味和红油。",
            "倒入清水，加入生抽和料酒，煮开后放入豆腐块。",
            "小火煮3-5分钟，使豆腐入味。",
            "水淀粉勾芡，撒上花椒粉和辣椒粉。",
            "最后撒上葱花，出锅前轻轻翻动几下即可。"
        ]
    },
    {
        id: 4,
        name: "蛋炒饭",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "家常快手菜，米饭粒粒分明，鸡蛋嫩滑，营养美味。",
        category: "lunch",
        ingredients: [
            "隔夜米饭 2碗",
            "鸡蛋 2个",
            "胡萝卜 1/4个",
            "青豆 30克",
            "火腿 30克",
            "葱花 适量",
            "食盐 适量",
            "食用油 适量"
        ],
        steps: [
            "隔夜米饭提前用手抓散，去除结块。",
            "胡萝卜、火腿切成小丁，青豆焯水备用。",
            "热锅凉油，倒入打散的鸡蛋液，炒成小块。",
            "加入胡萝卜丁、火腿丁和青豆，翻炒均匀。",
            "倒入米饭，用铲子不断翻炒，使米饭充分散开。",
            "加入适量食盐调味，继续翻炒至米饭粒粒分明。",
            "最后撒上葱花，翻炒均匀即可出锅。"
        ]
    },
    {
        id: 5,
        name: "番茄鸡蛋面",
        image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "酸甜开胃的经典面食，汤汁浓郁，鸡蛋嫩滑，面条劲道。",
        category: "breakfast",
        ingredients: [
            "挂面 100克",
            "鸡蛋 2个",
            "番茄 2个",
            "葱 1根",
            "姜 2片",
            "蒜 2瓣",
            "食盐 适量",
            "白糖 1小勺",
            "食用油 适量",
            "香菜 少许"
        ],
        steps: [
            "番茄洗净，切成小块，鸡蛋打散备用。",
            "挂面煮至七分熟，捞出过凉水备用。",
            "锅中放油，爆香葱姜蒜。",
            "倒入番茄块，煸炒至软烂出汁。",
            "加入适量清水，调入食盐和白糖，煮沸。",
            "沿锅边缓缓倒入打散的鸡蛋，形成蛋花。",
            "放入煮好的面条，煮1-2分钟至面条入味。",
            "撒上香菜末即可出锅。"
        ]
    },
    {
        id: 6,
        name: "糖醋排骨",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "色泽红亮，酸甜可口，排骨酥烂，风味独特。",
        category: "dinner",
        ingredients: [
            "猪小排 500克",
            "姜 3片",
            "葱 2根",
            "八角 1个",
            "料酒 1勺",
            "白醋 2勺",
            "白糖 3勺",
            "生抽 1勺",
            "番茄酱 2勺",
            "淀粉 适量",
            "食用油 适量",
            "香菜 少许"
        ],
        steps: [
            "排骨洗净，切成3-4厘米长的小段，用开水焯一下去除血水。",
            "排骨裹上一层薄淀粉。",
            "锅中放油，油热后将排骨炸至金黄色，捞出沥油。",
            "锅中留少量底油，爆香姜片和葱白。",
            "加入白糖，小火熬至糖融化呈琥珀色。",
            "倒入白醋、生抽、番茄酱和适量清水，搅拌均匀。",
            "放入炸好的排骨和八角，大火烧开后转小火慢炖15分钟。",
            "大火收汁至浓稠裹满排骨，撒上葱花即可出锅。"
        ]
    },
    {
        id: 7,
        name: "西红柿炒鸡蛋",
        image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "家常菜的经典，酸甜开胃，色彩鲜艳，营养丰富。",
        category: "lunch",
        ingredients: [
            "西红柿 2个",
            "鸡蛋 3个",
            "葱 1根",
            "姜 2片",
            "蒜 2瓣",
            "白糖 1小勺",
            "食盐 适量",
            "食用油 适量"
        ],
        steps: [
            "西红柿洗净，切成小块。",
            "鸡蛋打散，加少许盐调匀。",
            "热锅凉油，倒入鸡蛋液，炒至金黄蓬松，盛出备用。",
            "锅中重新加油，爆香葱姜蒜。",
            "放入西红柿块，中火翻炒至软烂出汁。",
            "加入白糖和食盐调味。",
            "倒入炒好的鸡蛋，翻炒均匀即可出锅。"
        ]
    },
    {
        id: 8,
        name: "皮蛋瘦肉粥",
        image: "https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "香浓绵滑的广式早餐粥品，营养丰富，温暖舒适。",
        category: "breakfast",
        ingredients: [
            "大米 1杯",
            "皮蛋 2个",
            "瘦肉 100克",
            "姜 3片",
            "葱花 适量",
            "食盐 适量",
            "香油 少许",
            "白胡椒粉 少许"
        ],
        steps: [
            "大米洗净，浸泡30分钟。",
            "皮蛋去壳切小块，瘦肉切薄片，用少量生抽、料酒和淀粉腌制10分钟。",
            "锅中加入6-8杯清水和浸泡好的大米，大火煮开。",
            "转小火慢煮30分钟，期间不时搅拌防止粘锅。",
            "粥变得浓稠后加入皮蛋块和姜片，继续煮10分钟。",
            "加入腌制好的瘦肉片，煮至肉熟。",
            "加入食盐、白胡椒粉调味，淋上香油。",
            "撒上葱花即可出锅。"
        ]
    },
    {
        id: 9,
        name: "糯米糍粑",
        image: "https://images.unsplash.com/photo-1605333396915-47ffad9b1dab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "软糯香甜的传统小吃，外脆内软，口感独特。",
        category: "dessert",
        ingredients: [
            "糯米粉 200克",
            "清水 120毫升",
            "白糖 50克",
            "花生碎 50克",
            "熟芝麻 50克",
            "食用油 适量"
        ],
        steps: [
            "糯米粉加入清水搅拌均匀，揉成光滑的面团。",
            "面团分成小剂子，搓成圆形。",
            "平底锅中放少量油，将圆形面团压扁成饼状。",
            "小火慢煎至两面金黄。",
            "白糖、花生碎和熟芝麻混合均匀，作为蘸料。",
            "糍粑趁热蘸上混合料即可食用。"
        ]
    },
    {
        id: 10,
        name: "杂粮煎饼",
        image: "https://images.unsplash.com/photo-1537790698196-aad88e855fea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "粗粮细作的健康早餐，香脆可口，营养丰富。",
        category: "breakfast",
        ingredients: [
            "玉米面 100克",
            "面粉 50克",
            "荞麦面 50克",
            "鸡蛋 1个",
            "葱花 适量",
            "食盐 适量",
            "食用油 适量",
            "豆瓣酱 适量",
            "甜面酱 适量",
            "生菜 适量",
            "油条 1根"
        ],
        steps: [
            "将玉米面、面粉和荞麦面混合，加入适量清水调成稀面糊。",
            "加入鸡蛋、葱花和食盐，搅拌均匀。",
            "平底锅刷油预热，倒入一勺面糊，摊成薄饼。",
            "煎至两面金黄。",
            "将煎好的饼放在案板上，抹上豆瓣酱和甜面酱。",
            "铺上生菜叶，放入油条，卷起即可。"
        ]
    },
    {
        id: 11,
        name: "椰汁西米露",
        image: "https://images.unsplash.com/photo-1556679343-c1c3d8fca80f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "清甜爽口的传统甜品，椰香浓郁，西米晶莹剔透。",
        category: "dessert",
        ingredients: [
            "西米 50克",
            "椰浆 200毫升",
            "牛奶 200毫升",
            "白糖 30克",
            "芒果 1个",
            "西瓜 适量",
            "薄荷叶 少许"
        ],
        steps: [
            "西米用冷水浸泡15分钟。",
            "锅中加入足量清水，大火煮开后放入西米。",
            "煮至西米中心只剩小白点时关火，焖5分钟至全透明。",
            "西米过冷水，沥干水分。",
            "芒果切小丁，西瓜挖成小球。",
            "椰浆、牛奶和白糖混合，搅拌至糖融化。",
            "将西米、芒果丁和西瓜球放入碗中，倒入椰奶混合液。",
            "冰镇后食用，可用薄荷叶装饰。"
        ]
    },
    {
        id: 12,
        name: "油泼面",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "陕西特色面食，劲道爽滑，香辣可口，风味独特。",
        category: "lunch",
        ingredients: [
            "面条 200克",
            "蒜 5瓣",
            "干辣椒 10克",
            "花椒 5克",
            "葱 2根",
            "生抽 1勺",
            "陈醋 1勺",
            "食盐 适量",
            "食用油 3勺",
            "香菜 少许"
        ],
        steps: [
            "面条煮至熟透，捞出过凉水，沥干水分。",
            "蒜切末，干辣椒切段，葱切段，香菜切段。",
            "碗中放入面条，上面铺上蒜末、干辣椒段、花椒和部分葱段。",
            "加入生抽、陈醋和盐调味。",
            "锅中油烧至冒烟，立即浇在蒜末和辣椒上，听到滋啦声。",
            "迅速拌匀，使调料均匀裹在面条上。",
            "最后撒上香菜和剩余葱段即可。"
        ]
    }
];

// 从本地存储加载自定义食谱
function loadCustomRecipes() {
    const savedRecipes = localStorage.getItem('customRecipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
}

// 将自定义食谱添加到主食谱列表
let customRecipes = loadCustomRecipes();
let allRecipes = [...recipes, ...customRecipes];

// 导出数据供其他文件使用
const recipesData = {
    getAll: function() {
        return allRecipes;
    },
    getById: function(id) {
        return allRecipes.find(recipe => recipe.id === id);
    },
    getByCategory: function(category) {
        if (category === 'all') {
            return allRecipes;
        }
        return allRecipes.filter(recipe => recipe.category === category);
    },
    searchByName: function(query) {
        const searchTerm = query.toLowerCase();
        return allRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm)
        );
    },
    searchByIngredient: function(query) {
        const searchTerm = query.toLowerCase();
        return allRecipes.filter(recipe => 
            recipe.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
    },
    search: function(query) {
        const searchTerm = query.toLowerCase();
        return allRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
    },
    addCustomRecipe: function(recipe) {
        // 给新食谱分配一个唯一ID（取所有食谱的最大ID + 1）
        const maxId = Math.max(...allRecipes.map(r => r.id), 0);
        recipe.id = maxId + 1;
        
        // 标记为自定义食谱
        recipe.isCustom = true;
        
        // 添加到自定义食谱列表
        customRecipes.push(recipe);
        
        // 更新所有食谱列表
        allRecipes = [...recipes, ...customRecipes];
        
        // 保存到本地存储
        localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
        
        return recipe;
    },
    deleteCustomRecipe: function(id) {
        // 从自定义食谱列表中删除
        customRecipes = customRecipes.filter(recipe => recipe.id !== id);
        
        // 更新所有食谱列表
        allRecipes = [...recipes, ...customRecipes];
        
        // 保存到本地存储
        localStorage.setItem('customRecipes', JSON.stringify(customRecipes));
    },
    getCustomRecipes: function() {
        return customRecipes;
    }
}; 