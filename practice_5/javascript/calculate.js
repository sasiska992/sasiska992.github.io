const button = document.getElementById("submit");

function getResult() {
    const result = document.getElementById("result");
    return result ? result.value : null; // Возвращаем значение, если элемент существует
}

document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener("click", function () {
        const product = document.getElementById("product");
        const count = document.getElementById("count");

        // Проверка на корректность ввода данных
        const countValue = count.value.trim();
        const countRegex = /^[1-9]\d*$/; // Регулярное выражение для проверки положительных целых чисел

        if (!countRegex.test(countValue)) {
            alert("Введите корректное количество (положительное целое число).");
            return;
        }

        const productValue = parseInt(product.value);

        if (isNaN(productValue)) {
            alert("Выберите корректный продукт.");
            return;
        }

        const resultValue = productValue * parseInt(countValue);

        if (!getResult()) { // Если результат не существует
            const div = document.createElement("div");
            div.className = "mb-3";
            const result = document.createElement("textarea");
            result.className = "form-control";
            result.id = "result";
            result.value = resultValue;

            div.appendChild(result);
            document.getElementById("main").appendChild(div);
        } else {
            const result = document.getElementById("result");
            result.value = resultValue; // Обновляем значение существующего элемента
        }
    });
});
