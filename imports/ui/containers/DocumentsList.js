import { Meteor } from 'meteor/meteor';
import Documents from '../../api/documents/documents.js';
import DocumentsList from '../components/DocumentsList.js';

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
function reactiveMapper(params, onData) {
  if (Meteor.subscribe('documents.list').ready()) {
    const documents = Documents.find().fetch();
    onData(null, { documents });
  };
}

export default myReactCompose(getTrackerLoader(reactiveMapper))(DocumentsList);

