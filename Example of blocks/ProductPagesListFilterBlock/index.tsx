import React, { ReactNode } from "react";
import EpiComponent from "helpers/epi/EpiComponent";
import ProductPagesListFilterBlockData from "models/EpiServer/Content/ProductPagesListFilterBlockData";
import { PageFilter } from "components/Shared/Cards/Filters/ProductFilter";
import { Grid, GridRow, GridColumn } from "components/Shared/Layout/Grid";
import { Block } from "components/Shared/Layout";
import { useWindowSize } from "hooks/window";
import Property from "helpers/epi/Controls/Property";
import { IPageCategory } from "models/categories/pageCategories";
import { H2 } from "components/Shared/Typography";
import { Icon } from "components/Shared/Icon";
import { ProductCard, ProductGrid } from "components/Shared/Cards/Product";
import * as styles from "./ProductPagesListFilterBlock.module.scss";
import { iconsLoader } from "helpers/icons/IconsLoader";
import { HorizontalLoader } from "components/Shared/Loaders";
import { BffContentService, FilterKeys } from "services/bff/content/content.service";
import ErrorBlock from "components/Shared/Layout/ErrorBlock";
import CmsUrlParser from "helpers/Util/CmsUrlParser";
import { useGetProductPagesWithFilterGroups } from "services/bff/transport/content.transport";
import { useWindowWidthDebounced } from "hooks/window/useWindowSize";

const PageList = () => {
  const { data, error, loading: isLoading } = useGetProductPagesWithFilterGroups();

  const productPages = data?.productPages || [];
  const filterCategoryGroups = data?.filterCategoryGroups || [];

  const getAllPageIds = () =>
    productPages.map((p) => {
      return p.productStartPage.contentLink.id;
    });

  const [state, setState] = React.useState<{ pagesToShow: number[] }>({
    pagesToShow: getAllPageIds()
  });

  React.useEffect(() => {
    setState({ pagesToShow: getAllPageIds() });
  }, [data]);

  const width = useWindowWidthDebounced();

  const productCategoryId = FilterKeys.productCategory;
  const productCategories = filterCategoryGroups.find((x) => x.id === productCategoryId);

  const handlePageFilterChanges = (hasFilter: boolean, selectedPageIds: number[]) => {
    setState((state) => ({ ...state, pagesToShow: hasFilter ? selectedPageIds : getAllPageIds() }));
  };

  const showPage = (pageId: number) => {
    return state.pagesToShow.includes(pageId);
  };

  const getPagesForProductCategory = (productCategory: IPageCategory) => {
    return productPages.filter(
      (page) =>
        productCategory.usedByPages.includes(page.productStartPage.contentLink.id) &&
        showPage(page.productStartPage.contentLink.id)
    );
  };

  const filterColumnWidth = width > 1200 ? 3 : width < 900 ? 12 : 4;
  const productColumnWidth = width > 1200 ? 9 : width < 900 ? 12 : 8;

  return (
    <Grid>
      <GridRow>
        <GridColumn xs={filterColumnWidth}>
          <PageFilter
            className={styles.filterWrapper}
            categoryGroups={filterCategoryGroups}
            loading={isLoading}
            onChange={handlePageFilterChanges}
            expandable={width < 900}
          />
        </GridColumn>
        <GridColumn xs={productColumnWidth}>
          <HorizontalLoader loading={isLoading}></HorizontalLoader>
          {error && <ErrorBlock title="Oops... APIs Not Found">I'm sorry, failed to load content.</ErrorBlock>}
          <Grid variant="across">
            <GridRow>
              {productCategories?.categories.map((productCategory) => {
                const productPagesToShow = getPagesForProductCategory(productCategory);
                if (productPagesToShow.length == 0) return null;
                return (
                  <React.Fragment key={productCategory.id}>
                    <GridRow>
                      <div className={styles.headingWrapper}>
                        <H2 variant="large" className={styles.heading}>
                          <Icon
                            className={productCategory.icon}
                            style={{ width: "32px", height: "32px", marginRight: "1rem" }}
                          />
                          {productCategory.description}
                        </H2>
                        <hr className={`if`} />
                      </div>
                    </GridRow>
                    <GridRow>
                      <ProductGrid style={{ marginBottom: "3.5rem" }}>
                        {productPagesToShow.map((page) => {
                          const productPageId = page.productStartPage.contentLink.id;
                          const productPage = page.productStartPage;
                          const documentationPage = page.documentationStartPage;
                          const heading = <Property iContent={productPage} field="pageHeading"></Property>;
                          const body = <Property iContent={productPage} field="introHeading" className="if"></Property>;
                          const productUrl = CmsUrlParser.removeDomainName(productPage.url);
                          const docsUrl = CmsUrlParser.removeDomainName(documentationPage.url);

                          return (
                            <ProductCard
                              key={productPageId}
                              title={heading}
                              content={body}
                              productUrl={productUrl}
                              docsUrl={docsUrl}
                            />
                          );
                        })}
                      </ProductGrid>
                    </GridRow>
                  </React.Fragment>
                );
              })}
            </GridRow>
          </Grid>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default class ProductPagesListFilterBlock extends EpiComponent<ProductPagesListFilterBlockData> {
  public render(): ReactNode {
    return (
      <Block>
        <PageList />
      </Block>
    );
  }
}
