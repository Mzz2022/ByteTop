export const MetricCard: React.FC<{
  title: string;
  subtitle1: string;
  data1?: number;
  unit1: string;
  subtitle2: string;
  data2?: number;
  unit2: string;
}> = ({ title, subtitle1, data1, unit1, subtitle2, data2, unit2 }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-4">{title}</h3>
      <div className="space-y-4">
        <MetricItem label={subtitle1} value={data1} unit={unit1} />
        <MetricItem label={subtitle2} value={data2} unit={unit2} />
      </div>
    </div>
  );
};

const MetricItem = ({
  label,
  value = 0,
  unit,
}: {
  label: string;
  value?: number;
  unit: string;
}) => (
  <div>
    <div className="text-sm font-medium text-gray-500">{label}</div>
    <div className="text-xl font-semibold text-gray-900">
      {value?.toFixed(unit === "s" ? 2 : 0)}
      {unit}
    </div>
  </div>
);
