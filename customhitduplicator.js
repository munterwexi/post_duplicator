function() {
  // Replace newTrackingId value with the UA property to which you want to duplicate this tag
  var newTrackingId = 'UA-800187-16';  
  var globalSendTaskName = '_' + newTrackingId + '_originalSendTask';
  return function(customModel) {
    window[globalSendTaskName] = window[globalSendTaskName] || customModel.get('sendHitTask');
    customModel.set('sendHitTask', function(sendModel) {
      var hitPayload = sendModel.get('hitPayload');
      var trackingId = new RegExp(sendModel.get('trackingId'), 'gi');
      window[globalSendTaskName](sendModel);
      sendModel.set('hitPayload', hitPayload.replace(trackingId, newTrackingId), true);
      window[globalSendTaskName](sendModel);
    });
  };
}
