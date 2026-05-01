import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const ASSETS_DIR = join(__dirname, "public", "assets");
const BACKUP_DIR = join(__dirname, "public", "assets-backup");
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Quality settings
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;

// Get all image files recursively
function getAllImageFiles(dir, fileList = []) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = extname(file).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Optimize a single image
async function optimizeImage(filePath) {
  try {
    const ext = extname(filePath).toLowerCase();
    const originalStats = statSync(filePath);
    const originalSize = originalStats.size;

    console.log(`\nProcessing: ${filePath}`);
    console.log(`Original size: ${formatBytes(originalSize)}`);

    // Create backup directory structure
    const relativePath = filePath.replace(ASSETS_DIR, "");
    const backupPath = join(BACKUP_DIR, relativePath);
    const backupDir = dirname(backupPath);

    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
    }

    // Read the image
    let image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if image is too large (max 2000px width)
    if (metadata.width > 2000) {
      image = image.resize(2000, null, {
        withoutEnlargement: true,
        fit: "inside",
      });
      console.log(`Resizing from ${metadata.width}px to 2000px width`);
    }

    // Apply compression based on format
    if (ext === ".jpg" || ext === ".jpeg") {
      image = image.jpeg({ quality: JPEG_QUALITY, progressive: true });
    } else if (ext === ".png") {
      image = image.png({ quality: PNG_QUALITY, compressionLevel: 9 });
    } else if (ext === ".webp") {
      image = image.webp({ quality: WEBP_QUALITY });
    }

    // Save optimized image (overwrites original)
    await image.toFile(backupPath); // Save to backup first
    await sharp(backupPath).toFile(filePath); // Then overwrite original

    const optimizedStats = statSync(filePath);
    const optimizedSize = optimizedStats.size;
    const savings = originalSize - optimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

    console.log(`Optimized size: ${formatBytes(optimizedSize)}`);
    console.log(`Saved: ${formatBytes(savings)} (${savingsPercent}%)`);

    totalOriginalSize += originalSize;
    totalOptimizedSize += optimizedSize;
    processedCount++;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Main function
async function main() {
  console.log("🖼️  Starting image optimization...\n");
  console.log(`Assets directory: ${ASSETS_DIR}`);
  console.log(`Backup directory: ${BACKUP_DIR}\n`);

  // Create backup directory
  if (!existsSync(BACKUP_DIR)) {
    mkdirSync(BACKUP_DIR, { recursive: true });
  }

  // Get all image files
  const imageFiles = getAllImageFiles(ASSETS_DIR);
  console.log(`Found ${imageFiles.length} images to optimize\n`);

  if (imageFiles.length === 0) {
    console.log("No images found to optimize.");
    return;
  }

  // Process each image
  for (const filePath of imageFiles) {
    await optimizeImage(filePath);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("✅ Optimization Complete!");
  console.log("=".repeat(60));
  console.log(`\nProcessed: ${processedCount} images`);
  console.log(`Original total size: ${formatBytes(totalOriginalSize)}`);
  console.log(`Optimized total size: ${formatBytes(totalOptimizedSize)}`);
  console.log(
    `Total saved: ${formatBytes(totalOriginalSize - totalOptimizedSize)}`,
  );
  console.log(
    `Overall savings: ${(((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) * 100).toFixed(1)}%`,
  );
  console.log(`\n💾 Original images backed up to: ${BACKUP_DIR}`);
}

// Run the script
main().catch(console.error);
