window.onload = function() {  
    fetch('/news/all.json')  
        .then(function(response) {  
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  
            return response.json();  
        })  
        .then(function(jsonData) {
			let i=0;
            let promises = jsonData.map(item => {
                let html = `<div class="newbox"><div class="title" style="padding:10px;"><h2 style="margin: 0px;"><a href="/seece?page=${i}" title="查看大窗口">${item["title"]}</a></h2><br><p style="margin: 0px;">data:${item["date"]}</p></div>`;
  				i++;
                if (item["type"] === "md") {  
                    return fetch("/news/"+item["url"])  
                        .then(response => {  
                            if (!response.ok) {  
                                throw new Error('Markdown file response was not ok');  
                            }  
                            return response.text();  
                        })  
                        .then(markdown => {  
                            let markedHtml = marked.parse(markdown);  
                            html += `<div class="newblock">${markedHtml}</div>`;  
                            html += "</div>";  
                            return html;  
                        });  
                } else if (item["type"] === "html") {  
                    html += `<iframe class="newblock" src="/news/${item["url"]}"></iframe>`;  
                    html += "</div>";  
                    return Promise.resolve(html);  
                }  
                return Promise.resolve(html); // 如果不需要fetch，直接返回html  
            });  
  
            return Promise.all(promises).then(htmls => {  
                htmls.forEach(html => {  
                    document.querySelector("#news").insertAdjacentHTML("afterBegin", html);  
                });  
            });  
        })  
        .catch(function(error) {  
            console.error('Error fetching news data:', error);  
        });  
}
  
// 确保marked.js已经加载  
// 如果你是通过<script>标签在HTML中加载的，那么它应该已经全局可用了  
// 如果你是通过模块系统加载的，请确保marked是正确导入的