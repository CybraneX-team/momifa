import { slateEditor } from '@payloadcms/richtext-slate';
import type { CollectionConfig } from 'payload/types';
import { uploadToS3 } from '../../payload/utilities/s3Uploader';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: true,
    handlers: [],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {

        if (req.files && req.files.file) {
          try {
            const file = req.files.file;


            const buffer = file.data;
            const mimeType = file.mimetype;

            const uniqueFilename = `${Date.now()}-${file.name}`;

            const s3Url = await uploadToS3(buffer, uniqueFilename, mimeType);
            const fileNameFromS3URL = s3Url.replace("https://momifa-storage-bucket.s3.amazonaws.com/", "")            
            data.filename = fileNameFromS3URL;
            data.url = `https://momifa-storage-bucket.s3.amazonaws.com/${fileNameFromS3URL}`
          } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file to S3');
          }
        }
        return data; 
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: ['link'],
        },
      }),
    },
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
  ],
};
