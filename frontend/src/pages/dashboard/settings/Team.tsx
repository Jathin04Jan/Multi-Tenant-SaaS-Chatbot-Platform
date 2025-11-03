import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'John Doe', email: 'john@example.com', role: 'Owner' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' },
];

const Team = () => {
  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">Team</h1>
          <p className="text-muted-foreground">Manage team members and permissions</p>
        </div>
        <Button className="rounded-xl">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Email</th>
                <th className="text-left py-3 px-4 font-medium">Role</th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.email} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {member.email}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">{member.role}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Team;
