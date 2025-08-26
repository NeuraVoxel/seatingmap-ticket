function notifyParent(messageType, data) {
  parent.postMessage(JSON.stringify({ type: messageType, data: data }), "*");
}

function renderChart(
  config,
  apiUrl,
  publicApiUrl,
  dataCollectorUrl,
  localSettings
) {
  var parsedConfig = new seatsio.ConfigParser().parse(config);

  var chartCreated = _.partial(notifyParent, "chartCreated");
  var chartUpdated = _.partial(notifyParent, "chartUpdated");
  var chartPublished = _.partial(notifyParent, "chartPublished");
  var chartRendered = _.partial(notifyParent, "seatsioRendered");
  var designerRenderingFailed = _.partial(
    notifyParent,
    "designerRenderingFailed"
  );
  var statusChanged = _.partial(notifyParent, "statusChanged");
  var onExitRequested = parsedConfig.showExitButton
    ? _.partial(notifyParent, "exitRequested")
    : null;
  var onLocalSettingChanged = _.partial(notifyParent, "localSettingChanged");
  var workspaceKey = parsedConfig.workspaceKey || parsedConfig.publicKey;

  var chartDesigner = new seatsio.ChartDesigner(
    "drawing",
    parsedConfig.chartKey,
    parsedConfig.openDraftDrawing,
    parsedConfig.secretKey,
    parsedConfig.designerKey,
    workspaceKey,
    apiUrl,
    publicApiUrl,
    dataCollectorUrl,
    parsedConfig.baseColor,
    parsedConfig.features,
    parsedConfig.language,
    parsedConfig.mode,
    parsedConfig.safeModeOptions,
    chartCreated,
    chartUpdated,
    chartPublished,
    statusChanged,
    onExitRequested,
    onLocalSettingChanged,
    parsedConfig.openLatestDrawing,
    localSettings,
    parsedConfig.canvasColorScheme,
    parsedConfig.isWebapp,
    parsedConfig.enable3d
  );
  
  

  chartDesigner
    .render();
    // .then(chartRendered)
    // .fail(showRenderingError)
    // .fail(designerRenderingFailed);
    window.chartDesigner = chartDesigner;
  return chartDesigner;
}

function initChartDesignerIframe(apiUrl, publicApiUrl, dataCollectorUrl) {
  const iframeOrigin = new URLSearchParams(window.location.search).get(
    "origin"
  );
  window.addEventListener("message", function (message) {
    if (iframeOrigin && message.origin !== iframeOrigin) {
      throw new Error(
        `Message origin ${message.origin} does not match iFrame origin ${iframeOrigin}`
      );
    }
if(message.data === "{\"type\":\"seatsioLoaded\"}"){
  const messageData =
      '{"type":"render","configuration":{"v2":true,"divId":"chart","publicKey":"publicDemoKey","chartKey":"demoChartSmallTheatre","loading":"<div id=\\"designerLoader\\"></div>","showExitButton":true},"apiUrl":"https://api-eu.seatsio.net","publicApiUrl":"https://cdn-eu.seatsio.net","dataCollectorUrl":"https://data.seatsio.net","localSettings":{"v2.firstTimeTutorialDone":true,"v2.timesSeenToolPickerTooltips":3,"snapToGridEnabled":true,"labelsShown":true}}';
    var data = JSON.parse(messageData);
    if (data.type === "render") {
      window.chart = renderChart(
        data.configuration,
        apiUrl,
        publicApiUrl,
        dataCollectorUrl,
        data.localSettings
      );
    } else if (data.type === "clipboardUpdated") {
      window.chart.clipboardUpdated(data.clipboard);
    }
}

    
  });

  notifyParent("seatsioLoaded");
}
