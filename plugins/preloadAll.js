export default (context, inject) => {
  const preload = src => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function() {
      resolve(img);
    }
    img.onerror = reject;
    img.src = src;
  });
  
  const preloadAll = sources =>
    Promise.all(sources.map(preload));

  inject('preloadAll', preloadAll)
  context.$preloadAll = preloadAll
}
