window.addEventListener('DOMContentLoaded', function () {
    const scrollImages = document.querySelector('.scroll-images');
    const images = Array.from(scrollImages.children);

    // 画像のロード完了を待つ
    let loaded = 0;
    images.forEach(img => {
        img.addEventListener('load', () => {
            loaded++;
            if (loaded === images.length) startScroll();
        });
        // もしすでに読み込み終えていた場合にも対応
        if (img.complete) {
            loaded++;
            if (loaded === images.length) startScroll();
        }
    });

    function startScroll() {
        // 無限用に画像たちを複製
        images.forEach(img => {
            const clone = img.cloneNode(true);
            scrollImages.appendChild(clone);
        });

        let scrollX = 0;
        const speed = 1; // px/フレーム
        const singleSetWidth = scrollImages.offsetWidth / 2;

        function animate() {
            scrollX += speed;
            if (scrollX >= singleSetWidth) {
                scrollX = 0;
            }
            scrollImages.style.transform = `translateX(${-scrollX}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    }
});