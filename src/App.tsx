import {
  createElement,
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
} from "react";
import pageDocument from "./content/page.json";
import { pageConfig } from "./puck/config";

const EditorPage = import.meta.env.DEV ? lazy(() => import("./editor/EditorPage")) : null;
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 520);
    updateVisibility();

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateVisibility();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      href="#top"
      aria-label="Back to the beginning of the page"
    >
      <span>Back to top</span>
      <span aria-hidden="true">↑</span>
    </a>
  );
}

type PageBlock = {
  type: keyof typeof pageConfig.components;
  props: Record<string, unknown> & { id: string };
};

function PublishedPage() {
  const blocks = pageDocument.content as unknown as PageBlock[];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main className="site-main" id="main">
        {blocks.map((block) => {
          const component = pageConfig.components[block.type].render as unknown as ComponentType<
            Record<string, unknown>
          >;
          return createElement(component, { ...block.props, key: block.props.id });
        })}
        <BackToTop />
      </main>
    </>
  );
}

export default function App() {
  const wantsEditor = window.location.pathname.replace(/\/$/, "") === "/edit";

  if (wantsEditor && EditorPage) {
    return (
      <Suspense fallback={<div className="editor-loading">Loading visual editor</div>}>
        <EditorPage />
      </Suspense>
    );
  }

  if (wantsEditor) {
    window.history.replaceState({}, "", "/");
  }

  return <PublishedPage />;
}
