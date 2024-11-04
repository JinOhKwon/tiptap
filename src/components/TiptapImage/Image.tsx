import { NodeViewWrapper } from '@tiptap/react';

export const Image = (props) => {
  const { src, alt, title } = props.node.attrs;
  return (
    <NodeViewWrapper>
      <img src={src} alt={alt} title={title} />
    </NodeViewWrapper>
  );
};
