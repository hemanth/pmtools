'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import ReactMarkdown from 'react-markdown'
import { Copy, Check, Edit2, Save } from 'lucide-react'
import { useState } from 'react'

interface MarkdownDisplayProps {
  content: string
  onEpicClick?: (epic: string) => void
  onEdit?: (newContent: string) => void
}

export function MarkdownDisplay({ content, onEpicClick, onEdit }: MarkdownDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(content)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    onEdit?.(editedContent)
    setIsEditing(false)
  }

  return (
    <Card className="relative p-6">
      <div className="absolute right-4 top-4 flex gap-2">
        {onEdit && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <Save className="h-4 w-4" />
            ) : (
              <Edit2 className="h-4 w-4" />
            )}
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="pr-24">
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[300px] font-mono text-sm"
          />
        ) : (
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold">{children}</h1>
                  {onEpicClick && (
                    <Button onClick={() => onEpicClick(content)}>
                      Generate Stories
                    </Button>
                  )}
                </div>
              ),
              h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-4">{children}</h2>,
              p: ({ children }) => <p className="mb-4 whitespace-pre-wrap">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </Card>
  )
}

