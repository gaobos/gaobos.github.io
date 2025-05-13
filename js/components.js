function loadFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="copyright-row">
                    <span>&copy; 2025 X射线防护盾™ . 保留所有权利. | 琼ICP备XXXXXXXX号-1 | 琼公网安备 4601XXXXXXXXXX号</span>
                </div>
                <div class="partners">
                    <div class="partners-container">
                        <div class="main-partners">
                            <h4>友情链接</h4>
                            <a href="https://www.hainanu.edu.cn/" target="_blank" class="main-partner">海南大学</a>
                            <a href="https://www.qtnu.edu.cn/" target="_blank" class="main-partner">琼台师范学院</a>
                        </div>
                        <div class="other-partners">
                            <a href="http://www.hainan.gov.cn" target="_blank" class="main-partner">海南省人民政府</a>
                            <a href="http://wst.hainan.gov.cn" target="_blank" class="main-partner">海南省卫生健康委员会</a>
                            <a href="http://www.nhc.gov.cn" target="_blank" class="main-partner">国家卫生健康委员会</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadFooter);