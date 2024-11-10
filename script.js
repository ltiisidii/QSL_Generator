function generateQSLCard() {
    const indicativo = document.getElementById('indicativo').value;
    const nombre = document.getElementById('nombre').value;
    const fecha = document.getElementById('fecha').value;

    const canvas = document.getElementById('qslCanvas');
    const ctx = canvas.getContext('2d');

    // Fondo blanco
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texto de la tarjeta QSL
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Indicativo: ${indicativo}`, 50, 50);
    ctx.fillText(`Nombre: ${nombre}`, 50, 100);
    ctx.fillText(`Fecha: ${fecha}`, 50, 150);

    document.getElementById('downloadButton').style.display = 'inline';
}

function downloadImage() {
    const canvas = document.getElementById('qslCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'tarjeta_qsl.png';
    link.click();
}
