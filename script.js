// pegando os elementos do tela - timer, horas, minutos e segunta, de adicionar e reduzir
const tempo = document.getElementById("tempo");
const horasAdicionadas = document.getElementById("horas-a");
const minutosAdicionados = document.getElementById("minutos-a");
const segundosAdicionados = document.getElementById("segundos-a");
const horasReduzidas = document.getElementById("horas-t");
const minutosReduzidos = document.getElementById("minutos-t");
const segundosReduzidos = document.getElementById("segundos-t");

// inicia uma data para o timer
const date = new Date();

// variável que mostra se o timer está iniciado ou não
let initiated = false;

// coleta o valor do timer, que está salvo no localStorage, para assim que entrar no site ele pegue o valor que antes estava salvo, caso já foi salvo
const saved = parseInt(localStorage.getItem("timer"));
if (!isNaN(saved)) {
  date.setTime(saved); // coloca a data do localStorage como a data para o timer
} else {
  date.setHours(0,0,0,0); // inicia o timer com a data padrão
}

// função para atualizar o display do timer no HTML
function atualizarDisplay() {
  // coleta as informações da hora, minuto e segundo do timer na variável date
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");

  // coloca os valores coletados anteriormente na variável do timer
  tempo.textContent = `${h}:${m}:${s}`;
}

// função que adiciona voz de fala
function falar(texto) {
  const msg = new SpeechSynthesisUtterance(texto); // cria o objeto que fala, com a mensagem falada como parâmetro

  // Configurações opcionais
  msg.lang = "pt-BR";   // idioma
  msg.rate = 1.2;         // velocidade (0.1 até 10)
  msg.pitch = 1;        // tom de voz (0 até 2)
  msg.volume = 1;       // volume (0 até 1)

  speechSynthesis.speak(msg); // método chamado para reproduzir o aúdio
}

// função para executar / adicionar o timer 
function executarTimer() {
  event.preventDefault(); // não permite que a tela seja recarregada

  // coleta as informações de hora, minuto e segundo do forms do HTML
  const h = parseInt(horasAdicionadas.value) || 0;
  const m = parseInt(minutosAdicionados.value) || 0;
  const s = parseInt(segundosAdicionados.value) || 0;

  // verifica se o tempo ultrapassou o permitido ou se o tempo inserido é menor que 1s
  if ((h == 24 && m > 0) || (h == 24 && s > 0) || h > 24) {
    falar("O limite de tempo é de 24 horas!")
    alert("O limite de tempo é de 24 horas! (1 dia)");
    return;
  } else if (h < 0 && m < 0 && s < 1) {
    falar("O tempo inserido não pode ser menor que 1s!")
    alert("O tempo inserido não pode ser menor que 1s!");
    return;
  }

  const adicionar = h * 3600 + m * 60 + (s); // total de tempo em segundos, do tempo que iremos adicionar
  let atual = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); // total do tempo em segundo, do timer
  let novo = atual + adicionar; // novo timer, formado pela soma do tempo que adicionará e o tempo do timer

  if (novo > 86400) novo = 86399; // caso o valor em segundo seja maior que 86400, ou 1 dia, setamos o timer como 1 a menos que isso, ou seja, 23h:59m:59s

  // volta o tempo para formatação de horas, minutos e segundos
  const horas = Math.floor(novo / 3600);
  const minutos = Math.floor((novo % 3600) / 60);
  const segundos = novo % 60;

  // seta esses valores na variável date
  date.setHours(horas, minutos, segundos);

  // diz que o timer foi inicializado
  initiated = true;

  // Salva no localStorage e chamada a função de aúdio sobre ter adicionado tempo ao timer
  localStorage.setItem("timer", date.getTime());
  falar("Tempo adicionado ao timer com sucesso!")

  // atualizada o display
  atualizarDisplay();
}

function diminuirTimer() {
  event.preventDefault(); // não permite que a tela seja recarregada

  // coleta as informações de hora, minuto e segundo do forms do HTML
  const h = parseInt(horasReduzidas.value) || 0;
  const m = parseInt(minutosReduzidos.value) || 0;
  const s = parseInt(segundosReduzidos.value) || 0;

  const reduzir = h * 3600 + m * 60 + s; // total de tempo em segundos, do tempo que iremos adicionar
  let atual = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); // total do tempo em segundo, do timer

  // verifica se o tempo reduzido é maior que o do timer
   if (reduzir >= atual) {
    atual = 0; // se for maior, coloca o timer como zerado
  } else {
    atual -= reduzir; // se for menor, só reduz o tempo do timer, pelo tempo reduzido
  }

  // volta o tempo para formatação de horas, minutos e segundos
  const horas = Math.floor(atual / 3600);
  const minutos = Math.floor((atual % 3600) / 60);
  const segundos = atual % 60;

  // seta esses valores na variável date
  date.setHours(horas, minutos, segundos);

  // Salva no localStorage e chamada a função de aúdio sobre ter adicionado tempo ao timer
  localStorage.setItem("timer", date.getTime());
  falar("Tempo do timer reduzido com sucesso!")

  // atualizada o display
  atualizarDisplay();
}

// setInterval, para reduzir o tempo do timer, a cada um segundo
setInterval(() => {
  let totalSegundos = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds(); // total do tempo em segundo, do timer

  // verifica se o timer é maior que zero
  if (totalSegundos > 0) {
    // reduz um segundo ao timer
    totalSegundos--;

    // volta o tempo para formatação de horas, minutos e segundos
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    // seta esses valores na variável date
    date.setHours(horas, minutos, segundos);
    
    // Salva o timer no localStorage
    localStorage.setItem("timer", date.getTime());

    // atualizada o display
    atualizarDisplay();
  } else {
    // verifica se o timer foi inicialido
    if (initiated) {
      date.setHours(0, 0, 0); // seta o timer com a data padrão de 0h:0m:0s

      // Salva o timer no localStorage
      localStorage.setItem("timer", date.getTime());

      // chama a função de voz para dizer que o tempo foi encerrado!
      falar("Timer encerrado!")
      alert("Timer encerrado!");

      // seta a variável initiated como false, para impedir o loop infinito do timer, quando encerrado
      initiated = false;
    }
  }
}, 1000); // intervalo de 1s