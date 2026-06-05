// LANJUT KODING DISINI CEK CHAT GPT DARI TAMBAHKAN UTILS UNTUK CHUNKK ARRAYS...KITA PERLU BUAT CARAUSEL YANG DINAMIS DENGAN JUMLAH GORUP DATA YANG AKAN DITAMPILKAN

export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }
  return chunks;
}
