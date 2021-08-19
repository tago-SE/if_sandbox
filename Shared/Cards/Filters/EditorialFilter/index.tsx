import React from "react";
import * as styles from "./editorial-filter.module.scss";
import { DropdownFilter } from "../DropdownFilter";

interface EditorialFilterProps {}

/**
 * @todo Not yet implemented
 * @param param0
 */
export const EditorialFilter: React.FC<EditorialFilterProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <span className={styles.title}>Filter</span>
        <div className={styles.filterButtons}>
          <DropdownFilter
            id="my-id"
            title="asd" // button={{ className: styles.button }}
          />
        </div>
      </div>
      <span className={styles.resultField}>
        Showing result for: <span>All topics</span>
      </span>
    </div>
  );
};
