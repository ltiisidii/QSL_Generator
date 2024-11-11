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

    const backgroundImageInput = document.getElementById('backgroundImage');

    if (backgroundImageInput.files && backgroundImageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const background = new Image();
            background.onload = function () {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                drawQSLContentWithBackground(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
            };
            background.src = event.target.result;
        };
        
        reader.readAsDataURL(backgroundImageInput.files[0]);
    } else {
        drawQSLContentWithBackground(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
    }

    document.getElementById('downloadButton').style.display = 'inline';
}

function drawQSLContentWithBackground(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios) {
    // Fondo semitransparente y borde negro
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'; 
    ctx.fillRect(30, 30, ctx.canvas.width - 60, ctx.canvas.height - 80);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5; // Borde negro más grueso
    ctx.strokeRect(30, 30, ctx.canvas.width - 60, ctx.canvas.height - 80);

    // Configuración de texto en blanco
    ctx.fillStyle = '#000';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`QSO with ${indicativo}`, ctx.canvas.width / 2, 70);

    // Configuración de la tabla
    const tableStartX = 50;
    const tableStartY = 100;
    const rowHeight = 60;
    const colWidth = (ctx.canvas.width - 100) / 2;

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
    wrapText(ctx, comentarios, tableStartX, tableStartY + rowHeight * 7, ctx.canvas.width - 100, 24);

    // Pie de página dentro del recuadro
    ctx.font = 'italic 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`QRZ/Contact: ${qrz}`, ctx.canvas.width / 2, ctx.canvas.height - 90);
    ctx.fillText('Thank you for the contact', ctx.canvas.width / 2, ctx.canvas.height - 60);
}

// Función para dibujar cada fila de la tabla
function drawTableRow(ctx, label, value, x, y, width, height) {
    ctx.strokeStyle = '#000';
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
