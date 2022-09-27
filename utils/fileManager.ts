import { storage } from '../libs/storage';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';
import { v4 } from 'uuid';

/**
 * Get all file by folder name.
 *
 * @param string folder image.
 * @returns array File of url.
 */
export async function getAllFile(folder: string) {
  const filesRef = ref(storage, `${folder}`);
  const files = (await listAll(filesRef)).items;
  return Promise.all(
    files.map(async (fileRef) => {
      return await getDownloadURL(fileRef);
    }),
  );
}

/**
 * Delete file by url.
 *
 * @param string url image.
 * @returns boolean true if deleted file.
 */
export async function deleteFile(url: string) {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
}

/**
 * Upload file to google firebase storage.
 *
 * @param string folder name.
 * @param array filesUpload list of file
 * @returns array list of url file.
 */
export async function uploadFile(folder: string, filesUpload: File[]) {
  return Promise.all(
    [...filesUpload].map(async (file: File) => {
      const fileRef = ref(storage, `${folder}/${file.name + v4()}`);
      const value: UploadResult = await uploadBytes(fileRef, file);
      return await getDownloadURL(value.ref);
    }),
  );
}
