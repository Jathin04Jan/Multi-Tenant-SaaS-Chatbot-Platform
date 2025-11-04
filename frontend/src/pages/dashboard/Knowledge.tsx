import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockListDocuments, mockSaveDocument, type DocumentDTO } from '@/lib/api';
import { toast } from 'sonner';
import { Plus, Edit2 } from 'lucide-react';

const Knowledge = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [docs, setDocs] = useState<DocumentDTO[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadDocuments = async () => {
    const res = await mockListDocuments();
    setDocs(res.data);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const save = async () => {
    if (!title.trim()) return;
    try {
      if (editingId) {
        // Update existing document
        const res = await mockSaveDocument({ id: editingId, title, sourceId: null } as any);
        setDocs((d) => d.map((doc) => (doc.id === editingId ? res.data : doc)));
        toast.success('Document updated successfully!');
        setEditingId(null);
      } else {
        // Create new document
        const res = await mockSaveDocument({ title, sourceId: null } as any);
        setDocs((d) => [res.data, ...d]);
        toast.success('Document created successfully!');
      }
      setTitle('');
      setNotes('');
    } catch (error) {
      toast.error('Failed to save document');
    }
  };

  const handleEdit = (doc: DocumentDTO) => {
    setEditingId(doc.id);
    setTitle(doc.title);
    setNotes('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle('');
    setNotes('');
  };

  return (
    <div className="container max-w-5xl px-4 py-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Knowledge</h1>
            <p className="text-muted-foreground">Add document metadata while uploads process in Data.</p>
          </div>
          {editingId && (
            <Button variant="outline" onClick={handleCancel} className="rounded-xl">
              Cancel
            </Button>
          )}
        </div>
      </motion.div>

      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Plus className="w-4 h-4" />
          <h2 className="text-lg font-semibold">{editingId ? 'Edit Document' : 'Create New Document'}</h2>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <Input 
            className="rounded-xl" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Return policy" 
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Notes (optional)</label>
          <Textarea 
            rows={3} 
            className="rounded-xl" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Source, version, tags..." 
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={save} className="rounded-xl" disabled={!title.trim()}>
            {editingId ? 'Update Document' : 'Create Document'}
          </Button>
        </div>
      </div>

      {docs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Existing Documents</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((d) => (
                  <tr key={d.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{d.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant={d.status === 'indexed' ? 'default' : d.status === 'error' ? 'destructive' : 'outline'}
                        className="capitalize"
                      >
                        {d.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(d.createdAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(d)}
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

export default Knowledge;


