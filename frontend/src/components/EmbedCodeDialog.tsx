import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useWizardStore } from '@/store/wizard';
import { toast } from 'sonner';

interface EmbedCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EmbedCodeDialog = ({ open, onOpenChange }: EmbedCodeDialogProps) => {
  const { tenantId, branding } = useWizardStore();
  const [copied, setCopied] = useState(false);

  const embedCode = `<script>
(function(){
  const s=document.createElement('script');
  s.src="https://cdn.yourbot.com/widget.js";
  s.onload=()=>window.YourBot.init({
    tenantId:"${tenantId || 'TENANT_ID'}",
    apiBase:"https://api.yourbot.com",
    theme:{
      primary:"${branding.primaryColor}",
      logoUrl:"/brand.png"
    },
    identify:{ userId:null, jwt:null }
  });
  document.head.appendChild(s);
})();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="!max-w-2xl glass rounded-2xl max-h-[90vh] !flex !flex-col !w-[calc(100vw-2rem)] sm:!w-full" 
        style={{ 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">Embed Code</DialogTitle>
          <DialogDescription>
            Add this snippet to your website to deploy your chatbot
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4 min-h-0 pr-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Installation Code</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="rounded-xl"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-muted/50 overflow-x-auto overflow-y-auto text-sm border border-border/50" style={{ maxHeight: '300px' }}>
              <code>{embedCode}</code>
            </pre>
          </div>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-sm flex-shrink-0">
            <strong>Installation:</strong> Paste this code before the closing{' '}
            <code className="px-1 py-0.5 bg-muted rounded">&lt;/body&gt;</code> tag 
            of your website.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

