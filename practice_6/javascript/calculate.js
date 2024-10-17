const product = document.getElementById("product")

// Добавляем обработчик

function getResult() {
    const result = document.getElementById("result");
    return result ? result.value : null; // Возвращаем значение, если элемент существует
}

function getRadioButtonValue(form) {
    const selectedOption = document.querySelector('input[class="form-check-input my_radio"]:checked');
    if (selectedOption) {
        const labelOption = document.querySelector('label[for=' + selectedOption.id + ']').textContent.trim();
        const radioValue = parseInt(labelOption.split(" ")[1])
        return radioValue
    } else {
        console.log('Ничего не выбрано');
        return 0
    }
}


function getCheckButtonValue(form) {
    const selectedOption = document.querySelector('input[class="form-check-input my_check"]:checked');
    if (selectedOption) {
        const labelOption = document.querySelector('label[for=' + selectedOption.id + ']').textContent.trim();
        const checkValue = labelOption.split(" ")[1]
        if (checkValue === "-10%")
            return 0.9
        if (checkValue === "+100%")
            return 2
    } else {
        console.log('Ничего не выбрано');
        return 1
    }
}


function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("my_form")


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

    const resultValue = productValue * parseInt(countValue) * getCheckButtonValue(form) + getRadioButtonValue(form);

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
}


const allIds = ["my_select", "my_check"]

function unhideClass(value) {
    let unhiddenClasses = []
    let hideIds = []
    if (value === "IPhone 15 Pro Max 50.000₽") {
        hideIds = ["my_check"]
        unhiddenClasses = ["my_select"]
    }
    if (value === "Laptop 10₽") {
        unhiddenClasses = ["my_select", "my_check"]
    }
    if (value === "Car 100.000₽") {
        hideIds = ["my_select", "my_check"]
    }
    hideIds.forEach((id) => {
        const unhiddenClass = document.getElementById(id)
        unhiddenClass.style.display = "none"
    })
    unhiddenClasses.forEach((id) => {
        const hiddenClass = document.getElementById(id)
        hiddenClass.style.display = "block"
    })
}

document.addEventListener('DOMContentLoaded', () => {
    product.addEventListener("change", function () {
        const value = product.options[product.selectedIndex].text
        unhideClass(value)
    })
});
