type JournalSectionHeaderProps = {
  num: string;
  title: string;
};

export function JournalSectionHeader({
  num,
  title,
}: JournalSectionHeaderProps) {
  return (
    <div className="jl-s-header">
      <span className="jl-s-num">{num}</span>
      <h2 className="jl-s-title">{title}</h2>
      <div className="jl-s-rule" aria-hidden />
    </div>
  );
}
