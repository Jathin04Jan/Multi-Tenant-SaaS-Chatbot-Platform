import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props<T extends Record<string, any>> = {
  data: T[];
  dataKey: keyof T;
  xKey?: keyof T;
  height?: number;
};

const TrendSparkline = <T extends Record<string, any>>({ data, dataKey, xKey, height = 72 }: Props<T>) => {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
          {xKey ? <XAxis dataKey={xKey as string} hide /> : null}
          <YAxis hide />
          <Tooltip cursor={{ opacity: 0.2 }} />
          <Area type="monotone" dataKey={dataKey as string} stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendSparkline;

