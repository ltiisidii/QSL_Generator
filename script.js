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
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpia el canvas

    // Fondo blanco con borde exterior
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Encabezado con Indicativo
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000000';
    ctx.fillText(indicativo, canvas.width / 2, 50);

    // Configuración de la tabla
    const tableStartX = 20;
    const tableStartY = 70;
    const rowHeight = 40;
    const colWidth = (canvas.width - 40) / 2;

    ctx.lineWidth = 1;
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';

    // Primera columna
    drawTableRow(ctx, 'Fecha:', fecha, tableStartX, tableStartY, colWidth, rowHeight);
    drawTableRow(ctx, 'Hora UTC:', hora, tableStartX, tableStartY + rowHeight, colWidth, rowHeight);
    drawTableRow(ctx, 'Frecuencia:', frecuencia, tableStartX, tableStartY + rowHeight * 2, colWidth, rowHeight);
    drawTableRow(ctx, 'Modo:', modo, tableStartX, tableStartY + rowHeight * 3, colWidth, rowHeight);
    drawTableRow(ctx, 'Reporte RST:', rst, tableStartX, tableStartY + rowHeight * 4, colWidth, rowHeight);

    // Segunda columna
    drawTableRow(ctx, 'Ubicación:', ubicacion, tableStartX + colWidth, tableStartY, colWidth, rowHeight);
    drawTableRow(ctx, 'Grid Locator:', grid, tableStartX + colWidth, tableStartY + rowHeight, colWidth, rowHeight);
    drawTableRow(ctx, 'Equipo:', equipo, tableStartX + colWidth, tableStartY + rowHeight * 2, colWidth, rowHeight);
    drawTableRow(ctx, 'Antena:', antena, tableStartX + colWidth, tableStartY + rowHeight * 3, colWidth, rowHeight);

    // Comentarios en la parte inferior
    ctx.fillText('Comentarios:', tableStartX, tableStartY + rowHeight * 6);
    wrapText(ctx, comentarios, tableStartX, tableStartY + rowHeight * 7, canvas.width - 40, 20);

    // Pie de página
    ctx.font = 'italic 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`QRZ/Contacto: ${qrz}`, canvas.width / 2, canvas.height - 50);
    ctx.fillText('Gracias por el contacto', canvas.width / 2, canvas.height - 30);
}

// Función para dibujar cada fila de la tabla
function drawTableRow(ctx, label, value, x, y, width, height) {
    ctx.strokeRect(x, y, width, height);
    ctx.fillText(label, x + 10, y + height / 2 + 5);
    ctx.fillText(value, x + width / 2, y + height / 2 + 5);
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
