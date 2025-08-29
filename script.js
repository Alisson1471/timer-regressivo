const tempo = document.getElementById("tempo");
const horasAdicionadas = document.getElementById("horas-a");
const minutosAdicionados = document.getElementById("minutos-a");
const segundosAdicionados = document.getElementById("segundos-a");
const horasReduzidas = document.getElementById("horas-t");
const minutosReduzidos = document.getElementById("minutos-t");
const segundosReduzidos = document.getElementById("segundos-t");

const date = new Date();
date.setHours(0)
date.setMinutes(0)
date.setSeconds(0)

function executarTimer() {
  event.preventDefault();

  const h = parseInt(horasAdicionadas.value) || 0;
  const m = parseInt(minutosAdicionados.value) || 0;
  const s = parseInt(segundosAdicionados.value) || 0;

  const adicionar = h * 3600 + m * 60 + s;

  let atual =
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds();

  let novo = atual + adicionar;

  if (novo > 86400) {
    novo = 86399;
  }

  const horas = Math.floor(novo / 3600);
  const minutos = Math.floor((novo % 3600) / 60);
  const segundos = novo % 60;

  date.setHours(horas, minutos, segundos);
}

function diminuirTimer(event) {
  event.preventDefault();

  const h = parseInt(horasReduzidas.value) || 0;
  const m = parseInt(minutosReduzidos.value) || 0;
  const s = parseInt(segundosReduzidos.value) || 0;

  const reduzir = h * 3600 + m * 60 + s;

  const atual =
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds();

  if (reduzir <= atual) {
    date.setSeconds(date.getSeconds() - reduzir);
  } else {
    date.setHours(0, 0, 0);
  }
}

setInterval(() => {
    if (date.getHours() > 0 ||
        date.getMinutes() > 0 ||
        date.getSeconds() > 0) {
      date.setSeconds(date.getSeconds() - 1);
    }

    const horasTimer = date.getHours().toString().padStart(2, "0");
    const minutosTimer = date.getMinutes().toString().padStart(2, "0");
    const segundosTimer = date.getSeconds().toString().padStart(2, "0");
    const atual = `${horasTimer}:${minutosTimer}:${segundosTimer}`;

    tempo.textContent = atual;
  }, 1000);
