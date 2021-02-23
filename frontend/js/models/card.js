class Cards {

    getCardsList() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/cards');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }
}

export default Cards;