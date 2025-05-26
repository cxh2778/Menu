$(document).ready(function() {
    // 初始化应用
    initApp();
    
    // 绑定事件
    bindEvents();
    
    // 加载初始数据
    loadInitialData();
    
    // 检测设备类型并应用特定行为
    detectDeviceAndApplyBehavior();
});

// 全局变量
let currentCategory = 'all';
let currentRecipe = null;
let currentWeek = new Date();
let mealPlan = loadMealPlan();

// 初始化应用
function initApp() {
    // 初始化膳食计划界面
    updateWeekDisplay();
    generateMealPlanGrid();
    
    // 初始化拖放功能
    initDragAndDrop();
}

// 绑定事件处理
function bindEvents() {
    // 导航切换
    $('.nav-btn').on('click', function() {
        const view = $(this).data('view');
        $('.nav-btn').removeClass('active');
        $(this).addClass('active');
        $('.view').removeClass('active');
        $(`#${view}-view`).addClass('active');
    });
    
    // 食谱过滤
    $('.chip').on('click', function() {
        $('.chip').removeClass('active');
        $(this).addClass('active');
        currentCategory = $(this).data('filter');
        renderRecipes(recipesData.getByCategory(currentCategory));
    });
    
    // 搜索功能
    $('#recipe-search').on('input', function() {
        const query = $(this).val().trim();
        if (query.length > 0) {
            const results = recipesData.search(query);
            renderRecipes(results);
        } else {
            renderRecipes(recipesData.getByCategory(currentCategory));
        }
    });
    
    // 食谱点击事件（使用事件委托）
    $('#recipes-container').on('click', '.recipe-card', function() {
        const recipeId = parseInt($(this).data('id'));
        showRecipeDetails(recipeId);
    });
    
    // 关闭模态框
    $('.close-modal').on('click', function() {
        closeModal($(this).closest('.modal').attr('id'));
    });
    
    // 点击模态框背景关闭
    $('.modal-backdrop').on('click', function() {
        closeAllModals();
    });
    
    // 添加到膳食计划按钮
    $('#add-to-plan').on('click', function() {
        if (currentRecipe) {
            const today = new Date();
            $('#plan-date').val(formatDateForInput(today));
            openModal('add-to-plan-modal');
        }
    });
    
    // 确认添加到膳食计划
    $('#confirm-add-to-plan').on('click', function() {
        const date = $('#plan-date').val();
        const meal = $('#plan-meal').val();
        
        if (date && meal && currentRecipe) {
            addToMealPlan(date, meal, currentRecipe);
            closeAllModals();
            
            // 如果当前在膳食计划视图，更新显示
            if ($('#meal-plan-view').hasClass('active')) {
                updateMealPlanDisplay();
            }
            
            // 显示成功提示
            showToast('食谱已添加到膳食计划');
        }
    });
    
    // 膳食计划导航
    $('#prev-week').on('click', function() {
        navigateWeek(-1);
    });
    
    $('#next-week').on('click', function() {
        navigateWeek(1);
    });
    
    // 添加自定义食谱按钮
    $('#add-recipe-btn').on('click', function() {
        openModal('add-recipe-modal');
        resetAddRecipeForm();
    });
    
    // 添加食材按钮
    $('#add-ingredient-btn').on('click', function() {
        addIngredientField();
    });
    
    // 添加步骤按钮
    $('#add-step-btn').on('click', function() {
        addStepField();
    });
    
    // 删除食材/步骤按钮
    $(document).on('click', '.remove-item-btn', function() {
        const parent = $(this).parent();
        const container = parent.parent();
        
        // 确保至少保留一个输入框
        if (container.children().length > 1) {
            parent.remove();
        }
    });
    
    // 保存自定义食谱
    $('#new-recipe-form').on('submit', function(e) {
        e.preventDefault();
        saveCustomRecipe();
    });
}

