import ReactGA from "react-ga";

class AnalyticsInternal {
  constructor() {
    ReactGA.initialize("UA-154334049-2");
  }

  logPageView(url) {
    ReactGA.pageview(url);
  }
}

export const Analytics = new AnalyticsInternal();
