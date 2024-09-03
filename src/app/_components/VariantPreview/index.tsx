import React from 'react';
import styles from './index.module.scss';

interface VariantPreviewProps {
  variants: string[];
  currentVariant: string;
  onPrevious: () => void;
  onNext: () => void;
}

const VariantPreview: React.FC<VariantPreviewProps> = ({
  variants,
  currentVariant,
  onPrevious,
  onNext
}) => {
  const previewVariant = currentVariant === 'plain' ? 'polo' : 'plain';

  return (
    <div className={styles.variantPreview}>
      <img
        src={`/media/tshirt/tshirt-preview-${previewVariant}.png`}
        alt={`${previewVariant} t-shirt preview`}
        className={styles.previewImage}
      />
      <div className={styles.navButtons}>
        <button onClick={onPrevious} className={styles.navButton}>&lt;</button>
        <button onClick={onNext} className={styles.navButton}>&gt;</button>
      </div>
    </div>
  );
};

export default VariantPreview;