// 添加食材输入字段
function addIngredientField() {
    const ingredientItem = `
        <div class="ingredient-item">
            <input type="text" class="ingredient-input" placeholder="食材名称及用量" required>
            <button type="button" class="remove-item-btn">
                <span class="material-symbols-rounded">remove</span>
            </button>
        </div>
    `;
    $('#ingredients-container').append(ingredientItem);
}

// 添加步骤输入字段
function addStepField() {
    const stepItem = `
        <div class="step-item">
            <input type="text" class="step-input" placeholder="烹饪步骤" required>
            <button type="button" class="remove-item-btn">
                <span class="material-symbols-rounded">remove</span>
            </button>
        </div>
    `;
    $('#steps-container').append(stepItem);
}

// 重置添加食谱表单
function resetAddRecipeForm() {
    $('#new-recipe-form')[0].reset();
    
    // 重置食材容器，只保留一个输入框
    $('#ingredients-container').html(`
        <div class="ingredient-item">
            <input type="text" class="ingredient-input" placeholder="食材名称及用量" required>
            <button type="button" class="remove-item-btn">
                <span class="material-symbols-rounded">remove</span>
            </button>
        </div>
    `);
    
    // 重置步骤容器，只保留一个输入框
    $('#steps-container').html(`
        <div class="step-item">
            <input type="text" class="step-input" placeholder="烹饪步骤" required>
            <button type="button" class="remove-item-btn">
                <span class="material-symbols-rounded">remove</span>
            </button>
        </div>
    `);
}

// 保存自定义食谱
function saveCustomRecipe() {
    // 显示保存中状态
    $('#save-recipe-btn').prop('disabled', true).html('<span class="loading-spinner" style="width: 20px; height: 20px; border-width: 2px;"></span> 保存中...');
    
    // 获取表单数据
    const name = $('#recipe-name').val().trim();
    const category = $('#recipe-category').val();
    const image = $('#recipe-image').val().trim();
    const description = $('#recipe-description').val().trim();
    
    // 获取食材列表
    const ingredients = [];
    $('.ingredient-input').each(function() {
        const value = $(this).val().trim();
        if (value) {
            ingredients.push(value);
        }
    });
    
    // 获取步骤列表
    const steps = [];
    $('.step-input').each(function() {
        const value = $(this).val().trim();
        if (value) {
            steps.push(value);
        }
    });
    
    // 验证数据
    if (!name || !category || !image || !description || ingredients.length === 0 || steps.length === 0) {
        showToast('请填写所有必填字段');
        $('#save-recipe-btn').prop('disabled', false).html('<span class="material-symbols-rounded">save</span> 保存食谱');
        return;
    }
    
    // 延迟操作，模拟网络请求
    setTimeout(function() {
        // 创建食谱对象
        const recipe = {
            name,
            category,
            image,
            description,
            ingredients,
            steps
        };
        
        // 添加到数据库
        const newRecipe = recipesData.addCustomRecipe(recipe);
        
        // 关闭模态框
        closeModal('add-recipe-modal');
        
        // 重新渲染食谱列表
        renderRecipes(recipesData.getByCategory(currentCategory));
        
        // 显示成功提示
        showToast('食谱创建成功');
        
        // 重置按钮状态
        $('#save-recipe-btn').prop('disabled', false).html('<span class="material-symbols-rounded">save</span> 保存食谱');
    }, 1000);
}

// 加载初始数据
function loadInitialData() {
    // 渲染食谱列表
    renderRecipes(recipesData.getAll());
}

