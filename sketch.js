let table;
let fontTitolo;
let fontTesto;

let datiFiltratiPerAnno = []; // array per dati un solo anno
let annoSelezionato = 2025; // di default mostro all'inizio 2025




function preload() {
  table = loadTable('FREEDOMHOUSE_ES3.csv', 'csv', 'header');

  fontTitolo = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
  fontTesto = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
  
  filtraDatiPerAnno(annoSelezionato);
}


function setup() {
  let altezzaTotale = 1250;
  createCanvas(windowWidth, altezzaTotale);

  textFont(fontTesto);
}


function draw() {
  background(220);
}

function filtraDatiPerAnno(anno) {
  datiFiltratiPerAnno = [];
  
  for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let edizione = parseInt(row.get('Edition')); 
    // parseInt converte stringa in un numero intero, 
    // pk edizione nel dataser letta come stringa non corrisponde a 2025 
    // numero del menu tendina
    
    if (edizione === anno) {
      let paese = {
        nome: row.get('Country/Territory'),
        regione: row.get('Region'),
        tipo: row.get('C/T'),
        status: row.get('Status'),
        pr: parseInt(row.get('PR')) || 0, 
        cl: parseInt(row.get('CL')) || 0,
        total: parseInt(row.get('TOTAL ')) || 0
        // per sicurezza faccio metto ||0 in modo che se cerco di parsare
        // una stringa che non è un numero non si buggi tutto ma mi dia 0
      };
      datiFiltratiPerAnno.push(paese);
    }
  }
}