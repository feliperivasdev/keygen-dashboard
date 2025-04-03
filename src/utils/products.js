// Función para mezclar un array
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// Listas de imágenes disponibles
const epicSkinImages = shuffleArray(
  Array.from({ length: 12 }, (_, i) => `/images/epic-skin-${i + 1}.jpg`)
);
const skinImages = shuffleArray(
  Array.from({ length: 13 }, (_, i) => `/images/skin-${i + 1}.jpg`)
);

// Lista de productos demo
export const initialProducts = [
  // Crear 35 productos demo
  ...Array(35)
    .fill()
    .map((_, index) => ({
      id: `product-${index + 1}`,
      name: `Proyecto ${index + 1}`,
      description: `Generador personalizado ${
        index + 1
      }. Este producto ofrece regalos sorprendentes para mejorar tu experiencia.`,
      imageUrl: `/images/product-${(index % 28) + 1}.jpg`, // Usamos 28 imágenes rotando
      active: true,
      features: shuffleArray([
        {
          id: `feature-${index}-1`,
          name: `Desbloquea Skin Random`,
          imageUrl: skinImages[index % skinImages.length], // Asigna una imagen única de la lista
        },
        {
          id: `feature-${index}-2`,
          name: `+99999 Monedas/Robux 🪙`,
        },
        {
          id: `feature-${index}-3`,
          name: `+999999 Diamantes 💎`,
        },
        {
          id: `feature-${index}-4`,
          name: `+999999 Minecoins 💰`,
        },
        {
          id: `feature-${index}-5`,
          name: `Desbloquea 1 Skin Épica`,
          imageUrl: epicSkinImages[index % epicSkinImages.length], // Asigna una imagen única de la lista
        },
        {
          id: `feature-${index}-6`,
          name: `Desbloquea 2 Skins Raras`,
          imageUrl: skinImages[(index + 1) % skinImages.length], // Otra imagen única de la lista
        },
        {
          id: `feature-${index}-7`,
          name: `Skins para autos 🚗`,
        },
      ]),
    })),
];
