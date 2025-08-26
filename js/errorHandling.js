function renderingErrorMessage() {
    if(chart) {
        return chart.messages.d('renderingFailed');
    }
    return 'The seating chart designer could not be loaded.';
}

function renderError() {
    var renderingError = document.querySelector('#renderingError');
    renderingError.style.display = 'flex';
    renderingError.style.height = '100%';
    renderingError.querySelector('.message').innerText = renderingErrorMessage();
}

function hideAllDivsExceptError() {
    document.querySelector('#chart').style.display = 'none';
    document.querySelector('#chartDesignerWrapper').style.display = 'none';
    document.querySelector('#designerApp').style.display = 'none';
}

function showRenderingError() {
    document.querySelector('html').style.height = '100%';
    document.querySelector('body').style.display = 'block';
    document.querySelector('body').style.height = '100%';
    hideAllDivsExceptError();
    renderError();
}
