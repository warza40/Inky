/** Handwritten work-section callout; arrow sits at the end of the label. */
export function ProjectsHeadingGroup() {
  return (
    <h2 className="projects-heading-group">
      <span className="projects-heading-group__end">
        <span className="projects-heading-group__label">My Work</span>
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
