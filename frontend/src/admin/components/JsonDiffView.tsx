interface JsonDiffViewProps {
  left: unknown;
  right: unknown;
}

const JsonBox = ({ value }: { value: unknown }) => (
  <pre className="p-3 text-xs border rounded-xl overflow-auto bg-muted/40" style={{ maxHeight: 300 }}>
    {JSON.stringify(value, null, 2)}
  </pre>
);

const JsonDiffView = ({ left, right }: JsonDiffViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="text-xs text-muted-foreground mb-1">Previous</div>
        <JsonBox value={left} />
      </div>
      <div>
        <div className="text-xs text-muted-foreground mb-1">Current</div>
        <JsonBox value={right} />
      </div>
    </div>
  );
};

export default JsonDiffView;

