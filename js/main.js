document.addEventListener('DOMContentLoaded', function() {
    const slideTrack = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.slide');
    const buttons = document.querySelectorAll('.slider-btn');
    const textContents = document.querySelectorAll('.text-content');
    let currentSlide = 0;
    let isTransitioning = false;

    // 初始化第一张图片
    slides[0].classList.add('active');
    buttons[0].classList.add('active');
    textContents[0].classList.add('active');

    function goToSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        // 计算移动距离
        const translateX = index * -33.333; // 每次移动33.333%的宽度
        slideTrack.style.transform = `translateX(${translateX}%)`;

        // 更新活动状态
        slides.forEach(slide => slide.classList.remove('active'));
        buttons.forEach(btn => btn.classList.remove('active'));
        textContents.forEach(content => content.classList.remove('active'));

        slides[index].classList.add('active');
        buttons[index].classList.add('active');
        textContents[index].classList.add('active');

        currentSlide = index;

        // 动画结束后重置状态
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // 自动播放
    let autoPlayInterval = setInterval(() => {
        const nextSlide = (currentSlide + 1) % slides.length;
        goToSlide(nextSlide);
    }, 5000);

    // 点击导航按钮
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
            goToSlide(index);
            // 重新开始自动播放
            autoPlayInterval = setInterval(() => {
                const nextSlide = (currentSlide + 1) % slides.length;
                goToSlide(nextSlide);
            }, 5000);
        });
    });

    // 鼠标悬停时暂停自动播放
    slideTrack.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    // 鼠标离开时恢复自动播放
    slideTrack.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            goToSlide(nextSlide);
        }, 5000);
    });

    // 表单提交处理
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 显示成功弹窗
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';
        
        // 清空表单
        this.reset();
    });

    // 关闭弹窗
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
    });

    // 点击弹窗外部关闭
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('successModal');
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});