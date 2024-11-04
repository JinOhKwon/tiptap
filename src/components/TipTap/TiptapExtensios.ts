import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import Blockquote from '@tiptap/extension-blockquote';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { CodeBlock } from '@tiptap/extension-code-block';
import { HardBreak } from '@tiptap/extension-hard-break';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { History } from '@tiptap/extension-history';
import { Bold } from '@tiptap/extension-bold';
import { Code } from '@tiptap/extension-code';
import { Italic } from '@tiptap/extension-italic';
import { Strike } from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Mention } from '@tiptap/extension-mention';
import { mentionSuggestionOptions } from '@/components/MentionList/mentionSuggestionOptions';
import { Image } from '@tiptap/extension-image';
import { Heading } from '@tiptap/extension-heading';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CharacterCount } from '@tiptap/extension-character-count';
import { TipTapCustomImage } from '@/components/TiptapImage';

interface TiptapOptions {
  handleUpload: (file: File) => Promise<string>;
  limit: number;
}

export const getExtensions = (options: TiptapOptions) => {
  return [
    Document,
    Text,
    Paragraph,
    Blockquote,
    BulletList,
    OrderedList,
    ListItem,
    CodeBlock,
    HardBreak,
    HorizontalRule,
    Dropcursor,
    TextStyle,
    Color,
    FontFamily,
    History,
    Bold,
    Code,
    Italic,
    Strike,
    Subscript,
    Underline,
    Superscript,
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
    }),
    Highlight.configure({ multicolor: true }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: '입력하세요~',
    }),
    Mention.configure({
      HTMLAttributes: {
        class: 'mention',
      },
      suggestion: mentionSuggestionOptions,
    }),
    Image.configure({
      inline: true,
    }),
    Heading.configure({
      levels: [1, 2, 3],
    }),
    Gapcursor,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CharacterCount.configure({
      limit: options.limit,
    }),
    TipTapCustomImage(options.handleUpload),
  ];
};
