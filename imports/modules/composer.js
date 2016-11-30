import { setDefaults } from 'react-komposer';

import Loading from '../ui/components/Loading.js';

export default myReactCompose = setDefaults({
  pure: true,
  propsToWatch: [],
  loadingHandler: Loading
});
