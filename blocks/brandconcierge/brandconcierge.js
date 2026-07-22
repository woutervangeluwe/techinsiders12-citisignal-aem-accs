export default async function decorate(block) {
  // 既存の中身を消して、確実にマウント先を作る
  block.innerHTML = '';

  const mount = document.createElement('div');
  mount.id = 'brand-concierge-mount';
  block.appendChild(mount);

  // alloy がまだ読めていない場合は、ここで止める
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
