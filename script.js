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
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawQSLContent(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
    }

    document.getElementById('downloadButton').style.display = 'inline';
}

// Función para dibujar el contenido de la tarjeta QSL sin el encabezado
function drawQSLContent(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios) {
    // Fondo y bordes principales
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(20, 20, ctx.canvas.width - 40, ctx.canvas.height - 40); // Borde externo
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(30, 30, ctx.canvas.width - 60, ctx.canvas.height - 60); // Fondo blanco

    // Simulación de tabla con secciones y líneas divisorias
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#1f2d3d';

    // Dibujar líneas horizontales para secciones
    ctx.beginPath();
    ctx.moveTo(40, 90); ctx.lineTo(ctx.canvas.width - 40, 90);
    ctx.moveTo(40, 180); ctx.lineTo(ctx.canvas.width - 40, 180);
    ctx.moveTo(40, 270); ctx.lineTo(ctx.canvas.width - 40, 270);
    ctx.moveTo(40, 360); ctx.lineTo(ctx.canvas.width - 40, 360);
    ctx.stroke();

    // Texto alineado en cada sección
    ctx.fillStyle = '#333';
    ctx.textAlign = 'left';
    ctx.font = '16px Arial';

    // Sección de Información Principal
    ctx.fillText(`Indicativo: ${indicativo}`, 50, 110);
    ctx.fillText(`Nombre: ${nombre}`, 50, 140);
    ctx.fillText(`Fecha: ${fecha}  Hora UTC: ${hora}`, 50, 170);

    // Sección de Ubicación
    ctx.fillText(`Ubicación: ${ubicacion}`, 50, 200);
    ctx.fillText(`Grid Locator: ${grid}`, 50, 230);

    // Sección de Frecuencia y Reporte
    ctx.fillText(`Frecuencia: ${frecuencia}`, 50, 290);
    ctx.fillText(`Modo: ${modo}`, 50, 320);
    ctx.fillText(`Reporte RST: ${rst}`, 50, 350);

    // Sección de Equipo y Antena
    ctx.fillText(`Equipo de Radio: ${equipo}`, 50, 380);
    ctx.fillText(`Antena: ${antena}`, 50, 410);

    // Sección de Contacto y Comentarios
    ctx.fillText(`QRZ/Contacto: ${qrz}`, 50, 450);
    ctx.fillText(`Comentarios: ${comentarios}`, 50, 480);

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
