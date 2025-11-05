import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { mockListJobs, type JobDTO } from '@/lib/api';

const Jobs = () => {
  const [jobs, setJobs] = useState<JobDTO[]>([]);
  useEffect(() => { mockListJobs().then((r) => setJobs(r.data)); }, []);

  return (
    <div className="container max-w-5xl px-4 py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold mb-2">Jobs</h1>
        <p className="text-muted-foreground">Ingestion, embedding and sync jobs.</p>
      </motion.div>

      <div className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">ID</th>
                <th className="text-left py-3 px-4 font-medium">Type</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
                <th className="text-left py-3 px-4 font-medium">Started</th>
                <th className="text-left py-3 px-4 font-medium">Finished</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} className="border-b border-border/50">
                  <td className="py-3 px-4 text-sm">{j.id}</td>
                  <td className="py-3 px-4 text-sm capitalize">{j.type}</td>
                  <td className="py-3 px-4 text-sm">{j.status}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{new Date(j.startedAt).toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{j.finishedAt ? new Date(j.finishedAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;


