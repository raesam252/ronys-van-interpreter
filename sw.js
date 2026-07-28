<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#15558a">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="manifest" href="manifest.webmanifest">
  <link rel="icon" href="icon-192.png">
  <title>Rony's Van Interpreter</title>
  <style>
    :root {
      --azul:#15558a; --azul2:#0f4674; --verde:#18864b; --vermelho:#bd2c2c;
      --fundo:#f3f6fa; --borda:#d7e0e9; --texto:#18212b; --cinza:#657180;
      --branco:#fff; --verde-claro:#eaf8f0; --azul-claro:#eaf4ff;
    }
    * { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }
    html,body { margin:0; min-height:100%; font-family:Arial,Helvetica,sans-serif; background:var(--fundo); color:var(--texto); }
    body { padding-bottom:env(safe-area-inset-bottom); }
    main { max-width:760px; margin:auto; padding:14px; }
    header { background:linear-gradient(160deg,var(--azul),var(--azul2)); color:#fff; border-radius:20px; padding:20px 16px; text-align:center; box-shadow:0 8px 24px rgba(15,70,116,.2); }
    header h1 { margin:0 0 6px; font-size:25px; }
    header p { margin:0; opacity:.92; }
    section { background:#fff; border:1px solid var(--borda); border-radius:18px; padding:15px; margin-top:15px; box-shadow:0 5px 16px rgba(0,0,0,.045); }
    h2 { margin:0 0 8px; font-size:20px; }
    p { line-height:1.45; }
    .descricao { margin:0 0 13px; color:var(--cinza); }
    .hidden { display:none !important; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    button,input,textarea { width:100%; font:inherit; }
    button { min-height:56px; border:0; border-radius:13px; padding:12px; font-size:17px; font-weight:bold; cursor:pointer; }
    button:active { transform:scale(.985); }
    button:disabled { opacity:.5; }
    .primario { background:var(--azul); color:#fff; }
    .verde { background:var(--verde); color:#fff; }
    .secundario { background:#fff; color:var(--texto); border:1px solid var(--borda); }
    .perigo { background:#fff1f1; color:var(--vermelho); border:1px solid #efb9b9; }
    input,textarea { border:1px solid var(--borda); border-radius:12px; padding:12px; background:#fbfcfe; }
    input { min-height:52px; font-size:22px; text-align:center; letter-spacing:5px; font-weight:bold; }
    textarea { min-height:92px; resize:vertical; font-size:17px; line-height:1.42; }
    label { display:block; margin:12px 0 6px; color:var(--cinza); font-size:12px; font-weight:bold; }
    #status { margin-top:14px; padding:13px; min-height:48px; border:1px solid var(--borda); border-radius:13px; background:#fff; text-align:center; font-weight:bold; color:var(--cinza); }
    #status.erro { color:var(--vermelho); background:#fff1f1; border-color:#efb9b9; }
    #status.sucesso { color:var(--verde); background:var(--verde-claro); border-color:#b8e2ca; }
    #status.processando { color:var(--azul); background:var(--azul-claro); border-color:#b7d7f5; }
    .codigo { text-align:center; font-size:38px; letter-spacing:7px; font-weight:900; margin:10px 0; color:var(--azul); }
    #qrcode { display:flex; justify-content:center; margin:14px 0; }
    #qrcode img,#qrcode canvas { max-width:220px!important; height:auto!important; }
    .mensagens { display:flex; flex-direction:column; gap:10px; max-height:42vh; overflow:auto; padding:2px; }
    .mensagem { max-width:92%; border-radius:15px; padding:11px 13px; }
    .minha { align-self:flex-end; background:#e7edf4; }
    .outra { align-self:flex-start; background:#dcfce7; }
    .mensagem small { display:block; color:var(--cinza); margin-bottom:5px; }
    .traducao { margin-top:6px; font-weight:bold; }
    .mic.ouvindo { background:var(--vermelho); animation:pulsar 1s infinite; }
    .aviso { font-size:12px; color:var(--cinza); text-align:center; padding:3px 7px; }
    @keyframes pulsar { 0%{box-shadow:0 0 0 0 rgba(189,44,44,.35)} 70%{box-shadow:0 0 0 14px rgba(189,44,44,0)} 100%{box-shadow:0 0 0 0 rgba(189,44,44,0)} }


    .retomar-card { margin-top:16px; padding:15px; border:1px solid #9fc6e6; border-radius:14px; background:#edf7ff; }
    .retomar-card h3 { margin:0 0 6px; font-size:18px; color:var(--azul2); }
    .retomar-card p { margin:0 0 12px; color:var(--cinza); line-height:1.4; }
    .retomar-codigo { font-weight:700; letter-spacing:2px; color:var(--texto); }

    .modo-continuo { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px; border:1px solid var(--borda); border-radius:13px; background:#fbfcfe; margin-bottom:12px; }
    .modo-continuo strong { display:block; }
    .modo-continuo span { display:block; color:var(--cinza); font-size:12px; margin-top:3px; }
    .switch { position:relative; width:58px; min-width:58px; height:32px; }
    .switch input { position:absolute; opacity:0; pointer-events:none; }
    .switch i { position:absolute; inset:0; border-radius:999px; background:#b7c0ca; transition:.2s; }
    .switch i::after { content:""; position:absolute; width:26px; height:26px; left:3px; top:3px; border-radius:50%; background:#fff; box-shadow:0 2px 6px rgba(0,0,0,.25); transition:.2s; }
    .switch input:checked + i { background:var(--verde); }
    .switch input:checked + i::after { transform:translateX(26px); }
    .continuo-ativo { border-color:#93d4ad; background:#f0fbf5; }

    @media(max-width:560px) { .grid { grid-template-columns:1fr; } }
  </style>
</head>
<body>
<main>
  <header>
    <h1>🚐 Rony's Van Interpreter</h1>
    <p>Português ↔ Inglês • áudio somente no aparelho receptor</p>
  </header>

  <div id="status">Pronto para iniciar</div>

  <section id="inicio">
    <h2>Escolha como entrar</h2>
    <p class="descricao">O motorista cria a conversa. O passageiro entra pelo QR Code ou pelo código.</p>
    <button id="criarBtn" class="primario">Sou o motorista — criar conversa</button>
    <button id="mostrarEntradaBtn" class="secundario" style="margin-top:10px">Sou o passageiro — entrar com código</button>

    <div id="entradaBox" class="hidden">
      <label>CÓDIGO DA CONVERSA</label>
      <input id="codigoEntrada" inputmode="numeric" maxlength="6" placeholder="123456">
      <button id="entrarBtn" class="verde" style="margin-top:10px">Entrar na conversa</button>
    </div>

    <div id="retomarCard" class="retomar-card hidden">
      <h3 id="retomarTitulo">Conversa anterior encontrada</h3>
      <p id="retomarTexto">Deseja voltar para a conversa <span id="retomarCodigo" class="retomar-codigo"></span>?</p>
      <div class="grid">
        <button id="retomarBtn" class="verde">Voltar para a conversa</button>
        <button id="descartarBtn" class="secundario">Não, iniciar outra</button>
      </div>
    </div>
  </section>

  <section id="sala" class="hidden">
    <h2 id="tituloModo">Conversa</h2>
    <div id="codigoSala" class="codigo"></div>

    <div id="convite" class="hidden">
      <p class="descricao">Mantenha este QR Code disponível. O passageiro pode escaneá-lo novamente após desligar ou trocar de celular.</p>
      <div id="qrcode"></div>
      <div class="grid">
        <button id="compartilharBtn" class="verde">Compartilhar link</button>
        <button id="copiarBtn" class="secundario">Copiar link</button>
      </div>
    </div>

    <button id="sairBtn" class="perigo" style="margin-top:10px">Encerrar conversa</button>
  </section>

  <section id="historico" class="hidden">
    <h2>Conversa</h2>
    <div id="mensagens" class="mensagens"></div>
  </section>

  <section id="fala" class="hidden">
    <h2 id="tituloFala">Fale</h2>
    <div id="avisoAudio" class="aviso" style="margin-bottom:10px">
      Sua própria tradução não será reproduzida neste aparelho.
    </div>

    <div id="modoContinuoBox" class="modo-continuo">
      <div>
        <strong id="tituloContinuo">Modo conversação contínua</strong>
        <span id="descricaoContinuo">Depois de ativado, basta falar. O aplicativo envia automaticamente.</span>
      </div>
      <label class="switch" aria-label="Ativar modo conversação contínua">
        <input id="continuoToggle" type="checkbox">
        <i></i>
      </label>
    </div>

    <button id="micBtn" class="primario mic">🎤 Toque e fale</button>

    <label id="rotuloTexto">TEXTO RECONHECIDO</label>
    <textarea id="textoReconhecido" placeholder="Sua fala aparecerá aqui..."></textarea>

    <div class="grid" style="margin-top:10px">
      <button id="enviarBtn" class="verde">Traduzir e enviar</button>
      <button id="repetirBtn" class="secundario">🔊 Repetir última tradução recebida</button>
    </div>
  </section>

  <section>
    <div class="aviso">
      Use o Google Chrome e permita o microfone. A conversa permanece ativa até o motorista encerrá-la.
    </div>
  </section>
</main>

<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script>
const API_URL = "https://script.google.com/macros/s/AKfycbxdk-FTnCJJrZwVlzFKmhS_WRJChnrZbd2rYdkmjMZimf9tS2CXdDJ0370CH-pyRdWG/exec";
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let salaAtual = "";
let papelAtual = "";
let ultimoId = 0;
let timerBusca = null;
let reconhecimento = null;
let ouvindo = false;
let ultimaTraducao = "";
let ultimoIdiomaTraducao = "en-US";
let contadorJsonp = 0;
let vozes = [];
let modoContinuo = false;
let reinicioContinuo = null;
let falandoAudio = false;
let enviandoAutomatico = false;
let tokenMotorista = "";

const CHAVE_CONVERSA = "ronysVanConversaAtivaV62";
const CHAVE_CONTINUO = "ronysVanModoContinuoV62";

const el = id => document.getElementById(id);

function salvarConversaAtiva() {
  if (!salaAtual || !papelAtual) return;
  localStorage.setItem(CHAVE_CONVERSA, JSON.stringify({
    sala: salaAtual,
    papel: papelAtual,
    tokenMotorista: papelAtual === "motorista" ? tokenMotorista : "",
    salvoEm: Date.now()
  }));
}

function lerConversaAtiva() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_CONVERSA) || "null");
    if (!dados || !/^\d{6}$/.test(String(dados.sala || ""))) return null;
    return {
      sala: String(dados.sala),
      papel: dados.papel === "motorista" ? "motorista" : "cliente",
      tokenMotorista: String(dados.tokenMotorista || ""),
      salvoEm: Number(dados.salvoEm || 0)
    };
  } catch (_) {
    return null;
  }
}

function limparConversaAtiva() {
  localStorage.removeItem(CHAVE_CONVERSA);
}

function mostrarOpcaoRetomar() {
  const conversa = lerConversaAtiva();
  if (!conversa) return;

  el("retomarCodigo").textContent = conversa.sala;
  el("retomarCard").dataset.sala = conversa.sala;
  el("retomarCard").dataset.papel = conversa.papel;

  const motorista = conversa.papel === "motorista";
  el("retomarTitulo").textContent = motorista
    ? "Conversa anterior encontrada"
    : "Previous conversation found";
  el("retomarTexto").innerHTML = motorista
    ? `Deseja voltar para a conversa <span class="retomar-codigo">${conversa.sala}</span>?`
    : `Would you like to return to conversation <span class="retomar-codigo">${conversa.sala}</span>?`;
  el("retomarBtn").textContent = motorista ? "Voltar para a conversa" : "Return to conversation";
  el("descartarBtn").textContent = motorista ? "Não, iniciar outra" : "No, start another";
  el("retomarCard").classList.remove("hidden");
}

function definirStatus(texto, classe="") {
  el("status").textContent = texto;
  el("status").className = classe;
}

function jsonp(parametros) {
  return new Promise((resolve, reject) => {
    const callback = "__ronys" + (++contadorJsonp) + "_" + Date.now();
    const script = document.createElement("script");
    const timeout = setTimeout(() => finalizar(new Error("Tempo de resposta esgotado.")), 20000);

    function limpar() {
      clearTimeout(timeout);
      delete window[callback];
      script.remove();
    }

    function finalizar(erro, dados) {
      limpar();
      erro ? reject(erro) : resolve(dados);
    }

    window[callback] = dados => finalizar(null, dados);
    script.onerror = () => finalizar(new Error("Falha de conexão com a API."));

    const query = new URLSearchParams({...parametros, callback, t:Date.now()});
    script.src = API_URL + "?" + query.toString();
    document.body.appendChild(script);
  });
}

async function criarSala() {
  definirStatus("Criando conversa...", "processando");
  try {
    const r = await jsonp({acao:"criarSala"});
    if (!r.sucesso) throw new Error(r.mensagem || "Falha ao criar a sala.");

    salaAtual = r.sala;
    papelAtual = "motorista";
    tokenMotorista = String(r.tokenMotorista || "");
    history.replaceState(null, "", location.pathname + "?sala=" + salaAtual + "&papel=motorista");
    salvarConversaAtiva();
    abrirSala();
    definirStatus("Conversa criada. Mostre o QR Code ao passageiro.", "sucesso");
  } catch (erro) {
    definirStatus(erro.message, "erro");
  }
}

async function entrarSala(codigo, papel="cliente", tokenSalvo="") {
  const sala = String(codigo || "").replace(/\D/g, "").slice(0,6);
  if (sala.length !== 6) {
    definirStatus("Digite os 6 números da conversa.", "erro");
    return;
  }

  definirStatus("Entrando na conversa...", "processando");

  try {
    const r = await jsonp({acao:"entrarSala", sala});
    if (!r.sucesso) throw new Error(r.mensagem || "Sala não encontrada.");

    salaAtual = sala;
    papelAtual = papel === "motorista" ? "motorista" : "cliente";
    tokenMotorista = papelAtual === "motorista" ? String(tokenSalvo || "") : "";
    history.replaceState(null, "", location.pathname + "?sala=" + salaAtual + "&papel=" + papelAtual);
    salvarConversaAtiva();
    abrirSala();
    definirStatus(papelAtual === "motorista" ? "Modo motorista ativo." : "Connected. You may speak in English.", "sucesso");
  } catch (erro) {
    const salva = lerConversaAtiva();
    if (salva && salva.sala === sala) {
      limparConversaAtiva();
      el("retomarCard").classList.add("hidden");
    }
    definirStatus(erro.message + " A conversa anterior foi removida deste aparelho.", "erro");
  }
}

function abrirSala() {
  el("inicio").classList.add("hidden");
  el("sala").classList.remove("hidden");
  el("historico").classList.remove("hidden");
  el("fala").classList.remove("hidden");
  el("codigoSala").textContent = salaAtual;

  const motorista = papelAtual === "motorista";
  el("tituloModo").textContent = motorista ? "Modo motorista" : "Passenger mode";
  el("tituloFala").textContent = motorista ? "Fale em português" : "Speak in English";
  el("rotuloTexto").textContent = motorista ? "SUA MENSAGEM EM PORTUGUÊS" : "YOUR MESSAGE IN ENGLISH";
  el("textoReconhecido").placeholder = motorista ? "Sua fala em português aparecerá aqui..." : "Your English speech will appear here...";
  el("micBtn").textContent = motorista ? "🎤 Toque e fale em português" : "🎤 Tap and speak in English";
  el("enviarBtn").textContent = motorista ? "Traduzir para inglês e enviar" : "Translate to Portuguese and send";
  el("tituloContinuo").textContent = motorista ? "Modo conversação contínua" : "Continuous conversation mode";
  el("descricaoContinuo").textContent = motorista
    ? "Ative uma vez e fale normalmente. O envio será automático."
    : "Turn it on once and speak naturally. Messages will be sent automatically.";
  el("avisoAudio").textContent = motorista
    ? "Sua própria tradução não será reproduzida neste aparelho. Você ouvirá somente a tradução recebida do passageiro."
    : "Your own translation will not be played on this device. You will hear only the translation received from the driver.";
  el("convite").classList.toggle("hidden", !motorista);
  el("sairBtn").textContent = motorista ? "🛑 Encerrar conversa para todos" : "Sair deste aparelho";
  el("sairBtn").className = motorista ? "perigo" : "secundario";

  if (motorista) montarConvite();
  iniciarBusca();

  if (localStorage.getItem(CHAVE_CONTINUO) === "1") {
    setTimeout(() => atualizarModoContinuo(true), 500);
  }
}

function montarConvite() {
  const url = new URL(location.href);
  url.search = "";
  url.searchParams.set("sala", salaAtual);
  url.searchParams.set("papel", "cliente");
  const link = url.toString();

  el("qrcode").innerHTML = "";
  if (window.QRCode) {
    new QRCode(el("qrcode"), {
      text: link,
      width: 220,
      height: 220,
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  el("compartilharBtn").dataset.link = link;
  el("copiarBtn").dataset.link = link;
}

async function enviarMensagem(automatico=false) {
  const texto = el("textoReconhecido").value.trim();
  if (!texto) {
    if (!automatico) definirStatus(papelAtual === "motorista" ? "Fale ou digite uma mensagem." : "Speak or type a message.", "erro");
    return;
  }

  if (enviandoAutomatico) return;
  if (automatico) enviandoAutomatico = true;

  const origem = papelAtual === "motorista" ? "pt" : "en";
  const destino = papelAtual === "motorista" ? "en" : "pt";

  el("enviarBtn").disabled = true;
  definirStatus(papelAtual === "motorista" ? "Traduzindo..." : "Translating...", "processando");

  try {
    const tr = await jsonp({acao:"traduzir", texto, origem, destino});
    if (!tr.sucesso) throw new Error(tr.mensagem || "Falha na tradução.");

    const envio = await jsonp({
      acao:"enviar",
      sala:salaAtual,
      papel:papelAtual,
      texto,
      traducao:tr.traducao,
      origem,
      destino,
      tokenMotorista: papelAtual === "motorista" ? tokenMotorista : ""
    });

    if (!envio.sucesso) throw new Error(envio.mensagem || "Falha ao enviar.");

    el("textoReconhecido").value = "";

    // Regra V6.2:
    // a tradução da própria fala é enviada ao outro aparelho,
    // mas nunca é reproduzida localmente.
    definirStatus(papelAtual === "motorista" ? "Mensagem enviada." : "Message sent.", "sucesso");
  } catch (erro) {
    definirStatus(erro.message, "erro");
  } finally {
    el("enviarBtn").disabled = false;
    enviandoAutomatico = false;
    if (modoContinuo) agendarEscutaContinua(900);
  }
}


function atualizarModoContinuo(ativo) {
  modoContinuo = Boolean(ativo);
  localStorage.setItem(CHAVE_CONTINUO, modoContinuo ? "1" : "0");
  el("continuoToggle").checked = modoContinuo;
  el("modoContinuoBox").classList.toggle("continuo-ativo", modoContinuo);

  if (modoContinuo) {
    definirStatus(
      papelAtual === "motorista"
        ? "Modo contínuo ativo. Fale quando estiver pronto."
        : "Continuous mode active. Speak when ready.",
      "sucesso"
    );
    agendarEscutaContinua(500);
  } else {
    clearTimeout(reinicioContinuo);
    reinicioContinuo = null;
    if (reconhecimento) {
      try { reconhecimento.abort(); } catch (_) {}
    }
    definirStatus(
      papelAtual === "motorista"
        ? "Modo contínuo desativado."
        : "Continuous mode is off."
    );
  }
}

function agendarEscutaContinua(atraso=600) {
  clearTimeout(reinicioContinuo);
  if (!modoContinuo || falandoAudio || reconhecimento || enviandoAutomatico || !salaAtual) return;

  reinicioContinuo = setTimeout(() => {
    if (modoContinuo && !falandoAudio && !reconhecimento && !enviandoAutomatico) {
      alternarMicrofone(true);
    }
  }, atraso);
}

function iniciarBusca() {
  pararBusca();
  buscarMensagens();
  timerBusca = setInterval(buscarMensagens, 1400);
}

function pararBusca() {
  if (timerBusca) clearInterval(timerBusca);
  timerBusca = null;
}

async function buscarMensagens() {
  if (!salaAtual) return;

  try {
    const r = await jsonp({acao:"buscar", sala:salaAtual, depois:ultimoId, papel:papelAtual});
    if (!r.sucesso) {
      if (r.encerrada) {
        encerrarLocalmente(
          papelAtual === "motorista"
            ? "Conversa encerrada."
            : "The driver ended this conversation."
        );
        return;
      }
      throw new Error(r.mensagem || "Falha ao atualizar.");
    }

    for (const mensagem of (r.mensagens || [])) {
      mostrarMensagem(mensagem);
      ultimoId = Math.max(ultimoId, Number(mensagem.id || 0));

      // O áudio só pode tocar no aparelho receptor.
      const mensagemRemota = mensagem.papel !== papelAtual;

      if (mensagemRemota) {
        if (reconhecimento) {
          try { reconhecimento.abort(); } catch (_) {}
        }

        const textoFalado = mensagem.traducao || mensagem.texto;
        const idioma = papelAtual === "motorista" ? "pt-BR" : "en-US";

        ultimaTraducao = textoFalado;
        ultimoIdiomaTraducao = idioma;
        reproduzir(textoFalado, idioma);
      }
    }

    if (r.temMais) setTimeout(buscarMensagens, 100);
  } catch (erro) {
    definirStatus(erro.message, "erro");
  }
}

function mostrarMensagem(mensagem) {
  if (el("msg-" + mensagem.id)) return;

  const propria = mensagem.papel === papelAtual;
  const caixa = document.createElement("div");
  caixa.id = "msg-" + mensagem.id;
  caixa.className = "mensagem " + (propria ? "minha" : "outra");

  const autor = propria
    ? (papelAtual === "motorista" ? "Você" : "You")
    : (papelAtual === "motorista" ? "Passageiro — tradução" : "Driver — translation");

  // Quem enviou vê somente sua frase original.
  // Quem recebeu vê somente a tradução no próprio idioma.
  const textoVisivel = propria
    ? (mensagem.texto || "")
    : (mensagem.traducao || mensagem.texto || "");

  caixa.innerHTML =
    "<small>" + escapar(autor) + "</small>" +
    "<div>" + escapar(textoVisivel) + "</div>";

  el("mensagens").appendChild(caixa);
  el("mensagens").scrollTop = el("mensagens").scrollHeight;
}

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
  })[c]);
}

async function solicitarMicrofone() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
  const stream = await navigator.mediaDevices.getUserMedia({audio:true});
  stream.getTracks().forEach(track => track.stop());
}

async function alternarMicrofone(automatico=false) {
  if (!Recognition) {
    definirStatus("Use o Google Chrome para reconhecimento de voz.", "erro");
    return;
  }

  if (ouvindo && reconhecimento) {
    if (!automatico) reconhecimento.stop();
    return;
  }

  if (falandoAudio || enviandoAutomatico) {
    if (modoContinuo) agendarEscutaContinua(700);
    return;
  }

  try {
    await solicitarMicrofone();
  } catch (_) {
    definirStatus("O microfone não foi autorizado para este site.", "erro");
    return;
  }

  reconhecimento = new Recognition();
  reconhecimento.lang = papelAtual === "motorista" ? "pt-BR" : "en-US";
  reconhecimento.continuous = false;
  reconhecimento.interimResults = modoContinuo ? false : true;
  reconhecimento.maxAlternatives = 1;

  reconhecimento.onstart = () => {
    ouvindo = true;
    el("micBtn").classList.add("ouvindo");
    el("micBtn").textContent = papelAtual === "motorista" ? "🔴 Ouvindo português..." : "🔴 Listening...";
    definirStatus(papelAtual === "motorista" ? "Pode falar." : "Please speak.", "processando");
  };

  reconhecimento.onresult = evento => {
    let texto = "";
    let finalizado = false;

    for (let i = evento.resultIndex; i < evento.results.length; i++) {
      texto += evento.results[i][0].transcript;
      if (evento.results[i].isFinal) finalizado = true;
    }

    texto = texto.trim();
    el("textoReconhecido").value = texto;

    if (modoContinuo && finalizado && texto) {
      setTimeout(() => enviarMensagem(true), 120);
    }
  };

  reconhecimento.onerror = evento => {
    if (modoContinuo && evento.error === "no-speech") {
      definirStatus(
        papelAtual === "motorista" ? "Aguardando você falar..." : "Waiting for you to speak...",
        "processando"
      );
      return;
    }

    const mensagens = {
      "not-allowed":"O microfone foi bloqueado.",
      "no-speech":"Nenhuma fala foi detectada.",
      "network":"Falha de rede no reconhecimento de voz.",
      "audio-capture":"Microfone indisponível."
    };
    definirStatus(mensagens[evento.error] || ("Erro no microfone: " + evento.error), "erro");
  };

  reconhecimento.onend = () => {
    ouvindo = false;
    el("micBtn").classList.remove("ouvindo");
    el("micBtn").textContent = papelAtual === "motorista" ? "🎤 Toque e fale em português" : "🎤 Tap and speak in English";
    reconhecimento = null;
    if (modoContinuo && !enviandoAutomatico && !falandoAudio) agendarEscutaContinua(650);
  };

  reconhecimento.start();
}

function carregarVozes() {
  vozes = speechSynthesis.getVoices() || [];
}

function escolherVoz(idioma) {
  const prefixo = idioma.substring(0,2).toLowerCase();
  const candidatas = vozes.filter(v => String(v.lang || "").toLowerCase().startsWith(prefixo));
  const nomesMasculinos = ["male","masculino","daniel","david","mark","james","guy","brian","george","christopher","matthew"];

  return candidatas.find(v => nomesMasculinos.some(nome => v.name.toLowerCase().includes(nome)))
      || candidatas.find(v => v.localService)
      || candidatas[0]
      || null;
}

function reproduzir(texto, idioma) {
  if (!texto || !("speechSynthesis" in window)) return;

  speechSynthesis.cancel();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = idioma;
  fala.rate = 0.92;
  fala.pitch = 0.9;
  fala.volume = 1;

  const voz = escolherVoz(idioma);
  if (voz) fala.voice = voz;

  fala.onstart = () => {
    falandoAudio = true;
    if (reconhecimento) {
      try { reconhecimento.abort(); } catch (_) {}
    }
  };

  const finalizarAudio = () => {
    falandoAudio = false;
    if (modoContinuo) agendarEscutaContinua(700);
  };

  fala.onend = finalizarAudio;
  fala.onerror = finalizarAudio;
  speechSynthesis.speak(fala);
}

function encerrarLocalmente(mensagem="") {
  modoContinuo = false;
  clearTimeout(reinicioContinuo);
  pararBusca();

  if (reconhecimento) {
    try { reconhecimento.abort(); } catch (_) {}
  }
  if ("speechSynthesis" in window) speechSynthesis.cancel();

  limparConversaAtiva();
  localStorage.removeItem(CHAVE_CONTINUO);
  salaAtual = "";
  papelAtual = "";
  tokenMotorista = "";
  ultimoId = 0;
  history.replaceState(null, "", location.pathname);

  el("sala").classList.add("hidden");
  el("historico").classList.add("hidden");
  el("fala").classList.add("hidden");
  el("inicio").classList.remove("hidden");
  el("mensagens").innerHTML = "";
  el("retomarCard").classList.add("hidden");
  definirStatus(mensagem || "Você saiu da conversa.", "sucesso");
}

async function sair() {
  if (papelAtual !== "motorista") {
    encerrarLocalmente("You left the conversation on this device.");
    return;
  }

  const confirmou = confirm(
    "Encerrar esta conversa para todos?\n\nO passageiro não poderá voltar usando este QR Code."
  );
  if (!confirmou) return;

  definirStatus("Encerrando conversa...", "processando");

  try {
    const r = await jsonp({
      acao: "encerrarSala",
      sala: salaAtual,
      tokenMotorista
    });
    if (!r.sucesso) throw new Error(r.mensagem || "Não foi possível encerrar.");
    encerrarLocalmente("Conversa encerrada para todos.", "sucesso");
  } catch (erro) {
    definirStatus(erro.message, "erro");
  }
}

el("criarBtn").addEventListener("click", criarSala);
el("mostrarEntradaBtn").addEventListener("click", () => el("entradaBox").classList.toggle("hidden"));
el("entrarBtn").addEventListener("click", () => entrarSala(el("codigoEntrada").value, "cliente"));
el("micBtn").addEventListener("click", alternarMicrofone);
el("enviarBtn").addEventListener("click", () => enviarMensagem(false));
el("continuoToggle").addEventListener("change", event => atualizarModoContinuo(event.target.checked));

el("retomarBtn").addEventListener("click", () => {
  const sala = el("retomarCard").dataset.sala;
  const papel = el("retomarCard").dataset.papel;
  if (sala) {
    const conversa = lerConversaAtiva();
    entrarSala(sala, papel, conversa ? conversa.tokenMotorista : "");
  }
});

el("descartarBtn").addEventListener("click", () => {
  limparConversaAtiva();
  localStorage.removeItem(CHAVE_CONTINUO);
  el("retomarCard").classList.add("hidden");
  definirStatus("Conversa anterior descartada. Você pode iniciar uma nova.");
});

el("repetirBtn").addEventListener("click", () => {
  if (ultimaTraducao) reproduzir(ultimaTraducao, ultimoIdiomaTraducao);
});
el("sairBtn").addEventListener("click", sair);

el("compartilharBtn").addEventListener("click", async () => {
  const link = el("compartilharBtn").dataset.link;
  try {
    if (navigator.share) {
      await navigator.share({
        title:"Rony's Van Interpreter",
        text:"Open this link to speak with the driver using translation:",
        url:link
      });
    } else {
      await navigator.clipboard.writeText(link);
      alert("Link copiado.");
    }
  } catch (_) {}
});

el("copiarBtn").addEventListener("click", async () => {
  const link = el("copiarBtn").dataset.link;
  try {
    await navigator.clipboard.writeText(link);
    alert("Link copiado.");
  } catch (_) {
    prompt("Copie o link:", link);
  }
});

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = carregarVozes;
  carregarVozes();
}

const inicial = new URLSearchParams(location.search);
const salaInicial = inicial.get("sala");
const papelInicial = inicial.get("papel") === "motorista" ? "motorista" : "cliente";

if (salaInicial) {
  const salva = lerConversaAtiva();
  const token = salva && salva.sala === salaInicial && salva.papel === "motorista"
    ? salva.tokenMotorista
    : "";
  entrarSala(salaInicial, papelInicial, token);
} else {
  mostrarOpcaoRetomar();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=6.2").catch(() => {}));
}
</script>
</body>
</html>
