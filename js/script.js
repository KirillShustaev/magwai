let currentCount = 0; // Текущее количество загруженных карточек
const maxCount = 30; // Максимальное количество карточек
const loadCount = 5; // Количество карточек за один запрос

function loadCards() {
    if (currentCount >= maxCount) {
        document.getElementById('loadMore').disabled = true; // Отключаем кнопку, если достигли лимита
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts?_limit=${loadCount}&_start=${currentCount}`, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const cardContainer = document.getElementById('cardContainer');

            data.forEach(post => {
                const li = document.createElement('li');
                li.className = 'cards__item';

                li.innerHTML = `
                    <div class="cards__imgBlock">
                        <picture>
                            <img class="cards__img" src="./img/cards_1.jpg"
                            srcset="
                                ./img/cards_1_2x.jpg 2x,
                                ./img/cards_1_3x.jpg 3x"
                            alt="Изображение товара">
                        </picture>
                    </div>
                    <div class="cards__descrBlock">
                        <h3 class="cards__title">${post.title}</h3>
                        <p class="cards__descr">How to increase your productivity with Music</p>
                        <p class="cards__txt">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolo…
                        </p>
                        <time class="cards__time" datetime="24-07-2019">Posted by <b>Eugenia</b>, on July 24, 2019</time>
                        <a class="cards__link flex" href="#">Continue reading</a>
                    </div>
                `;

                cardContainer.appendChild(li);
            });

            currentCount += loadCount; // Увеличиваем текущее количество загруженных карточек

            // Проверяем, достигли ли мы максимального количества карточек
            if (currentCount >= maxCount) {
                document.getElementById('loadMore').style.display = 'none'; // Скрываем кнопку
            }
        } else {
            console.error('Ошибка загрузки данных');
        }
    };

    xhr.send();
}

document.getElementById('loadMore').addEventListener('click', loadCards);