// 渲染食谱列表
function renderRecipes(recipes) {
    const container = $('#recipes-container');
    container.empty();
    
    if (recipes.length === 0) {
        container.html('<div class="no-results">没有找到匹配的食谱<br><span class="material-symbols-rounded" style="font-size: 48px; margin-top: 20px; opacity: 0.5;">search_off</span></div>');
        return;
    }
    
    recipes.forEach(recipe => {
        // 检查是否为自定义食谱
        const customClass = recipe.isCustom ? 'custom-recipe' : '';
        const customTag = recipe.isCustom ? '<span class="recipe-tag custom">自制</span>' : '';
        
        const recipeCard = `
            <div class="recipe-card ${customClass}" data-id="${recipe.id}">
                <div class="recipe-image-wrapper">
                    <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                </div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.name}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-tags">
                        <span class="recipe-tag">${getCategoryName(recipe.category)}</span>
                        ${customTag}
                    </div>
                </div>
            </div>
        `;
        container.append(recipeCard);
    });
    
    // 添加动画效果
    $('.recipe-card').each(function(index) {
        const card = $(this);
        setTimeout(function() {
            card.addClass('show');
        }, index * 80); // 增加延迟，让动画更流畅
    });
}

// 显示食谱详情
function showRecipeDetails(recipeId) {
    // 显示加载动画
    $('#recipe-modal .modal-body').html('<div style="text-align: center; padding: 40px;"><div class="loading-spinner"></div></div>');
    openModal('recipe-modal');
    
    // 延迟加载内容，模拟网络请求
    setTimeout(function() {
        currentRecipe = recipesData.getById(recipeId);
        
        if (currentRecipe) {
            $('#modal-recipe-title').text(currentRecipe.name);
            $('#modal-recipe-image').attr('src', currentRecipe.image);
            $('#modal-recipe-intro').text(currentRecipe.description);
            
            // 准备模态框内容
            const modalContent = `
                <div class="recipe-image-container">
                    <img id="modal-recipe-image" src="${currentRecipe.image}" alt="${currentRecipe.name}">
                </div>
                <div class="recipe-details">
                    <div class="recipe-intro" id="modal-recipe-intro">${currentRecipe.description}</div>
                    
                    <h3>
                        <span class="material-symbols-rounded">shopping_cart</span>
                        食材
                    </h3>
                    <ul id="modal-recipe-ingredients" class="ingredients-list">
                        ${currentRecipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                    
                    <h3>
                        <span class="material-symbols-rounded">format_list_numbered</span>
                        步骤
                    </h3>
                    <ol id="modal-recipe-steps" class="steps-list">
                        ${currentRecipe.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="modal-actions">
                    <button id="add-to-plan" class="primary-btn">
                        <span class="material-symbols-rounded">calendar_today</span>
                        添加到膳食计划
                    </button>
                </div>
            `;
            
            // 更新模态框内容
            $('#recipe-modal .modal-body').html(modalContent);
            
            // 重新绑定添加到膳食计划按钮事件
            $('#add-to-plan').on('click', function() {
                if (currentRecipe) {
                    const today = new Date();
                    $('#plan-date').val(formatDateForInput(today));
                    openModal('add-to-plan-modal');
                }
            });
        }
    }, 500);
}

// 打开模态框
function openModal(modalId) {
    $(`#${modalId}`).css('display', 'block');
    $('.modal-backdrop').css('display', 'block');
    $('body').addClass('modal-open');
    
    // 添加动画类
    setTimeout(function() {
        $(`#${modalId} .modal-content`).addClass('show');
    }, 10);
}

// 关闭模态框
function closeModal(modalId) {
    $(`#${modalId} .modal-content`).removeClass('show');
    
    setTimeout(function() {
        $(`#${modalId}`).css('display', 'none');
        
        // 如果没有其他模态框打开，隐藏背景
        if ($('.modal[style*="display: block"]').length === 0) {
            $('.modal-backdrop').css('display', 'none');
            $('body').removeClass('modal-open');
        }
    }, 300);
}

// 关闭所有模态框
function closeAllModals() {
    $('.modal').each(function() {
        closeModal($(this).attr('id'));
    });
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        'breakfast': '早餐',
        'lunch': '午餐',
        'dinner': '晚餐',
        'dessert': '甜点'
    };
    
    return categories[category] || '其他';
}

