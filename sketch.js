//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = velocidadeXBolinha;
let colidiu = false;

//variáveis da raquete jogador
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//variáveis raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente = [velocidadeXBolinha+2, velocidadeYBolinha,velocidadeXBolinha-2];


//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  line(300, 0, 300, 400);
  mostraBolinha(); 
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  
}

function mostraBolinha(){
   circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
   if (xBolinha + raio > width || xBolinha - raio< 0){ velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height || yBolinha - raio < 0){ velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
  }

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
   if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  //limitação da movimentação da raquete para não sair da borda
  yRaquete = constrain(yRaquete, 7, 325);
}  

function verificaColisaoRaquete(x, y){
   colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
} 

function movimentaRaqueteOponente(){
  if (xBolinha > 300 && velocidadeXBolinha > 0){
    if (yRaqueteOponente != yBolinha){
      if (yRaqueteOponente < yBolinha){
        yRaqueteOponente += random(velocidadeYOponente);
      }
      else{
        yRaqueteOponente += random(velocidadeYOponente) * -1;
      }
    }
  }
  //limitação da movimentação da raquete do oponente para não sair da borda
  yRaqueteOponente = constrain(yRaqueteOponente, 7, 325);
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect (150, 10, 40, 20, 10);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect (450, 10, 40, 20, 10);
  fill(255);
  text(pontosDoOponente, 470, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function calculaChanceDeErrar(){
  var ajuste = random(-10, 10); // gera um número aleatório entre -10 e 10
  chanceDeErrar += ajuste;
  chanceDeErrar = constrain(chanceDeErrar, 10, 90); // limita a chanceDeErrar entre 10 e 90
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
      xBolinha = 25;
    } else if (xBolinha > width - raio) {
      xBolinha = width - 25
    }
}