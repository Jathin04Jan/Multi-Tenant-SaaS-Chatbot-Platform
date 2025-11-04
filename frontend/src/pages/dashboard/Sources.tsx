import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { sourceSchema, type SourceInput } from '@/lib/zod-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { mockListSources, mockSaveSource, type SourceDTO } from '@/lib/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Edit2 } from 'lucide-react';

const Sources = () => {
  const [sources, setSources] = useState<SourceDTO[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const form = useForm<SourceInput>({
    resolver: zodResolver(sourceSchema),
    defaultValues: { name: '', type: 'upload', config: {} },
    mode: 'onChange',
  });

  const loadSources = async () => {
    const res = await mockListSources();
    setSources(res.data);
  };

  useEffect(() => {
    loadSources();
  }, []);

  const onSubmit = async (values: SourceInput) => {
    try {
      if (editingId) {
        // Update existing source
        const res = await mockSaveSource({ ...values, id: editingId } as any);
        setSources((prev) => prev.map((s) => (s.id === editingId ? res.data : s)));
        toast.success('Source updated successfully!');
        setEditingId(null);
      } else {
        // Create new source
        const res = await mockSaveSource(values as any);
        setSources((prev) => [res.data, ...prev]);
        toast.success('Source created successfully!');
      }
      form.reset({ name: '', type: 'upload', config: {} });
    } catch (error) {
      toast.error('Failed to save source');
    }
  };

  const handleEdit = (source: SourceDTO) => {
    setEditingId(source.id);
    form.reset({
      name: source.name,
      type: source.type,
      config: source.config,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    form.reset({ name: '', type: 'upload', config: {} });
  };

  return (
    <div className="container max-w-5xl px-4 py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Sources</h1>
            <p className="text-muted-foreground">Configure content sources to feed your knowledge base.</p>
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
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Source' : 'Create New Source'}</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Name</FormLabel>
                  <FormControl>
                    <Input className="rounded-xl" placeholder="Marketing site" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="type" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="upload">Upload</SelectItem>
                      <SelectItem value="crawl">Crawl</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="s3">S3</SelectItem>
                      <SelectItem value="gdrive">Google Drive</SelectItem>
                      <SelectItem value="notion">Notion</SelectItem>
                      <SelectItem value="github">GitHub</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField name="config" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Config (JSON)</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={4} 
                    className="rounded-xl" 
                    placeholder='{"includeSitemap":true}' 
                    value={JSON.stringify(field.value || {}, null, 2)}
                    onChange={(e) => {
                      try {
                        field.onChange(JSON.parse(e.target.value || '{}'));
                      } catch {
                        // Invalid JSON, keep as is
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="flex justify-end">
              <Button type="submit" className="rounded-xl">
                {editingId ? 'Update Source' : 'Create Source'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {sources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Existing Sources</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Updated</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources.map((s) => (
                  <tr key={s.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{s.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary" className="capitalize">
                        {s.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={s.status === 'indexed' ? 'default' : s.status === 'error' ? 'destructive' : 'outline'}
                        className="capitalize"
                      >
                        {s.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(s.updatedAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(s)}
                        className="rounded-lg"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
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

export default Sources;


