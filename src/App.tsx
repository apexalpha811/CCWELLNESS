import { createElement, lazy, Suspense, type ComponentType } from "react";
import pageDocument from "./content/page.json";
import { pageConfig } from "./puck/config";

const EditorPage = import.meta.env.DEV ? lazy(() => import("./editor/EditorPage")) : null;

type PageBlock = {
  type: keyof typeof pageConfig.components;
  props: Record<string, unknown> & { id: string };
};

function PublishedPage() {
  const blocks = pageDocument.content as unknown as PageBlock[];

  return (
    <main className="site-main">
      {blocks.map((block) => {
        const component = pageConfig.components[block.type].render as unknown as ComponentType<
          Record<string, unknown>
        >;
        return createElement(component, { ...block.props, key: block.props.id });
      })}
    </main>
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
