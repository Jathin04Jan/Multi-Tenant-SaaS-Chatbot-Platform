import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { mockInviteTeam, mockListTeam, mockRemoveMember, mockUpdateRole, type TeamMemberDTO } from '@/lib/api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const Team = () => {
  const [team, setTeam] = useState<TeamMemberDTO[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMemberDTO['role']>('member');

  useEffect(() => { mockListTeam().then(r => setTeam(r.data)); }, []);

  const invite = async () => {
    if (!email.trim() || !name.trim()) return;
    const res = await mockInviteTeam(name, email, role);
    setTeam((t)=>[...t, res.data]);
    setName(''); setEmail(''); setRole('member');
  };

  const updateRole = async (id: string, newRole: TeamMemberDTO['role']) => {
    const res = await mockUpdateRole(id, newRole);
    setTeam((t) => t.map(m => m.id === id ? res.data : m));
  };

  const remove = async (id: string) => {
    await mockRemoveMember(id);
    setTeam((t) => t.filter(m => m.id !== id));
  };
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
        <Button className="rounded-xl" onClick={invite}>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-6 space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-3">
          <Input placeholder="Name" className="rounded-xl" value={name} onChange={(e)=>setName(e.target.value)} />
          <Input placeholder="Email" className="rounded-xl" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <Select onValueChange={(v)=>setRole(v as any)} defaultValue={role}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
              {team.map((member) => (
                <tr key={member.id} className="border-b border-border/50">
                  <td className="py-3 px-4 font-medium">{member.name}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{member.email}</td>
                  <td className="py-3 px-4">
                    <Select onValueChange={(v)=>updateRole(member.id, v as any)} defaultValue={member.role}>
                      <SelectTrigger className="rounded-xl w-[140px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(member.id)}>
                      Remove
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
