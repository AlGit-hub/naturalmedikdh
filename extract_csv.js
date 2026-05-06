// Script to extract products from index.html and create a CSV
const fs = require('fs');

const html = fs.readFileSync('c:\\Users\\Lenovo\\OneDrive\\Desktop\\naturalmedikdh\\naturalmedikdh\\index.html', 'utf8');
const lines = html.split('\n');

let csv = "ID,Imagen,Nombre,Categoria,Precio,Descripcion\n";

lines.forEach(line => {
    if (line.trim().startsWith('p(')) {
        // Extract arguments using a regex
        // Example: p(1,  'prod1.jpeg',  'Gomitas Manzana Satibo',        'Vitaminas',         45500, 'Formuladas con ...');
        const match = line.match(/p\(\s*(\d+)\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*,\s*(\d+)\s*,\s*'([^']+)'\s*\);/);
        
        if (match) {
            const id = match[1];
            const img = match[2];
            const name = match[3];
            const cat = match[4];
            const price = match[5];
            const desc = match[6].replace(/"/g, '""'); // Escape quotes for CSV
            
            csv += `${id},${img},"${name}","${cat}",${price},"${desc}"\n`;
        }
    }
});

fs.writeFileSync('c:\\Users\\Lenovo\\OneDrive\\Desktop\\naturalmedikdh\\naturalmedikdh\\productos.csv', csv);
console.log("CSV created!");
