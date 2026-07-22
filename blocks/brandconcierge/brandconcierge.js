function waitForConnected(node) {
  return new Promise((resolve) => {
    const tick = () => {
      if (node.isConnected) resolve();
      else requestAnimationFrame(tick);
    };
    tick();
  });
}

export default async function decorate(block) {
  block.replaceChildren();

  const mount = document.createElement('div');
  mount.id = 'brand-concierge-mount';
  block.appendChild(mount);

  await waitForConnected(block);

  if (typeof window.alloy !== 'function') {
    console.error('Brand Concierge: alloy is not available');
    return;
  }

  try {
    await window.alloy('sendEvent', {
      conversation: {
        fetchConversationalExperience: true,
      },
    });

    window.alloy('bootstrapConversationalExperience', {
      selector: '#brand-concierge-mount',
      src: '/scripts/brandconciergemain.js',
      stylingConfigurations: window.styleConfiguration,
      stickySession: true,
    });
  } catch (error) {
    console.error('Brand Concierge initialization failed:', error);
  }
}
