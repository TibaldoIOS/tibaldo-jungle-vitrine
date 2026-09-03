/** Customer-facing label; callers provide their canonical list count. */
export default function VarietyCount({ count }: { count: number }) {
  return <>{count > 0 ? `${count} ${count === 1 ? "variété" : "variétés"}` : "Découvrir"}</>;
}
