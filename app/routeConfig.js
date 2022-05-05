import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
import ItunesContainer from '@containers/ItunesContainer/Loadable';
export const routeConfig = {
  repos: {
    component: HomeContainer,
    ...routeConstants.repos
  },
  tracks: {
    component: ItunesContainer,
    ...routeConstants.tracks
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
