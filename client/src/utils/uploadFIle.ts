import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase/firebase.config"
import { replacename } from "./replaceName"

export const upLoadFile = async (file: any) => {
  const filename = replacename(file.name)
  const storageRef = ref(storage, `image/${filename}`)
  const res = await uploadBytes(storageRef, file)
  if (res) {
    if (res.metadata.size === file.size) {
      return getDownloadURL(storageRef)
    } else {
      return 'Uploading'
    }
  } else {
    return 'Error upload'
  }
}