import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { agentSchema, type AgentInput } from '@/lib/zod-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { mockListAgents, mockSaveAgent, type AgentDTO } from '@/lib/api';
import { toast } from 'sonner';
import { Edit2, Plus } from 'lucide-react';

const Agents = () => {
  const [agents, setAgents] = useState<AgentDTO[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const form = useForm<AgentInput>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: '',
      provider: 'openai',
      model: 'gpt-4o-mini',
      temperature: 0.5,
      systemPrompt: '',
      routing: 'direct',
    },
    mode: 'onChange',
  });

  const loadAgents = async () => {
    const res = await mockListAgents();
    setAgents(res.data);
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const onSubmit = async (values: AgentInput) => {
    const agentData: Omit<AgentDTO, 'id'> & { id?: string } = {
      name: values.name,
      provider: values.provider,
      model: values.model,
      temperature: values.temperature,
      systemPrompt: values.systemPrompt,
      routing: values.routing,
    };
    
    if (editingId) {
      // Update existing agent
      const res = await mockSaveAgent({ ...agentData, id: editingId });
      setAgents((prev) => prev.map((a) => (a.id === editingId ? res.data : a)));
      toast.success('Agent updated successfully!');
      setEditingId(null);
    } else {
      // Create new agent
      const res = await mockSaveAgent(agentData);
      setAgents((prev) => [res.data, ...prev]);
      toast.success('Agent created successfully!');
    }
    form.reset({
      name: '',
      provider: 'openai',
      model: 'gpt-4o-mini',
      temperature: 0.5,
      systemPrompt: '',
      routing: 'direct',
    });
  };

  const handleEdit = (agent: AgentDTO) => {
    setEditingId(agent.id);
    form.reset({
      name: agent.name,
      provider: agent.provider as any,
      model: agent.model,
      temperature: agent.temperature ?? 0.5,
      systemPrompt: agent.systemPrompt ?? '',
      routing: (agent.routing ?? 'direct') as any,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({
      name: '',
      provider: 'openai',
      model: 'gpt-4o-mini',
      temperature: 0.5,
      systemPrompt: '',
      routing: 'direct',
    });
  };

  return (
    <div className="container max-w-5xl px-4 py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Agent Configuration</h1>
            <p className="text-muted-foreground">Model, provider, temperature, prompt and routing.</p>
          </div>
          {editingId && (
            <Button variant="outline" onClick={handleCancel} className="rounded-xl">
              Cancel
            </Button>
          )}
        </div>
      </motion.div>

      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-4 h-4" />
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Agent' : 'Create New Agent'}</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField name="name" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input className="rounded-xl" placeholder="Support Assistant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="provider" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Provider</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="azure_openai">Azure OpenAI</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="model" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl" placeholder="gpt-4o-mini" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="temperature" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature (0-1)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min={0} max={1} className="rounded-xl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="routing" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Routing</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="retrieval">Retrieval</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField name="systemPrompt" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>System Prompt</FormLabel>
                <FormControl>
                  <Textarea rows={5} className="rounded-xl" placeholder="You are a helpful assistant..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex justify-end">
              <Button type="submit" className="rounded-xl">
                {editingId ? 'Update Agent' : 'Create Agent'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {agents.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold">Existing Agents</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Provider</th>
                  <th className="text-left py-3 px-4 font-medium">Model</th>
                  <th className="text-left py-3 px-4 font-medium">Temperature</th>
                  <th className="text-left py-3 px-4 font-medium">Routing</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{agent.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="capitalize">
                        {agent.provider}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{agent.model}</td>
                    <td className="py-3 px-4 text-sm">{agent.temperature ?? 0.5}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="capitalize">
                        {agent.routing ?? 'direct'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(agent)}
                          className="rounded-lg"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Agents;


