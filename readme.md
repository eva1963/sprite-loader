### 一款合并多个icon为雪碧图的loader
初衷：因为我们开发时经常为了减少HTTP请求次数，提高页面的加载性能而使用合并起来的雪碧图，但是通常UI做起来费时又费力，那么，这次我结合spritesmith插件来做了一个通用的雪碧图loader插件

#### 怎么用？
给需要合并成雪碧图的部分后面追加`?__sprite`,像这样：
`.img {
    background: url(./img/2.jpg?__sprite);
}`