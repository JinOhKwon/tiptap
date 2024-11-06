import {UploadFn} from '@/type';
import {getAwsPreSignedUrl} from "@/api";

export const upload: UploadFn = async (image: File | null) => {
  if (!image) return '';
  const { url, preSignedUrl } = await getAwsPreSignedUrl({
    fileName: image.name,
    fileType: image.type,
  });

  console.log(preSignedUrl);

  await fetch(preSignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': image.type,
    },
    body: image,
  });

  return url;
};
