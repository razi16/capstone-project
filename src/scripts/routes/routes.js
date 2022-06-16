import PlayNow from '../views/pages/play-now';
import Scores from '../views/pages/scores';
import AboutUs from '../views/pages/about-us';

const routes = {
  '/': PlayNow, // default page
  '/play-now': PlayNow,
  '/scores': Scores,
  '/about-us': AboutUs,
};

export default routes;
