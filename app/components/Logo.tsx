import { BookOpen, Link  } from "lucide-react";

export default function Logo() {
  return (
    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
      <BookOpen  className="w-7 h-7" />
      StudyBuddy
    </h1>
  );
}
