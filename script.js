const translations = {
    en: {
        qsoWith: "QSO with",
        date: "Date",
        utcTime: "UTC Time",
        frequency: "Frequency",
        mode: "Mode",
        rstReport: "RST Report",
        location: "Location",
        gridLocator: "Grid Locator",
        equipment: "Equipment",
        antenna: "Antenna",
        comments: "Comments",
        qrzContact: "QRZ/Contact",
        thankYou: "Thank you for the contact"
    },
    es: {
        qsoWith: "QSO con",
        date: "Fecha",
        utcTime: "Hora UTC",
        frequency: "Frecuencia",
        mode: "Modo",
        rstReport: "Reporte RST",
        location: "Ubicación",
        gridLocator: "Localizador",
        equipment: "Equipo",
        antenna: "Antena",
        comments: "Comentarios",
        qrzContact: "QRZ/Contacto",
        thankYou: "Gracias por el contacto"
    }
};

function generateQSLCard() {
    const language = document.getElementById('language').value;
    const text = translations[language];

    const indicativo = document.getElementById('indicativo').value.toUpperCase();
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
                drawQSLContent(ctx, text, indicativo, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
            };
            background.src = event.target.result;
        };
        reader.readAsDataURL(backgroundImageInput.files[0]);
    } else {
        drawQSLContent(ctx, text, indicativo, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios);
    }

    document.getElementById('downloadButton').style.display = 'inline';
}

function drawQSLContent(ctx, text, indicativo, fecha, frecuencia, modo, rst, ubicacion, grid, equipo, antena, hora, qrz, comentarios) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(30, 30, ctx.canvas.width - 60, ctx.canvas.height - 80);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 5;
    ctx.strokeRect(30, 30, ctx.canvas.width - 60, ctx.canvas.height - 80);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${text.qsoWith} ${indicativo}`, ctx.canvas.width / 2, 70);

    const tableStartX = 50;
    const tableStartY = 100;
    const rowHeight = 60;
    const colWidth = (ctx.canvas.width - 100) / 2;

    ctx.lineWidth = 1;
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';

    drawTableRow(ctx, `${text.date}:`, fecha, tableStartX, tableStartY, colWidth, rowHeight);
    drawTableRow(ctx, `${text.utcTime}:`, hora, tableStartX, tableStartY + rowHeight, colWidth, rowHeight);
    drawTableRow(ctx, `${text.frequency}:`, frecuencia, tableStartX, tableStartY + rowHeight * 2, colWidth, rowHeight);
    drawTableRow(ctx, `${text.mode}:`, modo, tableStartX, tableStartY + rowHeight * 3, colWidth, rowHeight);
    drawTableRow(ctx, `${text.rstReport}:`, rst, tableStartX, tableStartY + rowHeight * 4, colWidth, rowHeight);

    drawTableRow(ctx, `${text.location}:`, ubicacion, tableStartX + colWidth, tableStartY, colWidth, rowHeight);
    drawTableRow(ctx, `${text.gridLocator}:`, grid, tableStartX + colWidth, tableStartY + rowHeight, colWidth, rowHeight);
    drawTableRow(ctx, `${text.equipment}:`, equipo, tableStartX + colWidth, tableStartY + rowHeight * 2, colWidth, rowHeight);
    drawTableRow(ctx, `${text.antenna}:`, antena, tableStartX + colWidth, tableStartY + rowHeight * 3, colWidth, rowHeight);

    ctx.fillText(`${text.comments}:`, tableStartX, tableStartY + rowHeight * 6);
    wrapText(ctx, comentarios, tableStartX, tableStartY + rowHeight * 7, ctx.canvas.width - 100, 24);

    ctx.font = 'italic 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${text.qrzContact}: ${qrz}`, ctx.canvas.width / 2, ctx.canvas.height - 90);
    ctx.fillText(text.thankYou, ctx.canvas.width / 2, ctx.canvas.height - 60);
}

function drawTableRow(ctx, label, value, x, y, width, height) {
    ctx.strokeStyle = '#000';
    ctx.strokeRect(x, y, width, height);
    ctx.fillText(label, x + 10, y + height / 2 + 8);
    ctx.fillText(value, x + width / 2, y + height / 2 + 8);
}

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

function toggleDarkMode() {
    const body = document.body;
    
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    }

    // Guarda la preferencia de modo en localStorage
    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Aplicar preferencia guardada al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const darkModePreference = localStorage.getItem("darkMode");
    const darkModeToggle = document.getElementById("darkModeToggle");
    
    if (darkModePreference === "enabled") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        darkModeToggle.checked = true; // Marca el switch si está en modo oscuro
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        darkModeToggle.checked = false;
    }
});
