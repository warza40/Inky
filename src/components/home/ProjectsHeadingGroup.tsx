/** Figma 133:1786 — handwritten work section callout; arrow from the sentence end. */
export function ProjectsHeadingGroup() {
  return (
    <h2 className="projects-heading-group">
      <span className="projects-heading-group__lead">Projects I&apos;ve </span>
      <span className="projects-heading-group__end">
        worked on
        <img
          src="/icons/curly-arrow.svg"
          alt=""
          aria-hidden
          width={147}
          height={98}
          className="projects-heading-group__arrow"
          draggable={false}
        />
      </span>
    </h2>
  );
}
