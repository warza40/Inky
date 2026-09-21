/** Figma 133:1786 — handwritten work section callout above case study cards. */
export function ProjectsHeadingGroup() {
  return (
    <div className="projects-heading-group">
      <h2 className="projects-heading-group__title">
        Projects I&apos;ve worked on
      </h2>
      <img
        src="/icons/curly-arrow.svg"
        alt=""
        aria-hidden
        width={147}
        height={98}
        className="projects-heading-group__arrow"
        draggable={false}
      />
    </div>
  );
}
