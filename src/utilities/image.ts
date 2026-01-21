

export const importImage = (path: string) => {
  const publicUrl = '.';
  return publicUrl + path;
};

export const createTransparentRectanglePNG = ({
  text,
  width,
  height,
  fillColor,
  textColor,
  font,
  fitParent = false
}: {
  text: string;
  width: number;
  height: number;
  fillColor: string;
  textColor: string;
  font: string;
  fitParent?: boolean;
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fillRect(0, 0, width, height);
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, width, height - 1);
      }

      ctx.fillStyle = textColor;
      ctx.font = `${font} Times New Roman `;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (fitParent) {
        let fontSize = height;
        do {
          fontSize -= 1;
          ctx.font = `${fontSize}`;
        } while (ctx.measureText(text).width > width);
      }
      const textX = width / 2;
      const textY = height / 2;

      ctx.fillText(text, textX, textY);

      const base64 = canvas.toDataURL('image/png');

      canvas.remove();
      ctx.clearRect(0, 0, width, height);

      resolve(base64);
    } else {
      reject(new Error('Canvas context not available'));
    }
  });
};

export const cropBase64Image = (
  base64: string,
  x: number,
  y: number,
  width: number,
  height: number,
  pdfPageHeight?: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = base64;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (ctx) {
        const canvasCalibrationRatio = pdfPageHeight ? image.naturalHeight / pdfPageHeight : 1;
        canvas.width = width * canvasCalibrationRatio;
        canvas.height = height * canvasCalibrationRatio;

        ctx.drawImage(
          image,
          x * canvasCalibrationRatio,
          y * canvasCalibrationRatio,
          width * canvasCalibrationRatio,
          height * canvasCalibrationRatio,
          0,
          0,
          width * canvasCalibrationRatio,
          height * canvasCalibrationRatio
        );

        const croppedBase64 = canvas.toDataURL('image/png');

        canvas.remove();
        ctx.clearRect(0, 0, width * canvasCalibrationRatio, height * canvasCalibrationRatio);

        resolve(croppedBase64);
      } else {
        reject(new Error('Canvas context not available'));
      }
    };
    image.onerror = (err) => reject(err);
  });
};

export const combineBase64Images = async (base64Img1: string, base64Img2: string, gap: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img1 = new Image();
    const img2 = new Image();

    img1.src = base64Img1;
    img2.src = base64Img2;

    img1.onload = () => {
      img2.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          if (!context) {
            return reject(new Error('Canvas context not available'));
          }

          const targetWidth = Math.max(img1.width, img2.width);

          const scaledImg1Height = (img1.height * targetWidth) / img1.width;
          const scaledImg2Height = (img2.height * targetWidth) / img2.width;

          const targetHeight = scaledImg1Height + scaledImg2Height + gap;

          canvas.width = targetWidth;
          canvas.height = targetHeight;

          context.drawImage(img1, 0, 0, targetWidth, scaledImg1Height);

          context.drawImage(img2, 0, scaledImg1Height + gap, targetWidth, scaledImg2Height);

          const result = canvas.toDataURL('image/png');

          canvas.remove();
          context.clearRect(0, 0, targetWidth, targetHeight);

          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      img2.onerror = (e) => reject(`Failed to load second image: ${e}`);
    };
    img1.onerror = (e) => reject(`Failed to load first image: ${e}`);
  });
};

export const textToImageFixedWidth = (
  text: string,
  options?: {
    width: number;
    fontFamily?: string;
    textColor?: string;
    backgroundColor?: string;
    paddingX?: number;
    paddingY?: number;
    bold?: boolean;
  }
): { base64: string; width: number; height: number } => {
  const {
    width,
    fontFamily = 'Times New Roman',
    textColor = '#000000',
    backgroundColor = 'rgba(0, 0, 0, 0)',
    paddingX = 0,
    paddingY = 0,
    bold = false
  } = options || {};

  if (!width || width <= 0) {
    throw new Error('Width must be a positive number');
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context not available');
  }

  let fontSize = 40;
  context.font = `${bold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
  let textWidth = context.measureText(text).width;

  while (textWidth + paddingX * 2 > width) {
    fontSize -= 1;
    context.font = `${fontSize}px ${fontFamily}`;
    textWidth = context.measureText(text).width;
  }

  const height = fontSize + paddingY * 2;

  canvas.width = width;
  canvas.height = height;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = textColor;
  context.font = `${bold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillText(text, width / 2, height / 2);

  const base64 = canvas.toDataURL('image/png');

  canvas.remove();
  context.clearRect(0, 0, width, height);

  return { base64, width, height };
};

export const textToImageFixedFontSize = (
  text: string,
  options?: {
    fontSize: number;
    fontFamily?: string;
    textColor?: string;
    backgroundColor?: string;
    paddingX?: number;
    paddingY?: number;
    bold?: boolean;
  }
): { base64: string; width: number; height: number } => {
  const {
    fontSize,
    fontFamily = 'Times New Roman',
    textColor = '#000000',
    backgroundColor = 'rgba(0, 0, 0, 0)',
    paddingX = 0,
    paddingY = 0,
    bold = false
  } = options || {};

  if (!fontSize || fontSize <= 0) {
    throw new Error('font size must be a positive number');
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context not available');
  }

  context.font = `${bold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
  const textWidth = context.measureText(text).width;

  const width = textWidth + paddingX * 2;
  const height = fontSize * 1.5 + paddingY * 2;

  canvas.width = width;
  canvas.height = height;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = textColor;
  context.font = `${bold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.fillText(text, width / 2, height / 2);

  const base64 = canvas.toDataURL('image/png');

  canvas.remove();
  context.clearRect(0, 0, width, height);

  return { base64, width, height };
};
