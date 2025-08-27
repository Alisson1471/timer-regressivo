const tempo = document.getElementById("tempo");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");

const date = new Date();

function executarTimer() {
    event.preventDefault();
  date.setMinutes(minutos.value);
  date.setSeconds(segundos.value);
  setInterval(() => {
    date.setSeconds(date.getSeconds() - 1);
    const minutos =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const segundos =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const atual = `${minutos}:${segundos}`;

    tempo.textContent = atual;
  }, 1000);
}
