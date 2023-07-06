export const byteConverter = (bytes: number, decimals: number) => {
  const K_UNIT = 1024
  const SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(K_UNIT))
  const resp = `${parseFloat((bytes / (K_UNIT ** i)).toFixed(decimals))} ${SIZES[i]}`
  return resp
}
