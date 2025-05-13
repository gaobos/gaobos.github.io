document.addEventListener('DOMContentLoaded', () => {
    // 从 URL 获取新闻 ID
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get('id');

    if (!newsId) {
        window.location.href = 'about.html#news-section';
        return;
    }

    loadNewsDetail(newsId);
});

async function loadNewsDetail(newsId) {
    try {
        const response = await fetch('../data/news.json');
        const data = await response.json();
        
        const newsItem = data.news.find(item => item.id == newsId);
        
        if (!newsItem) {
            throw new Error('新闻不存在');
        }

        // 更新页面内容
        document.getElementById('news-title').textContent = newsItem.title;
        document.getElementById('news-date').textContent = newsItem.date;
        
        // 将内容按<br>分割成段落，并用<p>标签包裹
        const content = newsItem.content.split('<br>').map(para => 
            `<p>${para}</p>`
        ).join('');
        
        document.getElementById('news-content').innerHTML = content;
        document.title = `${newsItem.title} - X射线防护盾™`;

    } catch (error) {
        console.error('加载新闻详情失败:', error);
        document.querySelector('.detail-container').innerHTML = `
            <div class="news-error">
                <h2>加载失败</h2>
                <p>无法加载新闻详情，请稍后再试</p>
                <div class="news-nav">
                    <a href="about.html#news-section" class="back-btn">返回列表</a>
                </div>
            </div>
        `;
    }
}