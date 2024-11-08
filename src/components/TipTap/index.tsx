import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react';
import { Box } from '@mui/material';
import classnames from 'classnames/bind';
import styles from './TipTap.module.scss';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { getExtensions } from '@/components/TipTap/TiptapExtensios';
import { upload } from '@/util/s3';

const cx = classnames.bind(styles);

const limit = 6000;

export default function TipTap() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | undefined>();

  const handleUpload = useCallback(async (file: File) => {
    const result = await upload(file);

    return result;
  }, []);

  const editor = useEditor({
    autofocus: true,
    extensions: getExtensions({ limit, handleUpload }),
  });

  const setLink = useCallback(() => {
    if (!editor) return null;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    async function handleImageUpload() {
      if (image && editor) {
        const src = await handleUpload(image);
        editor.chain().focus()?.setImage({ src })?.run();
      }
    }
    handleImageUpload();
  }, [editor, handleUpload, image]);

  if (!editor) return null;

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
            블록 인용(toggle)
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            목록(toggle)
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          >
            순서 목록(toggle)
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          >
            코드 블록(toggle)
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive('taskList') ? 'is-active' : ''}
          >
            작업 목록(toggle)
          </button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>줄 바꿈</button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>수평선 추가</button>
          <button onClick={handleButtonClick}>이미지 추가</button>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
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
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          굵게(toggle)
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          코드(toggle)
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? 'is-active' : ''}
        >
          강조(toggle)
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          기울임(toggle)
        </button>
        <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
          링크 설정
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          취소선(toggle)
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive('subscript') ? 'is-active' : ''}
        >
          아래 첨자(toggle)
        </button>
        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive('superscript') ? 'is-active' : ''}
        >
          위 첨자(toggle)
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          밑줄(toggle)
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
          초기화
        </button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
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

      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
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

      <EditorContent editor={editor} rows={10} className={cx('tiptap')} />

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
