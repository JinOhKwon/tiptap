import { Node, nodeInputRule } from '@tiptap/core';
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';

import { UploadFn, uploadImagePlugin } from './uploadImage';
import { Image } from '@/components/TiptapImage/Image';

interface ImageOptions {
  inline: boolean;
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string; alt?: string; title?: string }) => ReturnType;
    };
  }
}

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const TipTapCustomImage = (uploadFn: UploadFn) => {
  return Node.create<ImageOptions>({
    addOptions() {
      return {
        name: 'image',
        inline: false,
        HTMLAttributes: {},
      };
    },
    inline() {
      return this.options.inline;
    },
    group() {
      return this.options.inline ? 'inline' : 'block';
    },
    draggable: true,
    addAttributes() {
      return {
        src: {
          default: null,
        },
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
      };
    },
    parseHTML: () => [
      {
        tag: 'img[src]',
        getAttrs: (dom) => {
          if (typeof dom === 'string') return {};
          const element = dom as HTMLImageElement;

          const obj = {
            src: element.getAttribute('src'),
            title: element.getAttribute('title'),
            alt: element.getAttribute('alt'),
          };
          return obj;
        },
      },
    ],
    renderHTML: ({ HTMLAttributes }) => ['img', mergeAttributes(HTMLAttributes)],
    addCommands() {
      return {
        setImage:
          (attrs) =>
          ({ state, dispatch }) => {
            const { selection } = state;
            const position = selection.$head ? selection.$head.pos : selection.$to.pos;

            const node = this.type.create(attrs);
            const transaction = state.tr.insert(position, node);
            return dispatch?.(transaction);
          },
      };
    },
    addInputRules() {
      return [
        nodeInputRule({
          find: IMAGE_INPUT_REGEX,
          type: this.type,
          getAttributes: (match) => {
            const [, alt, src, title] = match;
            return {
              src,
              alt,
              title,
            };
          },
        }),
      ];
    },
    addProseMirrorPlugins() {
      return [uploadImagePlugin(uploadFn)];
    },
    addNodeView() {
      return ReactNodeViewRenderer(Image);
    },
  });
};
