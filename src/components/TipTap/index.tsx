import Blockquote from '@tiptap/extension-blockquote';
import { Paragraph } from '@tiptap/extension-paragraph';
import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import { Box } from '@mui/material';
import { BulletList } from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import { CodeBlock } from '@tiptap/extension-code-block';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Heading } from '@tiptap/extension-heading';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Image } from '@tiptap/extension-image';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Mention } from '@tiptap/extension-mention';
import { mentionSuggestionOptions } from '@/components/MentionList/mentionSuggestionOptions';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Table } from '@tiptap/extension-table';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CharacterCount } from '@tiptap/extension-character-count';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';

const limit = 6000;

export default function TipTapBlockquote() {
  const editor = useEditor({
    autofocus: true,
    extensions: [
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
        limit,
      }),
    ],
    content: `

    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          >
            blockquote(이미지) toggle
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            list(이미지) toggle
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            Toggle ordered list
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            code block toggle
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}
          >
            task list toggle
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>enter toggle</button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>세로줄 추가</button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          표 삽입
        </button>
        <button onClick={() => editor.chain().focus().addColumnBefore().run()}>이전에 열 추가</button>
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>이후에 열 추가</button>
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>열 삭제</button>
        <button onClick={() => editor.chain().focus().addRowBefore().run()}>이전에 행 추가</button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>이후에 행 추가</button>
        <button onClick={() => editor.chain().focus().deleteRow().run()}>행 삭제</button>
        <button onClick={() => editor.chain().focus().deleteTable().run()}>표 삭제</button>
        <button onClick={() => editor.chain().focus().mergeCells().run()}>셀 병합</button>
        <button onClick={() => editor.chain().focus().splitCell().run()}>셀 분할</button>
        <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>헤더 열 토글</button>
        <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>헤더 행 토글</button>
        <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>헤더 셀 토글</button>
        <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>병합 또는 분할</button>
        <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>셀 속성 설정</button>
        <button onClick={() => editor.chain().focus().fixTables().run()}>표 수정</button>
        <button onClick={() => editor.chain().focus().goToNextCell().run()}>다음 셀로 이동</button>
        <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>이전 셀로 이동</button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <input
          type='color'
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes('textStyle').color}
          data-testid='setColor'
        />
        <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
          data-testid='setPurple'
        >
          Purple
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#F98181').run()}
          className={editor.isActive('textStyle', { color: '#F98181' }) ? 'is-active' : ''}
          data-testid='setRed'
        >
          Red
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#FBBC88').run()}
          className={editor.isActive('textStyle', { color: '#FBBC88' }) ? 'is-active' : ''}
          data-testid='setOrange'
        >
          Orange
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#FAF594').run()}
          className={editor.isActive('textStyle', { color: '#FAF594' }) ? 'is-active' : ''}
          data-testid='setYellow'
        >
          Yellow
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#70CFF8').run()}
          className={editor.isActive('textStyle', { color: '#70CFF8' }) ? 'is-active' : ''}
          data-testid='setBlue'
        >
          Blue
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#94FADB').run()}
          className={editor.isActive('textStyle', { color: '#94FADB' }) ? 'is-active' : ''}
          data-testid='setTeal'
        >
          Teal
        </button>
        <button
          onClick={() => editor.chain().focus().setColor('#B9F18D').run()}
          className={editor.isActive('textStyle', { color: '#B9F18D' }) ? 'is-active' : ''}
          data-testid='setGreen'
        >
          Green
        </button>
        <button onClick={() => editor.chain().focus().unsetColor().run()} data-testid='unsetColor'>
          Unset color
        </button>
      </Box>

      <Box>
        <button
          onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
          className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''}
          data-test-id='inter'
        >
          인터
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
          className={editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) ? 'is-active' : ''}
          data-test-id='comic-sans'
        >
          코믹 산스
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('serif').run()}
          className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''}
          data-test-id='serif'
        >
          세리프
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
          className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}
          data-test-id='monospace'
        >
          모노스페이스
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
          className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}
          data-test-id='cursive'
        >
          커시브
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('var(--title-font-family)').run()}
          className={editor.isActive('textStyle', { fontFamily: 'var(--title-font-family)' }) ? 'is-active' : ''}
          data-test-id='css-variable'
        >
          CSS 변수
        </button>
        <button
          onClick={() => editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()}
          className={editor.isActive('textStyle', { fontFamily: '"Comic Sans"' }) ? 'is-active' : ''}
          data-test-id='comic-sans-quoted'
        >
          코믹 산스 (따옴표)
        </button>
        <button onClick={() => editor.chain().focus().unsetFontFamily().run()} data-test-id='unsetFontFamily'>
          글꼴 초기화
        </button>
      </Box>

      <Box>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          왼쪽 정렬
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
          가운데 정렬
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          오른쪽 정렬
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
        >
          양쪽 맞춤
        </button>
        <button onClick={() => editor.chain().focus().unsetTextAlign().run()}>정렬 초기화</button>
      </Box>

      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              border: '1px solid blue',
              borderRadius: 4,
              p: 1,
            }}
          >
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              Bullet list
            </button>
          </Box>
        </FloatingMenu>
      )}

      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {editor.storage.characterCount.characters()} / {limit} characters
        <br />
        {editor.storage.characterCount.words()} words
      </Box>
    </Box>
  );
}
