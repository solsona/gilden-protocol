// Client-side EXIF extraction engine for JPEG files
// Parses TIFF and EXIF tags for Shutter Speed, Aperture, ISO, Focal Length, and Flash

class ExifReader {
  static async extractFromBlob(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const buffer = e.target.result;
          const view = new DataView(buffer);
          const exifData = ExifReader.parseJpeg(view);
          resolve(exifData);
        } catch (err) {
          console.warn("EXIF extraction warning:", err);
          resolve(ExifReader.getDefaults());
        }
      };
      reader.onerror = () => resolve(ExifReader.getDefaults());
      // Read first 128KB which contains EXIF APP1 headers
      const slice = file.slice(0, 131072);
      reader.readAsArrayBuffer(slice);
    });
  }

  static getDefaults() {
    return {
      camera: "Leica SL3-P",
      focalLength: 24,
      aperture: 8.0,
      shutterSpeed: "1/250s",
      iso: 200,
      flashFired: true,
      hasExif: false
    };
  }

  static parseJpeg(view) {
    if (view.getUint16(0, false) !== 0xFFD8) {
      return ExifReader.getDefaults(); // Not a JPEG
    }

    let length = view.byteLength;
    let offset = 2;

    while (offset < length) {
      if (view.getUint8(offset) !== 0xFF) break;
      const marker = view.getUint8(offset + 1);

      // APP1 marker (EXIF)
      if (marker === 0xE1) {
        return ExifReader.parseApp1(view, offset + 4);
      } else if ((marker >= 0xE0 && marker <= 0xEF) || marker === 0xFE || marker === 0xDB) {
        // Skip other markers
        const sectionLength = view.getUint16(offset + 2, false);
        offset += 2 + sectionLength;
      } else {
        offset += 2;
      }
    }

    return ExifReader.getDefaults();
  }

  static parseApp1(view, start) {
    // Check "Exif\0\0"
    if (view.getUint32(start, false) !== 0x45786966 || view.getUint16(start + 4, false) !== 0x0000) {
      return ExifReader.getDefaults();
    }

    const tiffStart = start + 6;
    const byteOrder = view.getUint16(tiffStart, false);
    const littleEndian = byteOrder === 0x4949; // 'II' = little endian, 'MM' = big endian

    const firstIFDOffset = view.getUint32(tiffStart + 4, littleEndian);
    if (firstIFDOffset < 0x00000008) return ExifReader.getDefaults();

    const tags = {};
    ExifReader.readIFD(view, tiffStart, tiffStart + firstIFDOffset, littleEndian, tags);

    // If Exif IFD Pointer (0x8769) exists
    if (tags[0x8769]) {
      ExifReader.readIFD(view, tiffStart, tiffStart + tags[0x8769], littleEndian, tags);
    }

    // Translate tags
    const result = {
      hasExif: true,
      camera: tags[0x0110] || "Leica SL3-P",
      focalLength: tags[0x920A] ? Number(tags[0x920A]) : 24,
      aperture: tags[0x829D] ? Number(Number(tags[0x829D]).toFixed(1)) : 8.0,
      shutterSpeed: tags[0x829A] ? ExifReader.formatShutter(tags[0x829A]) : "1/250s",
      iso: tags[0x8827] ? Number(tags[0x8827]) : 200,
      flashFired: tags[0x9209] !== undefined ? (tags[0x9209] & 1) === 1 : true
    };

    return result;
  }

  static readIFD(view, tiffStart, dirStart, littleEndian, tags) {
    try {
      const entries = view.getUint16(dirStart, littleEndian);
      for (let i = 0; i < entries; i++) {
        const entryOffset = dirStart + 2 + i * 12;
        const tag = view.getUint16(entryOffset, littleEndian);
        const type = view.getUint16(entryOffset + 2, littleEndian);
        const count = view.getUint32(entryOffset + 4, littleEndian);
        const valueOffset = entryOffset + 8;

        tags[tag] = ExifReader.readTagValue(view, tiffStart, type, count, valueOffset, littleEndian);
      }
    } catch (e) {
      // safe read
    }
  }

  static readTagValue(view, tiffStart, type, count, valueOffset, littleEndian) {
    // Type 2 = ASCII, 3 = SHORT, 4 = LONG, 5 = RATIONAL
    if (type === 3) {
      return view.getUint16(valueOffset, littleEndian);
    } else if (type === 4) {
      return view.getUint32(valueOffset, littleEndian);
    } else if (type === 5) {
      const offset = view.getUint32(valueOffset, littleEndian);
      const num = view.getUint32(tiffStart + offset, littleEndian);
      const den = view.getUint32(tiffStart + offset + 4, littleEndian);
      return den !== 0 ? num / den : 0;
    } else if (type === 2) {
      let offset = count > 4 ? view.getUint32(valueOffset, littleEndian) : valueOffset;
      let str = "";
      for (let i = 0; i < count - 1; i++) {
        str += String.fromCharCode(view.getUint8(tiffStart + offset + i));
      }
      return str.trim();
    }
    return null;
  }

  static formatShutter(val) {
    if (typeof val === 'number') {
      if (val < 1) {
        return `1/${Math.round(1 / val)}s`;
      }
      return `${Number(val.toFixed(1))}s`;
    }
    return String(val);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExifReader;
}
