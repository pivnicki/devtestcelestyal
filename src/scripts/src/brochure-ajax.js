jQuery(document).ready(function ($) {

    var request;
    var msgLang;
    var theLanguage = $('html').attr('lang');
    if (theLanguage == 'fr-FR') {
        msgLang = 'Votre guide de croisière est en route vers votre compte de messagerie';
    } else if (theLanguage == 'de-DE') {
        msgLang = 'Sie erhalten Ihren Kreuzfahrt-Guide in Kürze in Ihrem E-Mail Postfach.'
    } else if (theLanguage == 'el-GR') {
        msgLang = 'Ο Οδηγός κρουαζιέρας βρίσκεται στο λογαριασμό σας στο email';
    } else if (theLanguage == 'es-ES') {
        msgLang = 'Su guía de crucero está en camino a su cuenta de correo electrónico';
    } else if (theLanguage == 'pt-br') {
        msgLang = 'Seu guia de cruzeiro está a caminho para sua conta de e-mail';
    } else {
        msgLang = 'Your Cruise Guide is on its way to your email account';
    }

    $('#brochure').on('submit', function (e) {

        e.preventDefault();
        if (request) { request.abort(); }
        $('#result').html('');

        const apiKey = '3dHwtvKqu3Fb1sbRDo83';

        var $form = $(this);
        var submittedData = $form.serialize();
        submittedData = submittedData + `&apikey=${apiKey}&cel_api_cel_brochure_keep=Yes`;
        console.log(submittedData);

        var $inputs = $form.find('[name]');
        $inputs.prop('disabled', true);

        request = $.ajax({
            url : `https://celestyal.radar.ms/import.cel_brochure.api?${submittedData}`,
            type: 'POST',

            success: function()
            {
                msg = msgLang;
                $('#result').html(msg).css({'display': 'block', 'color': '#cccc06'});
            },

            error: function (jqXHR, exception)
            {
                var msg = '';

                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status === 403) {
                    msg = 'Invalid API Key.';
                } else if (jqXHR.status === 404) {
                    msg = 'Requested page not found.';
                } else if (jqXHR.status === 500) {
                    msg = 'Internal Server Error.';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                $('#result').html(msg).css('display', 'block');
            }
        });

        $inputs.prop('disabled', false);
    });
});