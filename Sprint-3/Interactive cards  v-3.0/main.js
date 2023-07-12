const formulario = document.getElementById("form-container");

const nombreTarjeta = document.getElementById("cardholder-name");
const cardNumber = document.getElementById("inputCardNumber");
const errorMensaje = document.getElementById("message-error");
const errorVigencia = document.getElementById("error-expirado");
const errores = document.querySelectorAll(".error");

const nameOutput = document.getElementById("nameCardHolderOutput");
const numberCardOutput = document.querySelector("#numerosOutput");
const monthCardOutput = document.getElementById("output-Month");
const yearCardOutput = document.getElementById("output-Year");
const cvcCardOutput = document.getElementById("CVC-number-Output");
const inputsAll = document.querySelectorAll("input");


const formDatos = {
  cardMonth: document.getElementById("inputDateMonth"),
  cardYear: document.getElementById("inputDateYear"),
  cVc: document.getElementById("inputCvc"),
};

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  validarTarjeta(event); 
  if (
    nombreTarjeta.value &&
    cardNumber.value &&
    formDatos.cardMonth.value &&
    formDatos.cardYear.value &&
    formDatos.cVc.value
  ) {
    console.group("Datos ingresados");
    console.log("Cardholdername: " + nombreTarjeta.value);
    console.log("Card number: " + cardNumber.value);
    console.log(
      `Exp.date: Month: ${formDatos.cardMonth.value} , Year: ${formDatos.cardYear.value}`
    );
    console.log("CVC: " + formDatos.cVc.value);
    console.groupEnd();

    alert("Datos ingresados");
    return;
  } else {
    alert("Debe llenar todos los campos");
    changeColor();

  }
});

function changeColor() {
  inputsAll.forEach((input) => {
    if (input.value === "") {
      input.style.borderColor = "red";
    }
  });
}

nombreTarjeta.addEventListener("input", function () {
  const inputValue = nombreTarjeta.value;
  const validCharacters = /^[A-Za-z\s]+$/;
  if (!validCharacters.test(inputValue)) {
    nombreTarjeta.value = inputValue.replace(/[^A-Za-z\s]+/g, "");
  }
});

function getNumberOnly(event) {
  let key = +event.key;
  if (isNaN(key) && event.key != "Backspace") {
    event.preventDefault();
  }
}
for (let key in formDatos) {
  if (formDatos.hasOwnProperty(key)) {
    formDatos[key].addEventListener("keydown", getNumberOnly);
  }
}
/* cardNumber.addEventListener("input", function () {
  const value = cardNumber.value.trim();
  errorMensaje.textContent = "";

  if (isNaN(value) || value < 0) {
    errorMensaje.textContent = "Formato inválido, ingrese solamente números";
  }
});   
cardNumber.addEventListener("input", (event) => {
  if (cardNumber.value.length > 16) {
    cardNumber.value = cardNumber.value.slice(0, 16);
  }
});  */

cardNumber.addEventListener("input", function () {
  const value = cardNumber.value.trim();
  errorMensaje.textContent = "";

  const cleanedValue = value.replace(/\s/g, "");
  const formattedValue = cleanedValue.replace(/\d{4}(?=\d)/g, "$& ");

  cardNumber.value = formattedValue;
  if (isNaN(cleanedValue) || cleanedValue < 0) {
    errorMensaje.textContent = "Formato inválido, ingrese solamente números";
  }
});

cardNumber.addEventListener("input", (event) => {
  if (cardNumber.value.length > 19) {
    cardNumber.value = cardNumber.value.slice(0, 19);
  }
});

nombreTarjeta.addEventListener("input", (event) => {
  if (nombreTarjeta.value.length > 17) {
    nombreTarjeta.value = nombreTarjeta.value.slice(0, 17);
  }
});

function applyLimitToInput(inputElement, maxLength) {
  inputElement.addEventListener("input", () => {
    if (inputElement.value.length > maxLength) {
      inputElement.value = inputElement.value.slice(0, maxLength);
    }
  });
}
Object.values(formDatos).forEach((input) => {
  if (input === formDatos.cardMonth || input === formDatos.cardYear) {
    applyLimitToInput(input, 2);
  }
});

formDatos.cVc.addEventListener("input", (event) => {
  if (formDatos.cVc.value.length > 4) {
    formDatos.cVc.value = formDatos.cVc.value.slice(0, 4);
  }
});


/* formDatos.cardMonth.addEventListener("input", (event) => {
  let mes = +formDatos.cardMonth.value.trim;
  formDatos.cardMonth.value = Math.max(1, Math.min(mes, 12));
}) */
formDatos.cardMonth.addEventListener("input", (event) => {
  let mes = formDatos.cardMonth.value.trim();

  if (mes !== "" && (isNaN(mes) || mes < 1 || mes > 12)) {
    formDatos.cardMonth.value = Math.max(1, Math.min(+mes, 12));
  }
}); 

function validarTarjeta (event) {
  let tarjetaCaducada;
  let anyoValue = formDatos.cardYear.value.trim();
  if (anyoValue.length === 2 && +anyoValue <= 22) {
    tarjetaCaducada = true;
    alert("Tarjeta Caducada");
    event.preventDefault();
  } else {
    tarjetaCaducada = false;
  }
}


nombreTarjeta.addEventListener("input", () => {
  nameOutput.textContent = nombreTarjeta.value.toUpperCase();
});

cardNumber.addEventListener("input", () => {
  numberCardOutput.textContent = cardNumber.value;
});

formDatos.cardMonth.addEventListener("input", () => {
  monthCardOutput.textContent = formDatos.cardMonth.value;
 
});

formDatos.cardYear.addEventListener("input", () => {
  yearCardOutput.textContent = formDatos.cardYear.value;
});

formDatos.cVc.addEventListener("input", () => {
  cvcCardOutput.textContent = formDatos.cVc.value;
});
