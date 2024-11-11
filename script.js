function generateQSLCard() {
    const indicativo = document.getElementById('indicativo').value.toUpperCase();
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;
    const frecuencia = document.getElementById('frecuencia').value;
    const modo = document.getElementById('modo').value;
    const rst = document.getElementById('rst').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const grid = document.getElementById('grid').value;
    const equipo = document.getElementById('equipo').value;
    const antena = document.getElementById('antena').value;
    const hora = document.getElementById('hora').value;
    const qrz = document.getElementById('qrz').value;
    const comentarios = document.getElementById('comentarios').value;

    const canvas = document.getElementById('qslCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo blanco con borde exterior
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Encabezado con Indicativo y "QSO with"
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.fillText(`QSO with ${indicativo}`, canvas.width / 2, 50);

    // Configuración de la tabla
    const tableStartX = 50;
    const tableStartY = 100;
    const rowHeight = 60;
    const colWidth = (canvas.width - 100) / 2;

    ctx.lineWidth = 1;
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';

    // Primera columna
    drawTableRow(ctx, 'Date:', fecha, tableStartX, tableStartY, colWidth, rowHeight);
    drawTableRow(ctx, 'UTC Time:', hora, tableStartX, tableStartY + rowHeight, colWidth, rowHeight);
    drawTableRow(ctx, 'Frequency:', frecuencia, tableStartX, tableStartY + rowHeight * 2, colWidth, rowHeight);
    drawTableRow(ctx, 'Mode:', modo, tableStartX, tableStartY + rowHeight * 3, colWidth, rowHeight);
    drawTableRow(ctx, 'RST Report:', rst, tableStartX, tableStartY + rowHeight * 4, colWidth, rowHeight);

    // Segunda columna
    drawTableRow(ctx, 'Location:', ubicacion, tableStartX + colWidth, tableStartY, colWidth, rowHeight);
    drawTableRow(ctx, 'Grid Locator:', grid, tableStartX + colWidth, tableStartY + rowHeight, colWidth, rowHeight);
    drawTableRow(ctx, 'Equipment:', equipo, tableStartX + colWidth, tableStartY + rowHeight * 2, colWidth, rowHeight);
    drawTableRow(ctx, 'Antenna:', antena, tableStartX + colWidth, tableStartY + rowHeight * 3, colWidth, rowHeight);

    // Comentarios en la parte inferior
    ctx.fillText('Comments:', tableStartX, tableStartY + rowHeight * 6);
    wrapText(ctx, comentarios, tableStartX, tableStartY + rowHeight * 7, canvas.width - 100, 24);

    // Pie de página
    ctx.font = 'italic 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`QRZ/Contact: ${qrz}`, canvas.width / 2, canvas.height - 50);
    ctx.fillText('Thank you for the contact', canvas.width / 2, canvas.height - 20);

    document.getElementById('downloadButton').style.display = 'inline';
}

// Función para dibujar cada fila de la tabla
function drawTableRow(ctx, label, value, x, y, width, height) {
    ctx.strokeRect(x, y, width, height);
    ctx.fillText(label, x + 10, y + height / 2 + 8);
    ctx.fillText(value, x + width / 2, y + height / 2 + 8);
}

// Función para ajustar texto largo con saltos de línea
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

function downloadImage() {
    const canvas = document.getElementById('qslCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'qsl_card.png';
    link.click();
}
