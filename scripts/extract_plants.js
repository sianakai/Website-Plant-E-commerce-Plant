import sharp from 'sharp';
import fs from 'fs';

async function extract() {
  if (!fs.existsSync('public/plants')) {
    fs.mkdirSync('public/plants', { recursive: true });
  }

  const src = 'public/assets/aistudio/MacBook_Pro_16__-_1_286ad99d.png';
  const metadata = await sharp(src).metadata();
  console.log('Image dimensions:', metadata.width, metadata.height);

  // We will crop high quality assets:
  // 1. Hero plant:
  // Let's crop hero featured plant (Calathea in speckled pot)
  // 2. Trendy plant 1 (Fluted pot leafy plant)
  // 3. Trendy plant 2 (Mint pot succulent)
  // 4. Top selling 1 (Calathea)
  // 5. Top selling 2 (Aglaonema ribbed)
  // 6. Top selling 3 (Cactus terracotta)
  // 7. Top selling 4 (Monstera black pot)
  // 8. Top selling 5 (Snake plant white pot)
  // 9. Top selling 6 (Haworthia white pot)
  // 10. Best O2 big plant
  // 11. Avatars: Alena Patel, Maxn Raval, Venely K, Lii Thakur

  const crops = [
    // Hero featured plant
    { name: 'hero-plant.png', left: 1200, top: 80, width: 440, height: 480 },
    // Trendy 1
    { name: 'trendy-deco.png', left: 80, top: 1950, width: 560, height: 580 },
    // Trendy 2
    { name: 'trendy-fresh.png', left: 1100, top: 2400, width: 560, height: 600 },
    // Top selling 1
    { name: 'top-calathea.png', left: 100, top: 3550, width: 460, height: 480 },
    // Top selling 2
    { name: 'top-aglaonema.png', left: 630, top: 3550, width: 460, height: 480 },
    // Top selling 3
    { name: 'top-cactus.png', left: 1160, top: 3550, width: 460, height: 480 },
    // Top selling 4
    { name: 'top-monstera.png', left: 100, top: 4480, width: 460, height: 480 },
    // Top selling 5
    { name: 'top-snakeplant.png', left: 630, top: 4480, width: 460, height: 480 },
    // Top selling 6
    { name: 'top-haworthia.png', left: 1160, top: 4480, width: 460, height: 480 },
    // Best O2 Plant
    { name: 'o2-plant.png', left: 60, top: 6600, width: 750, height: 850 },
    // Avatar 1 Alena
    { name: 'avatar-alena.png', left: 100, top: 1080, width: 75, height: 75 },
    // Avatar 2 Maxn
    { name: 'avatar-maxn.png', left: 100, top: 5800, width: 110, height: 110 },
    // Avatar 3 Venely
    { name: 'avatar-venely.png', left: 630, top: 5800, width: 110, height: 110 },
    // Avatar 4 Lii
    { name: 'avatar-lii.png', left: 1160, top: 5800, width: 110, height: 110 }
  ];

  for (const c of crops) {
    try {
      await sharp(src)
        .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
        .toFile(`public/plants/${c.name}`);
      console.log(`Saved public/plants/${c.name}`);
    } catch (err) {
      console.error(`Error saving ${c.name}:`, err.message);
    }
  }
}

extract();
