import LoadingPage from "@/pages/LoadingPage";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

interface Pages {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (props: unknown) => Promise<any>;
}

const ROUTES: Pages = import.meta.glob("/src/pages/**/[a-z[]*.tsx");

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|\/index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  const Element = lazy(() => ROUTES[route]({}));

  return { path, Element };
});

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {routes.map(({ path, Element }) => {
            return <Route key={path} path={path} element={<Element />} />;
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
