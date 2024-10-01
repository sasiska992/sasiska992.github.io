const button = document.getElementById("submit")

function getResult() {
    const result = document.getElementById("result")
    return isNaN(result)
}

document.addEventListener('DOMContentLoaded', () => {


    button.addEventListener("click", function () {
        const product = document.getElementById("product")
        const count = document.getElementById("count")
        if (!getResult()) {
            var div = document.createElement("div");
            div.className = "mb-3";
            var result = document.createElement("textarea")
            result.className = "form-control"
            result.id = "result"
            result.value = parseInt(product.value) * parseInt(count.value)
            if (isNaN(result.value)) {
                alert("Вы совершили ошибку во входных данных. Попробуйте снова")
                return;
            }

            div.appendChild(result)
            document.getElementById("main").appendChild(div);
        } else {
            const result = document.getElementById("result")
            if (isNaN(parseInt(product.value) * parseInt(count.value))) {
                alert("Вы совершили ошибку во входных данных. Попробуйте снова")
                return;
            }
            result.value = parseInt(product.value) * parseInt(count.value)
        }
    })
})