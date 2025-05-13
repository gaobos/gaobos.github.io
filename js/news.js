// 新闻数据存储
let newsData = [];
let currentPage = 1;
const itemsPerPage = 5;
const maxPageButtons = 5; // 最多显示的页码按钮数

// 设置基础URL
const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

// 加载新闻数据
async function loadNews() {
    try {
        const response = await fetch(`${baseUrl}/data/news.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        newsData = data.news;
        renderNews();
    } catch (error) {
        console.error('加载新闻失败:', error);
        const container = document.querySelector('.news-container');
        if (container) {
            container.innerHTML = '<div class="news-error">加载新闻数据失败，请稍后再试</div>';
        }
    }
}

// 渲染新闻列表
function renderNews() {
    const container = document.querySelector('.news-container');
    if (!container || !newsData || !newsData.length) {
        return;
    }

    // 对新闻数据按日期排序（新的在前）
    newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageNews = newsData.slice(startIndex, endIndex);
    
    container.innerHTML = pageNews.map(news => `
        <div class="news-item">
            <div class="news-item-left">
                <a href="news-detail.html?id=${news.id}" class="news-title">
                    ${news.title || '无标题'}
                </a>
                <div class="news-date">${news.date || '日期未知'}</div>
            </div>
            <a href="news-detail.html?id=${news.id}" class="read-more">查看详情</a>
        </div>
    `).join('');
    
    updatePagination();
}

// 更新分页信息
function updatePagination() {
    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    
    // 更新首页和上一页按钮状态
    document.querySelector('.first-page').disabled = currentPage === 1;
    document.querySelector('.prev-page').disabled = currentPage === 1;
    
    // 更新下一页和末页按钮状态
    document.querySelector('.next-page').disabled = currentPage === totalPages;
    document.querySelector('.last-page').disabled = currentPage === totalPages;
    
    // 生成页码按钮
    const pageNumbers = document.querySelector('.page-numbers');
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    
    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    
    pageNumbers.innerHTML = '';
    for (let i = startPage; i <= endPage; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => goToPage(i));
        pageNumbers.appendChild(button);
    }
}

function goToPage(page) {
    const totalPages = Math.ceil(newsData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderNews();
}

// 事件监听
document.addEventListener('DOMContentLoaded', () => {
    loadNews();
    
    document.querySelector('.first-page').addEventListener('click', () => goToPage(1));
    document.querySelector('.last-page').addEventListener('click', () => {
        const totalPages = Math.ceil(newsData.length / itemsPerPage);
        goToPage(totalPages);
    });
    document.querySelector('.prev-page').addEventListener('click', () => goToPage(currentPage - 1));
    document.querySelector('.next-page').addEventListener('click', () => goToPage(currentPage + 1));
});