import React from "react";
import { H2 } from "components/Shared/Typography";
import { IPageCategory, IPageCategoryGroup } from "models/categories/pageCategories";
import { default as styles } from "./page-filter.module.scss";
import { InputWrapper, Checkbox, CheckboxContainer, Toggle, Radio, Label } from "components/Shared/Input";
import { HorizontalLoader } from "components/Shared/Loaders";
import { ExpandablePanel } from "components/Domain/PageTemplates/ManagePage/Reports//Chart/ExpandablePanel";
import { SecondaryButton } from "components/Shared/Buttons";

interface PageFilterProps {
  className?: string;
  loading?: boolean;
  show?: boolean;
  expandable?: boolean;
  categoryGroups: IPageCategoryGroup[];
  onChange: (hasFilter: boolean, selectedPageIds: number[]) => void;
}

const getSelectedPagesFromCategories = (categories: IPageCategory[], blacklisted: number[]) => {
  const resultList = [];
  for (let category of categories) {
    if (category?.selected === true) {
      for (let id of category.usedByPages) {
        if (!blacklisted.includes(id) && !resultList.includes(id)) {
          resultList.push(id);
        }
      }
    }
  }
  return resultList;
};

const intersectArrays = (a: number[], b: number[]) => {
  return a.filter((value) => b.includes(value));
};

export function PageFilter({
  className,
  categoryGroups,
  show = true,
  expandable = true,
  loading = false,
  onChange
}: PageFilterProps) {
  const [groups, setGroups] = React.useState([]);

  const clearGroup = (groupsToClear: Array<IPageCategoryGroup>) => {
    for (let group of groupsToClear) {
      for (let category of group.categories) {
        category.selected = false;
      }
    }
    setGroups(groupsToClear);
  };

  React.useEffect(() => {
    const clonedGroups = JSON.parse(JSON.stringify(categoryGroups));
    clearGroup(clonedGroups);
  }, [categoryGroups]);

  const handleClearFilters = () => {
    clearGroup(groups);
    onChange(false, []);
  };

  const handleSelection = (category: IPageCategory) => {
    category.selected = category?.selected ? false : true;
    let blacklisted = [];
    let current = [];
    let prev = [];
    let hasFilterSelections = false;
    for (let group of groups) {
      const selectedPages = getSelectedPagesFromCategories(group.categories, blacklisted);
      if (selectedPages.length == 0) continue;
      hasFilterSelections = true;
      current = selectedPages;
      if (prev.length > 0) {
        current = intersectArrays(prev, selectedPages);
        let pagesToBlacklist = selectedPages.filter((x) => !current.includes(x) && !blacklisted.includes(x));
        blacklisted = blacklisted.concat(pagesToBlacklist);
      }
      prev = current;
    }
    onChange(hasFilterSelections, current);
  };

  const Content = (
    <>
      <InputWrapper>
        {groups.map((group, groupIndex) => {
          return (
            <fieldset className="if" key={groupIndex}>
              <legend className="if">{group.name}</legend>
              <CheckboxContainer>
                {group.categories.map((category) => {
                  const categoryId = group.id + "-" + category.id;
                  return (
                    <Checkbox
                      id={categoryId}
                      name={category.name}
                      checked={category?.selected}
                      label={category.description}
                      onChange={() => handleSelection(category)}
                    />
                  );
                })}
              </CheckboxContainer>
            </fieldset>
          );
        })}
      </InputWrapper>
      <SecondaryButton onClick={handleClearFilters}>Clear filters</SecondaryButton>
    </>
  );
  const title = "Filter by";
  return (
    <div className={className}>
      {expandable ? (
        <ExpandablePanel
          id="category-filter"
          title={title}
          variant="dark"
          content={loading ? <HorizontalLoader loading={loading}></HorizontalLoader> : show && Content}
          contentProps={{ className: `if content ${styles.content}` }}
        />
      ) : (
        <>
          <div className={styles.panel}>
            <H2 variant="medium">{title}</H2>
          </div>
          {loading ? <HorizontalLoader loading={loading}></HorizontalLoader> : show && Content}
        </>
      )}
    </div>
  );
}
