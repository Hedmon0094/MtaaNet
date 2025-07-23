
"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReasoningDisplayProps {
    reasoning: string;
}

const ICONS = {
    "📍": <Lightbulb className="h-6 w-6 text-blue-500" />,
    "🔍": <AlertTriangle className="h-6 w-6 text-yellow-500" />,
    "✅": <CheckCircle className="h-6 w-6 text-green-500" />
};

export function ReasoningDisplay({ reasoning }: ReasoningDisplayProps) {
    if (!reasoning) return null;

    const sections = reasoning.split(/(?=📍|🔍|✅)/).map(s => s.trim()).filter(Boolean);

    const parseSection = (sectionText: string) => {
        const iconMatch = sectionText.match(/^(📍|🔍|✅)/);
        const icon = iconMatch ? iconMatch[0] as keyof typeof ICONS : null;
        
        const lines = sectionText.substring(icon ? 2 : 0).trim().split('\n');
        const title = lines[0] || "";
        const contentLines = lines.slice(1);

        const parsedContent = contentLines.map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('* **')) { // Main bullet point with bold text
                const text = trimmedLine.replace(/\* \*\*(.*?)\*\*/, '$1');
                return <p key={index} className="font-bold mt-3 text-card-foreground">{text}</p>;
            } else if (trimmedLine.startsWith('*')) { // Sub-bullet or regular bullet
                 const isSubBullet = line.startsWith('    *');
                 const text = trimmedLine.substring(1).trim();
                 if (text.startsWith('**Reason**:')) {
                     return <p key={index} className="text-sm ml-4"><span className="font-semibold text-primary/90">Reason:</span> {text.replace('**Reason**:', '').trim()}</p>
                 }
                 if (text.startsWith('**Benefit**:')) {
                    return <p key={index} className="text-sm ml-4"><span className="font-semibold text-primary/90">Benefit:</span> {text.replace('**Benefit**:', '').trim()}</p>
                }
                return <li key={index} className={`text-sm list-disc list-inside ${isSubBullet ? 'ml-4' : ''}`}>{text}</li>;
            }
            return <p key={index} className="text-sm">{line}</p>;
        });

        return { icon, title, content: parsedContent };
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Analysis Report</CardTitle>
                <CardDescription>The AI's justification for its suggestions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {sections.map((section, index) => {
                    const { icon, title, content } = parseSection(section);
                    return (
                        <div key={index} className="p-4 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3 mb-2">
                                {icon && ICONS[icon]}
                                <h4 className="font-semibold text-lg font-headline">{title}</h4>
                            </div>
                            <div className="prose prose-sm max-w-none text-muted-foreground space-y-1 pl-2">
                                {content}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
