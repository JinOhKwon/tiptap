import { Plugin } from 'prosemirror-state';
import { UploadFn } from '@/type';

export const uploadImagePlugin = (upload: UploadFn) => {
  return new Plugin({
    props: {
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        const { schema } = view.state;

        items.forEach((item) => {
          const image = item.getAsFile();

          if (item.type.indexOf('image') === 0) {
            event.preventDefault();

            if (item.type.indexOf('image') === 0 && upload && image) {
              event.preventDefault();

              upload(image).then((src) => {
                const node = schema.nodes.image.create({ src });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              });
            }
          }
        });

        return false;
      },
      handleDOMEvents: {
        drop(view, event) {
          const hasFiles = event.dataTransfer?.files?.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(event!.dataTransfer!.files).filter((file) => /image/i.test(file.type));

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });

          images.forEach((image) => {
            if (upload) {
              upload(image).then((src) => {
                const node = schema.nodes.image.create({ src });
                if (coordinates) {
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                }
              });
            }
          });
          return false;
        },
      },
    },
  });
};
