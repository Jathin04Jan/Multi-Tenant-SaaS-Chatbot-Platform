import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Globe, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWizardStore } from '@/store/wizard';
import { mockUploadFile, mockStartCrawl } from '@/lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Data = () => {
  const navigate = useNavigate();
  const { dataSources, addDataSource, removeDataSource, completeStep } = useWizardStore();
  const [crawlUrl, setCrawlUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCrawling, setIsCrawling] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    setIsUploading(true);

    for (const file of Array.from(files)) {
      try {
        const response = await mockUploadFile(file);
        addDataSource({
          id: response.data.fileId,
          name: file.name,
          type: 'upload',
          status: 'indexed',
          size: file.size,
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    setIsUploading(false);
    toast.success('Files uploaded successfully!');
  };

  const handleStartCrawl = async () => {
    if (!crawlUrl) return;
    setIsCrawling(true);

    try {
      const response = await mockStartCrawl(crawlUrl);
      addDataSource({
        id: response.data.crawlId,
        name: crawlUrl,
        type: 'crawl',
        status: 'processing',
        updatedAt: new Date().toISOString(),
      });
      toast.success('Crawl started!');
      setCrawlUrl('');
    } catch (error) {
      toast.error('Failed to start crawl');
    } finally {
      setIsCrawling(false);
    }
  };

  const handleContinue = () => {
    if (dataSources.length === 0) {
      toast.error('Please add at least one data source');
      return;
    }
    completeStep(2);
    navigate('/dashboard/onboarding/progress');
  };

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Add Training Data</h1>
        <p className="text-muted-foreground">
          Upload documents or crawl your website to train your chatbot
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Upload Documents</h2>
          </div>

          <label className="glass-card p-8 border-2 border-dashed cursor-pointer hover:border-primary transition-colors flex flex-col items-center justify-center min-h-[200px]">
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              disabled={isUploading}
            />
            <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
            <p className="font-medium mb-1">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-muted-foreground">
              PDF, DOC, DOCX, TXT up to 50MB
            </p>
          </label>

          <div className="mt-4 p-3 bg-muted/50 rounded-xl text-sm text-muted-foreground">
            <strong>Trial limit:</strong> 50MB total uploads
          </div>
        </motion.div>

        {/* Crawl Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-xl font-semibold">Website Crawl</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">
                Website URL
              </label>
              <Input
                type="url"
                placeholder="https://yoursite.com"
                value={crawlUrl}
                onChange={(e) => setCrawlUrl(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <Button
              onClick={handleStartCrawl}
              disabled={!crawlUrl || isCrawling}
              className="w-full rounded-xl"
            >
              {isCrawling ? 'Starting...' : 'Start Crawl'}
            </Button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>• Respects robots.txt</p>
            <p>• Max depth: 3 levels</p>
            <p>• Frequency: One-time</p>
          </div>
        </motion.div>
      </div>

      {/* Sources Table */}
      {dataSources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Data Sources</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Source</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Updated</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map((source) => (
                  <tr key={source.id} className="border-b border-border/50">
                    <td className="py-3 px-4 text-sm">{source.name}</td>
                    <td className="py-3 px-4 text-sm capitalize">{source.type}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={source.status === 'indexed' ? 'default' : 'secondary'}
                      >
                        {source.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {dayjs(source.updatedAt).fromNow()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-destructive"
                          onClick={() => removeDataSource(source.id)}
                        >
                          <Trash2 className="h-4 w-4" />
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

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/dashboard/onboarding/brand')}
          className="rounded-xl glass"
        >
          Back
        </Button>
        <Button onClick={handleContinue} className="rounded-xl">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Data;
