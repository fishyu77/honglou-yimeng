document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 折叠面板功能
    const collapseBtns = document.querySelectorAll('.collapse-btn');
    
    collapseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetElement) {
                // 切换当前面板的显示状态
                targetElement.classList.toggle('active');
                if (icon) {
                    icon.style.transform = targetElement.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                }
            }
        });
    });
    
    // 滚动进度条与动画优化
    const progressBar = document.getElementById('progressBar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const fadeElements = document.querySelectorAll('.fade-in');
    let ticking = false;
    
    function onScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
        
        // 章节导航高亮
        highlightNavItem();
        
        // 页面元素淡入动画
        fadeInElements();
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });
    
    // 章节导航高亮功能
    function highlightNavItem() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollPosition >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    // 页面元素淡入动画
    function fadeInElements() {
        const windowHeight = window.innerHeight;
        
        fadeElements.forEach(element => {
            if (element.classList.contains('visible')) return;

            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    // 初始化时触发一次
    fadeInElements();
    highlightNavItem();
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // 进入红楼一梦按钮点击效果
    const enterDreamBtn = document.getElementById('enterDreamBtn');
    
    if (enterDreamBtn) {
        enterDreamBtn.addEventListener('click', function() {
            // 跳转到人物测试页面
            // 根据当前目录结构调整路径：当前在“红楼网页开头”，目标在内部的“人物性格测试/人物测试/index.html”
            window.location.href = 'test/index.html';
        });
    }
});