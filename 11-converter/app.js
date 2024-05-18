const Reader = require('./Reader');
const Processor = require('./Processor');
const Table = require('./Table');
const HtmlParser = require('./HtmlParser');
const Writer = require('./Writer');
const PdfWriter = require('./PdfWriter');
const reader = new Reader();
const writer = new Writer();

const app = async () => {
  let csv = await reader.read('./users.csv');
  let rows = Processor.process(csv);
  let table = new Table(rows);
  let html = await HtmlParser.parser(table);

  let now = Date.now();
  writer.write('table-' + now + '.html', html);
  PdfWriter.write('table-' + now + '.pdf', html);
}

app();