import { useRef, useState, type ChangeEvent } from "react";
import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import pageDocument from "../content/page.json";
import { pageConfig } from "../puck/config";

function isPageDocument(value: unknown): value is Data {
  return (
    typeof value === "object" &&
    value !== null &&
    "content" in value &&
    Array.isArray(value.content) &&
    "root" in value
  );
}

export default function EditorPage() {
  const sourceData = pageDocument as Data;
  const [editorData, setEditorData] = useState<Data>(sourceData);
  const [editorKey, setEditorKey] = useState(0);
  const [status, setStatus] = useState("Edit the page, then select Save to project.");
  const draftRef = useRef<Data>(sourceData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveToProject = async (data: Data) => {
    setStatus("Saving page.json...");
    const response = await fetch("/__save-page", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result: unknown = await response.json();
    if (!response.ok) {
      throw new Error(
        typeof result === "object" && result !== null && "error" in result
          ? String(result.error)
          : "Unable to save page",
      );
    }
    draftRef.current = data;
    setStatus("Saved to src/content/page.json. Review the file before committing.");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(draftRef.current, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "page-backup.json";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Backup exported.");
  };

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isPageDocument(parsed)) throw new Error("The selected file is not a valid page document.");
      draftRef.current = parsed;
      setEditorData(parsed);
      setEditorKey((current) => current + 1);
      setStatus("Backup imported. Select Save to project to make it canonical.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to import backup.");
    } finally {
      event.target.value = "";
    }
  };

  const resetEditor = () => {
    draftRef.current = sourceData;
    setEditorData(sourceData);
    setEditorKey((current) => current + 1);
    setStatus("Editor reset to the current tracked page document.");
  };

  return (
    <div className="visual-editor-shell">
      <div className="visual-editor-toolbar">
        <a href="/">View page</a>
        <span aria-live="polite">{status}</span>
        <div>
          <button type="button" onClick={exportJson}>
            Export backup
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            Import backup
          </button>
          <button type="button" onClick={resetEditor}>
            Reset
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={importJson}
            hidden
          />
        </div>
      </div>
      <Puck
        key={editorKey}
        config={pageConfig}
        data={editorData}
        onChange={(data) => {
          draftRef.current = data;
        }}
        onPublish={saveToProject}
        headerTitle="Landing page editor"
        headerPath="Local source editor"
        height="calc(100dvh - 52px)"
        permissions={{ delete: false }}
        viewports={[
          { width: 390, height: 844, label: "Phone", icon: "Smartphone" },
          { width: 768, height: 1024, label: "Tablet", icon: "Tablet" },
          { width: 1440, height: 1000, label: "Desktop", icon: "Monitor" },
          { width: "100%", height: "auto", label: "Fluid", icon: "Monitor" },
        ]}
      />
    </div>
  );
}
