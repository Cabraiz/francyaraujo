import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles.markdown}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: remark-html generates this HTML from local Markdown with raw HTML disabled.
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
