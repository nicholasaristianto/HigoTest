"use client";

export default function CustomerTable({
  data,
  page,
  limit,
}: {
  data: any[];
  page: number;
  limit: number;
}) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Hour</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital Interest</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location Type</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((c: any, idx: number) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.number}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{c.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{c.nameOfLocation}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.date}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.loginHour}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.gender}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date().getFullYear() - c.age}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.noTelp}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.brandDevice}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.digitalInterest}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{c.locationType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}