// 初始化拖放功能
function initDragAndDrop() {
    // 使食谱卡片可拖动
    $('.recipe-card').draggable({
        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000,
        start: function(event, ui) {
            // 设置克隆元素的样式
            ui.helper.addClass('dragging-recipe');
        }
    });
    
    // 使膳食格可放置
    $('.meal-slot').droppable({
        accept: '.recipe-card',
        hoverClass: 'highlight',
        drop: function(event, ui) {
            const recipeId = ui.draggable.data('id');
            const recipe = recipesData.getById(recipeId);
            const date = $(this).data('date');
            const meal = $(this).data('meal');
            
            if (recipe && date && meal) {
                addToMealPlan(date, meal, recipe);
                updateMealPlanDisplay();
                showToast('食谱已添加到膳食计划');
            }
        }
    });
}

// 添加到膳食计划
function addToMealPlan(date, meal, recipe) {
    if (!mealPlan[date]) {
        mealPlan[date] = {};
    }
    
    mealPlan[date][meal] = {
        id: recipe.id,
        name: recipe.name,
        isCustom: recipe.isCustom || false
    };
    
    // 保存到本地存储
    saveMealPlan();
}

// 从膳食计划中移除
function removeFromMealPlan(date, meal) {
    if (mealPlan[date] && mealPlan[date][meal]) {
        delete mealPlan[date][meal];
        
        // 如果日期下没有餐了，删除该日期
        if (Object.keys(mealPlan[date]).length === 0) {
            delete mealPlan[date];
        }
        
        // 保存到本地存储
        saveMealPlan();
    }
}

// 保存膳食计划到本地存储
function saveMealPlan() {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
}

// 从本地存储加载膳食计划
function loadMealPlan() {
    const savedPlan = localStorage.getItem('mealPlan');
    return savedPlan ? JSON.parse(savedPlan) : {};
}

// 生成膳食计划网格
function generateMealPlanGrid() {
    const weekGrid = $('#meal-plan-grid');
    weekGrid.empty();
    
    // 获取当前周的日期范围
    const dates = getWeekDates(currentWeek);
    
    // 为每一天创建一列
    dates.forEach(date => {
        const dateStr = formatDate(date);
        const dayName = getDayName(date.getDay());
        
        const dayColumn = `
            <div class="day-column">
                <div class="day-header">
                    <div class="day-name">${dayName}</div>
                    <div class="day-date">${date.getDate()}日</div>
                </div>
                <div class="meal-slot" data-date="${dateStr}" data-meal="breakfast"></div>
                <div class="meal-slot" data-date="${dateStr}" data-meal="lunch"></div>
                <div class="meal-slot" data-date="${dateStr}" data-meal="dinner"></div>
            </div>
        `;
        
        weekGrid.append(dayColumn);
    });
    
    // 更新膳食计划显示
    updateMealPlanDisplay();
}

// 更新膳食计划显示
function updateMealPlanDisplay() {
    // 清空所有槽位的内容
    $('.meal-slot').empty();
    
    // 获取当前周的日期范围
    const dates = getWeekDates(currentWeek);
    
    // 填充有计划的槽位
    dates.forEach(date => {
        const dateStr = formatDate(date);
        
        if (mealPlan[dateStr]) {
            Object.keys(mealPlan[dateStr]).forEach(meal => {
                const mealInfo = mealPlan[dateStr][meal];
                const mealSlot = $(`.meal-slot[data-date="${dateStr}"][data-meal="${meal}"]`);
                
                // 自定义食谱样式类
                const customClass = mealInfo.isCustom ? 'custom-meal' : '';
                
                const mealItem = `
                    <div class="meal-item ${customClass}" data-recipe-id="${mealInfo.id}">
                        <div class="meal-item-name">${mealInfo.name}</div>
                        <span class="remove-meal">×</span>
                    </div>
                `;
                
                mealSlot.html(mealItem);
                
                // 绑定点击事件显示详情
                mealSlot.find('.meal-item').on('click', function(e) {
                    if (!$(e.target).hasClass('remove-meal')) {
                        const recipeId = parseInt($(this).data('recipe-id'));
                        showRecipeDetails(recipeId);
                    }
                });
                
                // 绑定删除按钮事件
                mealSlot.find('.remove-meal').on('click', function(e) {
                    e.stopPropagation();
                    removeFromMealPlan(dateStr, meal);
                    updateMealPlanDisplay();
                });
            });
        }
    });
    
    // 重新初始化拖放功能
    initDragAndDrop();
}

