function generateQSLCard() {
    const indicativo = document.getElementById('indicativo').value;
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
    const backgroundImageInput = document.getElementById('backgroundImage');

    if (backgroundImageInput.files && backgroundImageInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (event) {
            const background = new Image();
            background.onload = function () {
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                drawQSLContent(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
            };
            background.src = event.target.result;
        };
        
        reader.readAsDataURL(backgroundImageInput.files[0]);
    } else {
        drawQSLContent(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
    }

    document.getElementById('downloadButton').style.display = 'inline';
}

// Función para dibujar el contenido de la tarjeta QSL sin fondo blanco opaco
function drawQSLContent(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios) {
    // Bordes y líneas divisorias, sin fondo blanco para la tabla
    ctx.strokeStyle = '#1f2d3d';
    ctx.lineWidth = 1;

    // Líneas divisorias horizontales
    ctx.beginPath();
    ctx.moveTo(40, 90); ctx.lineTo(ctx.canvas.width - 40, 90);
    ctx.moveTo(40, 180); ctx.lineTo(ctx.canvas.width - 40, 180);
    ctx.moveTo(40, 270); ctx.lineTo(ctx.canvas.width - 40, 270);
    ctx.moveTo(40, 360); ctx.lineTo(ctx.canvas.width - 40, 360);
    ctx.stroke();

    // Texto alineado y ajustado en cada sección
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';

    // Ajuste automático del tamaño de fuente si el texto es demasiado largo
    ctx.font = '16px Arial';

    // Función para agregar saltos de línea si el texto es muy largo
    function wrapText(text, x, y, maxWidth, lineHeight) {
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
        return y + lineHeight;  // Retorna el nuevo "y" para continuar dibujando más texto debajo
    }

    // Sección de Información Principal
    let y = wrapText(`Indicativo: ${indicativo}`, 50, 100, ctx.canvas.width - 100, 20);
    y = wrapText(`Nombre: ${nombre}`, 50, y, ctx.canvas.width - 100, 20);
    y = wrapText(`Fecha: ${fecha}  Hora UTC: ${hora}`, 50, y, ctx.canvas.width - 100, 20);

    // Sección de Ubicación
    y = wrapText(`Ubicación: ${ubicacion}`, 50, y + 10, ctx.canvas.width - 100, 20);
    y = wrapText(`Grid Locator: ${grid}`, 50, y, ctx.canvas.width - 100, 20);

    // Sección de Frecuencia y Reporte
    y = wrapText(`Frecuencia: ${frecuencia}`, 50, y + 10, ctx.canvas.width - 100, 20);
    y = wrapText(`Modo: ${modo}`, 50, y, ctx.canvas.width - 100, 20);
    y = wrapText(`Reporte RST: ${rst}`, 50, y, ctx.canvas.width - 100, 20);

    // Sección de Equipo y Antena
    y = wrapText(`Equipo de Radio: ${equipo}`, 50, y + 10, ctx.canvas.width - 100, 20);
    y = wrapText(`Antena: ${antena}`, 50, y, ctx.canvas.width - 100, 20);

    // Sección de Contacto y Comentarios
    y = wrapText(`QRZ/Contacto: ${qrz}`, 50, y + 10, ctx.canvas.width - 100, 20);
    wrapText(`Comentarios: ${comentarios}`, 50, y, ctx.canvas.width - 100, 20);

    // Texto final de agradecimiento
    ctx.textAlign = 'center';
    ctx.font = 'italic 14px Arial';
    ctx.fillText("Gracias por el contacto", ctx.canvas.width / 2, ctx.canvas.height - 30);
}

function downloadImage() {
    const canvas = document.getElementById('qslCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'tarjeta_qsl.png';
    link.click();
}
