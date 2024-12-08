import { Badge } from "@/components/ui/badge";

interface TagsContainerProps {
  tags?: string[];
}

export default function TagsContainer({ tags }: TagsContainerProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary">
          {tag}
        </Badge>
      ))}
    </div>
  );
}