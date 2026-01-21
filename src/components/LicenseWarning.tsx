import { AlertTriangle, Shield, X } from "lucide-react";
import { Button } from "./ui/button";

interface LicenseWarningProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export function LicenseWarning({ isOpen, onClose, onProceed }: LicenseWarningProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-2xl p-6 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Copyright Notice
          </h2>
        </div>

        <p className="text-muted-foreground mb-4">
          This video may be protected by copyright. Please ensure you have the right to download this content before proceeding.
        </p>

        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Permitted uses:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Creative Commons licensed content</li>
                <li>Your own uploaded videos</li>
                <li>Content you have permission to use</li>
                <li>Educational fair use (varies by region)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="gradient" className="flex-1" onClick={onProceed}>
            I Have Rights
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          By proceeding, you confirm you have the right to download this content
        </p>
      </div>
    </div>
  );
}
