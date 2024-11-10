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
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  // Dibuja la imagen de fondo
                drawText(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);  // Dibuja el texto
            };
            background.src = event.target.result;
        };
        
        reader.readAsDataURL(backgroundImageInput.files[0]);
    } else {
        // Si no se selecciona imagen, usar fondo blanco
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);  // Dibuja el texto en fondo blanco
    }

    document.getElementById('downloadButton').style.display = 'inline';
}

// Función separada para dibujar el texto
function drawText(ctx, indicativo, nombre, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios) {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Tarjeta QSL`, 250, 30);

    ctx.font = '16px Arial';
    ctx.fillText(`Indicativo: ${indicativo}`, 20, 60);
    ctx.fillText(`Nombre: ${nombre}`, 20, 90);
    ctx.fillText(`Fecha: ${fecha}`, 20, 120);
    ctx.fillText(`Frecuencia: ${frecuencia}`, 20, 150);
    ctx.fillText(`Modo: ${modo}`, 20, 180);
    ctx.fillText(`Reporte RST: ${rst}`, 20, 210);
    ctx.fillText(`Ubicación: ${ubicacion}`, 20, 240);
    ctx.fillText(`Grid Locator: ${grid}`, 20, 270);
    ctx.fillText(`Equipo: ${equipo}`, 20, 300);
    ctx.fillText(`Antena: ${antena}`, 20, 330);
    ctx.fillText(`Hora UTC: ${hora}`, 20, 360);
    ctx.fillText(`QRZ/Contacto: ${qrz}`, 20, 390);
    ctx.fillText(`Comentarios: ${comentarios}`, 20, 420);
}

function downloadImage() {
    const canvas = document.getElementById('qslCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'tarjeta_qsl.png';
    link.click();
}
