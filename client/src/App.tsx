import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
import VideosCreate from "pages/videos/VideosCreate";
import VideosShow from "pages/videos/VideosShow";
import VideosEdit from "pages/videos/VideosEdit";

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider(`${process.env.REACT_APP_API_URL}/videos`)}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "videos",
              edit: VideosEdit,
              show: VideosShow,
              create: VideosCreate,
              canDelete: true,
            },
          ]}
          routerProvider={routerProvider}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
