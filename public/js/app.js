$(document).ready(function() {
    let app = {
        request: {
            get: (url) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'GET',
                        url: `http://localhost:3000/${url}`,
                        beforeSend: function() {
                            console.log("Procesando, espere por favor...");
                        }, error: function(e) {
                            console.error('Ocurrió un error al porcesar la petición:', e);
                            reject('Ocurrió un error al porcesar la petición.');
                        }, success: function(response) {
                            resolve(response);
                        }, complete: function(r) {
                            console.log("Terminado");
                        }
                    });
                });
            }, put: (url, args) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: 'PUT',
                        url: `http://localhost:3000/${url}`,
                        contentType: 'application/json',
                        data: JSON.stringify(args),
                        beforeSend: function() {
                            console.log("Procesando, espere por favor...");
                        }, error: function(e) {
                            console.error('Ocurrió un error al porcesar la petición:', e);
                            reject('Ocurrió un error al porcesar la petición.');
                        }, success: function(response) {
                            resolve(response);
                        }, complete: function(r) {
                            console.log("Terminado");
                        }
                    });
                });
            }
        },
        drawTemplate: (template, data, container) => {
            $.get(`templates/${template}.hbs`, function (html) {
                const template = Handlebars.compile(html);
                $(template(data)).appendTo(container);
            }, 'html')
        }
    }

    const getContactInfo = async () => {
        const phone = await app.request.get('phone');
        $('.phone').text(`Cel. ${phone}`);
        $('.address').text(await app.request.get('address'));
    }

    const multiplicar = async (base) => {
        $('#result #base').text(base);

        let data = `Tabla\n\n\nLa base usada es ${base}\n\n`;
        for (let i = 1; i <= 10; i++) {
            app.drawTemplate('row', { base, num: i, res: (base * i) }, $('#result table'));
            data += `${base} * ${i} = ${base * i}\n`;
        }

        const res = await app.request.put('writeFile', { name: `tabla - ${base} - ${new Date().getTime()}.txt`, data });
        console.log(res);
    }

    $('#goto-home').on('click', function() {
        window.open('index.html', '_self');
    });

    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const base = searchParams.get('base');

    if (base) multiplicar(base);

    getContactInfo();
});