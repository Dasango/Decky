import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Edit3 } from "lucide-react";

interface DeckActionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  deckName: string;
  onStudy: () => void;
  onEdit: () => void;
}

export function DeckActionPopup({ isOpen, onClose, deckName, onStudy, onEdit }: DeckActionPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">{deckName}</DialogTitle>
          <DialogDescription className="text-slate-500">
            What would you like to do with this deck today?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button 
            onClick={onStudy}
            className="flex flex-col h-32 gap-3 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl transition-all hover:scale-[1.02]"
          >
            <BookOpen className="h-8 w-8" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg">Study</span>
              <span className="text-xs text-slate-400">Review cards</span>
            </div>
          </Button>
          <Button 
            onClick={onEdit}
            variant="outline"
            className="flex flex-col h-32 gap-3 border-slate-200 hover:bg-slate-50 rounded-2xl transition-all hover:scale-[1.02]"
          >
            <Edit3 className="h-8 w-8 text-slate-600" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-lg text-slate-900">Edit</span>
              <span className="text-xs text-slate-500">Manage cards</span>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
