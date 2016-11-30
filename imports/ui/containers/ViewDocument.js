import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents.js';
import ViewDocument from '../pages/ViewDocument.js';

import myReactCompose from '../../modules/composer.js';

function getTrackerLoader(reactiveMapper) {
  return (props, onData, env) => {
    let trackerCleanup = null;
    const handler = Tracker.nonreactive(() => {
      return Tracker.autorun(() => {
        // assign the custom clean-up function.
        trackerCleanup = reactiveMapper(props, onData, env);
      });
    });

    return () => {
      if(typeof trackerCleanup === 'function') trackerCleanup();
      return handler.stop();
    };
  };
}

// usage
function reactiveMapper({ params }, onData) {
  if (Meteor.subscribe('documents.view', params._id).ready()) {
    const doc = Documents.findOne();
    onData(null, { doc });
  };
}

export default myReactCompose(getTrackerLoader(reactiveMapper))(ViewDocument);
