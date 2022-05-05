export default {
  repos: {
    route: '/',
    props: {
      maxwidth: 500,
      padding: 20
    },
    exact: true
  },
  tracks: {
    route: '/tracks',
    exact: true
  },
  trackDetails: {
    route: '/tracks/:trackId',
    exact: true
  }
};
