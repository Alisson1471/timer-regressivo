const tempo = document.getElementById("tempo");
const horasAdicionadas = document.getElementById("horas-a");
const minutosAdicionados = document.getElementById("minutos-a");
const segundosAdicionados = document.getElementById("segundos-a");
const horasReduzidas = document.getElementById("horas-t");
const minutosReduzidos = document.getElementById("minutos-t");
const segundosReduzidos = document.getElementById("segundos-t");

const date = new Date();
let initiated = false;

const saved = parseInt(localStorage.getItem("timer"));
if (!isNaN(saved)) {
  date.setTime(saved);
} else {
  date.setHours(0,0,0,0);
}

function atualizarDisplay() {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  tempo.textContent = `${h}:${m}:${s}`;
}

function falar(texto) {
  const msg = new SpeechSynthesisUtterance(texto);

  // Configurações opcionais
  msg.lang = "pt-BR";   // idioma
  msg.rate = 1.2;         // velocidade (0.1 até 10)
  msg.pitch = 1;        // tom de voz (0 até 2)
  msg.volume = 1;       // volume (0 até 1)

  speechSynthesis.speak(msg);
}

function executarTimer() {
  event.preventDefault();

  const h = parseInt(horasAdicionadas.value) || 0;
  const m = parseInt(minutosAdicionados.value) || 0;
  const s = parseInt(segundosAdicionados.value) || 0;

  if ((h == 24 && m > 0) || (h == 24 && s > 0) || h > 24) {
    falar("O limite de tempo é de 24 horas!")
    alert("O limite de tempo é de 24 horas! (1 dia)");
    return;
  } else if (h < 0 && m < 0 && s < 1) {
    falar("O tempo inserido não pode ser menor que 1s!")
    alert("O tempo inserido não pode ser menor que 1s!");
    return;
  }

  const adicionar = h * 3600 + m * 60 + (s + 1);
  let atual = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  let novo = atual + adicionar;

  if (novo > 86400) novo = 86399;

  const horas = Math.floor(novo / 3600);
  const minutos = Math.floor((novo % 3600) / 60);
  const segundos = novo % 60;

  date.setHours(horas, minutos, segundos);

  initiated = true;

  // Salva no localStorage
  localStorage.setItem("timer", date.getTime());
  falar("Tempo adicionado ao timer com sucesso!")

  atualizarDisplay();
}

function diminuirTimer() {
  event.preventDefault();

  const h = parseInt(horasReduzidas.value) || 0;
  const m = parseInt(minutosReduzidos.value) || 0;
  const s = parseInt(segundosReduzidos.value) || 0;

  const reduzir = h * 3600 + m * 60 + s;
  let atual = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

   if (reduzir >= atual) {
    atual = 0;
  } else {
    atual -= reduzir;
  }

  const horas = Math.floor(atual / 3600);
  const minutos = Math.floor((atual % 3600) / 60);
  const segundos = atual % 60;

  date.setHours(horas, minutos, segundos);

  localStorage.setItem("timer", date.getTime());
  falar("Tempo do timer reduzido com sucesso!")

  atualizarDisplay();

}

setInterval(() => {
  let totalSegundos = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

  if (totalSegundos > 0) {
    totalSegundos--;
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    date.setHours(horas, minutos, segundos);

    localStorage.setItem("timer", date.getTime());

    atualizarDisplay();
  } else {
    if (initiated) {
      date.setHours(0, 0, 0);

      localStorage.setItem("timer", date.getTime());

      falar("Timer encerrado!")
      alert("Timer encerrado!");
      initiated = false;
    }
  }
}, 1000);