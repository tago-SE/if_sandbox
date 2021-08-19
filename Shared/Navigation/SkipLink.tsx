import React from 'react';
import styles from "./Navigation.module.scss";

export const SkipLink = () => {
  return (<a href="#main-content" className={`if axe ${styles.skipContent}`}>Skip to main content</a>);
};