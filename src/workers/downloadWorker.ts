self.onmessage = function (e) {
  const { fileUrl } = e.data;
  measureDownloadSpeed(fileUrl);
};

async function measureDownloadSpeed(url: string) {
  try {
    const fileSizeInBytes = 1042307; // totalSize of testingFile
    const startTime = performance.now();
    const response = await fetch(url, {
      cache: 'no-store'
    });
    await response.blob();
    const endTime = performance.now();
    const durationInSeconds = (endTime - startTime) / 1000;
    const speedInMbps = fileSizeInBytes / (durationInSeconds * 1024 * 1024);
    self.postMessage({
      fileSizeInBytes,
      durationInSeconds,
      speedInMbps
    });
  } catch (e: any) {
    self.postMessage({ error: e.message });
  }
}