// 更新周显示
function updateWeekDisplay() {
    const dates = getWeekDates(currentWeek);
    const startDate = formatDateDisplay(dates[0]);
    const endDate = formatDateDisplay(dates[6]);
    
    $('#current-week-display').text(`${startDate} - ${endDate}`);
}

// 切换周
function navigateWeek(direction) {
    // 复制当前日期以避免直接修改
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + (direction * 7));
    
    currentWeek = newDate;
    updateWeekDisplay();
    generateMealPlanGrid();
}

// 获取一周的日期
function getWeekDates(date) {
    const result = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // 设置为本周日
    
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        result.push(day);
    }
    
    return result;
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

// 格式化日期为 YYYY年MM月DD日
function formatDateDisplay(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}年${month}月${day}日`;
}

// 格式化日期为 HTML input 元素使用
function formatDateForInput(date) {
    return formatDate(date);
}

// 获取星期名称
function getDayName(dayIndex) {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[dayIndex];
}

// 显示提示
function showToast(message) {
    // 如果已经存在 toast，先移除
    $('.toast').remove();
    
    // 创建新的 toast
    const toast = $(`<div class="toast">${message}</div>`);
    $('body').append(toast);
    
    // 显示 toast
    setTimeout(() => {
        toast.addClass('show');
    }, 10);
    
    // 3秒后自动消失
    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => {
            toast.remove();
        }, 400); // 延长动画时间
    }, 3000);
}

// 检测设备类型并应用特定行为
function detectDeviceAndApplyBehavior() {
    // 检查是否为移动设备
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
        // 在移动设备上启用周视图的横向滚动手势
        enableMobileGestures();
        
        // 修改拖放行为以适应触摸设备
        adjustDragDropForTouch();
        
        // 食谱点击后自动关闭导航栏
        $('#recipes-container').on('click', '.recipe-card', function() {
            // 如果是在移动视图下，点击食谱后收起搜索栏，让更多空间显示内容
            if ($('.search-container').is(':visible')) {
                $('.search-container').addClass('minimized');
            }
        });
    }
}

// 启用移动设备上的手势
function enableMobileGestures() {
    // 周视图滚动指示器
    const weekGrid = $('#meal-plan-grid');
    if (weekGrid.length > 0) {
        // 添加横向滚动指示器
        weekGrid.after('<div class="scroll-indicator"><span></span><span></span><span></span></div>');
        
        // 滚动时隐藏指示器
        weekGrid.on('scroll', function() {
            $('.scroll-indicator').fadeOut();
        });
    }
    
    // 添加返回顶部按钮
    $('body').append('<button id="back-to-top" class="icon-btn"><span class="material-symbols-rounded">arrow_upward</span></button>');
    
    // 监听滚动事件，显示/隐藏返回顶部按钮
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    
    // 点击返回顶部
    $('#back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 300);
        return false;
    });
}

// 调整拖放功能以适应触摸设备
function adjustDragDropForTouch() {
    // 在触摸设备上，拖动操作可能不太直观
    // 添加长按提示
    $('.recipe-card').on('touchstart', function() {
        const card = $(this);
        // 长按提示计时器
        card.data('touchTimer', setTimeout(function() {
            card.addClass('touch-drag-ready');
            showToast('长按拖动到膳食计划中');
        }, 500));
    }).on('touchend touchcancel', function() {
        // 清除长按计时器
        clearTimeout($(this).data('touchTimer'));
        $(this).removeClass('touch-drag-ready');
    });
    
    // 优化触摸设备上的放置区域
    $('.meal-slot').addClass('touch-drop-zone');
} 