import { Meteor } from 'meteor/meteor';
import AppNavigation from '../components/AppNavigation.js';

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
  onData(null, { hasUser: Meteor.user() })
}

export default myReactCompose(getTrackerLoader(reactiveMapper))(AppNavigation);
