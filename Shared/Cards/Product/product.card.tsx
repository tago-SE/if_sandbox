import { EpiLink as Link } from "helpers/epi/Controls/EpiLink";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import * as styles from "./product.module.scss";

interface IProductCardProps {
  title: ReactNode;
  content: ReactNode;
  productUrl?: string;
  docsUrl?: string;
}

export const ProductCard: React.FC<IProductCardProps> = ({ title, content, productUrl, docsUrl }) => {
  const router = useRouter();

  const handleOverviewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(productUrl);
  };

  const handleDocsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(docsUrl);
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    router.push(productUrl);
  };

  return (
    <div className={styles.card} role="button" onClick={handleCardClick}>
      <p className={`if text lead ${styles.title}`}>
        <span className="if">{title}</span>
      </p>
      <div>{content}</div>
      <ul className={`if ${styles.links}`}>
        {productUrl && (
          <li className="if">
            <Link href={productUrl} className="if standalone" onClick={handleOverviewClick} title="Product Overview">
              Overview
            </Link>
          </li>
        )}
        {docsUrl && (
          <li className="if">
            <Link href={docsUrl} className="if standalone" onClick={handleDocsClick} title="Documentation">
              Docs
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};
